---
title: 关于
permalink: /about/
sidebar: false
article: false
---

### 🐼Me
从事Web前端开发工作，喜欢唱、跳、rap、篮球，写程序。


[更新日志](https://github.com/myliuxia/blog/commits/master)

## :email: 联系
- **WeChat**: <a :href="qqUrl" class='qq'>x1285370080</a>
- **QQ**: <a :href="qqUrl" class='qq'>1285370080</a>
- **Email**:  <a href="mailto:liuxia615@foxmail.com">liuxia615@foxmail.com</a>
- **GitHub**: <https://github.com/myliuxia>

<script>
  export default {
    data(){
      return {
        qqUrl: 'tencent://message/?uin=1285370080&Site=&Menu=yes' 
      }
    },
    mounted(){
      const flag =  navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
      if(flag){
        this.qqUrl = 'mqqwpa://im/chat?chat_type=wpa&uin=1285370080&version=1&src_type=web&web_src=oicqzone.com'
      }
    }
  }
</script>           