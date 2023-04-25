<template>
<div class="user-pre">
  <div class="user-avater">
    <el-upload
      name="file"
      class="avatar-uploader"
      action="https://busong-tch.oss-cn-chengdu.aliyuncs.com"
      :data="dataObj"
      :show-file-list="false"
      :multiple="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img :src="userInfo.userAvatar ? userInfo.userAvatar : defaultAvatar" class="avatar">
    </el-upload>
  </div>
  <div class="user-name-sign">
    <div class="user-name">
      <input type="text" class="username" v-model='userName' readonly>
    </div>
    <div class="user-sign">
      <input type="text" class="sign" v-model="userSign" readonly>
    </div>
  </div>
  <div class="user-settings">
    <div @click="changeIndex(1)">
      <i class="el-icon-user"></i>
      <span>基本信息</span>
    </div>
    <div @click="changeIndex(2)">
      <i class="el-icon-message"></i>
      <span>邮箱绑定</span>
    </div>
    <div @click="changeIndex(3)">
      <i class="el-icon-mobile-phone"></i>
      <span>手机绑定</span>
    </div>
    <div @click="changeIndex(4)">
      <i class="el-icon-key"></i>
      <span>修改密码</span>
    </div>
  </div>
</div>
</template>

<script>
import {uploadFile} from "@/api/commonApi";
import {modifyUserInfo} from "@/api/settingApi";

