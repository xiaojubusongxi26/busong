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
        <el-input type="text" :placeholder="userInfo.username" v-model="userInfoSet.username"  maxlength="7" show-word-limit/>
        <!-- <input type="text" v-model="userInfoSet.username" :placeholder="userInfo.username"> -->
      </div>
    </li>
    <li>
      <div class="user-title">
        <span>见面语：</span>
      </div>
      <div class="user-input">
        <el-input type="text" :placeholder="userInfo.userTitle" v-model="userInfoSet.userTitle"  maxlength="6" show-word-limit/>
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
    <el-button type="primary" @click="cancelChange()">取消</el-button>
    <el-button type="primary" @click="changeUserInfo()">保存</el-button>
  </div>
</div>
</template>

<script>
export default {
  name: "BaseInfo",
  props: [],
  watch: {},
  data() {
    return {
      userInfo: '',
      userInfoSet: ''
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
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/user/setting.scss';
</style>
