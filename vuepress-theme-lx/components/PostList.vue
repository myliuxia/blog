<template>
<div class="article-list">
      <div class="article-item" v-for="item in sortPosts" :key="item.key">
        <div v-if="item.frontmatter.cover" class="article-cover">
          <router-link :to="item.path">
            <img :src="item.frontmatter.cover" alt="cover"/>
          </router-link>
        </div>
        <h3 class="article-title">
          <router-link :to="item.path">{{item.title}}</router-link>
        </h3>
        <div class="article-desc" v-html="item.excerpt"></div>
        <footer class="article-meta">
          <span><i class="icon-calendar"></i>{{formateDate(item.frontmatter.date)}}</span>
        </footer>
      </div>
    </div>
</template>

<script>

import postsMixin from '@theme/mixins/posts'
export default {
  mixins:[postsMixin],
  props: {
    category: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: ''
    },
    currentPage: {
      type: Number,
      default: 1
    },
    perPage: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      sortPosts: [],
      postListOffsetTop: 0
    }
  },
  created () {
    this.setPosts()
  },
  mounted () {
    // this.postListOffsetTop = this.getElementToPageTop(this.$refs.postList) - 240
  },
  watch: {
    currentPage () {
      if (this.$route.query.p != this.currentPage) { // 此判断防止添加相同的路由信息（如浏览器回退时触发的）
        this.$router.push({
          query: {
            ...this.$route.query,
            p: this.currentPage
          }
        })
      }
      // setTimeout(() => {
      //   window.scrollTo({ top: this.postListOffsetTop }) // behavior: 'smooth'
      // },0)
      this.setPosts()
    },
    category () {
      this.setPosts()
    },
    tag () {
      this.setPosts()
    }
  },
  methods: {
    setPosts () {
      const currentPage = this.currentPage
      const perPage = this.perPage

      let posts = []
      if (this.category) {
        posts = this.$groupPosts.categories[this.category]
      } else if (this.tag) {
        posts = this.$groupPosts.tags[this.tag]
      } else {
        posts = this.$sortPosts
      }

      this.sortPosts = posts.slice((currentPage - 1) * perPage, currentPage * perPage)
    },
  }
}
</script>

<style lang="stylus">
.article-item
  display: block;
  overflow: hidden;
  margin-bottom: 1.75rem;
  border-radius: 6px;
  background var(--theme-card-background)
.article-title
  margin 0
  a
    display: block;
    padding: 1.5rem 1.5rem 0;
    transition: color .15s;
.article-desc
  padding: 0 1.5rem;
  opacity: .8;
  a
    border-bottom: 1px dotted;
    transition: color .15s,border-color .15s,opacity .15s;
.article-meta
  margin: 1em 1.5rem 0;
  padding-bottom: 1.5rem;
  opacity: .63;
  [class^="icon-"]
    margin-right 0.4rem
</style>
