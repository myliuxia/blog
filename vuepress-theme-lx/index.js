const path = require('path')
const setFrontmatter = require('./node_utils/setFrontmatter')
module.exports = (options, {sourceDir,themeConfig}) => {
  
  // 自动设置front matter
  setFrontmatter(sourceDir, themeConfig)

  /**
   * Default theme configuration
   */
  themeConfig = Object.assign(themeConfig, {
    searchPlaceholder: themeConfig.searchPlaceholder || 'Search',
    nav: themeConfig.nav || [
      { text: '首页', link: '/' }
    ],
    wordPerminute: themeConfig.wordPerminute || {cn: 300, en: 160},
    social: themeConfig.social || [],
    reward: themeConfig.reward || {},
    dateFormat: themeConfig.dateFormat || 'YYYY-MM-DD',
  })

  const plugins = [
    ['@vuepress/nprogress'],
    ['@vuepress/search'],
    ['flowchart'],
    ['vuepress-plugin-container', {
      type: 'tip',
      defaultTitle: {
        '/': 'TIP',
        '/zh/': '提示'
      }
    }],
    ['vuepress-plugin-container', {
      type: 'warning',
      defaultTitle: {
        '/': 'WARNING',
        '/zh/': '注意'
      }
    }],
    ['vuepress-plugin-container', {
      type: 'danger',
      defaultTitle: {
        '/': 'WARNING',
        '/zh/': '警告'
      }
    }],
    ['vuepress-plugin-container', {
      type: 'details',
      before: info => `<details class="custom-block details">${info ? `<summary>${info}</summary>` : ''}\n`,
      after: () => '</details>\n'
    }],
    ['vuepress-plugin-container', {
      type: 'demo',
      before: () => `<DemoCode>\n`,
      after: () => '</DemoCode>\n'
    }],
    ['@vuepress/medium-zoom', {
      selector: '.article-content img',
      options: {
        margin: 16,
        background: "#FF0000",
      }
    }],
    ['@vuepress/blog', themeConfig.blog || {
      directories: [
        {
          id: 'post',
          dirname: '_posts',
          path: '/',
          frontmatter: { title: '首页',home:true },
          pagination: {
            lengthPerPage: 10,
            prevText: '',
            nextText: ''
          }
        }
      ],
      frontmatters: [
        {
          id: "tag",
          keys: ['tag', 'tags'],
          path: '/tags/',
          title: '标签',
          frontmatter: { title: '标签',tagsPage: true },
        },
        {
          id: "category",
          keys: ['category', 'categories'],
          path: '/categories/',
          title: '分类',
          frontmatter: { title: '分类',categoriesPage: true },
        },
        {
          id: "archives",
          keys: ['archive', 'archives'],
          path: '/archives/',
          frontmatter: { title: 'Archive' },
        }
      ]
    }],
    [
      'vuepress-plugin-seo', themeConfig.seo || false
    ],
    ['@vuepress/pwa', themeConfig.pwa || false],
    ['one-click-copy', themeConfig.copy || false],
    require('./plugin/demo-code'),
    require('./plugin/theme-utils'),
    require('./plugin/float-menu')
  ];
  if(themeConfig.palette) {
    plugins.push(require('./plugin/theme-palette'));
  }
  const config = {
    plugins,
    alias: {
      assets: path.resolve(__dirname, 'assets'),
    }
  }

  return config
}