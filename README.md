[![Version](https://img.shields.io/npm/v/component-library-test.svg)](https://www.npmjs.com/package/component-library-test) [![Downloads](http://img.shields.io/npm/dm/component-library-test.svg)](https://www.npmjs.com/package/component-library-test) [![License](https://img.shields.io/npm/l/component-library-test.svg?style=flat)](https://opensource.org/licenses/MIT) [![Build Status](https://travis-ci.org/xuqiang521/personal-component-library.svg?branch=dev)](https://travis-ci.org/xuqiang521/personal-component-library)

## 一、写在前面

### 1、灵感来源

我平常比较喜欢对一些东西做一些记录和总结，其中包括一些组件，积累的量比较多的时候，发现零散的堆积已经不太适合进行管理了。

于是我开始思考，有什么好的办法可以比较规范地来管理这些比较零散的东西呢？如果以组件库这种形式来对组件进行管理的话，会不会更适合自己的积累并方便以后的工作呢？

于是我开始参考市场上一些优秀的 UI 组件库，比如 [`element-ui`](https://github.com/ElemeFE/element)、[`vux`](https://github.com/airyland/vux)、 [`vant`](https://github.com/youzan/vant)等，对其源码进行拜读，了解其架构的搭建，随后整理出一套属于自己的移动端 UI 组件库 [`vui`](https://github.com/Brickies/vui) 。

我在业余时间活跃于各大技术社区，常有一些或工作一段时间的、或还在准备找实习工作的小伙伴问笔者一些问题：怎样沉淀自己，做自己的框架、轮子、库？怎样做一个组件库？自己做过一个组件库会不会成为简历的亮点？你能不能写一些有关组件库开发的相关文章？...

本着答惑解疑和分享的心情，这篇博文便诞生了。

### 2、最终效果图

![api-1](https://static.oschina.net/uploads/img/201803/17174423_SdQU.png "PC 端预览图")

![api-2](https://static.oschina.net/uploads/img/201803/17174556_MlOQ.png "移动端预览图")

### 3、问题交流

如果小伙伴在阅读文章实战的时候有什么问题的话，欢迎加入讨论群一起讨论（群里除了一群大佬天天骚话外还有一群妹纸哦 ~ ）

前端大杂烩：731175396

github：[https://github.com/xuqiang521](https://github.com/xuqiang521)

废话不多说，接下来，让我们直接进入到实战篇吧 ~

## 二、环境搭建

### 1、搭建 NODE 环境

**这里我只谈 Mac 和 window 下 NODE 的安装**

#### i. Mac 下的安装

- 如果你还没有安装 mac 软件包管理器 `homebrew` 的话第一步得先安装它

  ```shell
  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  ```

- 使用 `homebrew` 安装 `node`

  ```bash
  brew install node
  ```

#### ii. window 下的安装

`window` 环境的话直接进入 [node 官网](https://nodejs.org/en/download/)进行对应版本的下载，然后疯狂点击下一步即可安装完成

安装完成后，查看 `node` 和 `npm` 版本

```shell
node -v
# v9.6.1
npm -v
# 5.6.0
```

自此你电脑上 `node` 环境就已经搭建好了，接下来，我们需要安装组件库构建依赖的脚手架了。

### 2、构建一个 vue 项目

#### i. 安装 vue-cli

```shell
# 全局安装
npm i -g vue-cli
# 查看vue-cli用法
vue -h
# 查看版本
vue -V
# 2.9.3
```

#### ii. 使用 vue-cli 构建项目

使用 `vue-cli` 的 `init` 指令初始化一个名为 `personal-components-library` 的项目

```shell
# 项目基于 webpack
vue init webpack personal-components-library
```

构建时脚手架会让你填写项目的一些描述和依赖，参考下面我选择的内容进行填写即可

```shell
# 项目名称
Project name? personal-components-library
# 项目描述
Project description? A Personal Vue.js components Library project
# 项目作者
Author? qiangdada
# 项目构建 vue 版本(选择默认项)
Vue build? standalone
# 是否下载 vue-router (后期会用到，这里选 Yes)
Install vue-router? Yes
# 是否下载 eslint (为了制定合理的开发规范，这个必填)
Use ESLint to lint your code? Yes
# 安装默认的标准 eslint 规则
Pick an ESLint preset? Standard
# 构建测试案例
Set up unit tests? Yes
# 安装 test 依赖 (选择 karma + mocha)
Pick a test runner? karma
# 构建 e2e 测试案例 (No)
Setup e2e tests with Nightwatch? No
# 项目初始化完是否安装依赖 (npm)
Should we run `npm install` for you after the project has been created? (recom
mended) npm
```

当你选好之后就可以等了，`vue-cli` 会帮你把项目搭建好，并且进行依赖安装。

初始化项目的结构如下:

```shell
├── build                     webpack打包以及本地服务的文件都在里面
├── config              	  不同环境的配置都在这里
├── index.html                入口html
├── node_modules              npm安装的依赖包都在这里面
├── package.json              项目配置信息
├── README.md              	  项目介绍
├── src                       我们的源代码
│   ├── App.vue               vue主入口文件
│   ├── assets                资源存放(如图片)
│   ├── components            可以复用的模块放在这里面
│   ├── main.js               入口js
│   ├── router                路由管理
└── webpack.config.js         webpack配置文件
├── static                    被copy的静态资源存放地址
├── test                      测试文档和案例
```

如果你用 `npm` 下载依赖太慢或者部分资源被墙的话，建议利用 `cnpm` 进行依赖的下载

```shell
# 全局安装 cnpm
npm install -g cnpm --registry=https://registry.npm.taobao.org
# 使用 cnpm 进行依赖安装
cnpm i
```

依赖安装完成就可以启动你的 `vue` 项目啦 ~

```shell
npm run dev
```

然后访问 `http://localhost:8080` 便可以成功访问通过 `vue-cli` 构建出来的 `vue` 项目，至此你组件库依赖的开发环境便已经安装完毕。

## 三、构建新目录

首先，我们要明确本节的目的，我们需要修改目录，为了更好的开发组件库。

我们上一节已经把搭建好了 `vue` 项目，但初始化出来的项目的目录却不能满足一个组件库的后续开发和维护。因此这一章节我们需要做的事情就是改造初始化出来的 `vue` 项目的目录，将其变成组件库需要的目录，接下来就让我们行动起来吧。

### 1、组件库目录

1. **build**：这个目录主要用来存放构建相关的文件
2. **packages**： 这个目录下主要用来存放所有组件
3. **examples**：这个目录下主要用来存放组件库的展示 `demo` 和 `文档`的所有相关文件
4. **src**：这个目录主要用来管理组件的注册的主入口，工具，`mixins`等（对此我们需要改造初始化出来的 `src` 目录）
5. **test**：这个目录用来存放测试案例（继续延用初始化出来的目录）
6. **lib**：组件库打包出来后的目录
7. **.github**：作为一个开源组件库，如果你想和别人一起开发，那么这个目录用来存放你自己定义的一些开发规则指导，也是非常不错的

OK，开始改造你初始化出来的项目的目录吧。

### 2、让项目能够重新跑起来

####  i. 改造 examples 目录

从前面我们知道，我们启动本地服务的时候，页面的的主入口文件是 `index.html` 。现在我们第一步就是讲页面的主入口 `html` 和 `js` 挪到 `examples` 目录下面。`examples` 具体目录如下

```shell
├── assets						css，图片等资源都在这
├── pages                     	路由中所有的页面
├── src              	      	
│   ├── components            	demo中可以复用的模块放在这里面
│   ├── index.js              	入口js
│   ├── index.tpl              	页面入口
│   ├── App.vue               	vue主入口文件
│   ├── router.config.js		路由js
```

各个文件修改后的代码如下

- `index.js` 

  ```javascript
  import Vue from 'vue'
  import App from './App'
  import router from './router.config'

  Vue.config.productionTip = false

  /* eslint-disable no-new */
  new Vue({
    el: '#app-container',
    router,
    components: { App },
    template: '<App/>'
  })
  ```

- `index.tpl`

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>My Component Library</title>
  </head>
  <body>
    <div id="app-container">
      <app></app>
    </div>
  </body>
  </html>
  ```

- `App.vue`

  ```html
  <template>
    <div id="app">
      <router-view/>
    </div>
  </template>

  <script>
  export default {
    name: 'App'
  }
  </script>
  ```

- `router.config.js`

  ```javascript
  import Vue from 'vue'
  import Router from 'vue-router'
  import hello from '../pages/hello'  // 请自行去pages下面创建一个hello.vue，以方便之后的测试

  Vue.use(Router)

  export default new Router({
    routes: [
      {
        path: '/',
        component: hello
      }
    ]
  })
  ```

#### ii. 改造 src 目录

`src` 目录主要用来存放组件的注册的主入口文件，工具方法，`mixins`等文件。我们从上面 `examples` 的目录可以知道，原先 `src` 中的一些文件是需要删掉的，改造后的目录如下

```shell
├── mixins						mixins方法存放在这
├── utils                     	一些常用辅助方法存放在这
├── index.js              	    组件注册主入口
```

#### iii. 改造 build 目录下部分打包文件

想想小伙伴看到这，也应该知道我们现在需要做的事是什么。没错，就是修改本地服务的入口文件。如果只是能够跑起来，那么修改 `entry` 中的 js 入口以及 `html-webpack-plugin` 的页面入口引用即可。代码如下（只放关键性代码）

```javascript
entry: {
  'vendor': ['vue', 'vue-router'],
  'vui': './examples/src/index.js'
},
// ...
plugins: [
  // ...
  // 将入口改成examples/src/index.tpl
  new HtmlWebpackPlugin({
    chunks: ['vendor', 'vui'],
    template: 'examples/src/index.tpl',
    filename: 'index.html',
    inject: true
  })
]
```

OK，修改好了。重新执行一次 `npm run dev`，然后你的项目便能在新的入口文件下跑起来

### 3、在本地使用组件

这一小节，我们需要实现的就是我们本地启动的服务，能够使用 `packages` 下面的组件。下面我们开发一个最简单的 `hello` 组件进行讲解

#### i. 在 `packages` 下创建一个 `hello` 组件

为了有一个良好约束性，这里我们约束：一个组件在开始写之前，得有一个规定的目录及文件名进行统一管理。 `packages` 目录下 `hello` 组件下的文件如下

```shell
├── hello						
│   ├── hello.vue
```

`hello.vue` 内容如下

```html
<template>
  <div class="v-hello">
    hello {{ message }}
  </div>
</template>

<script>
export default {
  name: 'v-hello',
  props: {
    message: String
  }
}
</script>
```

#### ii. 在 `src/index.js` 对组件进行注册

`sec/index.js` 文件在上面也有提及，它主要用来管理我们组件库中所有组件的注册

```javascript
import Hello from '../packages/hello'

const install = function (Vue) {
  if (install.installed) return

  Vue.component(Hello.name, Hello)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Hello
}
```

#### iii. 在 `examples/src/index.js` 入口 js 文件中进行引用

接下来，我需要在上节改造好的 `examples` 中对我们写好的 `hello` 组件进行引用

```javascript
import vui from 'src/index.js'
// 完整引用
Vue.use(vui)
// 独立引用
const { Hello } = vui
Vue.component(Hello.name, Hello)
```

#### iv. 在 `examples/pages/hello.vue` 直接使用

在 `examples/pages` 中我们需要建立和组件名同名的 demo 文件，并对组件进行使用 

```html
<v-hello message="my component library"></v-hello>
```

![hello](https://static.oschina.net/uploads/img/201803/17174712_IV6a.png "Hello")

当你运行的结果和上图一样的话，那么恭喜。你又成功向组件库的开发迈开了一步 ~

看到这里，我需要各位读者能够按照自己的喜好对文件进行集中化的管理（当然，也可以参考我上面给出的 demo），只有这样，才能够让我们组件库后续的开发工作能够顺畅起来。

下一节，我们会优化 `build` 下面的打包文件，并带着大家把自己的开发好的组件发布到 `npm` 官网，让你的组件库能够被人更方便的使用！

## 四、改造打包文件，发布 npm 包

老规矩，章节正文开始之前，我们得清楚本章节需要做什么以及为什么这么做。

1. 由于脚手架初始的项目对于 `build` 文件只有一个集中打包的文件 `webpack.prod.conf.js` 

2. 为了之后我们的组件库能更好的使用起来，我们需要将组件库对应的模块抽离全部打包到 `vui.js` 一个文件中（名字你喜欢啥取啥），这样我们之后就能通过以下方式来引用我们得组件库了

   ```javascript
   import Vue from 'vue'
   import vui from 'x-vui'
   Vue.use(vui)
   ```

3. 我们还需要将 `examples` 中相关的文件进行打包管理，因为我们后面还得开发组件库的文档官网，而文档官网相关入口都在 `examples` 中

### 1、改造 build 打包文件

#### i. 本地服务文件的整合

我们从初始化出来项目可以看到，`build` 文件中的有关 `webpack` 的文件如下

```shell
├── webpack.base.conf.js					基础配置文件
├── webpack.dev.conf.js                     本地服务配置文件
├── webpack.prod.conf.js             	    打包配置文件
├── webpack.test.conf.js             	    测试配置文件(这里先不做过多描述)
```

初始化的打包 `output` 输出的目录是 `dist` ，这个目录是整个项目打包后输出的目录，并不是我们组件库需要的目录。既然不是我们想要的，那我们想在需要的目录是怎么样的呢？

1. 组件库主入口 js 文件 `lib/vui.js`（组件库 js 主文件）
2. 组件库主入口 css 文件 `lib/vui-css/index.css` （组件库 css 主文件，这一章节我们对 css 打包不做过多描述，后面章节会单独讲解）
3. `examples` 文件打包出来的文件 `examples/dist`（后期文档官网的主入口）

既然目标已经定了，接下来我们需要做的就是先整理好相关的 `webpack` 打包文件，如下

```shell
├── webpack.base.conf.js			基础配置文件(配置方面和webpack.dev.conf.js的配置进行部分整合)
├── webpack.dev.conf.js             本地服务配置文件(将纯配置文件进行对应的删减)
├── webpack.build.js             	组件库入口文件打包配置文件(将webpack.prod.conf.js重命名)
├── webpack.build.min.js            examples展示文件打包配置文件(新增文件)
```

**1、webpack.base.conf.js**

开始改造 `webpack.base.conf.js` 文件之前我们需要先了解两个打包文件需要做的事情

1. `webpack.build.js ` ：输出 `lib/vui.js` 组件库 js 主文件，会用到 `webpack.base.conf.js` 和 `webpack.dev.conf.js` 相关配置
2. `webpack.build.min.js` ：输出 `examples/dist` 文档相关文件，会用到 `webpack.base.conf.js` 和 `webpack.dev.conf.js`  相关配置

既然两个 `webpack` 打包文件都会用到 `webpack.base.conf.js` 和 `webpack.dev.conf.js` 相关配置，那么我们何不将相同的一些文件都整合到 `webpack.base.conf.js` 文件中呢？目标明确了，接下来跟着我开搞吧

```javascript
'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})
module.exports = {
  context: path.resolve(__dirname, '../'),
  // 文件入口 
  entry: {
    'vendor': ['vue', 'vue-router'],
    'vui': './examples/src/index.js'
  },
  // 输出目录
  output: {
    path: path.join(__dirname, '../examples/dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    // 此处新增了一些 alias 别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'src': resolve('src'),
      'packages': resolve('packages'),
      'lib': resolve('lib'),
      'components': resolve('examples/src/components')
    }
  },
  // 延用原先的大部分配置
  module: {
    rules: [
      // 原先的配置...
      // 整合webpack.dev.conf.js中css相关配置
      ...utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
    ]
  },
  // 延用原先的配置
  node: {
    // ...
  },
  devtool: config.dev.devtool,
  // 整合webpack.dev.conf.js中的devServer选项
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  // 整合webpack.dev.conf.js中的plugins选项
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // 页面主入口
    new HtmlWebpackPlugin({
      chunks: ['manifest', 'vendor', 'vui'],
      template: 'examples/src/index.tpl',
      filename: 'index.html',
      inject: true
    })
  ]
}
```

**2、webpack.dev.conf.js**

这里只需要将整合到 `webpack.base.conf.js` 中的配置删掉即可，避免代码重复

```javascript
'use strict'
const utils = require('./utils')
const config = require('../config')
const baseWebpackConfig = require('./webpack.base.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      process.env.PORT = port
      baseWebpackConfig.devServer.port = port

      baseWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${baseWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(baseWebpackConfig)
    }
  })
})
```

 `webpack.base.conf.js` 和  `webpack.dev.conf.js` 两个文件都调整好后，重新执行一下 `npm run dev`

![run-dev](https://static.oschina.net/uploads/img/201803/17174747_zBD8.png "npm run dev")

出现上图表示此时你们的本地服务文件已经按照预想修改成功啦 ~

#### ii. 改造打包文件

**1、webpack.build.js**

本文件主要目的就是将组件库中所有组件相关的文件打包到一起并输出 `lib/vui.js` 主文件

```javascript
'use strict'
const webpack = require('webpack')
const config = require('./webpack.base.conf')
// 修改入口文件
config.entry = {
  'vui': './src/index.js'
}
// 修改输出目录
config.output = {
  filename: './lib/[name].js',
  library: 'vui',
  libraryTarget: 'umd'
}
// 配置externals选项
config.externals = {
  vue: {
    root: 'Vue',
    commonjs: 'vue',
    commonjs2: 'vue',
    amd: 'vue'
  }
}
// 配置plugins选项
config.plugins = [
  new webpack.DefinePlugin({
    'process.env': require('../config/prod.env')
  })
]
// 删除devtool配置
delete config.devtool

module.exports = config
```

**2、webpack.build.min.js**

该文件主要目的是为了单开一个打包地址，将 `examples` 中相关的文件输出到 `examples/dist` 目录（即后续文档官网入口）

```javascript
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
  output: {
    chunkFilename: '[id].[hash].js',
    filename: '[name].min.[hash].js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      allChunks: true,
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),
  ]
})

