<template>
  <div class="home-container">
    <div class="bg"></div>
    <nav-header></nav-header>
    <header class="backimg">
      <div class="centerText">
        <h1>Happy Coding</h1>
        <div class="textList">
          <div class="line" v-for="(item,index) in textList" :key="index">{{ item }}</div>
        </div>
      </div>
    </header>
    <div class="">
      <!-- <router-view/> -->
      <index></index>
    </div>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'
import Index from '@/views/index.vue'

// 页面精灵
import { L2Dwidget } from 'live2d-widget'

export default {
  name: 'home',
  components: {
    NavHeader,
    Index
  },
  data () {
    return {
      textList: [
        '一川烟草，满城风絮，梅子黄时雨。 ——贺铸·《青玉案·凌波不过横塘路》',
        '醉后不知天在水，满船清梦压星河。 ——唐温如·《题龙阳县青草湖》',
        '且将新华试新茶，诗酒趁年华。 ——苏轼·《望江南·超然台作》',
        '欲说还休，却道天凉好个秋。 ——辛弃疾·《丑奴儿·书博山道中壁》',
        '谁也不懂天上的星，谁都喜欢看星星。——木心'
      ]
    }
  },
  created () {
    setTimeout(function () {
      L2Dwidget.init({
        model: {
          jsonPath: 'https://unpkg.com/live2d-widget-model-tororo@1.0.5/assets/tororo.model.json',
          scale: 1,
          hHeadPos: 0.5,
          vHeadPos: 0.618
        },
        display: {
          position: 'right',
          width: 150,
          height: 150,
          hOffset: 0,
          vOffset: 0
        },
        mobile: { show: true, scale: 0.5 },
        react: { opacityDefault: 0.7, opacityOnHover: 0.2 }
      })
    }, 0)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/config.scss';
@import '@/assets/sass/responsive.scss';

.home-container {
  margin: 0;
  padding: 0;
  // 开启3d效果
  // transform-style: preserve-3d;
  .bg{
    background: url('~@/assets/images/wallhaven-l3k5gp.jpg');  /* fallback for old browsers */
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-position: bottom;
    position: fixed;
    z-index: -10;
  }
  // 主页图片以及文字
  header{
    background: url("~@/assets/images/wallhaven-l3k5gp.jpg");
    width: 100%;
    height: 100vh;
    background-position: bottom;
    background-size: cover;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    .centerText{
      text-align: center;
      margin-bottom: 55vh;
      // color: #fbc7d4;
      h1{
        font-size: 8vmin;
        font-weight: 900;
        color: #ee711e;
        text-shadow: 1px 1px 4px #fff, 0px 0px 15px #ee5f00, 0 0 15px #c79a06;

        /* 将背景裁剪为文字 */
        background-clip: text;
        -webkit-background-clip: text;
        /* 背景放大一倍，动画才有移动的空间 */
        background-size: 200% 100%;

        /* 无限循环 匀速播放 */
        animation: anim 15s infinite linear;
      }
      @keyframes anim {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: -100% 0;
        }
      }
      .textList{
        margin: 0;
        font-weight: bold;
        color: #cc3a00;
        position: absolute;
        width: 800px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 40px;
        overflow: hidden;
        .line{
          font-size: $fontI;
          line-height: 40px;
          text-align: center;
          font-style: italic;
        }
        .line:first-child{
          animation:  animList 10s infinite alternate linear;
        }
        @keyframes animList {
          from {
            margin-top: 0;
          }
          to {
            margin-top: -160px;
          }
        }
      }
    }
  }
}
</style>
