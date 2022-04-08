<template>
  <div class="daily-container">
    <div class="write">
      <h5>我的日常</h5>
      <i class="el-icon-edit-outline" @click="showWrite = !showWrite"></i>
    </div>
    <div class="release">
      <el-collapse-transition>
        <div v-show="showWrite" class="releaseMain">
          <span>发布日常</span>
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="release.textMain">
          </el-input>
          <div class="upImgs">
            <el-upload
              action="#"
              :multiple="true"
              :limit="9"
              :on-change="addImgs"
              :disabled="hiddenUp"
              ref="upload"
              list-type="picture-card"
              :auto-upload="false">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url" alt=""
                  >
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file)"
                    >
                      <i class="el-icon-download"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
          <hr>
          <el-row>
            <el-button type="info" @click="showWrite = !showWrite">取消</el-button>
            <el-button type="primary" @click="releaseMyDaily">发布</el-button>
          </el-row>
        </div>
      </el-collapse-transition>
    </div>
    <div class="myText" v-for="(textItem,textIndex) in daily" :key="textIndex">
      <!-- 头像，名称，发布日常 -->
      <div class="myHeader">
        <img :src="$store.state.userInfo.userAvatar ? $store.state.userInfo.userAvatar : defaultAvatar" alt="">
        <div class="nTime">
          <span class="userName">{{ textItem.username }}</span>
          <span class="time">{{ textItem.releaseTime }}</span>
        </div>
        <i class="el-icon-close" @click="delDaily =  textIndex "></i>
      </div>
      <!-- 主体内容 -->
      <div class="myBody">
        <div class="text">
          {{ textItem.textMain }}
        </div>
        <div class="demo-image__preview">
          <el-image
            v-for="(item,index) in textItem.dailyImgs" :key="index+1"
            :src="item"
            fit="cover"
            :preview-src-list="textItem.dailyImgs"
            lazy>
            <div slot="placeholder" class="image-slot">
              <img src="@/assets/images/lazy/加载中.png" alt="">
            </div>
          </el-image>
        </div>
      </div>
      <!-- 底部点赞，收藏，分享，以及评论 -->
      <div class="myFooter"></div>
    </div>
    <!--  添加悬浮卡片层  -->
    <model
      title="删除任务"
      color="#bed7b4"
      submit='删除'
      :showModal="delDaily != -1"
      @cancel="delDaily = -1"
      @submit="deleteDaily()"
    >
      <template v-slot:body>
        <div>确认要删除这条动态吗？</div>
      </template>
    </model>
  </div>
</template>

