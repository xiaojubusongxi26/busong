<template>
  <div class="emoji-border" :style="{'width': width, 'height': height, 'left': left}">
    <div class="emoji-list">
      <div class="emoji" v-for="(item, index) in showList" @click="selectEmoji(item)" :key="index">
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
import { emoji } from '@/utils/emoji'
export default {
  name: "Emoji",
  props: {
    width: {
      type: String,
      default: '300px',
    },
    height: {
      type: String,
      default: '300px'
    },
    left: {
      type: String,
      default: '-100px'
    }
  },
  data () {
    return {
      showList: [],
    }
  },
  mounted() {
    this.setEmoji()
  },
  methods: {
    setEmoji () {
      for (let item in emoji) {
        this.showList.push({
          label: emoji[item],
          value: item
        })
      }
    },
    selectEmoji(val) {
      console.log(val)
      this.$emit('changeEmoji', val)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/sass/common/mixin.scss";
.emoji-border {
  background: #FFFFFF;
  @include border-radius(12px);
  position: absolute;
  z-index: 4;
  cursor: default;
  overflow: auto;
  @include scrollBarStyle;
  .emoji-list {
    width: 100%;
    height: 100%;
    padding: 10px 0 10px 10px;
    text-align: left;
    .emoji {
      display: inline-block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      transition: all .3s;
      border-radius: 3px;
      text-align: center;
      cursor: pointer;
      &:hover {
        background: #e3e3e3;
      }
    }
  }
}
</style>
