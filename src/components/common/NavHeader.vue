<template>
  <div>
    <div class="nav">
      <ul :class="{ 'changeColor': this.isChange }">
        <li class=" ">不颂</li>
        <li class="avatar" @click="unfoldNav()" type="primary">
          <a href="/user" ref="avatar" @mouseenter="isShow = true">
            <img :src="$store.state.userInfo.userAvatar ? $store.state.userInfo.userAvatar : defaultAvatar" alt="" >
          </a>
          <!-- 头像悬浮卡片 -->
          <div class="avatar_card" v-if="isShow">
            <h5>{{ $store.state.userInfo.userName }}</h5>
            <h6>风花雪月</h6>
            <p>{{ $store.state.userInfo.userSign }}</p>
            <hr>
            <div class="logout" @click="logout()">
              <svg t="1640833784793" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2145" width="18" height="18"><path d="M511.991851 1023.982934c-282.320581 0-511.991381-229.679334-511.991382-511.991382 0-282.277915 229.670801-511.991381 511.991382-511.991381a510.813801 510.813801 0 0 1 344.271538 133.032427 42.640349 42.640349 0 0 1 2.901284 60.244319c-15.829067 17.493039-42.793946 18.730351-60.286985 2.901285A425.840298 425.840298 0 0 0 511.991851 85.332068c-235.26004 0-426.659485 191.399445-426.659485 426.659484 0 235.302706 191.399445 426.659485 426.659485 426.659485 105.982216 0 207.569839-39.082009 286.032518-110.078147a42.606216 42.606216 0 0 1 60.244319 2.986616 42.640349 42.640349 0 0 1-2.986616 60.244319c-94.163748 85.246565-216.103029 132.179108-343.290221 132.179109" p-id="2146" fill="#61666d"></path><path d="M885.975955 552.447404H341.328057c-23.466272 0-42.665948-19.199677-42.665948-42.665948s19.199677-42.665948 42.665948-42.665948h544.647898L792.989787 371.449918a42.77688 42.77688 0 0 1 0-60.329651 42.77688 42.77688 0 0 1 60.329651 0l158.205337 162.770593a42.58915 42.58915 0 0 1 12.356059 32.946646 42.77688 42.77688 0 0 1 0 5.879367 42.58915 42.58915 0 0 1-12.356059 32.955179L853.319438 708.442645a42.77688 42.77688 0 0 1-60.329651 0 42.77688 42.77688 0 0 1 0-60.329651l92.986168-95.674123z" p-id="2147" fill="#61666d"></path></svg>
              <span>退出登录</span>
            </div>
          </div>
        </li>
        <li class=" ">
          <a href="/">
            <i class="el-icon-s-home"></i>
            首页
          </a>
          <div class="n-line"></div>
        </li>
        <li class=" ">
          <a href="/drawer">
            <i class="el-icon-s-management"></i>
            收藏
          </a>
          <div class="n-line"></div>
        </li>
        <li class=" ">
          <a href="/notes">
            <i class="el-icon-s-order"></i>
            文档
          </a>
          <div class="n-line"></div>
        </li>
        <li class=" ">
            <a href="/timeTree">
              <i class="el-icon-s-promotion"/>
              时间树
            </a>
            <div class="n-line"></div>
        </li>
        <li class=" ">
          <a href="/topic">
            <i class="el-icon-s-comment"/>
            话题
          </a>
          <div class="n-line"></div>
        </li>
      </ul>
    </div>
    <div class="side">
      <el-drawer
        title="不颂"
        :visible.sync="isUnfold">
        <el-row class="tac">
          <el-col>
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              text-color="#fff"
              active-text-color="$colorH">
              <el-menu-item index="1">
                <a href="/index">
                  <i class="el-icon-s-home"></i>
                  首页
                </a>
                <div class="n-line"></div>
              </el-menu-item>
              <el-menu-item index="2">
                <a href="/drawer">
                  <i class="el-icon-s-management"></i>
                  收藏
                </a>
                <div class="n-line"></div>
              </el-menu-item>
              <el-menu-item index="3">
                <a href="/notes">
                  <i class="el-icon-s-order" style="width: 21px;margin-right: 8px;"></i>
                  文档
                </a>
                <div class="n-line"></div>
              </el-menu-item>
              <el-menu-item index="4">
                <a href="/timeTree">
                  <i class="el-icon-s-promotion"/>
                  时间树
                </a>
                <div class="n-line"></div>
              </el-menu-item>
              <el-menu-item index="5">
                <a href="/topic">
                  <i class="el-icon-s-comment" style="width: 21px;margin-right: 4px;"></i>
                  话题
                </a>
                <div class="n-line"></div>
              </el-menu-item>
              <el-menu-item index="10">
                <a href="/login">
                  <i class="el-icon-thumb"></i>
                  退出登录
                </a>
                <div class="n-line"></div>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-drawer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-header',
  data () {
    return {
      // 导航栏变色
      isChange: false,
      // 头像悬浮效果
      isShow: false,
      // 头像控制导航栏收缩
      isUnfold: false,
      drawer: false,
      timer: '',
      // 默认头像
      defaultAvatar: require('@/assets/images/lazy/加载中.png')
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
    // 判断页面大小变化,点击头像滚动到Index主要位置
    unfoldNav () {
      // 获取当前浏览器的宽度
      const w = window.innerWidth
      if (w <= 991) {
        this.isUnfold = true
        this.$refs.avatar.href = 'javascript:;'
      } else {
        this.isUnfold = false
        // 当前位置顶部被卷去的高度
        // console.log(window.pageYOffset)
        // 当前浏览器窗口的高度 window.innerHeight
        // console.log(window.innerHeight)
        // scrollBy(0, -window.pageYOffset + window.innerHeight - 50)
      }
    },
    // 退出登录
    logout () {
      this.$store.commit('$_removeStorage')
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/config.scss';
@import '@/assets/sass/responsive.scss';

a {
  text-decoration: none;
  color: $colorG;
  margin: 0px 2px;
}
a:hover {
  color: $colorF;
}
.changeColor {
  background: rgba($color: #fff, $alpha: 0.96);
  /* background: #f46b45;
  background: -webkit-linear-gradient(to right, #FEB692 10%, #fb7e5b);
  background: linear-gradient(to right, #FEB692 10%, #fb7854); */
  animation: topDown .2s linear ;
  color: #000000 !important;
  @keyframes topDown {
    from {
      height: 30px;
    } to {
      height: 50px;
    }
  }
  a{
    color: #000000 !important;
  }
  a:hover {
    color: $colorF !important;
  }
  // background-color: $colorH !important;
  li{
    color: #000000;
    .n-line {
        margin: 0 auto;
        position: relative;
        // height: 2px;
        width: 0px;
        // background-image: linear-gradient( 135deg, #FEB692 10%, #EA5455 100%) !important;
        border-bottom: 4px $colorF solid !important;
        transition: .1s ease-in-out;
      }
  }
}
.nav{
  z-index: 9;
  position: fixed;
  top: 0;
  height: 50px;
  padding: 10px 0;
  width: 100%;
  color: $colorG;
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
    // 网站名
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
    .avatar {
      position: relative;
      // 头像鼠标悬停效果
      &:hover{
        a{
          transition: .3s;
          position: absolute;
          display: block;
          left: 32.5px;
          // 头像向下移动并变大
          top: -10px;
          transform: scale(2.5);
          z-index: 2;
          padding-top: 20px;
        }
        .avatar_card {
          padding: 60px 30px 20px;
          transition: .5s;
          display: block;
          height: auto;
          opacity: 1;
          z-index: 1;
          border: 1px solid #ececec;
          text-align: center;
          color: #000;
          // 昵称
          h5{
            font-weight: bolder;
          }
          // 称号
          h6 {
            color: #fff;
            background: #fb7299;
            border-radius: 4px;
            width: 60px;
            margin: 0 auto;
            font-size: 12px;
            height: 21px;
            line-height: 21px;
          }
          // 个性签名
          p {
            color: #999999;
            font-size: 14px;
          }
          // 退出登录
          .logout{
            // margin-top: 8px;
            height: 35px;
            line-height: 35px;
            padding: 0 15px;
            border-radius: 8px;
            transition: .3s;
            color: #61666d;
            position: relative;
            // 小图标
            svg {
              position: absolute;
              left: 12px;
              top: 9px;
            }
            &:hover{
              background-color: #e4e4e4;
            }
          }
        }
      }
      a{
        width: 0;
        position: absolute;
        display: block;
        top: 0;
        left: 32.5px;
        // transform: translateX(-50%);
        transition: .3s;
      }
      .avatar_card {
        // 正常状态下隐藏内容
        overflow: hidden;
        transition: .3s;
        display: block;
        // 绝对定位避免动画时错位
        position: absolute;
        opacity: 0;
        width: 250px;
        top: 50px;
        height: 0;
        left: -45px;
        background: #fff;
        border-radius: 8px;
        box-sizing: border-box;
        .logout {
          font-size: 14px;
        }
      }
    }
    li:not(:first-child){
      text-align: center;
      width: 100px;
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
      display: inline-block;
      width: 100%;
      height: 100%;
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
    font-size: 24px;
    font-weight: bolder;
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
        color: $colorF !important;
      }
      color: $colorF !important;
      background: rgba($color: #d6d6d6, $alpha: 0.4) !important;
    }
    li {
      a {
        height: 100%;
        width: 100%;
        display: block;
      }
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
        border-bottom: 4px $colorF solid;
        transition: .5s ease-in-out;
      }
  }
}
</style>
