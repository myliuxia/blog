module.exports = {
  title: '个人的博客',
  description: '刘夏的个人博客',
  serviceWorker: true, // 是否开启 PWA 
  base: '/', // 这是部署到github相关的配置
 
  theme: require.resolve('../../vuepress-theme-lx'), // 使用依赖包主题
  themeConfig: {
    nav: [
      {text: '首页', link: '/'},
      {text: '分类', link: '/categories/'},
      {text: '标签', link: '/tags/'},
      {text: '关于', link: '/about/'},
      {text: '归档', link: '/archives/'}
    ],
    bodyBgImg: [
      'https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175828.jpeg',
      'https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175845.jpeg',
      'https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175846.jpeg'
    ], // body背景大图，默认无。 单张图片 String || 多张图片 Array, 多张图片时每隔15秒换一张。
    sidebar: 'structuring', // 侧边栏
    sidebarOpen: false, // 初始状态是否打开侧边栏，默认true
    author: { // 文章默认的作者信息，可在md文件中单独配置此信息 String | {name: String, href: String}
      name: 'Sum Liu', // 必需
      href: 'https://github.com/myliuxia' // 可选的
    },
    social:{ // 社交图标，显示于博主信息栏和页脚栏
      // iconfontCssFile: '//at.alicdn.com/t/font_1678482_u4nrnp8xp6g.css', // 可选，阿里图标库在线css文件地址，对于主题没有的图标可自由添加
      icons: [
        {
          iconClass: 'icon-youjian',
          title: '发邮件',
          link: 'mailto:1285370080@qq.com'
        },
        {
          iconClass: 'icon-github',
          title: 'GitHub',
          link: 'https://github.com/myliuxia'
        },
      ]
    },
    footer:{ // 页脚信息
      createYear: 2021, // 博客创建年份
      copyrightInfo: 'Sum Liu | MIT License', // 博客版权信息，支持a标签
    },
    
  plugins: [ // 插件
    ['one-click-copy', { // 代码块复制按钮
      copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // String or Array
      copyMessage: '复制成功', // default is 'Copy successfully and then paste it for use.'
      duration: 1000, // prompt message display time.
      showInMobile: false // whether to display on the mobile side, default: false.
    }],
  ]
    
  }
}