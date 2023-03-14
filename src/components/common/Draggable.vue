<template>
<draggable
  class="list-group"
  tag="ul"
  v-model="list"
  v-bind="{
    animation: 200,
    group: 'description',
    disabled: false,
    ghostClass: 'ghost'
  }"
>
  <li
    class="list-group-item controls"
    v-for="element in list"
    :key="element.order"
  >
    <span v-html="element.data.icon">
    </span>
    <span>{{ element.data.title }}  </span>
    <el-switch
      v-model="element.data.isShow"
      active-color="#418ac3"
      inactive-color="#e4e4e4">
    </el-switch>
    <!-- {{ element.name }} -->
  </li>
</draggable>
</template>

<script>
import Draggable from 'vuedraggable'

export default {
  components: {
    Draggable
  },
  props: ['List'],
  data () {
    return {
      list: this.List.map((data, index) => {
        return { data, order: index + 1 }
      }),
      iconList: [],
      isWeather: true
    }
  }
}
</script>
<style lang="scss" scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
  list-style: none;
}
.list-group-item {
  cursor: pointer;
  height: 30px;
  line-height: 30px;
  border: 1px solid #ccc;
  padding: 0;
}
ul {
  list-style: none;
  padding: 0 15px 10px;
  background: #fcfcfc;
  margin: 0;
  .controls {
    width: 100%;
    height: 40px;
    margin: 4px 0;
    transition: all .3s;
    border: 2px solid #fafafa;
    border-radius: 10px;
    background-color: rgba($color: rgb(255, 255, 255), $alpha: 1);
    cursor: pointer;
    position: relative;
    span {
      display: inline-block;
      height: 100%;
      line-height: 36px;
      margin: 0 8px;
      svg {
        margin-bottom: 4px;
      }
    }
    span:first-child {
      height: 100%;
      line-height: 30px;
    }
    .el-switch {
      position: absolute;
      right: 10px;
      top: 8px;
    }
    &:hover {
      border: 2px solid #418ac3;
    }
  }
}
</style>
