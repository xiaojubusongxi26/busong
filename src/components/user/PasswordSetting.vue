<template>
  <div class="user_info-setting">
    <div class="user-main-header">
      <h3>修改密码</h3>
    </div>
    <ul>
      <li>
        <div class="user-title">
          <span>绑定手机：</span>
        </div>
        <div class="user-input">
          <span class="binding-text">{{ userInfo.userMobile ? userInfo.userMobile : '-' }}</span>
          <span class="send-code-text" v-if="userInfo.userMobile" @click="handleCaptcha('sms')">{{captcha}}</span>
        </div>
      </li>
      <li>
        <div class="user-title">
          <span>绑定邮箱：</span>
        </div>
        <div class="user-input">
          <span class="binding-text">{{ userInfo.userEmail ? userInfo.userEmail : '-' }}</span>
          <span class="send-code-text" v-if="userInfo.userEmail" @click="handleCaptcha('email')">{{captcha}}</span>
        </div>
      </li>
      <li>
        <div class="user-title">
          <span>验证码：</span>
        </div>
        <div class="user-input">
          <el-input type="text" v-model="inputObj.code" />
        </div>
      </li>
      <li>
        <div class="user-title">
          <span>新密码：</span>
        </div>
        <div class="user-input">
          <el-input type="password" v-model="inputObj.password" />
        </div>
      </li>
      <li>
        <div class="user-title">
          <span>再次输入：</span>
        </div>
        <div class="user-input">
          <el-input type="password" v-model="inputObj.passwordSecond" />
        </div>
      </li>
    </ul>
    <div class="submit">
      <!--      <el-button type="primary" @click="cancelChange()">取消</el-button>-->
      <el-button type="primary" @click="changePwd()">修改密码</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PasswordSetting",
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
      inputObj: {
        code: '',
        password: '',
        passwordSecond: ''
      }
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
.binding-text {
  display: inline-block;
  width: 200px;
  color: #707070;
}
.send-code-text {
  color: #629ac0;
  cursor: pointer;
}
</style>
