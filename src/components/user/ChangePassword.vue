<template>
  <div class="user_info-setting">
    <div class="user-main-header">
      <h3>邮箱设置</h3>
    </div>
    <ul>
      <li>
        <div class="user-title">
          <span>当前密码：</span>
        </div>
        <div class="user-input">
          <el-input type="text" :placeholder="userInfo.username" v-model="userInfoSet.username"/>
          <!-- <input type="text" v-model="userInfoSet.username" :placeholder="userInfo.username"> -->
        </div>
      </li>
      <li>
        <div class="user-title">
          <span>验证码：</span>
        </div>
        <div class="user-input">
          <el-input type="text" :placeholder="userInfo.userTitle" v-model="userInfoSet.userTitle" />
          <el-button type="primary" @click="handleCaptcha()">{{ captcha }}</el-button>
          <!-- <input type="text" v-model="userInfoSet.userTitle" :placeholder="userInfo.userTitle"> -->
        </div>
      </li>
    </ul>
    <div class="submit">
      <!--      <el-button type="primary" @click="cancelChange()">取消</el-button>-->
      <el-button type="primary" @click="changeUserInfo()">绑定</el-button>
      <el-button type="primary" @click="changeUserInfo()">解绑</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangePassword",
  props: [],
  watch: {},
  data() {
    return {
      userInfo: '',
      userInfoSet: '',
      captcha: '发送验证码',
      totalTime: 60,
      canClick: true,    // 节流
      clockTimer: null, // 定时器
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    cancelChange () {
      this.userInfoSet = Object.assign({}, this.userInfo)
    },
    changeUserInfo () {
      const msg = this.checkInfo()
      if (msg !== true) {
        this.$message.warn(msg)
      } else {
        this.axios({
          method: 'post',
          url: 'http://localhost:1212/api/changeUserTask',
          data: this.userInfoSet
        }).then(res => {
          // console.log(res)
          if (!res.status) {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            })
          }
          this.getUserInfo()
        })
      }
    },
    checkInfo () {
      if (this.userInfoSet.username > 7) {
        return '用户名超出最大长度'
      } else if (!this.userInfoSet.username) {
        return '请输入用户名'
      } else if (this.userInfoSet.userTitle > 4) {
        return '招呼语超出最大长度'
      } else if (this.userInfoSet.userSign > 20) {
        return '签名超出最大长度'
      } else if (!this.userInfoSet.userCity) {
        return '请输入城市名称'
      }
      return true
    },
    handleCaptcha() {
      if (!this.canClick) return  // 节流 防止频繁访问接口
      this.canClick = false
      this.captcha = this.totalTime + 's后重新发送'
      let that = this
      that.clockTimer = window.setInterval(() => {
        that.totalTime--
        that.captcha = that.totalTime + 's后重新发送'
        if (that.totalTime < 0) {
          window.clearInterval(that.clockTimer)
          that.captcha = '重新发送验证码'
          that.totalTime = 60
          that.canClick = true
        }
      },1000)
    },
  },
  components: {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/user/setting.scss';
</style>