export default {
  name: 'UserPre',
  components: {},
  props: {
    userInfo: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      // 请求头
      header: {
        token: this.$store.state.token
      },
      userName: this.userInfo.userName,
      userSign: this.userInfo.userSign,
      dataObj: {},
      // 默认头像
      defaultAvatar: require('@/assets/images/lazy/加载中.png'),
      userAvatar: require('@/assets/images/avatar/mmexport1603512250737.jpg'),
    }
  },
  computed: {},
  methods: {
    // 自定义上传
    handleFileUpload () {

    },
    // 切换索引
    changeIndex (val) {
      this.$emit('changeIndex', val)
    },
    // 头像上传成功钩子函数
    async handleAvatarSuccess (res, file) {
      // console.log(file, res)
      console.log(this.dataObj.host + "/" + this.dataObj.key.replace("${filename}", file.name))
      const url = this.dataObj.host + "/" + this.dataObj.key.replace("${filename}", file.name)
      // this.userAvatar = URL.createObjectURL(file.raw)
      this.$store.commit('setUserAvatar', url)
      let res1 = await modifyUserInfo({
        userAvatar: url
      })
      if (res1.status === 200) {
        this.$message.success('头像修改成功')
      }
    },
    // 上传文件之前的钩子，参数为上传的文件
    async beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 4
      return new Promise((resolve, reject) => {
        new Promise((resolve, reject) => {
          console.log("reject : {}", reject);
          this.$axios({
            url: "/open/thirdpart/oss/upload/policy",
            method: "post",
            headers: {
              Authorization:
                "Bearer " +  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoyMDAsInVzZXJfbmFtZSI6InlpeGloYW4iLCJ1c2VyTW9iaWxlIjoiMTc2MjM4NTA0MjYiLCJzY29wZSI6WyJhbGwiXSwiYXRpIjoiZjIxMTQ2YzEtNzJjMi00NzM1LWJjZjUtZGY2ZTZhMGM5YzMzIiwidXNlckVtYWlsIjoiMzExMzc4ODk5N0BxcS5jb20iLCJleHAiOjE2NjkwMTEzNzIsInVzZXJOYW1lIjoieWl4aWhhbiIsInVzZXJJZCI6MSwiYXV0aG9yaXRpZXMiOlsiU1VQRVJfQURNSU4iLCJVU0VSIiwiQURNSU4iXSwianRpIjoiZTY2YzkxY2UtOTE0OS00OTM0LWFkMjctNTUzNmZjNjAyMDhjIiwiY2xpZW50X2lkIjoieWljb2RlIn0.Se14afGczLJvTVmmyUoJCHfm5jY25GNLTK2tEo_tzT_nbHib6Rbshn43DIGDPOINxFDAqNgjDig6g5aooQcD6BKTwT1SMMXKmTF876-icDXrIB6A5C_JPo-4Sjk8WTe8ZEI_svT-G1XCL9yUqNvhE9OZrpPteWW_LbhNm537gQTYbzrV3C-RDcDYzz52pnBKZm01R0X5yAGluCtbAMXsXCe-97m7revAOFwx3ww1k2kmptzn-JYTm_Ack0FG1kg6Oya0DFF21EMJmYkmlnNCQEiTTpxzkXXPiMpq1cO0ZpTbIFo5djIkVjVpRkgW83clEeGc8UWzKX3ljI-3WguNLg",
            },
            data: {
              fileDir: "22-11-16",
              userId: 100000006,
            },
          }).then(({ data }) => {
            resolve(data);
          });
        })
          .then(({ data }) => {
            console.log("response : ", data);
            this.dataObj.policy = data.policy;
            this.dataObj.signature = data.signature;
            this.dataObj.ossaccessKeyId = data.accessKey;
            this.dataObj.key = data.dir + this.getUUID() + "_${filename}";
            this.dataObj.dir = data.dir;
            this.dataObj.host = data.host;
            resolve(true);
          })
          .catch((err) => {
            reject(false);
            console.log("失败", err);
          });
      });
      let res = this.$axios({
        url: "/open/thirdpart/oss/upload/policy",
        method: "post",
        headers: {
          Authorization:
            "Bearer " +  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoyMDAsInVzZXJfbmFtZSI6InlpeGloYW4iLCJ1c2VyTW9iaWxlIjoiMTc2MjM4NTA0MjYiLCJzY29wZSI6WyJhbGwiXSwiYXRpIjoiZjIxMTQ2YzEtNzJjMi00NzM1LWJjZjUtZGY2ZTZhMGM5YzMzIiwidXNlckVtYWlsIjoiMzExMzc4ODk5N0BxcS5jb20iLCJleHAiOjE2NjkwMTEzNzIsInVzZXJOYW1lIjoieWl4aWhhbiIsInVzZXJJZCI6MSwiYXV0aG9yaXRpZXMiOlsiU1VQRVJfQURNSU4iLCJVU0VSIiwiQURNSU4iXSwianRpIjoiZTY2YzkxY2UtOTE0OS00OTM0LWFkMjctNTUzNmZjNjAyMDhjIiwiY2xpZW50X2lkIjoieWljb2RlIn0.Se14afGczLJvTVmmyUoJCHfm5jY25GNLTK2tEo_tzT_nbHib6Rbshn43DIGDPOINxFDAqNgjDig6g5aooQcD6BKTwT1SMMXKmTF876-icDXrIB6A5C_JPo-4Sjk8WTe8ZEI_svT-G1XCL9yUqNvhE9OZrpPteWW_LbhNm537gQTYbzrV3C-RDcDYzz52pnBKZm01R0X5yAGluCtbAMXsXCe-97m7revAOFwx3ww1k2kmptzn-JYTm_Ack0FG1kg6Oya0DFF21EMJmYkmlnNCQEiTTpxzkXXPiMpq1cO0ZpTbIFo5djIkVjVpRkgW83clEeGc8UWzKX3ljI-3WguNLg",
        },
        data: {
          fileDir: "busong",
          userId: 100000006,
        },
      }).then(({ data }) => {
        // resolve(data);
        console.log(data)
        this.dataObj.policy = data.policy;
        this.dataObj.signature = data.signature;
        this.dataObj.ossaccessKeyId = data.accessKey;
        console.log(this.getUUID())
        this.dataObj.key = data.dir + this.getUUID() + "_${filename}";
        this.dataObj.dir = data.dir;
        this.dataObj.host = data.host;
      });
      // return isJPG && isLt2M
    },
    //生成uuid
    getUUID() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        return (
          c === "x" ? (Math.random() * 16) | 0 : "r&0x3" | "0x8"
        ).toString(16);
      });
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
  .user-settings {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    position: absolute;
    right: 20px;
    >div {
      height: 100%;
      width: 60px;
      line-height: 80px;
      overflow: hidden;
      position: relative;
      cursor: pointer;
      &:hover {
        color: #418ac3;
        span {
          bottom: 0;
        }
      }
      i {
        display: block;
        width: 60px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        font-size: 20px;
        transition: color .1s;
      }
      span {
        font-size: 14px;
        display: block;
        width: 100%;
        height: 20px;
        line-height: 20px;
        position: absolute;
        text-align: center;
        bottom: -20px;
        transition: bottom .3s;
      }
    }
  }
}
</style>
