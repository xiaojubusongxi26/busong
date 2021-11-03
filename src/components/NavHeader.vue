<template>
  <div>
    <div class="nav">
    <ul :class="{ 'changeColor': this.isChange }">
      <li class=" ">小橘不颂兮</li>
      <li class="avatar" @click="unfoldNav()" type="primary">
        <img src="@/assets/images/mmexport1602954427757.jpg" alt="" >
      </li>
      <li class=" ">
        <i class="el-icon-s-home"></i>
        <a href="/">首页</a>
        <div class="n-line"></div>
      </li>
      <li class=" ">
        <svg t="1633865894249" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15857" width="20" height="20"><path d="M843.6 289.8H707.2c-43.8 0-61-90.9-106.1-90.9h-197c-30.3 0-45.5 90.9-90.9 90.9H176.8c-25.1 0-45.5 20.4-45.5 45.5v394.1c0 25.1 20.4 45.5 45.5 45.5h666.9c25.1 0 45.5-20.4 45.5-45.5V335.3c-0.1-25.1-20.4-45.5-45.6-45.5zM510.2 699.1c-100.5 0-181.9-81.4-181.9-181.9s81.4-181.9 181.9-181.9 181.9 81.4 181.9 181.9c0 100.4-81.5 181.9-181.9 181.9zM730 380.8c-12.6 0-22.7-10.2-22.7-22.7 0-12.6 10.2-22.7 22.7-22.7 12.6 0 22.7 10.2 22.7 22.7s-10.2 22.7-22.7 22.7zM282.8 244.4c0-8.4-6.8-15.2-15.2-15.2h-45.5c-8.4 0-15.2 6.8-15.2 15.2v15.2h75.8c0.1-0.1 0.1-6.9 0.1-15.2z m227.4 136.4c-75.3 0-136.4 61.1-136.4 136.4 0 75.3 61.1 136.4 136.4 136.4 75.3 0 136.4-61.1 136.4-136.4 0-75.4-61.1-136.4-136.4-136.4z" p-id="15858" fill="#f4f5f7"></path></svg>
        <a>摄影</a>
        <div class="n-line"></div>
      </li>
      <li class=" ">
        <i class="el-icon-picture"></i>
        <a>壁纸</a>
        <div class="n-line"></div>
      </li>
      <li class=" ">
          <i class="el-icon-video-camera-solid"/>
          <a href="javascript:;">电影</a>
          <div class="n-line"></div>
      </li>
      <li class=" ">
          <svg t="1633865672236" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11295" width="20" height="20"><path d="M514 114.3c-219.9 0-398.8 178.9-398.8 398.8 0 220 178.9 398.9 398.8 398.9s398.8-178.9 398.8-398.8S733.9 114.3 514 114.3z m200.6 311.5c-20.2 21-53.6 21.6-74.5 1.4L592 380.8c-5.2-5-13.9-1.3-13.9 5.9v327.2c0 59-53.6 105.3-122 105.3s-122-46.2-122-105.3c0-56.5 49.1-101.3 113.3-105 4.7-0.3 8.7 3.5 8.7 8.2v87.2c0 5.4 5.1 9.5 10.3 7.9 0.3-0.1 0.5-0.2 0.7-0.2 3.4-1.1 5.6-4.3 5.6-7.8V274.1c0-58 69.6-87.6 111.4-47.4l129.2 124.4c20.9 20.4 21.5 53.7 1.3 74.7z" p-id="11296" fill="#f4f5f7"></path></svg>
          <a href="/music">音乐</a>
          <div class="n-line"></div>
      </li>
      <li class=" ">
          <i class="el-icon-s-management"></i>
          <a href="javascript:;">书架</a>
          <div class="n-line"></div>
      </li>
      <li class=" ">
          <i class="el-icon-s-order"></i>
          <a href="javascript:;">文档</a>
          <div class="n-line"></div>
      </li>
      <li class=" ">
        <i class="el-icon-s-promotion"/>
        <a href="/task">历程树</a>
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
              <a href="/">首页</a>
              <div class="n-line"></div>
            </el-menu-item>
            <el-menu-item index="2">
              <svg style="margin-right: 9px;" t="1633865894249" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15857" width="20" height="20"><path d="M843.6 289.8H707.2c-43.8 0-61-90.9-106.1-90.9h-197c-30.3 0-45.5 90.9-90.9 90.9H176.8c-25.1 0-45.5 20.4-45.5 45.5v394.1c0 25.1 20.4 45.5 45.5 45.5h666.9c25.1 0 45.5-20.4 45.5-45.5V335.3c-0.1-25.1-20.4-45.5-45.6-45.5zM510.2 699.1c-100.5 0-181.9-81.4-181.9-181.9s81.4-181.9 181.9-181.9 181.9 81.4 181.9 181.9c0 100.4-81.5 181.9-181.9 181.9zM730 380.8c-12.6 0-22.7-10.2-22.7-22.7 0-12.6 10.2-22.7 22.7-22.7 12.6 0 22.7 10.2 22.7 22.7s-10.2 22.7-22.7 22.7zM282.8 244.4c0-8.4-6.8-15.2-15.2-15.2h-45.5c-8.4 0-15.2 6.8-15.2 15.2v15.2h75.8c0.1-0.1 0.1-6.9 0.1-15.2z m227.4 136.4c-75.3 0-136.4 61.1-136.4 136.4 0 75.3 61.1 136.4 136.4 136.4 75.3 0 136.4-61.1 136.4-136.4 0-75.4-61.1-136.4-136.4-136.4z" p-id="15858" fill="#f4f5f7"></path></svg>
              <a>摄影</a>
              <div class="n-line"></div>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-picture" style="width: 21px;margin-right: 8px;"></i>
              <a>壁纸</a>
              <div class="n-line"></div>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-video-camera-solid"/>
              <a>电影</a>
              <div class="n-line"></div>
            </el-menu-item>
            <el-menu-item index="5">
              <svg style="margin-right: 9px;" t="1633865672236" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11295" width="20" height="20"><path d="M514 114.3c-219.9 0-398.8 178.9-398.8 398.8 0 220 178.9 398.9 398.8 398.9s398.8-178.9 398.8-398.8S733.9 114.3 514 114.3z m200.6 311.5c-20.2 21-53.6 21.6-74.5 1.4L592 380.8c-5.2-5-13.9-1.3-13.9 5.9v327.2c0 59-53.6 105.3-122 105.3s-122-46.2-122-105.3c0-56.5 49.1-101.3 113.3-105 4.7-0.3 8.7 3.5 8.7 8.2v87.2c0 5.4 5.1 9.5 10.3 7.9 0.3-0.1 0.5-0.2 0.7-0.2 3.4-1.1 5.6-4.3 5.6-7.8V274.1c0-58 69.6-87.6 111.4-47.4l129.2 124.4c20.9 20.4 21.5 53.7 1.3 74.7z" p-id="11296" fill="#f4f5f7"></path></svg>
              <a href="/music">音乐</a>
              <div class="n-line"></div>
            </el-menu-item>
            <el-menu-item index="6">
              <i class="el-icon-s-management"></i>
              <a>书架</a>
              <div class="n-line"></div>
            </el-menu-item>
            <el-menu-item index="7">
              <i class="el-icon-s-promotion"/>
              <a href="/task">历程树</a>
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
      // 导航栏变色
      isChange: false,
      // 头像控制导航栏收缩
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
        // 当前位置顶部被卷去的高度
        // console.log(window.pageYOffset)
        // 当前浏览器窗口的高度 window.innerHeight
        // console.log(window.innerHeight)
        scrollBy(0, -window.pageYOffset + window.innerHeight - 50)
      }
    },
    // 点击头像滚动到Index主要位置
    goIndex () {
      console.log(window.pageYOffset)
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
a:hover {
  color: $colorF;
}
.changeColor {
  background: #f46b45;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #eea849, #f46b45);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #eea849, #f46b45); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  a:hover {
    color: $colorG;
  }
  // background-color: $colorH !important;
  color: $colorG;
  li{
    .n-line {
        margin: 0 auto;
        position: relative;
        // height: 2px;
        width: 0px;
        background-image: linear-gradient( 135deg, #FEB692 10%, #EA5455 100%) !important;
        border-bottom: 4px #ffdac2 solid !important;
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
    // 头像
    li:nth-child(2){
      margin-right: 12px;
      cursor: pointer;
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