module.exports = webpackConfig
```

当我们把这些文件都弄好的时候，最后一步就是将打包命令写入到 `package.json` 的 `scripts` 中了

```json
"scripts": {
  "build:vui": "webpack --progress --hide-modules --config build/webpack.build.js && rimraf examples/dist && cross-env NODE_ENV=production webpack --progress --hide-modules --config build/webpack.build.min.js"
},
```

执行命令，`npm run build:vui`，走你

![build](https://static.oschina.net/uploads/img/201803/17174917_xSKt.png "npm run build:vui")

至此，有关本地服务以及两个打包文件便已改造完成，下面我们尝试将 `npm` 使用起来 ~

### 2、发布 npm 包

注意，如果你还没有属于自己的 `npm` 账号的话，请先自行到 `npm` 官网注册一个账号，[点击这里进入官网进行注册](https://www.npmjs.com/) ，注册步骤比较简单，这里我就不过多做描述了，如果有疑问，可以在微信群问我

#### i. 先来个最简单的 demo

```shell
mkdir qiangdada520-npm-test
cd qiangdada520-npm-test
# npm 包主入口js文件
touch index.js
# npm 包首页介绍(具体啥内容你自行写入即可)
touch README.md
npm init
# package name: (qiangdada520-npm-test)
# version: (1.0.0)
# description: npm test
# entry point: (index.js) index.js
# test command:
# git repository:
# keywords: npm test
# author: qiangdada
# license: (ISC)
```

然后确定，则会生成 `package.json` ，如下

```javascript
{
  "name": "qiangdada-npm-test",
  "version": "1.0.0",
  "description": "npm test",
  "main": "index.js",  // npm 包主入口js文件
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "npm",
    "test"
  ],
  "author": "qiangdada",
  "license": "MIT"
}
```

接下来，我们需要在本地连接我们注册号的 `npm` 账号

```shell
npm adduser
# Username: 填写你自己的npm账号
# Password: npm账号密码
# Email: (this IS public) 你npm账号的认证邮箱
# Logged in as xuqiang521 on https://registry.npmjs.org/.  连接成功
```

执行 `npm publish` 开始发布

```shell
npm publish
# + qiangdada-npm-test@1.0.0
```

这个时候你再去 `npm` 官网就能搜索并看到你刚发布好的包啦 ~

#### ii. 发布组件库

目前组件库，我们写了一个最简单的 `hello` 组件，不过这丝毫不影响我们将其发布到 `npm` 官网，并且发布步骤和上面的例子一样简单。

修改 `package.json` 文件中的部分描述

```javascript
// npm 包js入口文件改为 lib/vui.js
"main": "lib/vui.js",
// npm 发布出去的包包含的文件
"files": [
  "lib",
  "src",
  "packages"
],
// 将包的属性改为公共可发布的
"private": false,
```

注意，测试 `npm` 包发布的时候，记得每一次的 `package.json` 中的 `version` 版本要比上一次高。

开始发布

```shell
# 打包，输出lib/vui.js
npm run build:vui
# 发布
npm publish
# + component-library-test@1.0.1
```

#### iii. 使用我们发布到 npm 的组件

选择一个本地存在的 vue 项目，进入到项目

```shell
npm i component-library-test
# or 
cnpm i component-library-test
```

在项目入口文件中进行组件的注册

```javascript
import Vue from 'vue'
import vui from 'component-library-test'
Vue.use(vui)
```

在页面使用

```html
<v-hello message="component library"></v-hello>
```

![use-npm](https://static.oschina.net/uploads/img/201803/17175041_kSwG.png "use npm")

至此，我们便已经成功改造了本地服务文件，实现了组件库主文件的打包以及文档官网主入口的打包，并在最后学会了如何使用 `npm` 进行项目的发布。

下一章节，我将对组件库中 `css` 文件打包进行讲解。

## 五、css文件管理与打包

上一节，我们已经弄好了 js 文件的打包。但对于组件库，我们要做到的不仅仅只是对 js 文件进行管理，还需要对 css 文件进行管理，这样才能保证组件库后续的使用。

本节中，我将会讲述如何在基于 `webpack` 构建基础的项目中合理使用 `gulp` 对 css 文件进行单独的打包管理。

开始之前，我们需要明确两个目标：

1. 组件库中组件相关的 css 文件该如何进行管理，放哪进行统一管理以及使用何种方式进行编写
2. css 文件将如何进行打包，单个组件如何输出对应的单个 css

### 1、css 文件管理

为了方便管理，每创建一个新组件时，我们需要创建一个对应的 css 文件来管理组件的样式，做到单一管理

#### i. css 目录

这里，我们将会把所有的 css 文件都存放到 `packages/vui-css` 目录下，具体结构如下

```shell
├── src              	
│   ├── common         		存放组件公用的css文件
│   ├── mixins				存放一些mixin的css文件
│   ├── index.css			css主入口文件
│   ├── hello.css			对应hello组件的单一css文件
├── gulpfile.js          	css打包配置文件
├── package.json         	相关的版本依赖
```

#### ii. css 文件编写方式

开始写组件的 css 前，我们要明确一些点：

1. 当使用者引入组件库并使用时，组件的样式不能与使用者项目开发中样式冲突
2. 使用者在一些特殊情况能够对组件样式进行覆盖，且能比较方便的进行修改。

符合这两种情况的方式，个人觉得目前市场上比较好的方式就是对组件进行单一的 css 管理，并使用 `bem` 对 css 进行编写。想了解 `bem` 的同学，点击以下链接即可

- [BEM](https://en.bem.info/methodology/quick-start/)
- [如何看待 CSS 中 BEM 的命名方式？](https://www.zhihu.com/question/21935157) (这是好几年前的问题了，但仍有一定的参考性)

接下来，我们就着简单的 `hello` 组件来做个讲解，开始前，先放上 `hello.vue` 的内容

```html
<template>
  <div class="v-hello">
    <p class="v-hello__message">hello {{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'v-hello',
  props: {
    message: String
  }
}
</script>
```

在 `packages/vui-css/src` 目录下创建 `hello.css`

```css
@b v-hello {
  color: #fff;
  transform: scale(1);

  @e message {
    background: #0067ED;
  }
}
```

然后在主入口 `index.css` 中引入 `hello.css` 文件

```css
@import './hello.css';
```

在 `examples/src/index.js` 中引入组件库样式

```javascript
import 'packages/vui-css/src/index.css'
```

但从 `hello.css` 内容我们可以看出，这是典型的 `bem` 的写法，正常是不能解析的。我们需要引入相应的 `postcss` 插件对 `bem` 语法进行解析。这里我们将使用 `饿了么团队` 开发出来的 `postcss-salad` 插件对 `bem` 语法进行解析，其次，这种 `sass-like` 风格的 css 文件，还需要用到一个插件叫 `precss` ，先安装好依赖吧 ~

```shell
npm i postcss-salad precss -D
```

依赖安装完成后，我们需要在项目根目录下新建 `salad.config.json` 用来配置 `bem` 规则，具体规则如下

```json
{
  "browsers": ["ie > 8", "last 2 versions"],
  "features": {
    "bem": {
      "shortcuts": {
        "component": "b",
        "modifier": "m",
        "descendent": "e"
      },
      "separators": {
        "descendent": "__",
        "modifier": "--"
      }
    }
  }
}
```

接下来我们需要在项目初始化出来的 `.postcssrc` 文件中使用 `postcss-salad` 和 `precss` 插件，如下

```javascript
module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-salad": require('./salad.config.json'),
    "postcss-url": {},
    "precss": {},
    "autoprefixer": {},
  }
}
```

OK，这个时候再次运行项目，则能看到 css 生效，如图

![bem](https://static.oschina.net/uploads/img/201803/17175151_m3ws.png "bem")

### 2、css 文件打包

为了将组件库中的 css 文件进行更好的管理，更为了使用者只想引入组件库中某一个或者几个组件的时候也可以引入组件对应的 css 文件。因此我们需要对 css 文件进行单独的打包，这里我们需要用到 `gulp` 来进行对应的打包操作，在你开始弄打包细节前，请先确保你已经全局安装过了 `gulp` ，如果没有，请进行安装

```shell
npm i gulp -g
# 查看版本
gulp -v
# CLI version 3.9.1
```

接下来，我们看看 `packages/vui-css/package.json` 文件中需要用到什么依赖

```javascript
{
  "name": "vui-css",
  "version": "1.0.0",
  "description": "vui css.",
  "main": "lib/index.css",
  "style": "lib/index.css",
   // 和组件发布一样，也需要指定目录
  "files": [
    "lib",
    "src"
  ],
  "scripts": {
    "build": "gulp build"
  },
  "license": "MIT",
  "devDependencies": {
    "gulp": "^3.9.1",
    "gulp-cssmin": "^0.2.0",
    "gulp-postcss": "^7.0.1",
    "postcss-salad": "^2.0.1"
  },
  "dependencies": {}
}
```

我们可以看到，这里其实和组件库中对于 css 文件需要的依赖差不多，只不过这里是基于 `gulp` 的 `postcss` 插件。开始配置 `gulpfile.js` 前，别忘记执行 `npm i` 进行依赖安装。

接下来我们开始配置 `gulpfile.js`，具体如下

```javascript
const gulp = require('gulp')
const postcss = require('gulp-postcss')
const cssmin = require('gulp-cssmin')
const salad = require('postcss-salad')(require('../../salad.config.json'))

