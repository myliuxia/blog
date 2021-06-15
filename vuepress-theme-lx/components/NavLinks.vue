<template>
  <div>
    <nav class="pc-nav-links" v-if="userLinks.length || repoLink">
      <!-- user links -->
      <div class="nav-item" v-for="item in userLinks" :key="item.link">
        <DropdownLink v-if="item.type === 'links'" :item="item" />
        <NavLink v-else :item="item" />
      </div>

      <!-- repo link -->
      <a
        v-if="repoLink"
        :href="repoLink"
        class="repo-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ repoLabel }}
        <OutboundLink />
      </a>
    </nav>

    <div class="mobile-nav">
      <div class="nav-icon" @click="showMenu = !showMenu">
        <i class="icon-toc"></i>
      </div>
    </div>
    
    <div class="nav-drawer" :class="{'show':showMenu}">
      <ul class="drawer-menu-list">
        <li class="drawer-menu-item"></li>
      </ul>
    </div>
    <div v-show="showMenu" class="nav-mask" @click="showMenu = false"></div>
  </div>
</template>

<script>
import DropdownLink from "@theme/components/DropdownLink.vue";
import { resolveNavLinkItem } from "../util";
import NavLink from "@theme/components/NavLink.vue";

export default {
  components: { NavLink, DropdownLink },
  data(){
    return {
      showMenu:false
    }
  },
  computed: {
    userNav() {
      return this.$themeLocaleConfig.nav || this.$site.themeConfig.nav || [];
    },

    nav() {
      const { locales } = this.$site;
      if (locales && Object.keys(locales).length > 1) {
        const currentLink = this.$page.path;
        const routes = this.$router.options.routes;
        const themeLocales = this.$site.themeConfig.locales || {};
        const languageDropdown = {
          text: this.$themeLocaleConfig.selectText || "Languages",
          ariaLabel: this.$themeLocaleConfig.ariaLabel || "Select language",
          items: Object.keys(locales).map((path) => {
            const locale = locales[path];
            const text =
              (themeLocales[path] && themeLocales[path].label) || locale.lang;
            let link;
            // Stay on the current page
            if (locale.lang === this.$lang) {
              link = currentLink;
            } else {
              // Try to stay on the same page
              link = currentLink.replace(this.$localeConfig.path, path);
              // fallback to homepage
              if (!routes.some((route) => route.path === link)) {
                link = path;
              }
            }
            return { text, link };
          }),
        };
        return [...this.userNav, languageDropdown];
      }
      return this.userNav;
    },

    userLinks() {
      return (this.nav || []).map((link) => {
        return Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem),
        });
      });
    },

    repoLink() {
      const { repo } = this.$site.themeConfig;
      if (repo) {
        return /^https?:/.test(repo) ? repo : `https://github.com/${repo}`;
      }
      return null;
    },

    repoLabel() {
      if (!this.repoLink) return;
      if (this.$site.themeConfig.repoLabel) {
        return this.$site.themeConfig.repoLabel;
      }

      const repoHost = this.repoLink.match(/^https?:\/\/[^/]+/)[0];
      const platforms = ["GitHub", "GitLab", "Bitbucket"];
      for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i];
        if (new RegExp(platform, "i").test(repoHost)) {
          return platform;
        }
      }

      return "Source";
    },
  },
};
</script>

<style lang="stylus">
.pc-nav-links {
  display: inline-block;

  +keep-tablet() {
    display: none;
  }

  a {
    line-height: 1.4rem;
    color: inherit;

    &:hover, &.router-link-active {
      color: $accentColor;
    }
  }

  .nav-item {
    position: relative;
    display: inline-block;
    margin-left: 1.5rem;
    line-height: 2rem;

    &:first-child {
      margin-left: 0;
    }
  }

  .repo-link {
    margin-left: 1.5rem;
  }
}

.mobile-nav {
  display: none;

  +keep-tablet() {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nav-icon {
    position: relative;
    cursor: pointer;
    font-size: 18px;
    margin-left: 12px;
    width: 20px;
    height: 20px;
  }
}

.nav-drawer {
  width:60%;
  height:100%
  position: fixed;
  top: 0;
  right: 0;
  transform: scaleX(0);
  transform-origin: right;
  z-index: 1002;
  background: var(--mainBg);
  transition-t('transform', '0', '0.38', 'ease');

  &.show {
    transform: scaleX(1);
  }
}
.nav-mask{
  position: fixed;
  width 100%;
  height 100%;
  top: 0;
  left: 0;
  background-color:rgba(0,0,0,0.1)
  z-index:1001;
}

.drawer-menu-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .drawer-menu-item {
    font-size: 1rem;
    margin: 6px 0;
    height: 38px;

    a {
      padding: 6px 20px;
      border-radius: 20px;
      color: var(--textColor);

      &:hover {
        color: var(--textLightenColor);
        border: 1px solid var(--borderColor);
      }

      &.active {
        border: 1px solid var(--borderColor);
        color: var(--textLightenColor);
      }
    }
  }
}
</style>
