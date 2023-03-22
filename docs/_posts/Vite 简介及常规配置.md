---
title: Vite 简介及常规配置
date: 2023-03-20 09:38:21
permalink: /pages/74fe4b/
sidebar: auto
categories:
  - 技术
tags:
  - vite
---

> Vite作为一款构建工具，大家都知道它很快，那它为什么很快，相比于webpack有哪些不同？今天咱们就一起来了解下Vite
<!-- more -->

# Vite 简介
## 什么是构建工具
大家都知道浏览器只支持 Html、CSS、JavaScript，但一个企业级项目可能会用到各种各样的前端技术，如 Less、Sass、TS、Vue组件、语法降级、体积优化等，这时候我们就需要相应的工具去处理这些内容：

- 使用 less-loader / sass-loader 处理 less / sass
- 使用 babel 将 es 的新语法转换为旧版浏览器认识的语法
- 使用 uglifyjs 将我们的代码压缩成体积更小的文件
- 使用 vue-complier 将 vue 组件模板转换为 render 函数

我们可以手动把代码挨个处理一遍，但这样效率非常低，当我们稍微修改一点代码，这个流程又要重新走一遍，非常麻烦。有个神奇的东西，可以把以上工具集成到一起，整个流程交给它自动处理。而且当代码发生变化时，自动帮我们重新走一遍，这个东西就叫做构建工具。当然构建工具做的事情远不止于此，比如：

- 模块化开发支持：支持直接从 node_modules 里引入代码
- 提高项目性能：压缩文件、代码分割
- 优化开发体验：热更新、跨域问题
  
等等 

构建工具减轻了我们的心智负担，让我们不用关心我们写的代码如何在浏览器运行，只需要关心代码怎么写就可以了。市面上主流的构建工具有 Webpack、Vite、gulp、esbuild、Rollup、Parcel 等等。

## Vite 与 Webpack 启动过程
当项目体积越来越庞大时，构建工具需要处理的代码量呈指数级增长，包含数千个模块的项目也是相当普遍。类似 Webpack 的构建工具就会遇到性能瓶颈：通常需要很长时间，甚至几分钟项目才能启动起来。热更新（HMR）也可能需几秒，甚至十几秒。

__Webpack 先递归分析各模块依赖关系-构建依赖图谱，然后进行打包，再启动本地服务器。__ 而且 Webpack 支持多种模块化规范，比如 CommonJS 、ES-Module ，一开始就要统一模块化代码，将所有的依赖全部处理一遍。

整个流程如下图:

![webpack打包过程](/image/webpack-dev.png)

那么 Vite 为什么能解决这个问题呢？

+ 底层语言。Vite 使用 esbuild 预构建依赖。esbuild 使用 Go 编写，比用 JS 编写的打包器预构建依赖快 10-100 倍。
+ 先启动服务器，再按需请求模块并编译。Vite 利用的是现代浏览器本身支持 ES-Module 这个特性，直接向依赖的模块发出请求。Vite 启动时不需要分析模块之间的依赖关系，也不用打包，项目越大，优势越明显。
  

 Vite 的启动过程如下图:
![Vite启动过程](/image/vite-esm.png)

这样大家应该看得出来 Vite 为什么快了吧！


# Vite 常见配置项
## resolve.alias
  定义路径别名也是我们常用的一个功能，我们通常会给 src 定义一个路径别名：
  
  ```javascript
  // vite.config.js
  import { defineConfig } from 'vite'
  import path from 'path'

  export default defineConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src') // 路径别名
      }
    }
  })
  ```
  也可以使用插件，自动给src和src下所有的文件夹定义路径别名：
  ```javascript
  // vite.config.js
  import { defineConfig } from 'vite'
  import { ViteAliases } from './node_modules/vite-aliases' // 通过名称引入会报错，可能是插件问题

  export default defineConfig({
    plugins: [
      ViteAliases()
    ]
  })
  ```
相应的路劲别名如下：
```rust
src -> @
assets -> @assets
components -> @components
router -> @router
stores -> @stores
views -> @views
```

## resolve.extensions

导入时想要省略的扩展名列表。默认值为 ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'] 。
```javascript
// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    extensions: ['.js', '.ts', '.json'] // 导入时想要省略的扩展名列表
  }
})
```
注意：不建议忽略自定义导入类型的扩展名（例如：.vue），因为它会影响 IDE 和类型支持。