gulp.task('compile', function () {
  return gulp.src('./src/*.css')
    // 使用postcss-salad
    .pipe(postcss([salad]))
    // 进行css压缩
    .pipe(cssmin())
    // 输出到 './lib' 目录下
    .pipe(gulp.dest('./lib'))
})

gulp.task('build', ['compile'])
```

现在，你可以开始执行 `gulp build` 命令对 css 文件进行打包了。当然为了方便并更好的执行打包命令，我们现在需要在项目根目录下的 `package.json` 中加上一条 css 的 build 命令，如下

```json
"scripts": {
  "build:vui-css": "gulp build --gulpfile packages/vui-css/gulpfile.js && rimraf lib/vui-css && cp-cli packages/vui-css/lib lib/vui-css && rimraf packages/vui-css/lib"
}
```

执行 `npm run build:vui-css`， 走你，最后打包出来的组件库的 js 和 css 文件如下图所示

![build-vui-css](https://static.oschina.net/uploads/img/201803/17175250_roye.png "build vui-css")

OK，到这里，你已经可以单独引入组件及其样式了。最后为了让使用者能够直接使用你组件的 css ，别忘记将其发布到 `npm` 官网哦 ~ 步骤如下

```shell
# 进到vui-css目录
cd packages/vui-css
# 发布
npm publish
```

至此，我们已经完成了 css 文件的管理和单独打包，完成了对 css 文件单一的输出。如此这样，我们能够对组件库 css 文件的开发和管理有了一个较好的方式的同时，能够方便组件库的使用！

## 六、单元测试

目前为止，我们已经构建好了组件库需要的新目录，js 文件和 css 文件的打包我们也改造好了，组件库开发的前置工作我们已经做好了比较充实的准备，但我们仍需做一些非常重要的前置工作以方便组件库后续组件的开发和维护。

而对于前端测试，它是前端工程方面的一个重要分支，因此，在我们的组件库中怎么能少掉这么重要的一角呢？对于单元测试，主要分为两种

- TDD（Test-Driven Development）：测试驱动开发，注重输出结果。
- BDD（Behavior Driven Development）：行为驱动开发，注重测试逻辑。

在本章节中，我将带领大家使用基于项目初始化自带的 `Karma` + `Mocha` 这两大框架对我们的组件库中的组件进行单元测试。

### 1、框架简介

对于 `Karma` + `Mocha` 这两大框架，相信大多数接触过单元测试的人都不会陌生，但这里我觉得还是有必要单独开一小节对着两大框架进行一个简单的介绍。

#### i. Karma 框架

- **Karma** 是一个基于 Node.js 的 JavaScript 测试执行过程管理工具（Test Runner）
- **Karma**  是一个测试工具，能让你的代码在浏览器环境下测试
- **Karma** 能让你的代码自动在多个浏览器，比如 chrome，firefox，ie 等环境下运行

为了能让我们的组件库中的组件能够运行在各大主流 Web 浏览器中进行测试，我们选择了 **Karma** 。最重要的是 **Karma** 是 `vue-cli` 推荐的单元测试框架。如果你想了解更多有关 **Karma** 的介绍，请自行查阅 [Karma 官网](http://karma-runner.github.io/2.0/index.html)

#### ii. Mocha 框架

- **Mocha** 是一个 `simple`，`flexible`，`fun` 的测试框架
- **Mocha** 支持异步的测似用例，如 `Promise`
- **Mocha** 支持代码覆盖率 `coverage` 测试报告
- **Mocha** 允许你使用任何你想使用的断言库，比如 [chai](http://chaijs.com/) 、[should.js](https://github.com/shouldjs/should.js) （BDD风格）、[expect.js](https://github.com/LearnBoost/expect.js) 等等
- **Mocha** 提供了 `before()`, `after()`, `beforeEach()`, 以及 `afterEach()` 四个钩子函数，方便我们在不同阶段设置不同的操作以更好的完成我们的测试

这里我介绍一下 `mocha` 的三种基本用法，以及 `describe` 的四个钩子函数（生命周期）

1. **describe(moduleName, function)：** `describe` 是可嵌套的，描述***测试用例***是否正确

   ```javascript
   describe('测试模块的描述', () => {
     // ....
   });
   ```

2. **it(info, function)：**一个 `it` 对应一个单元测试用例

   ```javascript
   it('单元测试用例的描述', () => {
     // ....
   })
   ```

3. 断言库的用法

   ```javascript
   expect(1 + 1).to.be.equal(2)
   ```

4. `describe` 的生命周期

   ```javascript
   describe('Test Hooks', function() {

     before(function() {
       // 在本区块的所有测试用例之前执行
     });

     after(function() {
       // 在本区块的所有测试用例之后执行
     });

     beforeEach(function() {
       // 在本区块的每个测试用例之前执行
     });

     afterEach(function() {
       // 在本区块的每个测试用例之后执行
     });

     // test cases
   });
   ```

想了解更多 `mocha` 操作的同学可以点击下面的链接进行查阅

1. [Mocha 官网](https://mochajs.org/)
2. [测试框架 Mocha 实例教程](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)

### 2、单元测试实战

上面一小节，我给大家简单介绍了一下 Vue 官方推荐的测试框架 `Karma` 和 `Mocha`，也希望大家看到这里的时候能够对单元测试及常见测试框架能有个简单的了解。

#### i. 对 hello 组件进行单元测试

在单元测试实战开始前，我们先看看 **Karma** 的配置，这里我们直接看 `vue-cli` 脚手架初始化出来的 `karma.conf.js` 文件里面的配置（具体用处我做了注释）

```javascript
var webpackConfig = require('../../build/webpack.test.conf')

