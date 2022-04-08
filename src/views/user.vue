<template>
  <div class="user-container">
    <div class="bg" ></div>
    <div class="header" ref="userimg" @click="changeImg = true">
      <img :src="$store.state.userInfo.userBg" top alt="">
      <!-- <div class="maskBg" v-if="changeImg" @click.stop="changeImg = false">
      </div>
      <div class="selectBg" v-if="changeImg">
      </div> -->
      <Tailoring/>
    </div>
    <UserPre></UserPre>
    <Settings></Settings>
  </div>
</template>

<script>
// import CropperImage from '../components/user/CropperImage.vue'
import Settings from '../components/user/Settings.vue'
import UserPre from '../components/user/UserPre.vue'
import Tailoring from '../components/user/Tailoring.vue'
export default {
  components: { UserPre, Settings, Tailoring },
  name: 'user',
  data () {
    return {
      userTitle: '好久不见',
      userLabel: '风花雪月',
      userCity: '成都',
      // userBg: require('@/assets/images/home/755ce8eegy1gjw0am3xs8j21fe2us1ky.png'),
      userColor: '#2d3059',
      userWord: '',
      changeImg: false,
      words: [
        '你要去相信,时光且长,你终将长成自己想要的模样,拥抱独属于你的未来.',
        '你的心要如溪水般柔软,你的眼波要像春天般明媚.',
        '愿所有梦见过远方的人,心有惊雷,生似静湖.'
      ],
      userInfo: {}
    }
  },
  created () {
    // setTimeout(function () {
    //   console.log('等待')
    // }, 3000)
  },
  methods: {
    async getUserInfo () {
      // 获取背景图
      await this.axios({
        url: 'http://localhost:1212/api/getUserBg',
        method: 'get',
        responseType: 'blob'
      }).then(res => {
        // console.log('封面', res)
        const userBg = URL.createObjectURL(new Blob([res.data]))
        this.$store.dispatch('update_userBg', userBg)
      })
    }
  },
  mounted () {
    if (this.$store.state.userInfo.userBg) {
      this.getUserInfo()
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/sass/config.scss';
@import '@/assets/sass/responsive.scss';

.user-container {
  width: 100vw;
  margin-bottom: 72px;
  padding: 0;
  // height: 100vh;
  // max-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .bg{
    top: 0;
    background-color: #f8f8f8;
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-position: bottom;
    position: fixed;
    z-index: -10;
  }
  .header {
    height: 55vh;
    width: 100vw;
    position: relative;
    img {
      object-fit: cover;
      object-position: top;
      width: 100%;
      height: 100%;
    }
    .maskBg {
      background: rgba($color: #d9d9d9, $alpha: 0.6);
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      z-index: 10;
    }
    // 图片裁切
    .selectBg {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
    }
  }
}
</style>
