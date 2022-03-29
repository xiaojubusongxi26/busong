<template>
  <div class="home-container">
    <nav-header></nav-header>
    <router-view></router-view>
    <nav-footer></nav-footer>
    <music></music>
  </div>
</template>

<script>
// import NavHeader from '@/components/NavHeader.vue'
import NavHeader from '@/components/NavHeader.vue'
import NavFooter from '@/components/NavFooter.vue'
import Music from '@/components/Music.vue'

// 页面精灵
import { L2Dwidget } from 'live2d-widget'

export default {
  name: 'home',
  components: {
    NavHeader,
    NavFooter,
    Music
  },
  data () {
    return {
      timer: null
    }
  },
  created () {
    L2Dwidget.init({
      model: {
        jsonPath: 'https://unpkg.com/live2d-widget-model-tororo@1.0.5/assets/tororo.model.json',
        scale: 1,
        hHeadPos: 0.5,
        vHeadPos: 0.618
      },
      display: {
        position: 'right',
        width: 120,
        height: 120,
        hOffset: 0,
        vOffset: 80
      },
      mobile: { show: true, scale: 0.5 },
      react: { opacityDefault: 0.7, opacityOnHover: 0.2 }
    })
  },
  methods: {
  },
  destroyed () {
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/config.scss';
@import '@/assets/sass/responsive.scss';

</style>
