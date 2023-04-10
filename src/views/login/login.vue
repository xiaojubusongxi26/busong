<template>
  <div class="login">
    <div class="login_main">
      <div class="login_head">
        <h3>Welcome Back!</h3>
        <p>最是人间留不住，朱颜辞镜花辞树</p>
      </div>
      <div class="login_info">
        <!-- logo -->
        <div class="login_info_logo">
          <img src="@/assets/images/login/BUSONG.png" alt="">
        </div>
        <!-- 登录方式切换 -->
        <div class="login_info_header">
          <div :class="{header_btn: true, header_btn_focus: showLogin===1 }" @click="changeShow(1)">
            验证码登录
          </div>
          <div :class="{header_btn: true, header_btn_focus: showLogin===2 }" @click="changeShow(2)">
            密码登录
          </div>
          <div :class="{header_btn: true, header_btn_focus: showLogin===3 }" @click="changeShow(3)">
            注册
          </div>
        </div>
        <!-- 登录方式展示 -->
        <!-- 验证码登录 -->
        <div class="login_info_inputs" v-show="showLogin===1">
          <div class="login_info_input">
            <input type="text" v-model="inputObj.inputAccount" placeholder="手机号/邮箱">
          </div>
          <div class="login_info_input verification">
            <input type="text" v-model="inputObj.inputCode" placeholder="验证码">
            <div class="verification_code" @click="sendCode(inputObj.inputAccount)">获取验证码</div>
          </div>
          <div class="login_info_input">
            <button @click="loginByCode()">登录</button>
          </div>
        </div>
        <!-- 密码登录 -->
        <div class="login_info_inputs" v-show="showLogin===2">
          <div class="login_info_input">
            <input type="text" placeholder="手机号/邮箱/用户名" v-model="inputPwdObj.inputAccount">
          </div>
          <div class="login_info_input verification">
            <input type="password" placeholder="密码" v-model="inputPwdObj.inputPwd">
          </div>
          <div class="login_info_input verification">
<!--            <input type="password" placeholder="验证码">-->
<!--            <img :src="verificationPic" class="verification_code verification_code_pic">-->
            <div class="forget_pwd" @click="centerDialogVisible = true">忘记密码?</div>
          </div>
          <div class="login_info_input">
            <button @click="loginByPwd()">登录</button>
          </div>
        </div>
        <!-- 注册 -->
        <div class="login_info_inputs" v-show="showLogin===3">
          <div class="login_info_input">
            <input type="text" v-model="inputObjReg.inputAccount" placeholder="手机号/邮箱">
          </div>
          <div class="login_info_input verification">
            <input type="text" v-model="inputObjReg.inputCode" placeholder="验证码">
            <div class="verification_code" @click="sendCode(inputObjReg.inputAccount)">获取验证码</div>
          </div>
          <div class="login_info_input">
            <button @click="register()">注册</button>
          </div>
        </div>
      </div>
    </div>
    <div class="forget">
      <el-dialog
        title="忘记密码"
        :visible.sync="centerDialogVisible"
        width="40%"
        center>
        <el-steps :active="forgetActive" simple>
          <el-step title="步骤 1" icon="el-icon-edit"></el-step>
          <el-step title="步骤 2" icon="el-icon-upload"></el-step>
          <el-step title="步骤 3" icon="el-icon-picture"></el-step>
        </el-steps>
        <!-- 忘记密码校验 -->
        <el-form :model="form" v-if="forgetActive === 0">
          <el-form-item label="邮箱/手机号" :label-width="formLabelWidth">
            <el-input v-model="form.phoneOrEmail" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证码" :label-width="formLabelWidth">
            <el-input v-model="form.verification" autocomplete="off"></el-input>
            <el-link :underline="false" @click="forgetSendVerification()">发送验证码</el-link>
          </el-form-item>
        </el-form>
        <!-- 重置密码 -->
        <el-form :model="form" v-if="forgetActive === 1">
          <el-form-item label="重置密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="再次输入密码" :label-width="formLabelWidth">
            <el-input v-model="form.passwordSecond" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="forget()">下一步</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {sendVerificationCodeByEmail, sendVerificationCodeByPhone} from '@/api/authApi'
