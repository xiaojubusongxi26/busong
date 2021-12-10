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
        <img src="@/assets/images/mmexport1602954427757.jpg" alt="">
        <div class="nTime">
          <span class="userName">{{ textItem.username }}</span>
          <span class="time">{{ textItem.releaseTime }}</span>
        </div>
      </div>
      <!-- 主体内容 -->
      <div class="myBody">
        <div class="text">
          {{ textItem.textMain }}
        </div>
        <div class="demo-image__preview">
          <el-image
            v-for="(item,index) in textItem.imgs" :key="index+1"
            :src="item"
            fit="cover"
            :preview-src-list="daily[0].imgs"
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
  </div>
</template>

<script>
export default {
  name: 'Daily',
  data () {
    return {
      // 发布动态
      showWrite: false,
      release: {
        id: '1',
        username: '小橘不颂兮',
        userAvatar: require('@/assets/images/mmexport1602954427757.jpg'),
        releaseTime: '',
        textMain: '',
        imgs: []
      },
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
          userAvatar: require('@/assets/images/mmexport1602954427757.jpg'),
          releaseTime: '2021-10-11 05:20',
          textMain: '你好，欢迎来到我的主页~',
          imgs: [
            require('@/assets/images/dailyImgs/pexels-alex-brites-7051439.jpg'),
            require('@/assets/images/dailyImgs/pexels-any-lane-5945758.jpg'),
            require('@/assets/images/dailyImgs/pexels-lisa-9587579.jpg'),
            require('@/assets/images/dailyImgs/pexels-maria-orlova-4946930.jpg'),
            require('@/assets/images/dailyImgs/pexels-rafael-paul-4797134.jpg'),
            require('@/assets/images/dailyImgs/pexels-hakeem-james-hausley-4516067.jpg'),
            require('@/assets/images/dailyImgs/pexels-jess-loiterton-4321505.jpg'),
            require('@/assets/images/dailyImgs/pexels-lina-kivaka-1533648.jpg'),
            require('@/assets/images/dailyImgs/pexels-tanner-vote-3612406.jpg')
          ]
        },
        {
          id: '1',
          username: '小橘不颂兮',
          userAvatar: require('@/assets/images/mmexport1602954427757.jpg'),
          releaseTime: '2021-10-11 05:20',
          textMain: '你好，欢迎来到我的主页~',
          imgs: [
            require('@/assets/images/dailyImgs/pexels-alex-brites-7051439.jpg'),
            require('@/assets/images/dailyImgs/pexels-any-lane-5945758.jpg'),
            require('@/assets/images/dailyImgs/pexels-lisa-9587579.jpg'),
            require('@/assets/images/dailyImgs/pexels-maria-orlova-4946930.jpg'),
            require('@/assets/images/dailyImgs/pexels-rafael-paul-4797134.jpg'),
            require('@/assets/images/dailyImgs/pexels-hakeem-james-hausley-4516067.jpg'),
            require('@/assets/images/dailyImgs/pexels-jess-loiterton-4321505.jpg'),
            require('@/assets/images/dailyImgs/pexels-lina-kivaka-1533648.jpg'),
            require('@/assets/images/dailyImgs/pexels-tanner-vote-3612406.jpg')
          ]
        },
        {
          id: '1',
          username: '小橘不颂兮',
          userAvatar: require('@/assets/images/mmexport1602954427757.jpg'),
          releaseTime: '2021-10-11 05:20',
          textMain: '你好，欢迎来到我的主页~',
          imgs: [
            require('@/assets/images/dailyImgs/pexels-alex-brites-7051439.jpg'),
            require('@/assets/images/dailyImgs/pexels-any-lane-5945758.jpg'),
            require('@/assets/images/dailyImgs/pexels-lisa-9587579.jpg'),
            require('@/assets/images/dailyImgs/pexels-maria-orlova-4946930.jpg'),
            require('@/assets/images/dailyImgs/pexels-rafael-paul-4797134.jpg'),
            require('@/assets/images/dailyImgs/pexels-hakeem-james-hausley-4516067.jpg'),
            require('@/assets/images/dailyImgs/pexels-jess-loiterton-4321505.jpg'),
            require('@/assets/images/dailyImgs/pexels-lina-kivaka-1533648.jpg'),
            require('@/assets/images/dailyImgs/pexels-tanner-vote-3612406.jpg')
          ]
        },
        {
          id: '1',
          username: '小橘不颂兮',
          userAvatar: require('@/assets/images/mmexport1602954427757.jpg'),
          releaseTime: '2021-10-11 05:20',
          textMain: '你好，欢迎来到我的主页~',
          imgs: [
            require('@/assets/images/dailyImgs/pexels-alex-brites-7051439.jpg'),
            require('@/assets/images/dailyImgs/pexels-any-lane-5945758.jpg'),
            require('@/assets/images/dailyImgs/pexels-lisa-9587579.jpg'),
            require('@/assets/images/dailyImgs/pexels-maria-orlova-4946930.jpg'),
            require('@/assets/images/dailyImgs/pexels-rafael-paul-4797134.jpg'),
            require('@/assets/images/dailyImgs/pexels-hakeem-james-hausley-4516067.jpg'),
            require('@/assets/images/dailyImgs/pexels-jess-loiterton-4321505.jpg'),
            require('@/assets/images/dailyImgs/pexels-lina-kivaka-1533648.jpg'),
            require('@/assets/images/dailyImgs/pexels-tanner-vote-3612406.jpg')
          ]
        }
      ]
    }
  },
  methods: {
    // 当上传九张图片后，禁止上传
    addImgs (file, fileList) {
      if (fileList.length === 9) {
        this.hiddenUp = true
      }
      this.release.imgs.push(file.url)
    },
    // 发布日常动态函数
    releaseMyDaily () {
      if (this.release.textMain === '' && this.release.imgs.length === 0) {
        return
      }
      const day = {
        id: '1',
        username: '小橘不颂兮',
        userAvatar: require('@/assets/images/mmexport1602954427757.jpg'),
        releaseTime: '',
        textMain: '',
        imgs: []
      }
      day.releaseTime = this.dateFormat('YYYY-mm-dd HH:MM', new Date())
      day.textMain = this.release.textMain
      day.imgs = this.release.imgs
      // console.log(this.release.releaseTime)
      // console.dir(this.release)
      // 将新添加的动态发布到我的日常里面
      this.daily.unshift(day)
      // 发布动态以后，删除已经上传的图片
      this.$refs.upload.clearFiles()
      this.release.textMain = ''
      this.release.imgs = []
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
      console.log('这里')
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
  /* 日常模块头部 */
  .write{
    width: 100%;
    margin: 0;
    padding: 25px 20px 5px;
    background-color: $colorF;
    border-radius: 6px;
    box-shadow: 0 4px 8px 0 rgba(97, 97, 97, 0.2), 0 6px 20px 0 rgba(63, 63, 63, 0.19);
    color: $colorJ;
    border-bottom: 1px $colorG solid;
    position: relative;
    h5{
      display: inline;
      font-family: $familyA;
      font-weight: bold;
    }
    i{
      cursor: pointer;
      position: absolute;
      display: inline;
      bottom: 0;
      right: 20px;
      margin-bottom: 7px;
      font-size: 20px;
      transition: .2s !important;
    }
    i:hover{
      color: $colorG;
    }
  }
  /* 发布日常 */
  .release{
    width: 100%;
    .releaseMain{
      padding: 10px 20px 0 20px;
      margin-top: 10px;
      border-radius: 6px;
      background: rgba($color: $colorL, $alpha: 0.9);
      box-shadow: 0 4px 8px 0 rgba(97, 97, 97, 0.2), 0 6px 20px 0 rgba(63, 63, 63, 0.19);
      border: 1px $colorF solid;
      span{
        color: $colorB;
        text-shadow: 1px 1px 2px $colorF;
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
          border: 1px solid $colorF !important;
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
          color: $colorF;
        }
      }
      ::v-deep .el-upload--picture-card:hover, .el-upload:focus{
        border-color: $colorF;
        color: $colorF;
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
          background-color: $colorF;
          border: $colorF;
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
          color: $colorD;
        }
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