module.exports = function karmaConfig (config) {
  config.set({
    // 浏览器
    browsers: ['PhantomJS'],
    // 测试框架
    frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'],
    // 测试报告
    reporters: ['spec', 'coverage'],
    // 测试入口文件
    files: ['./index.js'],
    // 预处理器 karma-webpack
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    // webpack配置
    webpack: webpackConfig,
    // webpack中间件
    webpackMiddleware: {
      noInfo: true
    },
    // 测试覆盖率报告
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  })
}
```

接下来，我们再来对我们自己的 `hello` 组件进行简单的测试（只写一个测试用例），在 `test/unit/specs` 新建 `hello.spec.js` 文件，并写入以下代码

```javascript
import Vue from 'vue' // 导入Vue用于生成Vue实例
import Hello from 'packages/hello' // 导入组件
// 测试脚本里面应该包括一个或多个describe块，称为测试套件（test suite）
describe('Hello.vue', () => {
  // 每个describe块应该包括一个或多个it块，称为测试用例（test case）
  it('render default classList in hello', () => {
    const Constructor = Vue.extend(Hello) // 获得Hello组件实例
    const vm = new Constructor().$mount() // 将组件挂在到DOM上
    // 断言：DOM中包含class为v-hello的元素
    expect(vm.$el.classList.contains('v-hello')).to.be.true
    const message = vm.$el.querySelector('.v-hello__message')
    // 断言：DOM中包含class为v-hello__message的元素
    expect(message.classList.contains('v-hello__message')).to.be.true
  })
})
```

测试实例写完，接下来就是进行测试了。执行 `npm run test`，走你 ~ ，输出结果

```shell
hello.vue
    ✓ render default classList in hello
