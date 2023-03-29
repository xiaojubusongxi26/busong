<template>
<div class="user-pre">
  <div class="user-avater">
    <el-upload
      name="head"
      class="avatar-uploader"
      :action="'http://localhost:1212/api/article_upload/' + $store.state.userInfo.id "
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img :src="$store.state.userInfo.userAvatar ? $store.state.userInfo.userAvatar : defaultAvatar" class="avatar">
    </el-upload>
  </div>
  <div class="user-name-sign">
    <div class="user-name">
      <input type="text" class="username" v-model='$store.state.userInfo.username' readonly>
    </div>
    <div class="user-sign">
      <input type="text" class="sign" v-model="$store.state.userInfo.userSign" readonly>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'UserPre',
  components: {},
  props: {},
  data () {
    return {
      userName: '小橘不颂兮',
      userSign: '最是人间留不住，朱颜辞镜花辞树',
      // 默认头像
      defaultAvatar: require('@/assets/images/lazy/加载中.png'),
      userAvatar: require('@/assets/images/avatar/mmexport1603512250737.jpg'),
      userInfo: this.$store.state.userInfo
    }
  },
  computed: {},
  methods: {
    // 头像上传成功钩子函数
    handleAvatarSuccess (res, file) {
      this.userAvatar = URL.createObjectURL(file.raw)
      this.$store.commit('setUserAvatar', this.userAvatar)
    },
    // 上传文件之前的钩子，参数为上传的文件
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 4
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 4MB!')
      }
      return isJPG && isLt2M
    }
  },
  created () {
  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
.user-pre {
  width: 100vw;
  max-width: 1000px;
  backdrop-filter: blur(3px);
  margin-top: 20px;
  padding: 20px 50px;
  border-radius: 8px;
  border-left: 10px solid #418ac3;
  background-color: rgba($color: rgb(255, 255, 255), $alpha: 1);
  box-shadow: 0 2px 4px 0 rgba(97, 97, 97, 0.2), 0 3px 5px 0 rgba(131, 131, 131, 0.19);
  display: flex;
  align-items: center;
  input {
    // width: 100%;
    outline: none;
    border: none;
    user-select: none;
    background: rgba($color: #000000, $alpha: 0);
    color: #fff;
    cursor: pointer;
  }
  .user-avater{
    width: 80px;
    height: 80px;
    top: -80px;
    left: 40px;
    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 60px;
      display: block;
      object-fit: cover;
    }
    .avatar-uploader .el-upload {
      height: 80px !important;
      border: none !important;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
  }
  .user-name-sign {
    color: #418ac3;
    margin-left: 26px;
    padding: 5px 0;
    height: 80px;
    width: 300px;
    .user-name{
      height: 35px;
      line-height: 35px;
      font-size: 18px;
      font-weight: bolder;
      input {
        width: 100%;
        color: #418ac3;
        &:focus {
          border-bottom: 1px solid #FFFFFF;
        }
      }
    }
    .user-sign{
      height: 35px;
      line-height: 35px;
      width: 100%;
      font-size: 14px;
      color: #000000;
      input {
        width: 100%;
        color: #000000;
        &:focus {
          border-bottom: 1px solid #FFFFFF;
        }
      }
    }
  }
}
</style>
