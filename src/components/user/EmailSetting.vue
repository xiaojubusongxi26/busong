<template>
  <div class="user_info-setting">
    <div class="user-main-header">
      <h3>邮箱设置</h3>
    </div>
    <ul>
      <li>
        <div class="user-title">
          <span>绑定邮箱：</span>
        </div>
        <div class="user-input">
          <el-input type="text" v-model="userInfoSet.userEmail"/>
        </div>
      </li>
      <li>
        <div class="user-title">
          <span>验证码：</span>
        </div>
        <div class="user-input">
          <el-input type="text" v-model="userInfoSet.code" />
          <span class="verification_code" @click="handleCaptcha()">{{ captcha }}</span>
        </div>
      </li>
    </ul>
    <div class="submit">
      <el-button type="primary" v-if="!$store.state.userInfo.userEmail" @click="binding()">绑定</el-button>
      <el-button type="primary" v-else @click="unbinding()">解绑</el-button>
    </div>
  </div>
</template>

<script>
import {sendVerificationCodeByEmail} from "@/api/authApi";
import {bindingEmail, unBindingEmail} from "@/api/settingApi";

export default {
  name: "EmailSetting",
  props: [],
  watch: {},
  data() {
    return {
      userInfoSet: {
        userEmail: this.$store.state.userInfo.userEmail ? this.$store.state.userInfo.userEmail : null,
        code: null
      },
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
    // 绑定
    async binding () {
      if (!this.userInfoSet.userEmail) {
        this.$message('请输入邮箱')
      }
      if (!this.userInfoSet.code) {
        this.$message('请输入验证码')
      }
      let res = await bindingEmail({
        email: this.userInfoSet.userEmail,
        code: this.userInfoSet.code
      })
      console.log(res)
      if (res.code === 200) {
        this.$store.commit('setUserInfo', {
          ...this.$store.state.userInfo,
          userEmail: this.userInfoSet.userEmail
        })
        this.userInfoSet.userEmail = null
        this.userInfoSet.code = null
        this.$message.success('绑定成功')
      }
    },
    // 解绑
    async unbinding () {
      if (!this.userInfoSet.userEmail) {
        this.$message('请输入邮箱')
      }
      if (!this.userInfoSet.code) {
        this.$message('请输入验证码')
      }
      let res = await unBindingEmail({
        email: this.userInfoSet.userEmail,
        code: this.userInfoSet.code
      })
      this.userInfoSet.userEmail = null
      this.userInfoSet.code = null
      this.$store.commit('setUserInfo', {
        ...this.$store.state.userInfo,
        userEmail: null
      })
    },
    async sendCode() {
      let res = await sendVerificationCodeByEmail({
        email: this.userInfoSet.userEmail,
        type: 'COMMON'
      })
      this.$message.success('验证码已发送')
    },
    handleCaptcha() {
      if (!this.canClick) return  // 节流 防止频繁访问接口
      this.canClick = false
      this.captcha = this.totalTime + 's后重新发送'
      this.sendCode()
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
