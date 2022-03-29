<template>
  <div class="user-container">
    <div class="bg" ></div>
    <div class="header" ref="userimg" @click="changeImg = true">
      <div class="maskBg" v-if="changeImg" @click.stop="changeImg = false">
      </div>
      <div class="selectBg" v-if="changeImg">
        <cropper-image
          ref="cropper"
        ></cropper-image>
      </div>
    </div>
    <div class="user-main">
      <div class="user-avater">
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
        <input type="text" class="username" v-model='userName'>
      </div>
      <div class="user-sign">
        <input type="text" class="sign" v-model="userSign">
      </div>
      <div class="user-info">
        <span>首页标题:</span>
        <input type="text"  v-model="userTitle">
      </div>
      <div class="user-info">
        <span>城市:</span>
        <input type="text"  v-model="userCity">
      </div>
      <div class="user-info">
        <span>标签:</span>
        <input type="text"  v-model="userLabel">
      </div>
      <div class="user-info">
        <span>主题颜色:</span>
        <el-color-picker v-model="userColor"></el-color-picker>
      </div>
      <div class="user-info" style="margin-bottom: 0 !important">
        <span>首页跳动文字:</span>
        <input type="text" placeholder="按下回车键添加内容"  v-model="userWord" @keydown.enter="addWords">
      </div>
      <div class="user-info words">
        <p v-for="(item, index) in words" :key="index">
          {{ item }}
          <i class="el-icon-close del" @click="delWord(index)"></i>
        </p>
      </div>
      <div class="submit">
        <el-button type="primary" @click="submit()">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import CropperImage from '../components/CropperImage.vue'
export default {
  components: { CropperImage },
  name: 'user',
  data () {
    return {
      // 默认头像
      defaultAvatar: require('@/assets/images/lazy/加载中.png'),
      userAvatar: require('@/assets/images/avatar/mmexport1603512250737.jpg'),
      userName: '小橘不颂兮',
      userTitle: '好久不见',
      userLabel: '风花雪月',
      userCity: '成都',
      userSign: '最是人间留不住，朱颜辞镜花辞树',
      userBg: require('@/assets/images/home/755ce8eegy1gjw0am3xs8j21fe2us1ky.png'),
      userColor: '#2d3059',
      userWord: '',
      changeImg: false,
      words: [
        '你要去相信,时光且长,你终将长成自己想要的模样,拥抱独属于你的未来.',
        '你的心要如溪水般柔软,你的眼波要像春天般明媚.',
        '愿所有梦见过远方的人,心有惊雷,生似静湖.'
      ]
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
    // 添加文字组内容
    addWords () {
      const len = this.userWord.length
      if (len > 50) {
        this.$message.warning('只能输入50个字以内的句子')
        return
      }
      if (this.userWord) {
        this.words.push(this.userWord)
        this.userWord = ''
      }
    },
    // 删除句子
    delWord (index) {
      this.words.splice(index, 1)
    },
    // 保存个人信息修改
    submit () {
      if (this.userAvatar === '' || this.userName === '' || this.userTitle === '' ||
      this.userCity === '' || this.userSign === '') {
        this.$message.error('请填写所有的信息哦~')
      }
    }
  },
  mounted () {
    this.$refs.userimg.style.backgroundImage = 'url(' + this.userBg + ')'
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
    background-color: #f8f8f8;
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-position: bottom;
    position: fixed;
    z-index: -10;
  }
  .header {
    height: 55vh;
    width: 100vw;
    background-image: url('~@/assets/images/home/755ce8eegy1gjw0am3xs8j21fe2us1ky.png');
    background-size: cover;
    .maskBg {
      background: rgba($color: #d9d9d9, $alpha: 0.6);
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      z-index: 10;
    }
    // 图片裁切
    .selectBg {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
    }
  }
  .user-main {
    width: 100vw;
    max-width: 1000px;
    padding: 100px 170px;
    backdrop-filter: blur(3px);
    background-color: rgba($color: rgb(255, 255, 255), $alpha: 1);
    position: relative;
    .user-avater{
      position: absolute;
      width: 120px;
      height: 120px;
      top: -80px;
      left: 40px;
      .avatar {
        width: 120px;
        height: 120px;
        border-radius: 60px;
        display: block;
        object-fit: cover;
      }
      .avatar-uploader .el-upload {
        height: 120px !important;
        border: none !important;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
    }
    input {
      // width: 100%;
      outline: none;
      border: none;
      background: rgba($color: #000000, $alpha: 0);
      color: #fff;
      cursor: pointer;
    }
    .user-name {
      position: absolute;
      // width: 120px;
      top: -72px;
      left: 170px;
      color: #fff;
      .username{
        font-size: 24px;
        font-weight: bolder;
      }
    }
    .user-sign{
      position: absolute;
      width: 360px;
      top: -35px;
      left: 170px;
      input{
        width: 100%;
        font-size: 14px;
        color: #d9d9d9;
      }
    }
    .user-info {
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #d9d9d9;
      width: 100%;
      margin: 72px 0;
      span{
        display: inline-block;
        margin-right: 20px;
        color: #61666d;
      }
      input{
        display: inline-block;
        color: #61666d;
      }
      .el-color-picker {
        // 颜色选择器
        top: 12px;
      }
    }
    // 文字组
    .words {
      height: auto;
      border-bottom: 0;
      margin: 0;
      // 文本内容
      p {
        // height: 30px;
        line-height:30px;
        font-size: 14px;
        color: #666666;
        margin: 0;
        display: flex;
        align-items: center;
        position: relative;
        // 删除
        .del {
          position: absolute;
          right: 0;
          cursor: pointer;
        }
      }
    }
    .submit{
      width: 100%;
      border-bottom: 0;
      margin-top: 40px;
      button {
        display: block;
        margin: 0 auto;
      }
      ::v-deep .el-button--primary {
        background:$colorK;
        border-color: $colorK;
      }
    }
  }
}
</style>