import { registerByMobileCode, loginByMobileCode } from '@/api/userApi'
import { checkAccount } from '@/utils/util'
export default {
  name: 'login',
  data () {
    return {
      // 是否存在用户
      isExistence: true,
      // 展示登录方式或注册，1 验证码登录，2 密码登录
      showLogin: 1,
      // 密码登录验证码图片
      verificationPic: require('@/assets/images/wallhaven-1krw81.png'),
      // 忘记密码展示
      centerDialogVisible: false,
      formLabelWidth: '120px',
      // 验证码登录
      inputObj: {
        inputAccount: '',
        inputCode: ''
      },
      inputPwdObj: {
        inputAccount: '',
        inputPwd: ''
      },
      inputObjReg: {
        inputAccount: '',
        inputCode: ''
      },
      // 忘记密码提交表单
      form: {
        phoneOrEmail: '',
        verification: '',
        username: '',
        password: '',
        passwordSecond: ''
      },
      forgetActive: 0
    }
  },
  methods: {
    changeShow (val) {
      // 改变登录方式
      this.showLogin = val
      // console.log(val)
    },
    // 发送验证码
    async sendCode (V) {
      if(V === '') {
        this.$message('请输入手机号或邮箱')
        return
      }
      let res
      const ACCOUNT = V
      // 登录
      if (this.showLogin === 1) {
        // 判断是邮箱还是手机号
        if (checkAccount(ACCOUNT) === 1) {
          // 手机验证码
          res = await sendVerificationCodeByPhone({
            type: 'LOGIN',
            mobile: ACCOUNT
          })
          this.$message.success('验证码已发送')
        } else if (checkAccount(ACCOUNT) === 2) {
          // 邮箱验证码
          res = await sendVerificationCodeByEmail({
            type: 'LOGIN',
            email: ACCOUNT
          })
          this.$message.success('验证码已发送')
        } else {
          this.$message('请输入正确的手机号或邮箱')
          return
        }
      } else if (this.showLogin === 3) {
        // 注册
        // 判断是邮箱还是手机号
        if (checkAccount(ACCOUNT) === 1) {
          // 手机验证码
          let {data:res} = await sendVerificationCodeByPhone({
            type: 'REGISTER',
            mobile: ACCOUNT
          })
        } else if (checkAccount(ACCOUNT) === 2) {
          // 邮箱验证码
          let {data:res} = await sendVerificationCodeByEmail({
            type: 'REGISTER',
            email: ACCOUNT
          })
        } else {
          this.$message('请输入正确的手机号或邮箱')
          return
        }
        if (res.data.code === 200) {
          this.$message.success('验证码已发送')
        }
      }
    },
    async loginByCode () {
      if (this.inputObj.inputCode === '') {
        this.$message('请输入验证码')
        return
      }
      if(this.inputObj.inputAccount === '') {
        this.$message('请输入手机号或邮箱')
        return
      }
      let res
      const ACCOUNT = this.inputObj.inputAccount
      const CODE = this.inputObj.inputCode
      if (checkAccount(ACCOUNT) === 1) {
        // 手机号登录
        let {data: res} = await loginByMobileCode({
          code: CODE,
          mobile: ACCOUNT
        })
        if (res.code === 200) {
          this.$store.commit('$_setToken', res.token)
          this.$store.commit('setUserInfo', res.user)
          this.$router.push({
            name: 'index',
            params: {
              from: 'login'
            }
          })
        }
      } else if (checkAccount(ACCOUNT) === 2) {
        // 邮箱登录
        let {data: res} = await loginByMobileCode({
          code: CODE,
          email: ACCOUNT
        })
        if (res.code === 200) {
          this.$store.commit('$_setToken', res.token)
          this.$store.dispatch('update_userInfo', res.user)
          this.$router.push({
            name: 'index',
            params: {
              from: 'login'
            }
          })
        }
      }
    },
    async loginByPwd () {
      const ACCOUNT = this.inputPwdObj.inputAccount
      const PWD = this.inputPwdObj.inputPwd
      if (!ACCOUNT) {
        this.$message('请输入手机号、邮箱或用户名')
        return
      }
      if (!PWD) {
        this.$message('请输入密码')
        return
      }
      let res
      if (checkAccount(ACCOUNT) === 1) {
        // 手机号登录
      } else if (checkAccount(ACCOUNT) === 2) {
        // 邮箱登录
      } else {
        // 默认为用户名登录
      }
    },
    async register () {
      if (this.inputObjReg.inputCode === '') {
        this.$message('请输入验证码')
        return
      }
      if(this.inputObjReg.inputAccount === '') {
        this.$message('请输入手机号或邮箱')
        return
      }
      let res
      const ACCOUNT = this.inputObjReg.inputAccount
      const CODE = this.inputObjReg.inputCode
      if (checkAccount(ACCOUNT) === 1) {
        // 手机号注册
        res = await registerByMobileCode({
          code: CODE,
          userMobile: ACCOUNT
        })
      }  else if (checkAccount(ACCOUNT) === 2)  {
        // 邮箱注册
        res = await registerByMobileCode({
          code: CODE,
          userEmail: ACCOUNT
        })
      }
      // 注册成功
      if (res.status === 200) {
        this.$message.success('注册成功')
      }
    },
    forget () {
      // TODO: 忘记密码
      if (this.forgetActive === 0) {
        // 当前为第一阶段：输入邮箱/手机号，校验验证码
        this.forgetF()
      } else if (this.forgetActive === 1) {
        // 第二阶段：重置密码
        this.forgetS()
      }
    },
    forgetF () {
      // 忘记密码：校验手机号/邮箱，验证码
      if (this.form.phoneOrEmail === '') {
        this.$message.warning('请输入邮箱/手机号')
        return false
      } else if (this.form.verification === '') {
        this.$message.warning('验证码')
        return false
      }
      // TODO: 向后端传入正确的手机号/邮箱、验证码，进入下一步重置密码
    },
    forgetS () {

    },
    forgetSendVerification () {
      // TODO: 忘记密码发送验证码
      if (this.form.phoneOrEmail === '') {
        this.$message.warning('请输入邮箱/手机号')
        return false
      } else if (checkAccount(this.form.phoneOrEmail) === 2) {
        this.emailSend()
      } else if (checkAccount(this.form.phoneOrEmail) === 1) {
        this.phoneSend()
      } else {
        this.$message.error('输入有误')
        return false
      }
    },
    getCodeByVerification () {
      // TODO: 验证码登录获取验证码
    },
    showCodeByPwd () {
      // TODO: 密码登录，获取验证码图片
    },
    emailSend (email) {
      // TODO: 根据邮箱发送验证码
    },
    phoneSend (phone) {
      // TODO: 根据手机号发送验证码
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/config.scss';
@import '@/assets/sass/login.scss';

/* element-ui 样式控制 */
.el-steps {
  display: none !important;
}
.el-input {
  input {
    width: 240px !important;
  }
}
.el-form-item__content {
  .el-link {
    position: absolute;
    right: 20px;
  }
}

</style>
