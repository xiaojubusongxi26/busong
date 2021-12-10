<template>
  <div class="user-container">
    <div class="bg"></div>
    <div class="nav-header"></div>
    <div class="user-main">
      <div class="user-avater">
        <span class="block">头像：</span>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img :src="userAvatar ? userAvatar : defaultAvatar" class="avatar">
        </el-upload>
      </div>
      <div class="user-name">
        <span class="block">昵称：</span>
        <el-input
          placeholder="大侠请留名哦~"
          v-model="userName"
          maxlength="6"
          show-word-limit
          clearable>
        </el-input>
      </div>
      <div class="user-title">
        <span class="block">标题：</span>
        <el-input
          placeholder="这个是首页标题的文字哦，快来自定义吧！"
          v-model="userTitle"
          maxlength="6"
          show-word-limit
          clearable>
        </el-input>
      </div>
      <div class="user-city">
        <span class="block">城市：</span>
        <el-input
          placeholder="你会在什么地方呢？"
          v-model="userCity"
          clearable>
        </el-input>
      </div>
      <div class="user-sign">
        <span class="block">个性签名：</span>
        <el-input
          type="textarea"
          :rows="4"
          placeholder="时间和生活在你身上会留下什么？"
          v-model="userSign">
        </el-input>
      </div>
      <div class="user-sign">
        <span class="block">主题颜色:</span>
        <el-color-picker v-model="userColor"></el-color-picker>
      </div>
      <div class="user-bg">
        <span class="block">背景图片:</span>
        <el-upload
          class="bg-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img :src="userBg ? userBg : defaultAvatar" class="avatar">
        </el-upload>
      </div>
      <div class="submit">
        <el-button type="primary" @click="submit()">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
      // 默认头像
      defaultAvatar: require('@/assets/images/lazy/加载中.png'),
      userAvatar: require('@/assets/images/mmexport1602954427757.jpg'),
      userName: '小橘不颂兮',
      userTitle: '小橘不颂兮',
      userCity: '成都',
      userSign: '最是人间留不住，朱颜辞镜花辞树',
      userBg: require('@/assets/images/wallhaven-1krw81.png'),
      userColor: '#fb7e5b'
    }
  },
  methods: {
    // 头像上传成功钩子函数
    handleAvatarSuccess (res, file) {
      this.userAvatar = URL.createObjectURL(file.raw)
      console.log(this.userAvatar)
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
    },
    // 保存个人信息修改
    submit () {
      if (this.userAvatar === '' || this.userName === '' || this.userTitle === '' ||
      this.userCity === '' || this.userSign === '') {
        this.$message.error('请填写所有的信息哦~')
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/sass/config.scss';
@import '@/assets/sass/responsive.scss';

.user-container {
  width: 100vw;
  margin: 0;
  padding: 0;
  // height: 100vh;
  // max-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  .bg{
    top: 0;
    background: url('~@/assets/images/home/bg-logo.svg');  /* fallback for old browsers */
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-position: bottom;
    position: fixed;
    z-index: -10;
  }
  .nav-header {
    position: absolute;
    z-index: 8;
    top: 0;
    width: 100vw;
    height: 50px;
    background-image: linear-gradient( 135deg, #FEB692 10%, #fb7e5b 100%) !important;
  }
  .user-main {
    width: 100vw;
    max-width: 1000px;
    padding: 100px 150px;
    backdrop-filter: blur(3px);
    background-color: rgba($color: rgb(238, 238, 238), $alpha: 0.25);
    div {
      width: 100%;
      height: 150px;
      border-bottom: 1px #ddd solid;
      display: flex;
      align-items: center;
      ::v-deep .el-input__inner{
        border: 2px solid #8c939d;
        &:focus {
          color: #fb7e5b;
          border: 2px solid #fb7e5b;
        }
      }
      ::v-deep .el-textarea__inner {
        border: 2px solid #8c939d;
        &:focus {
          color: #fb7e5b;
          border: 2px solid #fb7e5b;
        }
      }
    }
    // span标签，文字信息
    .block {
      width: 120px;
      font-weight: bolder;
    }
    .user-avater,
    .user-bg {
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
      }
      .avatar {
        width: 120px;
        height: 120px;
        display: block;
        object-fit: cover;
      }
    }
    .user-bg {
      .avatar-uploader-icon {
        width: 180px;
      }
      .avatar {
        width: 180px;
      }
    }
    .submit{
      width: 100%;
      border-bottom: 0;
      button {
        display: block;
        margin: 0 auto;
      }
      ::v-deep .el-button--primary {
        background:#fb7e5b;
        border-color: #fb7e5b;
      }
    }
  }
}
</style>