## css.preprocessorOptions
传递给 CSS 预处理器的配置选项，这些配置会传递到预处理器的执行参数中去。例如，在 scss 中定义一个全局变量：
```javascript
// vite.config.js
import { defineConfig } from 'vite' // 使用 defineConfig 工具函数获取类型提示：

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `$primaryColor: #007edc;` // 全局变量
      }
    }
  }
})

```
我们也可以定义一个全局变量文件，然后再引入这个文件：
```scss
// src/assets/styles/variables.scss
$primaryColor: orange;
$baseFontSize: 16px;
```
```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '/src/assets/styles/variables.scss';` // 引入全局变量文件
      }
    }
  }
})
```
这样在 .scss 文件或 .vue 文件中就可以使用这些变量了。

## css.postcss
PostCSS 也是用来处理 CSS 的，只不过它更像是一个工具箱，可以添加各种插件来处理 CSS 。像浏览器样式兼容问题、浏览器适配等，都可以通过 PostCSS 来解决。

Vite 对 PostCSS 有良好的支持，我们只需要安装相应的插件就可以了。如移动端使用 postcss-px-to-viewport 对不同设备进行布局适配：

```javascript
import { defineConfig } from 'vite'
import postcssPxToViewport from 'postcss-px-to-viewport'

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        // viewport 布局适配
        postcssPxToViewport({
          viewportWidth: 375 // UI设计稿的宽度
        })
      ]
    }
  }
})
```
这样我们书写的 px 单位就会转为 vw 或 vh ，很轻松地解决了适配问题。

## optimizeDeps.force
是否开启强制依赖预构建。node_modules 中的依赖模块构建过一次就会缓存在 node_modules/.vite/deps 文件夹下，下一次会直接使用缓存的文件。而有时候我们想要修改依赖模块的代码，做一些测试或者打个补丁，这时候就要用到强制依赖预构建。
```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    force: true // 强制进行依赖预构建
  },
})
```
除了这个方法，我们还可以通过删除 .vite 文件夹或运行 npx vite --force 来强制进行依赖预构建。

## server
- host，指定开发服务器监听的某个IP地址，如果是设置为​​0.0.0.0​​或者true，那就是默认监听所有的地址。
- port，开发服务器端口号
- strictPort，设置为true的时候，遇到端口号被占用了，就会直接退出，
- https，是否开启HTTPS
- open，自动在浏览器中开启应用程序
- proxy，请求路径的代理，通常我们使用它来处理跨域
配置如下：
```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 80,
    host: true,
    open: true,
    proxy: {
      '/dev-api': {
        target: 'http://10.200.12.253:8080',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/dev-api/, '')
      } 
      // 正则表达式写法：http://localhost:8080/fallback/ -> http://jsonplaceholder.typicode.com/
      '^/fallback/.*': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, ''),
      },
      // 代理 websockets 或 socket.io 写法：ws://localhost:8080/socket.io -> ws://localhost:5174/socket.io
      '/socket.io': {
        target: 'ws://localhost:5174',
        ws: true,
      },
    }
  }
})
```

## base
开发或生产环境服务的公共基础路径。可以是以下几种值：
- 绝对 URL 路径，例如 /dev/
- 完整的 URL，例如 https://dev.com/
- 空字符串或 ./（用于嵌入形式的开发）

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/dev/' // 开发或生产环境服务的公共基础路径
})
```

## build.outdir
指定打包文件的输出目录。默认值为 dist ，当 dist 被占用或公司有统一命名规范时，可进行调整。
```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'build' // 打包文件的输出目录
  }
})

```

## build.assetsDir
指定生成静态资源的存放目录。默认值为 assets ，可根据需要进行调整。
```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    assetsDir: 'static' // 静态资源的存放目录
  }
})

```

## build.assetsInlineLimit
图片转 base64 编码的阈值。为防止过多的 http 请求，Vite 会将小于此阈值的图片转为 base64 格式，可根据实际需求进行调整。

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    assetsInlineLimit: 4096 // 图片转 base64 编码的阈值
  }
})

```

## plugins
插件相信大家都不陌生了。我们可以使用官方插件，也可以社区插件。如使用 @vitejs/plugin-vue 提供 Vue3 单文件组件的支持。
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue()
  ]
})

```

更多社区插件，大家可以查看 awesome-vite 。