<template>
  <div class="home-container">
    <nav-header></nav-header>
    <router-view></router-view>
    <nav-footer></nav-footer>
    <music></music>
    <!-- <MaskBg v-if="$store.state.isMask"></MaskBg> -->
  </div>
</template>

<script>
// import NavHeader from '@/components/NavHeader.vue'
import NavHeader from '@/components/common/NavHeader.vue'
import NavFooter from '@/components/common/NavFooter.vue'
import Music from '@/components/Music.vue'
/*
// 页面精灵
import { L2Dwidget } from 'live2d-widget' */
import axios from 'axios'
// import MaskBg from '../components/common/MaskBg.vue'

export default {
  name: 'home',
  components: {
    NavHeader,
    NavFooter,
    Music
  },
  data () {
    return {
      timer: null,
      userInfo: {}
    }
  },
  created () {
    /* L2Dwidget.init({
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
    }) */
    this.getUserInfo()
  },
  mounted () {
  },
  methods: {
    getUserInfo () {
      this.$axios.get('http://localhost:1212/api/userinfo').then((res) => {
        this.$store.dispatch('update_userInfo', res)
        sessionStorage.setItem(
          'userinfo',
          JSON.stringify({ ...res.data, password: '' })
        )
        this.userInfo = JSON.parse(sessionStorage.getItem('userinfo'))

        // 获取用户头像
        this.axios({
          url: 'http://localhost:1212/api/get_article',
          method: 'get',
          params: res.data.id,
          responseType: 'blob'
        }).then(res => {
          // console.log(res)
          const userAvatar = URL.createObjectURL(new Blob([res.data]))
          this.$store.dispatch('update_Avatar', userAvatar)
        })
        // 获取背景图
        this.axios({
          url: 'http://localhost:1212/api/getUserBg',
          method: 'get',
          responseType: 'blob'
        }).then(res => {
          // console.log('封面', res)
          const userBg = URL.createObjectURL(new Blob([res.data]))
          this.$store.dispatch('update_userBg', userBg)
        })
      })
    }
  },
  destroyed () {
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/config.scss';
@import '@/assets/sass/responsive.scss';
@import '@/assets/sass/elDialog.scss'

</style>
