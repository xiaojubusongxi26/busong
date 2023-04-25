<template>
<div>
  <div class="bg"></div>
  <header class="backimg">
<!--    <loading v-if="$store.state.userInfo.userBg === undefined"/>-->
    <img :src="!$store.state.userInfo.userBg ? defaultBg : $store.state.userInfo.userBg" alt="">
    <div class="centerText">
      <h1>{{!$store.state.userInfo.userTitle ? 'Welcome to Busong' : $store.state.userInfo.userTitle}}</h1>
      <!-- <div class="console-container">
        <span ref='text'></span>
        <div class='console-underscore' ref='con'
         :class="{ 'hidden': isHidden, 'console-underscore': isUnderscore }">&#95;</div>
      </div> -->
    </div>
  </header>
</div>
</template>

<script>
import Loading from '../common/Loading.vue'
export default {
  components: { Loading },
  props: {},
  data () {
    return {
      // 默认背景
      defaultBg: require('@/assets/images/home/defaultBg.jpg'),
      // 打字机文字
      words: [
        '你要去相信,时光且长,你终将长成自己想要的模样,拥抱独属于你的未来.',
        '你的心要如溪水般柔软,你的眼波要像春天般明媚.',
        '愿所有梦见过远方的人,心有惊雷,生似静湖.'
      ],
      isUnderscore: true,
      isHidden: false,
      // 定时器
      timer1: false,
      timer2: false
    }
  },
  watch: {},
  computed: {},
  methods: {
    // 打字机
    /* consoleText () {
      let visible = true
      let letterCount = 1
      let x = 1
      let waiting = false
      this.$refs.text.style.color = '#fff'

      // 输出文字内容
      this.timer1 = setInterval(() => {
        if (letterCount === 0 && waiting === false) {
          waiting = true
          this.$refs.text.innerHTML = this.words[0].substring(0, letterCount)
          setTimeout(() => {
            const usedWord = this.words.shift()
            this.words.push(usedWord)
            x = 1
            letterCount += x
            waiting = false
          }, 1000)
        } else if (letterCount === this.words[0].length + 1 && waiting === false) {
          waiting = true
          setTimeout(() => {
            x = -1
            letterCount += x
            waiting = false
          }, 1000)
        } else if (waiting === false) {
          this.$refs.text.innerHTML = this.words[0].substring(0, letterCount)
          letterCount += x
        }
      }, 100)

      // 打字字符闪烁
      this.timer2 = setInterval(() => {
        if (visible === true) {
          this.isHidden = true
          this.isUnderscore = true
          visible = false
        } else {
          this.isHidden = false
          visible = true
        }
      }, 400)
    }, */
  },
  created () {},
  mounted () {},
  destroyed () {
    // 销毁打字机定时器
    clearInterval(this.timer1)
    clearInterval(this.timer2)
  }
}
</script>
<style lang="scss" scoped>
.bg{
  background-color: #fafafa;
  // background: url('~@/assets/images/home/texture.png');
  width: 100vw;
  height: 100vh;
  // background-size: cover;
  background-position: bottom;
  position: fixed;
  z-index: -10;
}
// 懒加载遮罩
::v-deep .el-loading-mask {
  z-index: 5 !important;
}
// 主页图片以及文字
header{
  // background: url("~@/assets/images/home/755ce8eegy1gjw0am3xs8j21fe2us1ky.png") no-repeat;
  background-origin: content-box;
  width: 100%;
  height: 55vh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    position: absolute;
    top: 0;
  }
  .centerText{
    z-index: 0;
    text-align: center;
    margin: auto 0;
    // margin-bottom: 55vh;
    h1{
      font-family: "DIN Next LT Pro", serif;
      font-size: 8vmin;
      font-weight: 900;
      color: #fff;
      letter-spacing: 20px;
      text-shadow: 1px 1px 4px #fff, 0px 0px 5px #5f639b, 0 0 5px #424570;
    }
    // 打字机效果
    .console-container{
      font-family:Khula;
      font-size: 22px;
      text-align:center;
      height: 50px;
      line-height: 50px;
      display:block;
      // position:absolute;
      color:white;
      text-shadow: 1px 1px 4px #fff, 0px 0px 5px #5f639b, 0 0 5px #424570;
      .console-underscore {
        display:inline-block;
        position:relative;
        top:0;
        left:10px;
      }
      .hidden {
        opacity:0;
      }
    }
  }
}
</style>
