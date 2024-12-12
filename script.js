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

    // Menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const menuPanel = document.querySelector('.menu-panel');
    const menuOverlay = document.querySelector('.menu-overlay');
    const body = document.body;

    if (!menuToggle || !menuPanel) {
        console.error('Menu elements not found');
        return;
    }

    // Toggle menu
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from bubbling
        menuPanel.classList.toggle('active');
        menuToggle.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        body.style.overflow = menuPanel.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', () => {
            menuPanel.classList.remove('active');
            menuToggle.classList.remove('active');
            menuOverlay.classList.remove('active');
            body.style.overflow = '';
        });
    }

    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuPanel.classList.contains('active')) {
            menuPanel.classList.remove('active');
            menuToggle.classList.remove('active');
            menuOverlay.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.querySelector('.search-button');
    const searchToggle = document.querySelector('.search-toggle');
    const searchContainer = document.querySelector('.search-container');

    if (searchInput && searchButton && searchToggle && searchContainer) {
        // Search toggle
        searchToggle.addEventListener('click', () => {
            searchContainer.classList.toggle('search-open');
            searchInput.focus();
        });

        // Search functionality
        const searchPosts = (query) => {
            const posts = document.querySelectorAll('.post');
            const searchTerm = query.toLowerCase();

            posts.forEach(post => {
                const title = post.querySelector('h2').textContent.toLowerCase();
                const description = post.querySelector('p').textContent.toLowerCase();
                const tags = post.dataset.tags ? post.dataset.tags.toLowerCase() : '';

                if (title.includes(searchTerm) || description.includes(searchTerm) || tags.includes(searchTerm)) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        };

        searchInput.addEventListener('input', (e) => searchPosts(e.target.value));
        searchButton.addEventListener('click', () => searchPosts(searchInput.value));

        // Close search when pressing Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchContainer.classList.contains('search-open')) {
                searchContainer.classList.remove('search-open');
            }
        });
    }

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
            const recipes = document.querySelectorAll('.recipe-card');
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

    // Popular recipes
    const popularList = document.querySelector('.popular-list');
    const popularRecipes = Array.from(document.querySelectorAll('.recipe-card')).slice(0, 5); // Get first 5 recipes

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
});
