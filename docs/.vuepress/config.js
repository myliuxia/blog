module.exports = {
  title: '个人的博客',
  description: '刘夏的个人博客',
  serviceWorker: true, // 是否开启 PWA 
  base: '/', // 这是部署到github相关的配置
  markdown: {
      lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      {
        text: 'WEB前端', items: [
          { text: 'HTML', link: '/web/html/' },
          { text: 'CSS', link: '/web/css/' },
          { text: 'JavaScript', link: '/web/javascript/' },
          { text: 'TypeScript', link: '/web/typescript/' },
          { text: 'Vue', link: '/web/vue/' }
        ]
      },
      {
        text: '前端工程化', items: [
          { text: 'Git', link: '/project/git/' },
          { text: 'Scss', link: '/project/scss/' },
          { text: 'WebPack', link: '/project/webpack/' }, 
        ]
      },
      { 
        text: '服务端', items: [
          { text: 'Java', link: '/server/java/' },
          { text: 'MongoDB', link: '/server/mongodb/' },
          { text: 'Nginx', link: '/server/nginx/' }, 
        ] 
      },
      { text: 'Github', link: 'https://github.com/myliuxia' }
    ],
    sidebar: {
      '/web/javascript/':[
        '/web/javascript/StringEvent.md',
        '/web/javascript/ArrayEvent.md',
        '/web/javascript/Currying.md',
        '/web/javascript/DebounceThrottle.md',
        '/web/javascript/DesignPatterns.md',
      ],
      '/server/nginx/':[
        '/server/nginx/install.md',
      ]
    },
    sidebarDepth: 1, // 侧边栏显示2级
    
  }
}