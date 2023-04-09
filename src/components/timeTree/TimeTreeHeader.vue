<template>
  <div class="time_tree-header">
    <h3>背灯和月就花阴，已是十年踪迹十年心</h3>
    <div class="time_tree-header--func">
      <div class="icon" @mouseenter="showEditorList = true" @mouseleave="showEditorList = false">
        <span>
          <img src="@/assets/images/icons/用户.png" alt="">
        </span>
        <hover-card v-show="showEditorList"
                    :user-list="userList"/>
      </div>
      <div class="icon">
        <span>
          <img src="@/assets/images/icons/点.png" alt="">
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import HoverCard from "@/components/common/HoverCard.vue";

export default {
  name: "TimeTreeHeader",
  components: {HoverCard},
  data () {
    return {
      showEditorList: false,
      userList: [
        {
          userName: '王谢棠——最是人间留不住，朱颜辞镜花辞树',
          userAvatar: require('@/assets/images/avatar/花.png')
        },
        {
          userName: '潇忘笙',
          userAvatar: require('@/assets/images/avatar/花.png')
        },
        {
          userName: 'Always',
          userAvatar: require('@/assets/images/avatar/花.png')
        },
        {
          userName: 'Spring',
          userAvatar: require('@/assets/images/avatar/花.png')
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.time_tree-header {
  height: 80px;
  line-height: 80px;
  background: #ffffff;
  box-sizing: border-box;
  border-left: 2px solid #66a9c9;
  display: flex;
  align-items: center;
  padding: 0 30px;
  font-family: "DIN Next LT Pro", serif;
  font-weight: bold;
  user-select:none;
  h3 {
    display: inline-block;
    margin: 0;
  }
  .time_tree-header--func {
    position: absolute;
    height: 80px;
    line-height: 80px;
    right: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      margin-right: 12px;
      cursor: pointer;
      transition: all .1s;
      position: relative;
      span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 46px;
        height: 46px;
        border-radius: 32px;
        &:hover {
          background: #f4f9fe;
        }
      }
      img {
        padding: 5px;
        width: 36px;
        height: 36px;
        object-fit: cover;
      }
    }
    .icon:nth-child(2) {
      img {
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>
