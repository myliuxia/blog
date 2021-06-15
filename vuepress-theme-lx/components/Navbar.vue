<template>
  <header class="header-wrapper" :class="{'shrink':shrink,'hide':hide}">
    <div class="header-content">
      <router-link
        :to="$localePath"
        class="left"
      >
        <div v-if="$site.themeConfig.logo" class="logo-image">
          <img
            :src="$withBase($site.themeConfig.logo)"
            :alt="$siteTitle"
          />
        </div>
        <span
          ref="siteName"
          class="logo-title"
          v-if="$siteTitle"
        >{{ $siteTitle }}</span>
      </router-link>
      
      <div class="right">
        <SearchBox v-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false" />
        <NavLinks />
      </div>
    </div>
  </header>
</template>

<script>
import SearchBox from '@SearchBox'
import NavLinks from '@theme/components/NavLinks.vue'

export default {
  components: {  NavLinks, SearchBox },

  data () {
    return {
      linksWrapMaxWidth: null,
      scrollTop:0,
      shrink:false, // shrink:缩小显示
      hide:false, // hide:隐藏
    }
  },

  mounted () {
    const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
    const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'))
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth = this.$el.offsetWidth - NAVBAR_VERTICAL_PADDING
          - (this.$refs.siteName && this.$refs.siteName.offsetWidth || 0)  
      }
    }
    handleLinksWrapWidth()
    window.addEventListener('resize', handleLinksWrapWidth, false)
    window.addEventListener('scroll', this._onScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this._onScroll)
  },
  computed: {
    algolia () {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
    },

    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    }
  },
  methods:{
    _onScroll(){
      const windowHeight = document.documentElement.clientHeight
      const scrollTop = document.body.scrollTop + document.documentElement.scrollTop
      if(scrollTop<10){
        this.shrink = false
        this.hide = false
      }else if(scrollTop < windowHeight || this.scrollTop > scrollTop){
        this.hide = false
        this.shrink = true
      }else{
        this.hide = true
      }
      this.scrollTop == scrollTop
    }
  }
}

function css (el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="stylus">
$logo-title-font-size = 1.6rem;
$pc-search-icon-font-size = 1.5rem;
$logo-image-box-width = 46px;

.header-wrapper{       
  position: fixed;
  top: 0;
  right: 0;
  width: 100%; 
  height: $header-height;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color var(--blurBg)
  z-index: 1005;
  box-shadow 0 2px 5px rgba(0,0,0,.06);
  transition-t("transform, padding-left, height", "0, 0, 0", "0.3, 0.2, 0.2", "ease-out, linear, ease");
  &.shrink{
    height: $header-shrink-height;
    .left{
      transform: scale(0.72);
      transform-origin: left;
    }
  }
  &.hide{
    height: 0;
    overflow hidden
  }


  +keep-tablet(){
    height: $header-height * 0.9;
    &.shrink{
      height: $header-shrink-height * 0.9;
    }
  }
  +keep-mobile(){
    height: $header-height * 0.8;
    &.shrink{
      height: $header-shrink-height * 0.8;
    }
  }
  .header-content{
    position: relative;
    height: 100%;
    width: $main-content-width;
    max-width: $content-max-width;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    +keep-tablet() {
      width: $main-content-width-tablet;
    }

    +keep-mobile() {
      width: $main-content-width-mobile;
    }
    .left {
      display: flex;
      align-items: center;
      transition-t("transform", "0", "0.2", "linear");
      .logo-image {
        width: $logo-image-box-width;
        height: $logo-image-box-width;
        margin-right: 8px;


        +keep-tablet() {
          width: $logo-image-box-width * 0.9;
          height: $logo-image-box-width * 0.9;
        }

        +keep-mobile() {
          width: $logo-image-box-width * 0.8;
          height: $logo-image-box-width * 0.8;
        }

        img {
          border-radius: 6px;
          width: 100%;
        }
      }

      .logo-title {
        font-size: $logo-title-font-size;
        font-weight: bold;
        letter-spacing: 1px;
        line-height: 1;
        color: var(--textColor);

        +keep-tablet() {
          font-size: $logo-title-font-size * 0.9;
        }

        +keep-mobile() {
          font-size: $logo-title-font-size * 0.8;
        }
      }
    }

    .right{
      flex:1;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>
