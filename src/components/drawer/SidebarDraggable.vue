<template>
<draggable
  class="list-group"
  tag="ul"
  v-model="list"
  @end="updateOrder()"
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
    <i :class="element.data.drawerIconClass"></i>
    <span tips='hello world'>{{ element.data.drawerTitle }}</span>
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
  },
  mounted () {
  },
  methods: {
    updateOrder () {
      console.log('更新了顺序:', this.list)
    }
  }
}
</script>
<style lang="scss" scoped>
.list-group {
  height: 100%;
  width: 100%;
  .list-group-item {
    background: none;
    border: none;
    height: 50px;
    line-height: 40px;
    width: 100%;
    cursor: pointer;
    border-radius: 8px;
    transition: all .2s ease-in-out;
    font-weight: bolder;
    /* 文字过长隐藏 */
    text-overflow : ellipsis;
    white-space: nowrap;/*设置不换行*/
    overflow: hidden; /*设置隐藏*/
    &:hover {
      background: #e5edfc;
    }
    i {
      font-size: 26px;
      display: inline-block;margin-right: 20px;
    }
    span {
      font-size: 22px;
      //font-family:'HolidayBi';
      font-family:'Manulife-JH-Sans-Bold';
    }
  }
}
</style>
