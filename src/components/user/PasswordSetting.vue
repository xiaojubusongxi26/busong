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
import http from '@/utils/axios/http'
import {resetByEmail, resetByMobile} from "@/api/userApi";
import {sendVerificationCodeByEmail, sendVerificationCodeByPhone} from "@/api/authApi";
export default {
  name: "PasswordSetting",
  props: {
    userInfo: {
      type: Object,
      default: {}
    }
  },
  watch: {},
  data() {
    return {
      userInfoSet: '',
      captcha: '发送验证码',
      totalTime: 60,
      codeType: 'email',
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
    handleCaptcha(type) {
      if (!this.canClick) return  // 节流 防止频繁访问接口
      this.codeType = type
      this.canClick = false
      this.captcha = this.totalTime + 's后重新发送'
      let that = this
      this.sendCode()
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
    // 发送验证码
    async sendCode () {
      if (this.codeType === 'sms') {
        let res = await sendVerificationCodeByPhone({
          mobile: this.userInfo.userMobile,
          type: 'RESET_PASSWORD'
        })
      } else {
        let res = await sendVerificationCodeByEmail({
          email: this.userInfo.userEmail,
          type: 'RESET_PASSWORD'
        })
      }
      this.$message.success('验证码已发送')
    },
    // 修改密码
    async changePwd () {
      if (!this.inputObj.code) {
        this.$message('请输入验证码')
        return
      }
      if (!this.inputObj.password || !this.inputObj.passwordSecond) {
        this.$message('请输入密码')
        return
      }
      if (this.inputObj.password !== this.inputObj.passwordSecond) {
        this.$message('两次输入密码不一致')
        return
      }
      let res
      if (this.codeType === 'sms') {
        // 手机号重置
        res = await resetByMobile({
          code: this.inputObj.code,
          mobile: this.userInfo.userMobile,
          password: this.inputObj.password
        })
      } else {
        // 邮箱重置
        res = await resetByEmail({
          code: this.inputObj.code,
          email: this.userInfo.userEmail,
          password: this.inputObj.password
        })
      }
      if (res.status === 200) {
        this.$message.success('修改密码成功')
      }
    }
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
