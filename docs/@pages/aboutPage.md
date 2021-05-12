---
title: 关于
date: 2021-04-23 14:27:01
permalink: /about
sidebar: false
article: false
---

### 🐼Me
从事Web前端开发工作，喜欢唱、跳、rap、篮球，写程序。 本人↓↓↓


[更新日志](https://github.com/xugaoyi/vuepress-theme-vdoing/commits/master)

## :email: 联系
- **WeChat**: <a :href="qqUrl" class='qq'>x1285370080</a>
- **QQ**: <a :href="qqUrl" class='qq'>1285370080</a>
- **Email**:  <a href="mailto:894072666@qq.com">1285370080@qq.com</a>
- **GitHub**: <https://github.com/myliuxia>

<script>
  export default {
    data(){
      return {
        qqUrl: 'tencent://message/?uin=894072666&Site=&Menu=yes' 
      }
    },
    mounted(){
      const flag =  navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
      if(flag){
        this.qqUrl = 'mqqwpa://im/chat?chat_type=wpa&uin=894072666&version=1&src_type=web&web_src=oicqzone.com'
      }
    }
  }
</script>           