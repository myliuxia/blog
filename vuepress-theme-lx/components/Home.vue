<template>
  <div class="theme-main__inner home">
    <PostList/>
    <!-- <Pagination v-if="$site.pages.length > 1"/> -->
  </div>
</template>
<script>
import { Pagination } from '@vuepress/plugin-blog/lib/client/components';
import dayjs from 'dayjs'
import dayjsPluginUTC from 'dayjs/plugin/utc'
import PostList from './PostList.vue'

dayjs.extend(dayjsPluginUTC)
const DATE_MAP = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export default {
  name: 'Home',
  components: {
    // Pagination,
    PostList
  },
  data(){
    return {
      perPage: 10, // 每页长
      currentPage: 1// 当前页
    }
  },
  methods: {
    formateDate(val) {
      return dayjs
        .utc(val)
        .format(this.$themeConfig.dateFormat)
    }
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