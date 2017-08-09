## gulp-browserify-base-pack

使用**gulp** 和 **browserify** 来优化和打包项目的js,css的最基本的操作配置。

#### 为什么这样实现?

针对我们的项目，我们希望对于相同文件夹下面的html,js,css及其他资源能够:同一个文件夹下面的js,css及其他资源只为该文件夹下面的html负责。

1. 每个文件夹下面的所有的js合并为一个优化后的js,并且以与文件夹同名(除了后缀)的js作为入口

2. 每个文件夹下面的css合并为一个css

#### 示例项目中的src中的文件结构为:

    ├── src
           ├── app
                  ├── first
                          ├── first-toolbar
                                  ├── first-toolbar.css
                                  ├── first-toolbar.js
                                  ├── first-toolbar-menu.css
                                  ├── first-toolbar-menu.js
                          ├── first.css
                          ├── first.js
                          ├── first-search.css
                          ├── first-search.js
                          ├── first-table.css
                          ├── first-table.js
                  ├── second
                          ├── second.css
                          ├── second.js
                          ├── second-search.css
                          ├── second-search.js
                          ├── second-table.css
                          ├── second-table.js
                  ├── third
                  ├── app.css
                  ├── app.js
                  ├── content.css
                  ├── content.js
                  ├── leftMenu.css
                  ├── leftMenu.js

#### 处理后在dist中生成的文件结构如下:

    ├── dist
           ├── app
                  ├── first
                          ├── first-toolbar
                                  ├── first-toolbar.min.css
                                  ├── first-toolbar.min.css.map
                                  ├── first-toolbar.min.js
                                  ├── first-toolbar.min.js.map
                          ├── first.min.css
                          ├── first.min.css.map
                          ├── first.min.js
                          ├── first.min.js.map
                  ├── second
                          ├── second.min.css
                          ├── second.min.css.map
                          ├── second.min.js
                          ├── second-min.js.map
                  ├── app.min.css
                  ├── app.min.css.map
                  ├── app.min.js
                  ├── app.min.js.map