```

#### ii. 优化单元测试

从上面 `hello` 组件的测试实例可以看出，我们需要将组件实例化为一个Vue实例，有时还需要挂载到 DOM 上

```javascript
const Constructor = Vue.extend(Hello)
const vm = new Constructor({
  propsData: {
    message: 'component'
  }
}).$mount()
```

如果之后每个组件拥有多个单元测试实例，那这种写法会导致我们最后的测试比较臃肿，这里我们可以参考 `element` 封装好的 [单元测试工具 util.js](https://github.com/ElemeFE/element/blob/dev/test/unit/util.js) 。我们需要封装 Vue 在单元测试中常用的一些方法，下面我将列出工具里面提供的一些方法

```javascript
/**
 * 回收 vm，一般在每个测试脚本测试完成后执行回收vm。
 * @param  {Object} vm
 */
exports.destroyVM = function (vm) {}

/**
 * 创建一个 Vue 的实例对象
 * @param  {Object|String}  Compo     - 组件配置，可直接传 template
 * @param  {Boolean=false}  mounted   - 是否添加到 DOM 上
 * @return {Object} vm
 */
exports.createVue = function (Compo, mounted = false) {}

/**
 * 创建一个测试组件实例
 * @param  {Object}  Compo          - 组件对象
 * @param  {Object}  propsData      - props 数据
 * @param  {Boolean=false} mounted  - 是否添加到 DOM 上
 * @return {Object} vm
 */
exports.createTest = function (Compo, propsData = {}, mounted = false) {}

/**
 * 触发一个事件
 * 注： 一般在触发事件后使用 vm.$nextTick 方法确定事件触发完成。
 * mouseenter, mouseleave, mouseover, keyup, change, click 等
 * @param  {Element} elm      - 元素
 * @param  {String} name      - 事件名称
 * @param  {*} opts           - 配置项
 */
exports.triggerEvent = function (elm, name, ...opts) {}

/**
 * 触发 “mouseup” 和 “mousedown” 事件，既触发点击事件。
 * @param {Element} elm     - 元素
 * @param {*} opts          - 配置选项
 */
exports.triggerClick = function (elm, ...opts) {}
```

下面我们将使用定义好的测试工具方法，改造 `hello` 组件的测试实例，将 `hello.spec.js` 文件进行改造

```javascript
import { destroyVM, createTest } from '../util'
import Hello from 'packages/hello'

describe('hello.vue', () => {
  let vm
  // 测试用例执行之后销毁实例
  afterEach(() => {
    destroyVM(vm)
  })
  it('render default classList in hello', () => {
    vm = createTest(Hello)
    expect(vm.$el.classList.contains('v-hello')).to.be.true
    const message = vm.$el.querySelector('.v-hello__message')
    expect(message.classList.contains('v-hello__message')).to.be.true
  })
})
```

重新执行 `npm run test`，输出结果

```shell
hello.vue
    ✓ render default classList in hello
