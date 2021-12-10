<template>
  <div id="app">
    <nav-header></nav-header>
    <router-view/>
    <nav-footer></nav-footer>
    <div class="scroll" :style="changeScroll"></div>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'
import NavFooter from '@/components/NavFooter.vue'

export default {
  name: 'App',
  components: {
    NavHeader,
    NavFooter
  },
  data () {
    return {
      changeScroll: {
        height: '',
        top: '',
        // 定时器
        timer: ''
      },
      // 监听页面滑动
      unfold: false
    }
  },
  mounted () {
    this.timer = setInterval(this.setScroll, 0)
  },
  methods: {
    setScroll () {
      /** 滚动条的高度 = 当前窗口的高度 / 整个页面的总宽度 */
      const widthScroll = (window.innerHeight / document.body.clientHeight)
      this.changeScroll.height = widthScroll * 100 + '%'
      /* 滚动条离顶部的距离 = （当前窗口位置顶部被卷去的高度 / 页面的总高度） * 当前窗口的高度 */
      const topScroll = (window.pageYOffset / document.body.clientHeight)
      if (topScroll !== this.changeScroll.top) {
        this.changeScroll.top = topScroll * window.innerHeight + 'px'
        this.Unfold()
      }
      // console.log('网页可见区域高' + document.body.clientHeight)
      // console.log('当前窗口高度' + window.innerHeight)
      // // 当前位置顶部被卷去的高度
      // console.log('当前位置顶部被卷去的高度' + window.pageYOffset)
    },
    Unfold () {
      const t = setTimeout(() => {
        this.unfold = true
        console.log(111)
      }, 2000)
      this.unfold = false
      clearTimeout(t)
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>

<style lang="scss" scoped>
.scroll{
  z-index: 9;
  position: fixed;
  top: 0;
  width: 4px;
  right: 0;
  background: #ff6600;
  height: 100%;
  animation: scrollto 2s;
  @keyframes scrollto {
    from {
      right: -4px;
    } to {
      right: 0;
    }
  }
}
</style>
