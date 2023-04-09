<template>
<div class="time_tree-sidebar">
  <div class="tree-header">
    Time Tree
  </div>
  <div class="tree-list">
    <div class="header-bar" :style="{'top': barTop + 'px' }"></div>
    <div class="tree-list-bar"
         v-for="(item, index) in timeTreeDirectoryList"
         :key="index"
         @click="focusTree(item, index)"
    >
      <h3>{{ item.directoryName }}</h3>
      <div class="tree-list-bar--avatar">
        <img :src="item.userAvatar" alt=""/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "TimeTreeSidebar",
  data () {
    return {
      // 选中条到顶部距离
      barTop: 12,
      timeTreeDirectoryList: [
        {
          directoryName: '昨日之日不可留',
          userAvatar: require('@/assets/images/avatar/花.png')
        },
        {
          directoryName: '欲买桂花同载酒',
          userAvatar: require('@/assets/images/avatar/花.png')
        },
        {
          directoryName: '相逢无语君应笑',
          userAvatar: require('@/assets/images/avatar/花.png')
        },
        {
          directoryName: 'Always like this',
          userAvatar: require('@/assets/images/avatar/花.png')
        },
        {
          directoryName: 'Spring',
          userAvatar: require('@/assets/images/avatar/花.png')
        }
      ]
    }
  },
  methods: {
    // 切换时间树
    focusTree(item, index) {
      // 切换选中条
      this.changeFocusBar(index)
    },
    // 移动选中条
    changeFocusBar (index) {
      this.barTop = 50 * index + 12
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/sass/common/mixin.scss";
.time_tree-sidebar {
  width: 100%;
  height: 100%;
  background: #FFFFFF;
  border-radius: 25px 0 0 0;
  padding-top: 20px;
  overflow-x: hidden;
  // 文字样式
  font-family: "DIN Next LT Pro", system-ui;
  font-weight: bold;
  user-select:none;
  position: relative;
  @include scrollBarStyle;
  .tree-header {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 26px;
    letter-spacing: 1px;
  }
  .tree-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    position: relative;
    .header-bar {
      position: absolute;
      top: 14px;
      left: 25px;
      border-radius: 3px;
      display: inline-block;
      width: 8px;
      height: 22px;
      background: #619ac3;
      transition: all .1s ease-in-out;
    }
    .tree-list-bar {
      width: 90%;
      line-height: 50px;
      height: 50px;
      padding: 0  0 0 25px;
      cursor: pointer;
      border-radius: 8px;
      transition: all .1s ;
      position: relative;
      &:hover {
        background: rgba(#619ac3, .3);
      }
      h3 {
        height: 50px;
        line-height: 50px;
        display: inline-block;
        text-align: left;
        font-size: 18px;
        margin: 0;
        vertical-align: bottom;
      }
      .tree-list-bar--avatar {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        right: 5px;
        img {
          width: 26px;
          height: 26px;
          border-radius: 25px;
        }
      }
    }
  }
}
</style>
