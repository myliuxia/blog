<template>
  <span class="theme-mode-setting" @click="handleToggleMode" :title="title">
    <Icon icon="moon" v-if="status === 1" :key="status" />
    <Icon icon="sun" v-else :key="status"/>
  </span>
</template>
<script>
export default {
  data() {
    return {
      status: 2 // 1: dark 2: light
    }
  },
  computed: {
    title() {
      const arr = ['dark', 'light'];
      return arr[this.status];
    }
  },
  mounted() {
    let status = +window.localStorage.getItem('mode');
    this.setMode(status);
  },
  methods: {
    handleToggleMode() {
      console.log('theme-mode：')
      if (this.status === 1) {
        this.setMode(2);
      } else if (this.status === 2) {
        this.setMode(1);
      }
      window.localStorage.setItem('mode', this.status);
    },
    setMode(status) {
      if (status === 1) {
        this.status = 1;
        document.body.classList.remove('theme-mode-light');
        document.body.classList.add('theme-mode-dark');
      } else if (status === 2) {
        this.status = 2;
        document.body.classList.remove('theme-mode-dark');
        document.body.classList.add('theme-mode-light');
      } 
    }
  }
}
</script>
<style lang="stylus">
.theme-mode-setting
  overflow hidden
  border-radius 50%
  display flex 
  align-items center
  justify-content center
  .theme-icon
    font-size 1.6rem
</style>