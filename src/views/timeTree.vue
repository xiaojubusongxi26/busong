<template>
  <div class="time_tree">
    <div class="time_tree-left"  :style="{'width': isFlod ? '0' : '300px'}">
      <time-tree-sidebar/>
      <div class="tree-list--flod" @click="isFlod = !isFlod">
        <img class="open" :src="isFlod ? require('@/assets/images/icons/折叠合.png') : require('@/assets/images/icons/折叠箭头.png')"></img>
      </div>
    </div>
    <div class="time_tree-right">
      <time-tree-header/>
    </div>
  </div>
</template>

<script>
import TimeTreeSidebar from "@/components/timeTree/TimeTreeSidebar.vue";
import TimeTreeHeader from "@/components/timeTree/TimeTreeHeader.vue";

export default {
  name: 'timeTree',
  components: {TimeTreeHeader, TimeTreeSidebar},
  data () {
    return {
      isFlod: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/config.scss';
.time_tree {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-image: url('~@/assets/images/timeTree/texture.png');
  background-color: #93b5cf;
  box-sizing: border-box;
  padding-top: 50px;
  .time_tree-left {
    width: 0;
    height: 100%;
    transition: width .2s ease-in-out;
    position: relative;
    .tree-list--flod {
      display: flex;
      width: 20px;
      height: 100%;
      align-items: center;
      position: absolute;
      z-index: 2;
      right: -20px;
      top: 0;
      &:hover {
        img {
          width: 13px;
        }
      }
      img {
        display: block;
        height: 50px;
        width: 0;
        box-sizing: border-box;
        transition: width .1s;
        object-fit: cover;
        cursor: pointer;
        border-left: 1px solid #7a7a8b;
      }
    }
  }
  .time_tree-right {
    flex: 1;
  }
}
</style>
