<template>
  <div class="home-container">
    <HeaderHome/>
    <div class="index">
      <div class="left">
        <PerInfo/>
        <Weather v-if="order[0] === 'A'"/>
      </div>
      <div class="main">
        <daily></daily>
      </div>
      <div class="right">
        <Countdown v-if="order[2] === '1'"/>
        <Today v-if="order[3] === '2'"/>
        <Calendar v-if="order[4] === '3'"/>
      </div>
    </div>
    <div class="gotop-index">
      <a href="javascript:;"  v-show="btnFlag" class="gotop-a" @click="backTop"></a>
    </div>
  </div>
</template>

<script>
import Daily from '@/components/index/Daily.vue'
import Today from '../components/index/Today.vue'
import Weather from '../components/index/Weather.vue'
import PerInfo from '../components/index/PerInfo.vue'
import HeaderHome from '../components/index/HeaderHome.vue'
import Calendar from '../components/index/Calendar.vue'
import Countdown from '../components/index/Countdown.vue'

export default {
  name: 'index',
  data () {
    return {
      btnFlag: false,
      order: this.$store.state.userInfo.userOrder ? this.$store.state.userInfo.userOrder : 'AB123'
    }
  },
  props: {
  },
  components: {
    Daily,
    Today,
    Weather,
    PerInfo,
    HeaderHome,
    Calendar,
    Countdown
  },
  computed: {
  },
  mounted () {
    // 此处true需要加上，不加滚动事件可能绑定不成功
    // window.addEventListener('scroll', this.scrollToTop)
  },
  methods: {
    backTop () {
      document.documentElement.scrollTop = 0
      this.btnFlag = false
    },
    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop () {
      this.btnFlag = (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) > window.screen.availHeight * 0.55 - 70
    }
  },
  created () {
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop, true)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/config.scss';
@import '@/assets/sass/responsive.scss';
@import '@/assets/sass/index.scss';

// 在线字体
//@import url(https://fonts.googleapis.com/css?family=Khula:700);
</style>