```

#### iii. 更多单元测试的用法

上面我们介绍了单元测试的部分有关静态判定的用法，接下来我们将测试一些异步用例以及一些交互事件。在测试之前，我们需稍微改动一下我们的 `hello` 组件的代码，如下

```html
<template>
  <div class="v-hello" @click="handleClick">
    <p class="v-hello__message">hello {{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'v-hello',
  props: {
    message: String
  },
  methods: {
    handleClick () {
      return new Promise((resolve) => {
        resolve()
      }).then(() => {
        this.$emit('click', 'this is click emit')
      })
    }
  }
}
</script>
```

接下来我们要测试 `hello` 组件通过 Promise 是否能够成功将信息 `emit` 出去，测试案例如下

```javascript
it('create a hello for click with promise', (done) => {
  let result
  vm = createVue({
    template: `<v-hello @click="handleClick"></v-hello>`,
    methods: {
      handleClick (msg) {
        result = msg
      }
    }
  }, true)
  vm.$el.click()
  // 断言消息是异步emit出去的
  expect(result).to.not.exist
  setTimeout(_ => {
    expect(result).to.exist
    expect(result).to.equal('this is click emit')
    done()
  }, 20)
})
```

重新开始测试，执行`npm run test`，输出结果

```shell
hello.vue
    ✓ render default classList in hello
    ✓ create a hello for click with promise
```

至此，我们便学会了单元测试的配置以及一些常用的用法。如果需要了解更多有关单元测试的细节，请根据我前面提供的链接进入更深入的研究

## 七、文档官网开发(上)

小伙伴们跟着我将前面5个章节实战下来，已经将我们组件开发的基本架子给搭建好了。接下来我将带着大家一起把组件库中重要成分很高的文档官网给撸完。

大家应该都知道，好的开源项目肯定是有文档官网的，所以为了让我们的 UI 库也成为优秀中的一员的话，我们也应该撸一个自己文档官网。

一个好的文档官网，需要做到两点。

1. 将自己的开源项目的 API 梳理清楚，让使用者能够用的更舒心
2. 有示例 demo ，让使用者能在线就看到效果

由于本博文中，我带领大家开发的组件库是适配移动端的，那么如何让我们的文档官网既有 API 文档的描述，还有移动端示例的 Demo 呢。这就要求我们需要开发两套页面进行适配，对此我们需要的做的事有以下几点：

- PC 端展示组件 API 文档
- 移动端的展示组件 Demo
- 路由动态生成

在实战开始前，我们先看下本章节需要用到的目录结构

```shell
├── assets                  css，图片等资源都在这
├── dist                    打包好的文件都在这
├── docs                    PC端需要展示的markdown文件都在这
├── pages                   移动端所有的demo都在这
├── src              	      	
│   ├── components          demo中可以复用的模块放在这里面
│   ├── index.tpl           页面入口
│   ├── is-mobile.js        判断设备
│   ├── index.js            PC端主入口js
│   ├── App.vue             PC端入口文件
│   ├── mobile.js           移动端端主入口js
│   ├── MobileApp.vue       移动端入口文件
│   ├── nav.config.json     路由控制文件
│   ├── router.config.js    动态注册路由
```

本章节，主要带着大家实现 markdown 文件的转化，以及不同设备的路由适配。

思路捋清后，接下来继续我们的文档官网开发实战吧！

### 1、markdown 文件转化

从上面我给出的目录可以看到，在 docs 文件夹里面存放的都是 markdown 文件，每一个 markdown 文件都对应一个组件的 API 文档。我们是想要的结果是，转化 docs 里面的每一个 markdown 文件，使其变成一个个 Vue 组件，并将转化好的 Vue 组件注册到路由中，让其可以通过路由对每一个 markdown 文件进行访问。

对于 markdown 文件解析成 Vue 组件，市场上有很多三方 `webpack` 插件，当然如果你要是对 `webpack` 造诣比较深的话，你也可以尝试自己撸一个。这里我是直接使用的 `饿了么团队` 开发出来的 [vue-markdown-loader](https://github.com/QingWei-Li/vue-markdown-loader) 。

#### i. 使用 vue-markdown-loader

第一步，依赖安装

```shell
npm i vue-markdown-loader -D
```

第二步，在 `webpack.base.conf.js` 文件中使用 `vue-markdown-loader`

```javascript
{
  test: /\.md$/,
  loader: 'vue-markdown-loader',
  options: {
    // 阻止提取脚本和样式标签
    preventExtract: true
  }
}
```

第三步，try 一 try。先在 `docs` 里面添加 `hello.md` 文件，然后写入 `hello` 组件的使用说明

```markdown
## Hello
**Hello 组件，Hello 组件，Hello 组件，Hello 组件**
### 基本用法
​```html
<template>
  <div class="hello-page">
    <v-hello message="my component library" @click="handleClick"></v-hello>
    <p>{{ msg }}</p>
  </div>
</template>
<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    handleClick (msg) {
      this.msg = msg
    }
  }
}
</script>
​```
### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| message  | 文本信息    | string   | — | — |
### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| click  | 点击操作    | — |
```

第四步，将 `hello.md` 注册到路由中

```javascript
route.push({
  path: '/component/hello',
  component: require('../docs/hello.md')
})
```

最后，访问页面。这个时候可以发现 `hello.md` 的内容已经被转成 Vue 组件，并且能够通过路由加载的方式进行访问，但是页面却很丑很丑 ~ 就像这样

![markdown](https://static.oschina.net/uploads/img/201803/17175346_d5xt.png "markdown")

#### ii. 为 md 加上高亮主题和样式

当然，出现这种情况不用我说明，大家可能也知道了。对的，解析出来的 markdown 文件这么丑，只是因为我们既没有给我们的 markdown 文件加上高亮主题，也没有设置好文档页面的基本样式而已。所以，接下来，我们需要给我们的 markdown 文件加上漂亮的高亮主题和简洁的基本样式。

对于主题，这里我们将使用 [`highlight.js`](https://github.com/isagalaev/highlight.js) 里面的 [atom-one-dark](https://github.com/isagalaev/highlight.js/blob/master/src/styles/atom-one-dark.css) 主题。

第一步，安装 `highlight.js`

```shell
npm i highlight -D
```

第二步，在 `examples/src/App.vue` 引入主题，并且为了设置文档的基本样式，我们还需要修改 App.vue 的布局

```html
<template>
  <div class="app">
    <div class="main-content">
      <div class="page-container clearfix">
        <div class="page-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'highlight.js/styles/atom-one-dark.css'
export default {
  name: 'App'
}
</script>
```

第三步，设置文档的基本样式。在 `assets` 中新建 `docs.css`，写入初始样式，由于代码量偏多，就不往这里贴了。大家可自行 copy [docs.css](https://github.com/xuqiang521/personal-component-library/blob/master/examples/assets/docs.css) 里面的代码到本地的 `docs.css` 文件中，然后在 `examples/src/index.js` 中进行引入

```javascript
import '../assets/docs.css'
```

最后，改造 markdown 解析规则，`vue-markdown-loader` 提供了一个 `preprocess` 接口给我们自由操作，接下来，我们对解析好的 markdown 文件的结构进行定义吧，在 `webpack.base.conf.js` 文件中写入

```javascript
// 定义辅助函数wrap，将<code>标签都加上名为'hljs'的class
function wrap (render) {
  return function() {
    return render.apply(this, arguments)
      .replace('<code v-pre class="', '<code class="hljs ')
      .replace('<code>', '<code class="hljs">')
  }
}
// ...
{
  test: /\.md$/,
  loader: 'vue-markdown-loader',
  options: {
    preventExtract: true,
    preprocess: function(MarkdownIt, source) {
      // 为table标签加上名为'table'的class
      MarkdownIt.renderer.rules.table_open = function() {
        return '<table class="table">'
      };
      MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence);
      return source;
    }
  }
}
```

然后，重新访问 [localhost:8080/#/component/hello]() 

![markdown](https://static.oschina.net/uploads/img/201803/17175428_QlRI.png "markdown 高亮预览")

OK，我们的 md 文件已经成功解析成 Vue 组件，并有了漂亮的高亮主题和简洁的基本样式了 ~

### 2、不同设备环境下路由的适配

前面我有说过，本文带领大家开发的组件库是适配移动端的，所以我们需要做到 PC 端展示文档，移动端展示 Demo。

在这一小节，我会带着大家进行不同端路由的适配。当然，这个东西不难，主要是利用 webpack 构建多页面的特性，那么具体怎么做呢？好了，不多扯，咱们直接开始吧

#### i. 入口文件注册

第一步，注册 js 入口文件，在 `webpack.base.conf.js` 文件中写入

```javascript
entry: {
  // ...
  'vui': './examples/src/index.js',  // PC端入口js
  'vui-mobile': './examples/src/mobile.js'  // 移动端入口js
}
```

第二步，注册页面入口，在 `webpack.base.conf.js` 文件中写入

```javascript
plugins: [
  // ...
  // PC端页面入口
  new HtmlWebpackPlugin({
    chunks: ['manifest', 'vendor', 'vui'],
    template: 'examples/src/index.tpl',
    filename: 'index.html',
    inject: true
  }),
  // 移动端页面入口
  new HtmlWebpackPlugin({
    chunks: ['manifest', 'vendor', 'vui-mobile'],
    template: 'examples/src/index.tpl',
    filename: 'mobile.html',
    inject: true
  })
]
```

#### ii. 设备环境判定

入口文件注册完成，接下来我们需要做的是对设备环境进行判定。这里，我将使用 `navigator.userAgent` 配合正则表达式的方式判断我们组件库运行的环境到底是属于 PC 端还是移动端？

第一步，在`examples/src/is-mobile.js` 文件中写入以下代码

```javascript
/* eslint-disable */
const isMobile = (function () {
  var platform = navigator.userAgent.toLowerCase()
  return (/(android|bb\d+|meego).+mobile|kdtunion|weibo|m2oapp|micromessenger|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i).test(platform) ||
  (/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i).test(platform.substr(0, 4));
})()
// 返回设备所处环境是否为移动端，值为boolean类型
export default isMobile
```

第二步，在 PC 端 js 入口文件 `examples/src/index.js` 中写入以下判定规则 

```javascript
import isMobile from './is-mobile'
// 是否为生产环境
const isProduction = process.env.NODE_ENV === 'production'
router.beforeEach((route, redirect, next) => {
  if (route.path !== '/') {
    window.scrollTo(0, 0)
  }
  // 获取不同环境下，移动端Demo对应的地址
  const pathname = isProduction ? '/vui/mobile' : '/mobile.html'
  // 如果设备环境为移动端，则直接加载移动端Demo的地址
  if (isMobile) {
    window.location.replace(pathname)
    return
  }
  document.title = route.meta.title || document.title
  next()
})
```

第三步，在移动端 js 入口文件`examples/src/mobile.js` 中写入与上一步类似的判定规则

```javascript
import isMobile from './is-mobile'
const isProduction = process.env.NODE_ENV === 'production'
router.beforeEach((route, redirect, next) => {
  if (route.path !== '/') {
    window.scrollTo(0, 0)
  }
  // 获取不同环境下，PC端对应的地址
  const pathname = isProduction ? '/vui/mobile' : '/mobile.html'
  // 如果设备环境不是移动端，则直接加载PC端的地址
  if (!isMobile) {
    window.location.replace(pathname)
    return
  }
  document.title = route.meta.title || document.title
  next()
})
```

最后，完善 `examples/src/mobile.js` 文件，和移动端页面入口 `MobileApp.vue` 文件

在 `examples/src/mobile.js` 中写入以下代码

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import MobileApp from './MobileApp'
import Vui from 'src/index'
import isMobile from './is-mobile.js'
import Hello from '../pages/hello.vue'

import 'packages/vui-css/src/index.css'

Vue.use(Vui)
Vue.use(VueRouter)

const isProduction = process.env.NODE_ENV === 'production'
const router = new VueRouter({
  base: isProduction ? '/vui/' : __dirname,
  routes: [{
    path: '/component/hello',
    component: Hello
  }]
})
router.beforeEach((route, redirect, next) => {
  if (route.path !== '/') {
    window.scrollTo(0, 0)
  }
  const pathname = isProduction ? '/vui/' : '/'
  if (!isMobile) {
    window.location.replace(pathname)
    return
  }
  document.title = route.meta.title || document.title
  next()
})

new Vue({
  el: '#app-container',
  router,
  components: { MobileApp },
  template: '<MobileApp/>'
})

```

