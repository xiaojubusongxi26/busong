<template>
  <div class="drawer-content">
    <el-dialog
      :visible.sync="data"
      width="50%"
      top="10vh"
      :before-close="handleClose">
      <transition name="fade">
        <div class="drawer-content-details" v-if="data">
          <div class="drawer-content-header">
            <i class="el-icon-edit" @click="modifyItem()"></i>
            <i class="el-icon-delete" @click="isDeleteItem = true"></i>
            <i class="el-icon-close" @click="data = null; isModifyItem = false"></i>
          </div>
          <div class="view">
            <img :src="data.drawerCover" alt="">
          </div>
          <header>{{ data.drawerItemTitle }}</header>
          <div class="content">
            {{ data.drawerItemContent }}
            <span>{{ data.drawerTime }}</span>
          </div>
          <!-- 修改 -->
          <el-dialog
            width="40%"
            title="修改表项"
            :visible.sync="isModifyItem"
            top="10vh"
            append-to-body
            center>
            <el-form :model="form">
              <el-form-item label="表项标题" :label-width="'120px'">
                <el-input v-model="form.drawerItemTitle"
                          autocomplete="off"
                          style="width: 70%"></el-input>
              </el-form-item>
              <el-form-item label="表项封面" :label-width="'120px'">
                <el-upload
                  class="upload-demo"
                  drag
                  action="https://jsonplaceholder.typicode.com/posts/"
                  multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
              </el-form-item>
              <el-form-item label="表项封面" :label-width="'120px'">
                <el-input
                  type="textarea"
                  autosize
                  placeholder="请输入内容"
                  v-model="form.drawerItemContent"
                  style="width: 70%">
                </el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="isModifyItem = false">取 消</el-button>
              <el-button type="primary" @click="isModifyItem = false">确 定</el-button>
            </div>
          </el-dialog>
          <!-- 删除 -->
          <el-dialog
            width="30%"
            title="删除表项"
            :visible.sync="isDeleteItem"
            append-to-body
            center>
            <span>你确认删除该表项吗？</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="isDeleteItem = false">取 消</el-button>
              <el-button type="primary" @click="isDeleteItem = false">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </transition>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DrawerContent',
  data () {
    return {
      data: false,
      isModifyItem: false,
      isDeleteItem: false,
      form: {
        drawerItemTitle: '',
        drawerCover: '',
        drawerItemContent: ''
      }
    }
  },
  methods: {
    handleClose (done) {
      console.log(done)
      this.data = false
    },
    // 修改表项
    modifyItem () {
      this.isModifyItem = true
      this.form.drawerItemTitle = this.data.drawerItemTitle
      this.form.drawerItemContent = this.data.drawerItemContent
    }
  },
  mounted () {
    this.$bus.$on('drawerInfo', res => {
      this.data = res
      console.log(this.data)
    })
  }
}
</script>

<style lang="scss" scoped>
.drawer-content {
  background: #f5f8ff;
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  ::v-deep .el-dialog__wrapper {
    /*滚动条设置*/
    overflow-x: auto;
    //display: -webkit-box;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
    .el-dialog {
      border-radius: 8px !important;
      .el-dialog__header {
        display: none !important;
      }
      .el-dialog__body {
        padding: 10px 20px 20px !important;
      }
    }
  }
  .drawer-content-details {
    padding-bottom: 80px;
    width: 100%;
    height: 100%;
    position: relative;
    /*滚动条设置*/
    overflow-x: auto;
    //display: -webkit-box;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
    .drawer-content-header {
      height: 40px;
      position: relative;
      i {
        position: absolute;
        top: 2px;
        font-size: 22px;
        font-weight: bolder;
        width: 36px;
        height: 36px;
        cursor: pointer;
        text-align: center;
        line-height: 36px;
        color: #050505;
        transition: all .3s;
        border-radius: 4px;
        &:hover {
          background: #c3cff4;
          color: #FFFFFF;
        }
        &:nth-child(1) {
          right: 90px;
        }
        &:nth-child(2) {
          right: 45px;
        }
        &:nth-child(3) {
          right: 0px;
          &:hover {
            background: #e66b6b;
          }
        }
      }
    }
    .view {
      //height: 500px;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 25px;
      }
    }
    header {
      height: 100px;
      line-height: 100px;
      margin: auto;
      text-align: center;
      font-size: 28px;
      font-weight: bolder;
    }
    .content {
      position: relative;
      span {
        position: absolute;
        right: 20px;
        bottom: -60px;
        font-size: 14px;
        color: #7a7a8b;
      }
    }
  }

}
</style>
