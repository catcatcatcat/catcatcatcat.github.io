---
title: 用 Pelican/Jekyll + GitHub Page 建立部落格
---

喊要寫 blog 喊了很久，但過去使用過的 blog 總是沒有遇到很滿意的。先後換過 PIXNET, blogger, Wordpress, 總是覺得編輯器不太好用。直到我遇到了可以用 markdown 寫的 blog，真是太方便了。雖然說把自己的想法都丟進 hackmd 推上 GitHub 也是一招，但我還是有點想要有個浮誇漂亮的theme。 再加上今年我終於(?)想從零基礎新手學會運用一些 python 小套件，因此在朋友們的推坑下聽到了 Pelican 這個套件。事不宜遲，決定來試試看。

本文的誕生要感謝以下朋友：
* [Tai](https://tai271828.blogspot.com/)
* [Rex](https://madrex2000.github.io/)
* [Wei Lee](https://lee-w.github.io/)
* [Josix](https://josix.tw/) 
* [a127a127](https://www.facebook.com/a127a127)

沒有他們互相激勵跟催稿以及協助，應該會一直沒有進度下去。
Tai 說：「總之！就是要下筆！這是 0 vs. 1 的差異，一旦下筆了就是對自己的身份認同投下一票『我是會持續不斷提筆的優質人類』。」

雖然我就廢，但抱著「我就爛」的心態發廢文也是可以接受der吧XD 

## 第一個卡關點：升級 Python 版本

我現在使用的是公司的筆電，其實裡面什麼都沒有安裝，環境也沒有設好。所以我今天從升級 Python 版本開始進行。又因為路徑的設定弄了一陣子，其實我也沒有清楚正確的設定是怎樣。但總之好心的朋友先幫我弄到會動了！

如果你沒有朋友（喂）可以參考以下教學：
* [Pelican Docs Quickstart](https://docs.getpelican.com/en/stable/quickstart.html)：官方教學文件
* [pelican 使用教學](http://mixture.iis.sinica.edu.tw/pelican-writing.html)
* [使用 Pelican 建立 blog](http://weichengliou.github.io/blog/blog/2014/08/07/buildblog/)
* [設定部落格筆記](https://blog.liang2.tw/posts/2015/09/blog-internals/)
* [用 Pelican 在 GitHub 上建立 Blog](http://hauhsu.github.io/build-blog-on-github-pages-using-pelican.html)

## 第二個卡關點：挑選 theme
接下來就可以到 [http://www.pelicanthemes.com/]()挑選喜歡的 theme。
接著照個步驟完成應該就可以囉，好方便的！
這邊就要對信仰忠實的朋友說聲抱歉了， pelican 在安裝上似乎真的比較容易，但最後我屈服於 Jeykll 的 theme 比較漂亮所以選了XD 

朋友說：「雖然這是很合理的選擇...像我只是為了堅持用 Python 才選 Pelican 才是不知道在幹嘛。」其實也不是啦，不如說是我信仰不足XD

## 第三個卡關點：安裝 Jeykll 
這個步驟比第一步更簡單一點，找一個工具人幫你搞定一切（被揍）。如果你沒有，請讀文件：
* [Setting up a GitHub Pages site with Jekyll](https://docs.github.com/en/github/working-with-github-pages/setting-up-a-github-pages-site-with-jekyll)
* [GitHub Pages](https://jekyllrb.com/docs/github-pages/) 

這邊我們快速帶過就好（逃）

## 第四步驟：神奇的 fork 功能

我前面說了我是因為漂亮的 theme 所以選擇使用 Jekyll 的。
就是 [mmistakes/jekyll-theme-basically-basic](https://github.com/mmistakes/jekyll-theme-basically-basic) 的 theme，所以接下來按下這個神奇的 fork 按鈕，意思是複製一份他的 code 到你的 repo。
![](/assets/images/0807_pic1.png)

這時候會問你要 fork 到哪個 repo，幫你的 repo 命名，要拿來做 GitHub Page 的 repo 名稱是固定的，也就是 `<你的名字>.github.io`，要跟你的使用者名稱相同喔。 

![kimononawa](/assets/images/0807_pic2.png "你的名字") 
  
 
啊，放錯圖，是這張啦～
![](/assets/images/0807_pic3.png)

fork 完你已經得到跟來源一模一樣的 blog 版型了！
接下來就要調整設定讓它變成你喜歡的樣子～
它的 README.md 其實寫得還滿清楚，要調整什麼可以在哪裡找。
![](/assets/images/0807_pic4.png) 

找到這個 `_config.yml` 檔案就可以點進去！
![](/assets/images/0807_pic5.png)

點進去以後 `edit` 按下去就可以修改了，是不是很簡單～
![](/assets/images/0807_pic6.png) 

這時候大致上設定得差不多了，該來把 repo clone 到本機吧。
clone 好了以後，進到資料夾執行這個指令：
`bundle install --path vendor/bundle`

這個指令只有第一次要做，或者是要安裝某些 plugin 的時候可能會用到（？）

現在本機已經有這個 repo 了，跑起來看看吧～
`bundle exec jekyll serve`

![](/assets/images/0807_pic7.png)

server running... 從網址列進入 127.0.0.1:4000 或是 localhost:4000 就可以看到你的 blog 囉！

ps. 要在 blog 裡面放什麼圖片，把要放的圖片上傳到 `assets/images` 吧！
![](/assets/images/0807_pic8.png)




