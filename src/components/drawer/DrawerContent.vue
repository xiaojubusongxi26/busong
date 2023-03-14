<template>
  <div class="drawer-content">
    <el-dialog
      :visible.sync="data"
      width="50%"
      :before-close="handleClose">
      <div class="drawer-content-details">
        <div class="view">
          <img :src="data.drawerCover" alt="">
        </div>
        <header>{{ data.drawerItemTitle }}</header>
        <div class="content">
          {{ data.drawerItemContent }}
          <span>{{ data.drawerTime }}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DrawerContent',
  data () {
    return {
      data: false
    }
  },
  methods: {
    handleClose (done) {
      console.log(done)
      this.data = false
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
      .el-dialog__body {
        padding: 20px !important;
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
