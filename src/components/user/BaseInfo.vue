<template>
<div class="user_info-setting">
  <div class="user-main-header">
    <h3>基本信息</h3>
  </div>
  <ul>
    <li>
      <div class="user-title">
        <span>我的昵称：</span>
      </div>
      <div class="user-input">
        <el-input type="text" :placeholder="userInfo.userName" v-model="userInfoSet.userName"  maxlength="7" show-word-limit/>
        <!-- <input type="text" v-model="userInfoSet.username" :placeholder="userInfo.username"> -->
      </div>
    </li>
    <li>
      <div class="user-title">
        <span>见面语：</span>
      </div>
      <div class="user-input">
        <el-input type="text" :placeholder="userInfo.userTitle" v-model="userInfoSet.userTitle"  maxlength="15" show-word-limit/>
        <!-- <input type="text" v-model="userInfoSet.userTitle" :placeholder="userInfo.userTitle"> -->
      </div>
    </li>
    <li>
      <div class="user-title">
        <span>我的签名：</span>
      </div>
      <div class="user-input">
        <el-input type="text" :placeholder="userInfo.userSign" v-model="userInfoSet.userSign"  maxlength="20" show-word-limit/>
        <!-- <input type="text" v-model="userInfoSet.userSign" :placeholder="userInfo.userSign"> -->
      </div>
    </li>
    <li>
      <div class="user-title">
        <span>居住城市：</span>
      </div>
      <div class="user-input">
        <el-input type="text" :placeholder="userInfo.userCity" v-model="userInfoSet.userCity"/>
        <!-- <input type="text" v-model="userInfoSet.userCity" :placeholder="userInfo.userCity"> -->
      </div>
    </li>
  </ul>
  <div class="submit">
<!--    <el-button type="primary" @click="cancelChange()">取消</el-button>-->
    <el-button type="primary" @click="changeUserInfo()">保存</el-button>
  </div>
</div>
</template>

<script>
import {modifyUserInfo} from "@/api/settingApi";

export default {
  name: "BaseInfo",
  props: [],
  watch: {},
  data() {
    return {
      userInfo: this.$store.state.userInfo,
      userInfoSet: this.$store.state.userInfo
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
    async changeUserInfo () {
      const msg = this.checkInfo()
      if (msg !== true) {
        this.$message(msg)
      } else {
        let res = await modifyUserInfo({
          userName: this.userInfoSet.userName,
          userTitle: this.userInfoSet.userTitle,
          userSign: this.userInfoSet.userSign,
          userCity: this.userInfoSet.userCity,
        })
        if (res.status === 200) {
          this.$message.success('用户信息修改成功')
          this.$store.commit('setUserInfo', this.userInfoSet)
        }
        console.log(res)
        return
      }
    },
    checkInfo () {
      if (this.userInfoSet.username > 7) {
        return '用户名超出最大长度'
      } else if (!this.userInfoSet.userName) {
        return '请输入用户名'
      } else if (this.userInfoSet.userTitle > 15) {
        return '见面语超出最大长度'
      } else if (this.userInfoSet.userSign > 20) {
        return '签名超出最大长度'
      } else if (!this.userInfoSet.userCity) {
        return '请输入城市名称'
      }
      return true
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/user/setting.scss';
</style>