在  `MobileApp.vue` 中写入

```html
<template>
  <div class="mobile-container">
      <router-view></router-view>
  </div>
</template>
```

接下来，你可以去浏览器中试试效果了，看看不同的设备环境是否能展示对应的内容 ~


到这里，我们本章制定好的计划便已经全部完成。md 文件的"完美"转化，以及不同设备环境下路由的适配。文档官网的开发（上）到这里就要告一段落了，下一章节，我们将继续完成文档官网剩余的开发工作！

## 八、文档官网开发(下)

上一章节，我们已经完成了：

1. markdown 文件的转化，并为其加上了漂亮的高亮主题和样式
2. 文档官网在不同的设备环境下的适配

这一章节，我们将完善文档官网的细节，开发出一个完整的文档官网。

### 1、路由管理

从上一章给出的目录我们可以知道，docs 目录是用来存放 PC 需要展示的 md 文件的，pages 目录是用来存放移动端 Demo 文件的。那么如何让组件在不同的设备环境下展示其对应的文件呢（PC 端展示组件对应的 md 文件，移动端展示组件对应 vue 文件）？这种情况又该如何合理的管理好我们组件库的路由呢？接下来，我们就着这些问题继续下面的开发。这里肯定会用到 `is-mobile.js` 去进行设备环境的判定，具体工作大家跟着我慢慢来做

第一步，在 `examples/src` 下新建文件 `nav.config.json` 文件，写入以下内容

```javascript
{
  // 为了之后组件文档多语言化
  "zh-CN": [
    {
      "name": "Vui 组件",
      "showInMobile": true,
      "groups": [
        {
		      // 管理相同类型下的所有组件
          "groupName": "基础组件",
		      "list": [
		        {
			        // 访问组件的相对路径
              "path": "/hello",
              // 组件描述
              "title": "Hello"
            }
          ]
        }
      ]
    }
  ]
}
```

第二步，改善 `router.config.js` 文件，将其改成一个路由注册的辅助函数

```javascript
const registerRoute = (navConfig, isMobile) => {
  let route = []
  // 目前只有中文版的文档
  let navs = navConfig['zh-CN']
  // 遍历路由文件，逐一进行路由注册
  navs.forEach(nav => {
    if (isMobile && !nav.showInMobile) {
      return
    }

    if (nav.groups) {
      nav.groups.forEach(group => {
        group.list.forEach(nav => {
          addRoute(nav)
        })
      })
    } else if (nav.children) {
      nav.children.forEach(nav => {
        addRoute(nav)
      })
    } else {
      addRoute(nav)
    }
  })
  // 进行路由注册
  function addRoute (page) {
    // 不同的设备环境引入对应的路由文件
    const component = isMobile
      ? require(`../pages${page.path}.vue`)
      : require(`../docs${page.path}.md`)
    route.push({
      path: '/component' + page.path,
      component: component.default || component
    })
  }

  return route
}

export default registerRoute
```

第三步，在 PC 端主入口 js 文件 `examples/src/index.js` 和移动端主入口 js 文件 `examples/src/mobile.js`  里面注册路由，都写入以下代码

```javascript
import registerRoute from './router.config'
import navConfig from './nav.config'

const routesConfig = registerRoute(navConfig)
const router = new VueRouter({
  routes: routesConfig
})
```

然后再访问一下我们现在的组件库文档官网

### 2、PC 端 API 展示

从上一章节的最终效果图我们可以看出来，PC端分为三个部分，分别为：

1. 头部，组件库的简单描述，以及项目 github 的链接
2. 左侧栏，组件路由及标题展示
3. 右侧栏，组件 API 文档展示

接下来，让我们开始来完成PC 端 API 的展示吧

#### i. 头部

头部相对简单点，我们只需要在 `examples/src/components` 下新建 `page-header.vue` 文件，写入以下内容

```html
<template>
  <div class="page-header">
    <div class="page-header__top">
      <h1 class="page-header__logo">
        <a href="#">Vui.js</a>
      </h1>
      <ul class="page-header__navs">
        <li class="page-header__item">
          <a href="/" class="page-header__link">组件</a>
        </li>
        <li class="page-header__item">
          <a href="https://github.com/Brickies/vui" class="page-header__github" target="_blank"></a>
        </li>
        <li class="page-header__item">
          <span class="page-header__link"></span>
        </li>
      </ul>
    </div>
  </div>
</template>
```

