document.addEventListener('DOMContentLoaded', function() {
    // Initialize filters
    let activeTag = 'all';
    let activeDate = null;

    // Collect all unique tags from posts
    const posts = document.querySelectorAll('.post');
    const tagSet = new Set();
    const dateMap = new Map(); // Format: { year: Set(months) }
    
    posts.forEach(post => {
        // Process tags
        const tags = post.dataset.tags.split(',');
        tags.forEach(tag => tagSet.add(tag.trim()));

        // Process dates
        const date = new Date(post.dataset.date);
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'long' });
        
        if (!dateMap.has(year)) {
            dateMap.set(year, new Set());
        }
        dateMap.get(year).add(month);
    });

    // Create tag buttons
    const tagList = document.querySelector('.tag-list');
    tagSet.forEach(tag => {
        const tagButton = document.createElement('span');
        tagButton.classList.add('tag');
        tagButton.textContent = tag;
        tagButton.addEventListener('click', () => {
            activeTag = tag;
            filterPosts();
            updateActiveStates();
        });
        tagList.appendChild(tagButton);
    });

    // Create archive structure
    const archiveList = document.querySelector('.archive-list');
    const sortedYears = Array.from(dateMap.keys()).sort((a, b) => b - a);
    
    sortedYears.forEach(year => {
        const yearDiv = document.createElement('div');
        yearDiv.classList.add('archive-year');
        yearDiv.textContent = year;
        archiveList.appendChild(yearDiv);

        const months = Array.from(dateMap.get(year)).sort((a, b) => {
            return new Date(Date.parse(`${a} 1, 2000`)) - new Date(Date.parse(`${b} 1, 2000`));
        });

        months.forEach(month => {
            const monthDiv = document.createElement('div');
            monthDiv.classList.add('archive-month');
            monthDiv.textContent = month;
            monthDiv.addEventListener('click', () => {
                activeDate = `${month} ${year}`;
                filterPosts();
                updateActiveStates();
            });
            archiveList.appendChild(monthDiv);
        });
    });

    // Add "All" tag
    const allTag = document.createElement('span');
    allTag.classList.add('tag');
    allTag.textContent = 'all';
    allTag.addEventListener('click', () => {
        activeTag = 'all';
        filterPosts();
        updateActiveStates();
    });
    tagList.insertBefore(allTag, tagList.firstChild);

    // Filter posts by tag and date
    function filterPosts() {
        posts.forEach(post => {
            const postTags = post.dataset.tags.split(',').map(tag => tag.trim());
            const postDate = new Date(post.dataset.date);
            const postDateString = `${postDate.toLocaleString('default', { month: 'long' })} ${postDate.getFullYear()}`;
            
            const matchesTag = activeTag === 'all' || postTags.includes(activeTag);
            const matchesDate = !activeDate || postDateString === activeDate;

            if (matchesTag && matchesDate) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    }

    // Update active states of filters
    function updateActiveStates() {
        // Update tag active states
        document.querySelectorAll('.tag').forEach(tag => {
            tag.classList.toggle('active', tag.textContent === activeTag);
        });

        // Update archive active states
        document.querySelectorAll('.archive-month').forEach(month => {
            month.classList.toggle('active', month.textContent + ' ' + month.previousElementSibling.textContent === activeDate);
        });
    }

    // Clear date filter when clicking year
    document.querySelectorAll('.archive-year').forEach(year => {
        year.addEventListener('click', () => {
            activeDate = null;
            filterPosts();
            updateActiveStates();
        });
    });

    // Search functionality
    const searchInput = document.getElementById('recipe-search');
    const searchButton = document.querySelector('.search-button');
    const recipes = document.querySelectorAll('.recipe-card');

    function searchRecipes(query) {
        const searchTerm = query.toLowerCase();
        recipes.forEach(recipe => {
            const title = recipe.querySelector('h2').textContent.toLowerCase();
            const description = recipe.querySelector('p').textContent.toLowerCase();
            const tags = recipe.dataset.tags.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm) || tags.includes(searchTerm)) {
                recipe.style.display = 'block';
            } else {
                recipe.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', (e) => searchRecipes(e.target.value));
    searchButton.addEventListener('click', () => searchRecipes(searchInput.value));

    // Category filtering
    const categoryLinks = document.querySelectorAll('.category-tags a');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.textContent.toLowerCase();
            
            // Update active state
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Filter recipes
            recipes.forEach(recipe => {
                const tags = recipe.dataset.tags.toLowerCase();
                if (category === 'all' || tags.includes(category)) {
                    recipe.style.display = 'block';
                } else {
                    recipe.style.display = 'none';
                }
            });
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const searchToggle = document.querySelector('.search-toggle');
    const searchContainer = document.querySelector('.search-container');

    menuToggle.addEventListener('click', () => {
        document.body.classList.toggle('menu-open');
    });

    searchToggle.addEventListener('click', () => {
        searchContainer.classList.toggle('search-open');
        searchInput.focus();
    });

    // Popular recipes
    const popularList = document.querySelector('.popular-list');
    const popularRecipes = Array.from(recipes).slice(0, 5); // Get first 5 recipes

    popularRecipes.forEach(recipe => {
        const title = recipe.querySelector('h2').textContent;
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = title;
        const listItem = document.createElement('div');
        listItem.classList.add('popular-item');
        listItem.appendChild(link);
        popularList.appendChild(listItem);
    });

    // Menu functionality
    const menuPanel = document.querySelector('.menu-panel');
    const body = document.body;

    // Create overlay if it doesn't exist
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        body.appendChild(overlay);
    }

    // Toggle menu
    menuToggle.addEventListener('click', function() {
        console.log('Menu toggle clicked'); // Debug log
        menuPanel.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = menuPanel.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
        menuPanel.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuPanel.classList.contains('active')) {
            menuPanel.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
        }
    });
});
