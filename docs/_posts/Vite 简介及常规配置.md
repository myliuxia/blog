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

> 总结vite的一些常用的配置。
<!-- more -->


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

## server.host
指定服务器监听哪个 IP 地址。默认值为 localhost ，只会监听本地的 127.0.0.1 。当我们开发移动端项目时，需要在手机浏览器上访问当前项目。这时候可以将 host 设置为  true 或 0.0.0.0 ，这样服务器就会监听所有地址，包括局域网和公网地址。

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true // 监听所有地址
  }
})
```

## server.proxy
反向代理也是我们经常会用到的一个功能，通常我们使用它来进行跨域：
```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/dev-api': {
        target: 'http://10.200.12.253:8080',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/dev-api/, '')
      }
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