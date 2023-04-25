<template>
  <div id="app">
    <router-view/>
    <!-- <div class="scroll" :style="changeScroll"></div> -->
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
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
  created() {
    if (!localStorage.getItem('token') && !localStorage.getItem('userinfo')) {
      localStorage.clear('token')
      localStorage.clear('userinfo')
      this.$router.push('/login')
    }
  },
  mounted () {
    this.timer = setInterval(this.setScroll, 0)
  },
  methods: {
    setScroll () {
      /** 滚动条的高度 = 当前窗口的高度 / 整个页面的总高度 */
      const widthScroll = (window.innerHeight / document.body.clientHeight)
      // console.log(widthScroll)
      if (widthScroll >= 1.29) {
        this.changeScroll.height = 0 + '%'
        return
      }
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
@import '@/assets/sass/config.scss';

#app {
  overflow-x: hidden;
}
/* .scroll{
  z-index: 8;
  position: fixed;
  top: 0;
  width: 3px;
  right: 0;
  background: $colorK;
  height: 100%;
  animation: scrollto 2s;
  @keyframes scrollto {
    from {
      right: -4px;
    } to {
      right: 0;
    }
  }
} */
</style>
