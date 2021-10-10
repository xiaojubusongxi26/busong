<template>
  <div>
    <div class="nav">
    <ul :class="{ 'changeColor': this.isChange }">
      <li class=" ">小橘不颂兮</li>
      <li class="avatar" @click="unfoldNav()" type="primary">
        <!-- <div class="avatar"></div> -->
        <img src="@/assets/images/mmexport1602954427757.jpg" alt="" >
      </li>
      <li class=" ">
        <i class="el-icon-s-home"></i>
        <a>首页</a>
        <div class="n-line"></div>
      </li>
      <li class=" ">
        <i class="el-icon-video-camera-solid"/>
        <a>摄影</a>
        <div class="n-line"></div>
      </li>
      <li class=" ">
        <i class="el-icon-picture"></i>
        <a>壁纸</a>
        <div class="n-line"></div>
      </li>
      <li class=" ">
          <i class="el-icon-s-management"></i>
          <a>影音书</a>
          <div class="n-line"></div>
        </li>
      <li class=" ">
        <i class="el-icon-s-promotion"/>
        <a>历程树</a>
        <div class="n-line"></div>
      </li>
    </ul>
  </div>
  <div class="side">
    <el-drawer
      title="小橘不颂兮"
      :visible.sync="isUnfold">
      <el-row class="tac">
        <el-col>
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            text-color="#fff"
            active-text-color="$colorH">
            <el-menu-item index="1">
              <i class="el-icon-s-home"></i>
              <a>首页</a>
              <div class="n-line"></div>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-video-camera-solid"/>
              <a>摄影</a>
              <div class="n-line"></div>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-picture"></i>
              <a>壁纸</a>
              <div class="n-line"></div>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-s-management"></i>
              <a>影音书</a>
              <div class="n-line"></div>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-s-promotion"/>
              <a>历程树</a>
              <div class="n-line"></div>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-drawer>
  </div></div>
</template>

<script>
export default {
  name: 'nav-header',
  data () {
    return {
      isChange: false,
      isUnfold: false,
      drawer: false
    }
  },
  mounted () {
    // 获取滚动事件
    window.addEventListener('scroll', this.initHeight)
    // 获取页面变化事件
    // window.addEventListener('resize', this.unfoldNav)
  },
  methods: {
    // 导航栏变色
    initHeight () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.isChange = scrollTop > 0 ? 1 : false
    },
    // 判断页面大小变化
    unfoldNav () {
      // 获取当前浏览器的宽度
      const w = window.innerWidth
      if (w <= 991) {
        this.isUnfold = true
      } else {
        this.isUnfold = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/config.scss';
@import '@/assets/sass/responsive.scss';

a {
  text-decoration: none;
  color: $colorJ;
  margin: 0px 2px;
}
.changeColor {
  background: #f46b45;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #eea849, #f46b45);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #eea849, #f46b45); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  // background-color: $colorH !important;
  color: $colorG;
  li{
    .n-line {
        margin: 0 auto;
        position: relative;
        // height: 2px;
        width: 0px;
        background-image: linear-gradient( 135deg, #FEB692 10%, #EA5455 100%) !important;
        border-bottom: 4px #ff869c solid !important;
        transition: .5s ease-in-out;
      }
  }
}
.nav{
  z-index: 999;
  position: fixed;
  top: 0;
  height: 50px;
  padding: 10px 0;
  width: 100%;
  color: $colorJ;
  ul{
    height: 50px;
    width: 100%;
    display: flex;
    position: fixed;
    top: 0;
    margin: 0;
    justify-content: center;
    align-items: center;
    line-height: 20px;
    list-style: none;
    li:nth-child(1){
      flex-grow: 8;
      font-size: $fontE;
      font-weight: bold;
    }
    li:not(:first-child){
      text-align: center;
      flex-grow: 1;
    }
    li{
      padding: 0;
      height: 35px;
      line-height: 35px;
      display: inline;
      .n-line {
        margin: 0 auto;
        position: relative;
        // height: 2px;
        width: 0px;
        border-bottom: 4px $colorF solid;
        transition: .5s ease-in-out;
      }
      i{
        width: 18px;
        height: 18px;
      }
      i::before{
        font-size: 18px;
      }
    }
    li:hover {
      .n-line {
        width: 80%;
      }
    }
    li a{
      display: inline;
      margin: 0 8px;
      cursor: pointer;
    }
    img {
      width: 35px;
      height: 35px;
      border-radius: 25px;
    }
  }
}
.side {
  // 侧边导航栏标题颜色更改
  ::v-deep .el-drawer__header{
    color: #fff;
  }
  color: $colorG !important;
  ::v-deep .el-drawer{
    background: url('~@/assets/images/wallhaven-1krw81.png') !important;
    // width: 100vw !important;
    height: 100vh !important;
    background-size: cover !important;
    background-position: bottom !important;
    position: fixed !important;
  }
  ::v-deep .tac{
    background: rgba($color: #000000, $alpha: 0) !important;
  }
  .el-menu-vertical-demo{
    background: rgba($color: #000000, $alpha: 0) !important;
    li:hover {
      background: rgba($color: #d6d6d6, $alpha: 0.4) !important;
      .n-line {
        width: 85%;
      }
    }
    ::v-deep .is-active{
      i{
        color: $colorB !important;
      }
      color: $colorB !important;
      background: rgba($color: #d6d6d6, $alpha: 0.4) !important;
    }
    li {
      i {
        color: #fff;
      }
      color: $colorG;
      position: relative;
      cursor: pointer;
    }
    .n-line {
        margin: 0 auto;
        position: absolute;
        width: 0px;
        border-bottom: 4px $colorB solid;
        transition: .5s ease-in-out;
      }
  }
}
</style>