具体样式，请直接访问 [page-header.vue](https://github.com/xuqiang521/personal-component-library/blob/master/examples/src/components/page-header.vue) 进行查看

#### ii. 左侧栏

左侧栏，是我们展示组件路由和标题的地方。其实就是对 `examples/src/nav.config.json` 进行解析并展示。

我们在 `examples/src/components` 下新建 `side-nav.vue` 文件，文件正常结构如下

```html
<li class="nav-item">
  <a href="javascript:void(0)">Vui 组件</a>
  <div class="nav-group">
    <div class="nav-group__title">基础组件</div>
    <ul class="pure-menu-list">
      <li class="nav-item">
        <router-link
           active-class="active"
           :to="/component/hello"
           v-text="navItem.title">Hello
        </router-link>
      </li>
    </ul>
  </div>
</li>

```

但我们现在要基于目前的结构对 `examples/src/nav.config.json` 进行解析，完善后的代码如下

```html
<li class="nav-item" v-for="item in data">
  <a href="javascript:void(0)" @click="handleTitleClick(item)">{{ item.name }}</a>
  <template v-if="item.groups">
    <div class="nav-group" v-for="group in item.groups">
      <div class="nav-group__title">{{ group.groupName }}</div>
      <ul class="pure-menu-list">
        <template v-for="navItem in group.list">
          <li class="nav-item" v-if="!navItem.disabled">
            <router-link
              active-class="active"
              :to="base + navItem.path"
              v-text="navItem.title" />
          </li>
        </template>
      </ul>
    </div>
  </template>
</li>
```

完整代码点这里 [side-nav.vue](https://github.com/xuqiang521/personal-component-library/blob/master/examples/src/components/side-nav.vue) 

#### iii. App.vue

我们把我们写好的 `page-header.vue` 和 `side-nav.vue` 两个文件在 `App.vue` 中使用

```html
<template>
  <div class="app">
    <page-header></page-header>
    <div class="main-content">
      <div class="page-container clearfix">
        <side-nav :data="navConfig['zh-CN']" base="/component"></side-nav>
        <div class="page-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'highlight.js/styles/atom-one-dark.css'
import navConfig from './nav.config.json'
import PageHeader from './components/page-header'
import SideNav from './components/side-nav'

export default {
  name: 'App',
  components: { PageHeader, SideNav },
  data () {
    return {
      navConfig: navConfig
    }
  }
}
</script>

```

然后，再次访问页面，结果如图

![api-7](https://static.oschina.net/uploads/img/201803/17175725_eczj.png "页面预览")

### 3、移动端 Demo

移动端 Demo 和 PC 端原理差不多，都得解析 `nav.config.json` 文件从而进行展示

#### i. 移动端首页组件

目前我们移动端除了主入口页面 `MobileApp.vue` 以外，是没有根目录组件依赖的，接下来我们将先完成根目录组件的开发，在 `examples/src/components` 下新建 `demo-list.vue` 文件，写入一些内容

```html
<template>
  <div class="side-nav">
    <h1 class="vui-title"></h1>
    <h2 class="vui-desc">VUI 移动组件库</h2>
  </div>
</template>
```

然后我们需要在路由中对其进行引用，在 `mobile.js` 文件中写入

```javascript
import DemoList from './components/demo-list.vue'
routesConfig.push({
  path: '/',
  component: DemoList
})
```

然后开始完善 `demo-list.vue` 文件

```html
<template>
  <div class="side-nav">
    <h1 class="vui-title"></h1>
    <h2 class="vui-desc">VUI 移动组件库</h2>
    <div class="mobile-navs">
      <div v-for="(item, index) in data" :key="index">
        <div class="mobile-nav-item" v-if="item.showInMobile">
          <mobile-nav v-for="(group, s) in item.groups" :group="group" :base="base" :key="s"></mobile-nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navConfig from '../nav.config.json';
import MobileNav from './mobile-nav';

export default {
  data() {
    return {
      data: navConfig['zh-CN'],
      base: '/component'
    };
  },

  components: {
    MobileNav
  }
};
</script>

<style lang="postcss">
.side-nav {
  width: 100%;
  box-sizing: border-box;
  padding: 90px 15px 20px;
  position: relative;
  z-index: 1;

  .vui-title,
  .vui-desc {
    text-align: center;
    font-weight: normal;
    user-select: none;
  }

  .vui-title {
    padding-top: 40px;
    height: 0;
    overflow: hidden;
    background: url(https://raw.githubusercontent.com/xuqiang521/vui/master/src/assets/logo.png) center center no-repeat;
    background-size: 40px 40px;
    margin-bottom: 10px;
  }

  .vui-desc {
    font-size: 14px;
    color: #666;
    margin-bottom: 50px;
  }
}
</style>
```

这里我们引用了 `mobile-nav.vue` 文件，这也是我们接下来要完成的移动端 Demo 列表展示组件

#### ii. nav 列表

在 `examples/src/components` 下新建 `mobile-nav.vue` 文件，解析 `nav.config.json` 文件，从而进行 Demo 列表展示。

```html
<template>
  <div class="mobile-nav-group">
    <div
      class="mobile-nav-group__title mobile-nav-group__basetitle"
      :class="{
        'mobile-nav-group__title--open': isOpen
      }"
      @click="isOpen = !isOpen">
      {{group.groupName}}
    </div>
    <div class="mobile-nav-group__list-wrapper" :class="{ 'mobile-nav-group__list-wrapper--open': isOpen }">
      <ul class="mobile-nav-group__list" :class="{ 'mobile-nav-group__list--open': isOpen }">
        <template v-for="navItem in group.list">
          <li
            class="mobile-nav-group__title"
            v-if="!navItem.disabled">
            <router-link
              active-class="active"
              :to="base + navItem.path">
              <p>
                {{ navItem.title }}
              </p>
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    group: {
      type: Object,
      default: () => {
        return [];
      }
    },
    base: String
  },
  data() {
    return {
      isOpen: false
    };
  }
};
</script>
```

然后写入列表样式

```html
<style lang="postcss">
@component-namespace mobile {
  @b nav-group {
    border-radius: 2px;
    margin-bottom: 15px;
    background-color: #fff;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);

    @e basetitle {
      padding-left: 20px;
    }

    @e title {
      font-size: 16px;
      color: #333;
      line-height: 56px;
      position: relative;
      user-select: none;

      @m open {
        color: #38f;
      }

      a {
        color: #333;
        display: block;
        user-select: none;
        padding-left: 20px;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

        &:active {
          background: #ECECEC;
        }

        > p {
          border-top: 1px solid #e5e5e5;
        }
      }
    }

    @e list-wrapper {
      height: 0;
      overflow: hidden;

      @m open {
        height: auto;
      }
    }

    @e list {
      transform: translateY(-50%);
      transition: transform .2s ease-out;

      @m open {
        transform: translateY(0);
      }
    }

    li {
      list-style: none;
    }

    ul {
      padding: 0;
      margin: 0;
      overflow: hidden;
    }
  }
}
</style>
```

接下来，重新访问 [http://localhost:8080/mobile.html]() ，不出意外你便能访问到我们预想的结果

![](https://static.oschina.net/uploads/img/201803/17175900_USIp.png)

到这一步为止，我们“粗陋”的组件库架子便已经全部搭建完毕。

博文到这里也差不多要结束了，文章中所有的代码都已经托管到了 `github` 上，后续我还会写一篇文章，带着搭建逐步完善我们组件库中的一些细节，让我们的组件库能够更加的完美。

github地址：[https://github.com/xuqiang521/personal-component-library](https://github.com/xuqiang521/personal-component-library)

文章末尾再打一波广告 ~~~

前端交流群：731175396

美团点评长期招人，如果有兴趣的话，欢迎一起搞基，简历投递方式交流群中有说明 ~

小伙伴们你们还在等什么呢？赶紧先给文章点波赞，然后关注我一波，然后加群和大佬们一起交流啊 ~~~

![](https://static.oschina.net/uploads/img/201803/17175953_IgkF.jpg "大佬们快到碗里来")