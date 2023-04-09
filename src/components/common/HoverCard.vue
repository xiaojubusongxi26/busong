<template>
<div class="hover_card">
  <div class="editor-list">
    <div class="editor"
         v-for="(v, k) in userList"
         :key="k">
      <img :src="v.userAvatar" alt="">
      <h3>{{ v.userName }}</h3>
      <i class="el-icon-delete-solid"></i>
    </div>
  </div>
  <hr>
  <div class="click">
    <span @click="CopyCode('YGDS5463')">邀请码: YGDS5463</span>
  </div>
</div>
</template>

<script>
import {ClickCopy} from "@/utils/util";
export default {
  name: "HoverCard",
  props: {
    userList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {},
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    CopyCode (value) {
      ClickCopy(value)
      this.$message('复制成功')
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
@import "@/assets/sass/common/mixin.scss";
.hover_card{
  width: 300px;
  height: 300px;
  background: #FFFFFF;
  position: absolute;
  top: 80px;
  right: -60px;
  @include border-radius(12px);
  cursor: default;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  opacity: 1;
  z-index: 1;
  text-align: center;
  transition: all .3s;
  color: #000;
  .editor-list {
    flex: 1;
    overflow-y: auto;
    @include scrollBarStyle;
    .editor {
      height: 50px;
      width: 100%;
      line-height: 50px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      border-radius: 8px;
      padding: 0 10px;
      box-sizing: border-box;
      &:hover{
        background-color: #f4f9fe;
        i {
          width: 35px;
        }
      }
      img {
        width: 36px;
        height: 36px;
        object-fit: cover;
        border-radius: 20px;
        margin-right: 10px;
      }
      h3 {
        flex: 1;
        text-align: left;
        margin: 0;
        font-size: 18px;
        @include signalNowrap;
        vertical-align: text-bottom;
      }
      i {
        display: inline-block;
        width: 0;
        height: 35px;
        font-size: 18px;
        line-height: 35px;
        text-align: center;
        border-radius: 20px;
        cursor: pointer;
        transition: all .2s;
        overflow: hidden;
        &:hover {
          color: #f56c6c;
          background: #fef0f0;
        }
      }
    }
  }
  // 昵称
  h5{
    font-weight: bolder;
  }
  // 称号
  h6 {
    color: #fff;
    background: #fb7299;
    border-radius: 4px;
    width: 60px;
    margin: 0 auto;
    font-size: 12px;
    height: 21px;
    line-height: 21px;
  }
  // 个性签名
  p {
    color: #999999;
    font-size: 14px;
  }
  .click{
    // margin-top: 8px;
    height: 35px;
    line-height: 35px;
    padding: 0 15px;
    border-radius: 8px;
    transition: .3s;
    color: #61666d;
    position: relative;
    cursor: pointer;
    // 小图标
    svg {
      position: absolute;
      left: 12px;
      top: 9px;
    }
    &:hover{
      background-color: #f4f9fe;
    }
  }
}
</style>
