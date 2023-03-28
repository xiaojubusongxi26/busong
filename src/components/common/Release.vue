<template>
  <div class="release" :style="{'background': background}">
    <textarea type="text" id="edit" v-model="text" :style="{'background': background}"/>
    <div class="func" :style="{'color': color }">
      <div @click="showEmoji()">
        <svg t="1679679589654" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2783"
             width="20" height="20"><path d="M512 63.488q93.184 0 174.592 35.328t142.336 95.744 96.256 142.336 35.328 174.08q0 93.184-35.328 174.592t-96.256 142.336-142.336 96.256-174.592 35.328q-92.16 0-174.08-35.328t-142.336-96.256-95.744-142.336-35.328-174.592q0-92.16 35.328-174.08t95.744-142.336 142.336-95.744 174.08-35.328zM670.72 252.928q-34.816 0-58.88 28.672t-24.064 69.632q0 41.984 24.064 70.656t58.88 28.672 58.88-28.672 24.064-70.656q0-40.96-24.064-69.632t-58.88-28.672zM253.952 446.464l192.512 0 0-63.488-192.512 0 0 63.488zM765.952 638.976q1.024-2.048 1.024-7.168t-1.536-11.264-6.144-11.264-12.8-8.192q-23.552 28.672-58.368 51.2-29.696 19.456-75.264 35.328t-107.008 15.872-104.448-15.872-72.704-35.328q-33.792-22.528-57.344-51.2-8.192 2.048-12.288 7.168t-6.144 11.264-2.048 11.264 1.024 8.192q1.024 1.024 0.512 1.536t0.512 1.536q9.216 27.648 32.768 51.712t57.344 41.984 76.288 27.648 89.6 9.728q93.184 0 160.768-33.792t92.16-89.088q0-2.048 1.024-4.096t3.072-7.168z" p-id="2784"
             :fill="color"></path></svg>
        <span>表情</span>
        <Emoji v-show="isSelectEmoji" @changeEmoji="$event => selectEmoji = $event"></Emoji>
      </div>
      <div>
        <svg t="1679681060455" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7188"
             width="20" height="20"><path d="M352.056 587.088c13.697-11.22 33.744-10.266 46.313 2.33l289.31 289.789h-429.43c-62.247 0-117.275-30.927-150.572-78.263L351.42 587.622zM716.22 427.805c13.538-12.586 34.682-12.286 47.855 0.823l193.284 190.284 0.563 0.546c0.592 0.56 1.202 1.09 1.827 1.593v74.053c0 101.678-82.379 184.104-184 184.104l-3.545-0.001L516.25 622.83l199.36-194.444z m59.53-285.013c101.62 0 184 82.426 184 184.104l-0.001 210.43-153.458-151.075-1.103-1.08c-36.627-35.295-94.822-35.228-131.368 0.417L473.986 580.496l-33.25-33.305-1.054-1.04c-34.956-33.967-90.188-35.746-127.277-3.868L81.028 744.786c-4.417-15.805-6.778-32.468-6.778-49.682V326.896c0-101.678 82.38-184.104 184-184.104h517.5zM332.896 283.3c-40.667 0-73.642 32.956-73.642 73.6 0 40.644 32.975 73.6 73.642 73.6 40.667 0 73.642-32.956 73.642-73.6 0-40.644-32.975-73.6-73.642-73.6z"
             :fill="color" p-id="7189"></path></svg>
        <span>图片</span>
      </div>
      <div class="btn">
        <button>发布</button>
      </div>
    </div>
  </div>
</template>

<script>
import { emoji } from '@/utils/emoji'
import Emoji from "@/components/common/Emoji.vue";
export default {
  name: 'Release',
  components: {Emoji},
  props: {
    background: {
      type: String,
      default: '#ffffff'
    },
    color: {
      type: String,
      default: '#050505'
    }
  },
  data () {
    return {
      isSelectEmoji: false,
      text: '',
      mo: emoji,
      selectEmoji: '',
    }
  },
  watch: {
    selectEmoji: {
      handler(newVal) {
        // 获取光标位置
        const editValue = document.getElementById("edit")
        const index = editValue.selectionStart
        this.text = this.text.slice(0, index) + newVal.label + this.text.slice(index)
      }
    }
  },
  methods: {
    showEmoji () {
      this.isSelectEmoji = !this.isSelectEmoji
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common/mixin.scss';
@import '@/assets/sass/config.scss';
.release {
  display: flex;
  flex-direction: column;
  margin: 20px 0 0 0;
  width: 100%;
  height: 350px;
  padding: 30px 20px 5px;
  overflow: hidden;
  @include border-radius;
  @include box-shadow;
  textarea {
    width: 100%;
    height: 100%;
    padding: 16px;
    outline-style: none;
    border: none;
    border-radius: 6px;
    // 禁止拉伸
    resize: none;
    @include scrollBarStyle;
  }
  .func {
    width: 100%;
    height: 50px;
    line-height: 50px;
    display: flex;
    position: relative;
    &>div {
      width: 100px;
      text-align: center;
      cursor: pointer;
      position: relative;
      span {
        margin-left: 8px;
        &:hover {
          color: $colorJ_main;
        }
      }
    }
    .btn {
      height: 100%;
      position: absolute;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        height: 100%;
        width: 100%;
        border: none;
        color: #FFFFFF;
        background: $colorJ_main;
        @include border-radius(5px);
        &:hover {
          background: $colorJ_main_hover;
        }
      }
    }
  }
}
</style>
