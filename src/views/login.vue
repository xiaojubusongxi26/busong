<template>
  <div class="login">
    <div class="title">
      <h1>不颂</h1>
    </div>
    <div class="login_main">
      <div class="login_info">
        <div class="info_header">
          <span :class="{ log: isLog }" @click="isLog = true">登录</span>
          <span class="slice">|</span>
          <span :class="{ log: !isLog }" @click="isLog = false">注册</span>
        </div>
        <div class="info">
          <div class="input" :class="{ focus: isUserFocus || username != '' }" placeholder="用户名">
            <input type="text" @focus="isUserFocus = true" @blur="isUserFocus = false"
            v-model="username">
          </div>
          <div class="input" :class="{ focus: isPassFocus || password != '' }" placeholder="密码">
            <input type="password" @focus="isPassFocus = true" @blur="isPassFocus = false"
            v-model="password" @keydown.enter="isLog ? login() : register()">
          </div>
          <button @click="login()" v-if="isLog">登录</button>
          <button @click="register()" v-else>注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      // 当前选项：true：登录，false：注册
      isLog: true,
      // 输入框是否获得焦点
      isUserFocus: false,
      isPassFocus: false,

      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      // 获取本地json数据
      const user = JSON.parse(localStorage.getItem('user'))
      if (this.username === '' || this.username !== user.username) {
        this.$message.warning('请输入正确的用户名')
        return
      } else if (this.password === '' || this.password !== user.password) {
        this.$message.warning('请输入正确的密码')
        return
      }
      // 添加
      /* const user = {
        username: this.username,
        password: this.password
      }
      localStorage.setItem('user', JSON.stringify(user)) */
      // 获取
      this.$router.push({
        path: '/'
      })
    },
    register () {
      if (this.username === '') {
        this.$message.warning('请输入用户名')
        return
      } else if (this.password === '') {
        this.$message.warning('请输入密码')
        return
      } else if (!/^(?=.*[a-z]|[A-Z])(?=.*\d)[^]{8,}$/.test(this.password)) {
        this.$message.warning('密码必须包含字母和数字，且至少为8位')
        return
      }
      if (JSON.parse(localStorage.getItem('user'))) {
        localStorage.removeItem('user')
      }
      const user = {
        username: this.username,
        password: this.password
      }
      localStorage.setItem('user', JSON.stringify(user))
      this.$message.success('注册成功')
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style lang="scss" socped>
@import '@/assets/sass/config.scss';
// 引入在线字体库
@import 'http://cdn.repository.webfont.com/webfonts/nomal/147559/46541/61cc8066f629d80620f0241f.css';

.login {
  .title {
    width: 1024px;
    margin: 0 auto;
    height: 150px;
    // 网站标题
    h1 {
      line-height: 150px;
      font-size: 80px;
      font-family:'JetLinkNewBoldB2cabfeda4f24067';
      font-weight: bolder;
      background-image: linear-gradient(to top, #6fbb82 0%, #c6d8a4 100%);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }
  }
  .login_main{
    width: 100%;
    height: 900px;
    background: url('~@/assets/images/wallhaven-g7dj67.jpg') no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login_info {
      width: 500px;
      height: 500px;
      border-radius: 5px;
      background: rgba($color: #fff, $alpha: 0.95);
      text-align: center;
      .info_header {
        height: 100px;
        line-height: 100px;
        color: #5a5a5a;
        text-align: center;
        font-size: 36px;
        font-weight: bolder;
        border-bottom: 1px solid #e9e9e9;
        span{
          cursor: pointer;
        }
        .log {
          color: #6fbb82;
        }
        .slice {
          margin: 0 15px;
        }
      }
      // 登录卡片
      .info {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        padding: 50px 0;
        .input {
          width: 80%;
          position: relative;
          margin: 2rem 0;
          opacity: 1;
          transition: .6s;
          // 输入框的默认文字
          &::after{
            content: attr(placeholder);
            position: absolute;
            left: 0;
            top: -10%;
            font-size: 1.2rem;
            color: #96d198;
            transition: .3s;
          }
          input {
            width: 100%;
            margin: 3px 0;
            border: none;
            // 消除input框聚焦后的边框
            outline: none;
            color: #5a5a5a;
            background: rgba($color: #000000, $alpha: 0);
            border-bottom: 2px solid #96d198;
          }
        }
        // 聚焦后，文字上移
        .focus::after {
          top: -70%;
          font-size: 1rem;
        }
        button {
          margin-top: 20px;
          width: 150px;
          height: 50px;
          border-radius: 50px;
          background-image: linear-gradient(60deg, #85d7ae 0%, #c1dda3 100%);
          box-shadow: 0px 0px 8px #b8dca5;
          color: #fff;
          border: none;
        }
      }
    }
  }
}
</style>
