<template>
  <div class="cropper-content">
    <div class="cropper-box">
      <div class="cropper">
        <vue-cropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.outputSize"
            :outputType="option.outputType"
            :info="option.info"
            :canScale="option.canScale"
            :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            :full="option.full"
            :fixedBox="option.fixedBox"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :centerBox="option.centerBox"
            :height="option.height"
            :infoTrue="option.infoTrue"
            :maxImgSize="option.maxImgSize"
            :enlarge="option.enlarge"
            :mode="option.mode"
            @realTime="realTime"
            @imgLoad="imgLoad">
        </vue-cropper>
      </div>
      <!--底部操作工具按钮-->
      <div class="footer-btn">
        <div class="scope-btn">
          <label class="btn" for="uploads">选择封面</label>
          <input type="file" id="uploads" name="bg" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="selectImg($event)">
          <el-button size="mini" type="danger" plain icon="el-icon-zoom-in" @click="changeScale(1)">放大</el-button>
          <el-button size="mini" type="danger" plain icon="el-icon-zoom-out" @click="changeScale(-1)">缩小</el-button>
          <el-button size="mini" type="danger" plain @click="rotateLeft">↺ 左旋转</el-button>
          <el-button size="mini" type="danger" plain @click="rotateRight">↻ 右旋转</el-button>
        </div>
        <div class="upload-btn">
          <el-button size="mini" type="success" @click="uploadImg('blob')">上传封面 <i class="el-icon-upload"></i></el-button>
        </div>
      </div>
    </div>
    <!--预览效果图-->
    <div class="show-preview">
      <div :style="previews.div" class="preview">
        <img :src="previews.url" :style="previews.img">
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { VueCropper } from 'vue-cropper'
export default {
  name: "CropperImage",
  components: {
    VueCropper
  },
  props:['Name'],
  data() {
    return {
      name:this.Name,
      previews: {},
      file: null,
      option:{
        img: '',             //裁剪图片的地址
        outputSize: 1,       //裁剪生成图片的质量(可选0.1 - 1)
        outputType: 'jpeg',  //裁剪生成图片的格式（jpeg || png || webp）
        info: true,          //图片大小信息
        canScale: true,      //图片是否允许滚轮缩放
        autoCrop: true,      //是否默认生成截图框
        autoCropWidth: 350,  //默认生成截图框宽度
        autoCropHeight: 220, //默认生成截图框高度
        fixed: true,         //是否开启截图框宽高固定比例
        fixedNumber: [1.83, 1], //截图框的宽高比例
        full: true,         //按原比例裁切图片，不失真
        fixedBox: true,      //固定截图框大小，不允许改变
        canMove: true,      //上传图片是否可以移动
        canMoveBox: true,    //截图框能否拖动
        original: true,     //上传图片按照原始比例渲染
        centerBox: false,    //截图框是否被限制在图片里面
        height: true,        //是否按照设备的dpr 输出等比例图片
        infoTrue: true,     //true为展示真实输出图片宽高，false展示看到的截图框宽高
        maxImgSize: 3000,    //限制图片最大宽度和高度
        enlarge: 1,          //图片根据截图框输出比例倍数
        mode: '1000px 600px'  //图片默认渲染方式
      }
    };
  },
  methods: {
    //初始化函数
    imgLoad (msg) {
      // console.log("工具初始化函数====="+msg)
    },
    //图片缩放
    changeScale (num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    //向左旋转
    rotateLeft () {
      this.$refs.cropper.rotateLeft()
    },
    //向右旋转
    rotateRight () {
      this.$refs.cropper.rotateRight()
    },
    //实时预览函数
    realTime (data) {
      this.previews = data
    },
    //选择图片
    selectImg (e) {
      let file = e.target.files[0]
      this.file = file
      if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) {
        this.$message({
          message: '图片类型要求：jpeg、jpg、png',
          type: "error"
        });
        return false
      }
      //转化为blob
      let reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        this.option.img = data
      }
      // 转化为base64
      reader.readAsDataURL(file)
    },
    // 上传图片
    uploadImg (type) {
      if (type === 'blob') {
        //获取截图的blob数据
        this.$refs.cropper.getCropBlob(async (file) => {
          let formData = new FormData();
          this.$axios({
            url: "/open/thirdpart/oss/upload/policy",
            method: "post",
            headers: {
              Authorization:
                "Bearer " +  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoyMDAsInVzZXJfbmFtZSI6InlpeGloYW4iLCJ1c2VyTW9iaWxlIjoiMTc2MjM4NTA0MjYiLCJzY29wZSI6WyJhbGwiXSwiYXRpIjoiZjIxMTQ2YzEtNzJjMi00NzM1LWJjZjUtZGY2ZTZhMGM5YzMzIiwidXNlckVtYWlsIjoiMzExMzc4ODk5N0BxcS5jb20iLCJleHAiOjE2NjkwMTEzNzIsInVzZXJOYW1lIjoieWl4aWhhbiIsInVzZXJJZCI6MSwiYXV0aG9yaXRpZXMiOlsiU1VQRVJfQURNSU4iLCJVU0VSIiwiQURNSU4iXSwianRpIjoiZTY2YzkxY2UtOTE0OS00OTM0LWFkMjctNTUzNmZjNjAyMDhjIiwiY2xpZW50X2lkIjoieWljb2RlIn0.Se14afGczLJvTVmmyUoJCHfm5jY25GNLTK2tEo_tzT_nbHib6Rbshn43DIGDPOINxFDAqNgjDig6g5aooQcD6BKTwT1SMMXKmTF876-icDXrIB6A5C_JPo-4Sjk8WTe8ZEI_svT-G1XCL9yUqNvhE9OZrpPteWW_LbhNm537gQTYbzrV3C-RDcDYzz52pnBKZm01R0X5yAGluCtbAMXsXCe-97m7revAOFwx3ww1k2kmptzn-JYTm_Ack0FG1kg6Oya0DFF21EMJmYkmlnNCQEiTTpxzkXXPiMpq1cO0ZpTbIFo5djIkVjVpRkgW83clEeGc8UWzKX3ljI-3WguNLg",
            },
            data: {
              fileDir: this.$store.state.userInfo.userId + "userBg",
              userId: this.$store.state.userInfo.userId,
            },
          }).then(({ data }) => {
            console.log(data, 'file')
            data = data.data
            formData.append("policy", data.policy)
            formData.append("signature", data.signature)
            formData.append("key", data.dir + this.getUUID() + "_${filename}")
            formData.append("ossaccessKeyId", data.accessKey)
            formData.append("host", data.host)
            formData.append("dir", data.dir)
            formData.append('file', this.file)

            // 第三步, 上传文件
            this.asyncUploadImg(formData).then(() => {
              // 第四步, 拼装 url
              const url = formData.get("host") + "/" + formData.get("key").replace("${filename}", this.file.name)
              this.$store.dispatch('update_userInfo', {
                ...this.$store.state.userInfo,
                userBg: url
              })
              this.$message.success('修改成功')
            })
          });
        })
      }
    },
    // 异步方法 => 上传图片至 OSS
    async asyncUploadImg(data) {
      await this.$axios({
        url: "https://busong-tch.oss-cn-chengdu.aliyuncs.com",
        method: 'post',
        headers: {
          "Content-Type": "multipart/form-data"
        },
        data: data
      })
    },
    //生成uuid
    getUUID() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        return (
          c === "x" ? (Math.random() * 16) | 0 : "r&0x3" | "0x8"
        ).toString(16);
      });
    },
    async getUserInfo () {
      // 获取背景图
      this.axios({
        url: 'http://localhost:1212/api/getUserBg',
        method: 'get',
        responseType: 'blob'
      }).then(res => {
        // console.log('封面', res)
        const userBg = URL.createObjectURL(new Blob([res.data]))
        this.$store.dispatch('update_userBg', userBg)
      })
    }
  },
}
</script>

<style scoped lang="scss">
.cropper-content{
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  .cropper-box{
    flex: 1;
    width: 100%;
    .cropper{
      width: auto;
      height: 300px;
    }
  }

  .show-preview{
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    .preview{
      overflow: hidden;
      border:1px solid #67c23a;
      background: #cccccc;
    }
  }
}
.footer-btn{
  margin-top: 30px;
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  .scope-btn{
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    padding-right: 10px;
  }
  .upload-btn{
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
  }
  .btn {
    outline: none;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 8px 15px;
    font-size: 12px;
    border-radius: 3px;
    color: #fff;
    background-color: #409EFF;
    border-color: #409EFF;
    margin-right: 10px;
  }
}
</style>

