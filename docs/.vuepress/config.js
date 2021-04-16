module.exports = {
  title: '刘夏的博客',
    description: '刘夏的个人博客',
    serviceWorker: true, // 是否开启 PWA 
    base: '/', // 这是部署到github相关的配置
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    themeConfig: {
      nav: require('./nav'),
      sidebar: 'auto',
     
  }
}