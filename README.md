# 手写一个掘金客户端
张彩仪 华东师范大学 2023级软件工程

## 1. 项目介绍

一个仿照掘金客户端，使用 Vue.js 技术栈构建的移动端 SPA 单页面应用程序，主要业务如下图所示：

![IMG_7024](https://caiyiimg.oss-cn-shanghai.aliyuncs.com/typora/20210813142202.PNG)

本项目采用了以下项技术解决方案：

1. 基于 **Vue.js** 的前端框架
2. 基于 **Vant** 的前端 UI 组件库，开发效率更高
3. 基于 **axios** 的请求库，功能强大性能高效
4. 基于 Vuex 的状态共享方案
5. 基于 Vue CLI 的脚手架工具，快速创建项目快速开发
6. 基于 Vue Router 的路由管理方案

## 2. 项目展示

演示地址：部署在轻服务上

https://juejin_zhangcaiyi.web.cloudendpoint.cn/

主页：上方有导航栏和 后端/前端/Android/IOS 导航栏下的分类小标签，下面是文章列表，实现了下拉刷新，底部是tab栏，分为 热门/最新/我的 三个板块

![image-20210813140638299](https://caiyiimg.oss-cn-shanghai.aliyuncs.com/typora/20210813143841.png)

文章详情页面：

![image-20210813141417623](https://caiyiimg.oss-cn-shanghai.aliyuncs.com/typora/20210813144049.png)

文章详情页面底部，显示所有评论和子评论：

![image-20210813141447454](https://caiyiimg.oss-cn-shanghai.aliyuncs.com/typora/20210813143845.png)

最新页面：

![image-20210813141114604](https://caiyiimg.oss-cn-shanghai.aliyuncs.com/typora/20210813143848.png)

我的页面，需要点击右上角的登录才能查看

![image-20210813141353688](https://caiyiimg.oss-cn-shanghai.aliyuncs.com/typora/20210813143851.png)

先注册账号后登录

![image-20210813141144814](https://caiyiimg.oss-cn-shanghai.aliyuncs.com/typora/20210813144113.png)

在我的页面，可以查看历史记录，也可以退出登录

![image-20210813141240673](https://caiyiimg.oss-cn-shanghai.aliyuncs.com/typora/20210813143854.png)

查看、清空历史记录

![image-20210813141253395](https://caiyiimg.oss-cn-shanghai.aliyuncs.com/typora/20210813144137.png)



## 3. 文件目录

```
juejin
├─ .browserslistrc
├─ .eslintrc.js
├─ .gitignore
├─ .prettierrc.js
├─ babel.config.js
├─ package-lock.json
├─ package.json
├─ README.md
├─ fake-api
│  ├─ data
│  │  ├─ android
│  │  │  ├─ flutter.js
│  │  │  ├─ java.js
│  │  │  └─ kotlin.js
│  │  ├─ articles.js
│  │  ├─ backend
│  │  │  ├─ go.js
│  │  │  ├─ java.js
│  │  │  └─ python.js
│  │  ├─ categories.js
│  │  ├─ comments.js
│  │  ├─ content
│  │  │  ├─ content1.js
│  │  │  ├─ content2.js
│  │  │  ├─ content3.js
│  │  │  ├─ content4.js
│  │  │  └─ content5.js
│  │  ├─ frontend
│  │  │  ├─ javascript.js
│  │  │  ├─ react.js
│  │  │  └─ vue.js
│  │  └─ ios
│  │     ├─ flutter.js
│  │     ├─ object-c.js
│  │     └─ swift.js
│  └─ index.js
├─ public
│  ├─ favicon.ico
│  ├─ index.html
│  └─ test.html
├─ src
│  ├─ App.vue
│  ├─ assets
│  │  ├─ images
│  │  │  ├─ avatar.png
│  │  │  └─ logo.svg
│  │  └─ logo.png
│  ├─ components
│  │  ├─ LoginForm.vue
│  │  ├─ mFooter.vue
│  │  ├─ mHeader.vue
│  │  └─ RegisterForm.vue
│  ├─ main.js
│  ├─ router
│  │  └─ index.js
│  ├─ utils
│  │  └─ common.js
│  └─ views
│     ├─ Article.vue
│     ├─ History.vue
│     ├─ Index.vue
│     ├─ Login.vue
│     └─ Mine.vue
└─ yarn.lock

```

## 4. 本地安装和运行

```
yarn install
```

#### Compiles and hot-reloads for development

```
yarn serve
```

#### Compiles and minifies for production

```
yarn build
```

#### Lints and fixes files

```
yarn lint
```