<script>
import Model from '@/components/Model.vue'
export default {
  name: 'Daily',
  data () {
    return {
      // 发布动态
      showWrite: false,
      // 默认头像
      defaultAvatar: require('@/assets/images/lazy/加载中.png'),
      release: {
        id: '1',
        username: '小橘不颂兮',
        userAvatar: require('@/assets/images/avatar/mmexport1603512250737.jpg'),
        releaseTime: '',
        textMain: '',
        dailyImgs: []
      },
      // 删除动态
      delDaily: -1,
      // 照片上传
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      // 照片上传达到九张之后隐藏上传按钮
      hiddenUp: false,
      /* 日常动态数组 */
      daily: [
        {
          id: '1',
          username: '小橘不颂兮',
          userAvatar: this.$store.state.userInfo.userAvatar,
          releaseTime: '2021-12-30 12:00',
          textMain: '新年快乐~',
          dailyImgs: [
            require('@/assets/images/dailyImgs/wallhaven-3z7exy.jpg')
          ]
        },
        {
          id: '1',
          username: '小橘不颂兮',
          userAvatar: this.$store.state.userInfo.userAvatar,
          releaseTime: '2021-10-11 05:20',
          textMain: '赏心悦目如是也',
          dailyImgs: [
            require('@/assets/images/dailyImgs/wallhaven-3z2rvy.jpg'),
            require('@/assets/images/dailyImgs/wallhaven-57mly5.jpg'),
            require('@/assets/images/dailyImgs/wallhaven-57rmj5.jpg'),
            require('@/assets/images/dailyImgs/wallhaven-72lvqe.jpg'),
            require('@/assets/images/dailyImgs/wallhaven-g71pve.jpg'),
            require('@/assets/images/dailyImgs/wallhaven-g718wd.jpg')
          ]
        }
      ]
    }
  },
  components: {
    Model
  },
  methods: {
    // 删除动态
    deleteDaily () {
      console.dir(this.delDaily)
      this.daily.splice(this.delDaily, 1)
      this.delDaily = -1
    },
    // 当上传九张图片后，禁止上传
    addImgs (file, fileList) {
      if (fileList.length === 9) {
        this.hiddenUp = true
      }
      this.release.dailyImgs.push(file.url)
    },
    // 发布日常动态函数
    releaseMyDaily () {
      if (this.release.textMain === '' && this.release.dailyImgs.length === 0) {
        return
      }
      const day = {
        id: '1',
        username: '小橘不颂兮',
        userAvatar: this.$store.state.userInfo.userAvatar,
        releaseTime: '',
        textMain: '',
        dailyImgs: []
      }
      day.releaseTime = this.dateFormat('YYYY-mm-dd HH:MM', new Date())
      day.textMain = this.release.textMain
      day.dailyImgs = this.release.dailyImgs
      // console.log(this.release.releaseTime)
      // console.dir(this.release)
      // 将新添加的动态发布到我的日常里面
      this.daily.unshift(day)
      // 发布动态以后，删除已经上传的图片
      this.$refs.upload.clearFiles()
      this.release.textMain = ''
      this.release.dailyImgs = []
    },
    // 时间格式化
    dateFormat (fmt, date) {
      let ret
      const opt = {
        'Y+': date.getFullYear().toString(),
        'm+': (date.getMonth() + 1).toString(),
        'd+': date.getDate().toString(),
        'H+': date.getHours().toString(),
        'M+': date.getMinutes().toString(),
        'S+': date.getSeconds().toString()
      }
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
      for (const k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
        }
      }
      return fmt
    },
    // 删除单张图片
    handleRemove (file) {
      // 实现缩略图模板时删除文件
      const fileList = this.$refs.upload.uploadFiles
      const index = fileList.findIndex(fileItem => {
        return fileItem.uid === file.uid
      })
      fileList.splice(index, 1)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload (file) {
      console.log(file)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/config.scss';
@import '@/assets/sass/responsive.scss';
.hidden{
  display: none;
}
.daily-container{
  display: flex;
  // background-color: rgba($color: $colorG, $alpha: 0.85);
  align-items: center;
  flex-direction: column;
  margin: 15px 0 20px;
  /* 日常模块头部 */
  .write{
    width: 100%;
    margin-bottom: 5px;
    padding: 10px 20px 8px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 8px 0 rgba(97, 97, 97, 0.2), 0 6px 20px 0 rgba(63, 63, 63, 0.19);
    color: #000000;
    border-bottom: 1px $colorG solid;
    position: relative;
    h5{
      display: inline;
      font-weight: bold;
    }
    i{
      cursor: pointer;
      position: absolute;
      display: inline;
      bottom: 0;
      right: 20px;
      margin-bottom: 10px;
      font-size: 20px;
      transition: .2s !important;
    }
    /* i:hover{
      // color: $colorG;
    } */
  }
  /* 发布日常 */
  .release{
    width: 100%;
    .releaseMain{
      padding: 10px 20px 0 20px;
      margin: 10px 0;
      border-radius: 12px;
      background: rgba($color: $colorG, $alpha: 1);
      box-shadow: 0 4px 8px 0 rgba(97, 97, 97, 0.2), 0 6px 20px 0 rgba(63, 63, 63, 0.19);
      border: 1px $colorG solid;
      span{
        color: #000000;
        font-weight: bold;
        // text-shadow: 1px 1px 2px $colorK;
        margin: 5px 0;
        display: block;
      }
      /* 日常文本域样式 */
      ::v-deep .el-textarea{
        width: 80%;
        display: block;
        margin: 10px 0;
        .el-textarea__inner{
          border: 1px solid $colorC !important;
        }
        .el-textarea__inner:focus{
          border: 1px solid $colorK !important;
        }
      }
      /* 上传文件卡片样式 */
      ::v-deep .el-upload--picture-card{
        background-color: #fffdfb;
        border: 1px dashed $colorC;
        width: 120px;
        height: 120px;
        margin-bottom: 10px;
        line-height: 120px;
        i{
          color: $colorK;
        }
      }
      ::v-deep .el-upload--picture-card:hover, .el-upload:focus{
        border-color: $colorK;
        color: $colorK;
      }
      // 改变已上传照片的大小
      .upImgs{
        width: 450px;
        ::v-deep .el-upload-list--picture-card{
          li{
            width: 120px !important;
            height: 120px !important;
            span{
              margin: 0;
            }
            // 上传图标后, 悬浮操作按钮样式
            .el-upload-list__item-actions{
              display: flex;
              justify-content: center;
              align-items: center;
              span{
                margin: 0 5px;
              }
            }
          }
          img{
            position: absolute !important;
          }
        }
      }
      .el-row{
        display: flex;
        justify-content: flex-end;
        padding-bottom: 15px;
        .el-button{
          right: 0;
        }
        .el-button--info{
          background-color: $colorE;
        }
        .el-button--primary{
          background-color: $colorK;
          border: $colorK;
        }
      }
    }
  }
  .myText{
    width: 100%;
    background: rgba($color: $colorG, $alpha: 0.9);
    box-shadow: 0 4px 8px 0 rgba(97, 97, 97, 0.2), 0 6px 20px 0 rgba(63, 63, 63, 0.19);
    border-bottom: 1px $colorE solid;
    border-radius: 15px;
    margin: 10px 20px;
    padding: 34px;
    .myHeader{
      margin: 10px 0;
      height: 40px;
      display: flex;
      position: relative;
      img {
        display: inline;
        width: 40px;
        height: 40px;
        border-radius: 20px;
      }
      .nTime{
        display: inline-flex;
        margin-left: 10px;
        line-height: 20px;
        height: 40px;
        right: 0;
        flex-direction: column;
        .time{
          font-size: $fontK;
          color: #a5a5a5;
        }
      }
      .el-icon-close {
        display: inline-block;
        font-size: 20px;
        position: absolute;
        right: 0;
        cursor: pointer;
      }
    }
    .myBody{
      // min-height: 100px;
      width: 100%;
      .text{
        width: 100%;
        height: auto;
        margin: 5px;
      }
      ::v-deep .demo-image__preview{
        margin-top: 20px;
        width: 400px;
        img{
          width: 120px;
          height: 120px;
          margin: 0 3px;
        }
      }
    }
  }
}

</style>
