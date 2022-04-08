<template>
  <div class="home-container">
    <HeaderHome/>
    <div class="index">
      <div class="left">
        <PerInfo/>
        <Weather/>
      </div>
      <div class="main">
        <daily></daily>
      </div>
      <div class="right">
        <Countdown/>
        <Today/>
        <Calendar/>
      </div>
    </div>
  </div>
</template>

<script>
import Daily from '@/components/index/Daily.vue'
import { mapState } from 'vuex'
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
  },
  methods: {
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/config.scss';
@import '@/assets/sass/responsive.scss';

// 在线字体
@import url(https://fonts.googleapis.com/css?family=Khula:700);

.index{
  display: flex;
  justify-content: center;
  // width: 100vw;
  padding: 50px 0;
  backdrop-filter: blur(2px);
  // 改变文字被选中时的颜色及背景
  ::selection {
    background: $colorK;
    color:#fff;
  }
  ::-moz-selection {
    background: $colorK;
    color:#fff;
  }
  ::-webkit-selection {
    background: $colorK;
    color:#fff;
  }
  /* 主页左侧区域：个人头像以及天气 */
  .left{
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 15px 0px;
    // padding: 20px 0;
    width: 20vw;
    max-width: 220px;
    height: 600px;
    // background-color: rgba($color: $colorG, $alpha: 0.85);
    border-radius: 15px;
  }
  /* 主页中间区域：日常动态展示以及发布 */
  .main{
    width: 800px;
    min-width: 320px;
    padding: 0 20px;
    overflow-x: auto;
    overflow-y: hidden;
    // background-color: rgba($color: $colorL, $alpha: 0.25);
    border-radius: 10px;
  }
  /* 主页右侧区域：今日任务栏 */
  .right{
    margin: 15px 0px;
    width: 30vw;
    max-width: 250px;
    min-height: 500px;
    // background-color: rgba($color: $colorG, $alpha: 0.25);
    border-radius: 15px;
    // box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  }
}
</style>
