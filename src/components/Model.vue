<template>
  <transition name="slide">
    <div class="model" v-show="showModal">
      <!-- <div class="mask" @click="$emit('cancel')"></div> -->
      <div class="model-dialog">
        <div class="model-header">
          <span>{{title}}</span>
          <a href="javascript:;" class="icon-close" @click="$emit('cancel')"></a>
        </div>
        <div class="model-body">
          <slot name="body"></slot>
        </div>
        <div class="model-footer">
          <a href="javascript:;" class="btn"  v-on:click="$emit('submit')">{{ submit }}</a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Model',
  props: {
    title: String,

    submit: String,

    showModal: Boolean
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/config.scss';
@import '@/assets/sass/responsive.scss';

.model {
  // position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // z-index: 10;
  transition: all .2s;
  /* .mask{
    position: absolute;
    z-index: 11;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: 0.3;
  } */
  &.slide-enter-active{
    top: 0;
  }
  &.slide-leave-active{
    top: -100%;
  }
  &.slide-enter{
    top: -100%;
  }
  .model-dialog{
    position: absolute;
    top: 40%;
    left: 50%;
    // z-index: 12;
    width: 90vw;
    max-width: 660px;
    height: auto;
    border-radius: 15px;
    background-color: #fafafa;
    transform: translate(-50%,-50%);
    .model-header{
      height: 60px;
      background-color: #ffffff;
      border-radius: 5px 5px 0 0;
      padding: 0 25px;
      line-height: 60px;
      color: #000000;
      font-weight: bold;
      letter-spacing: 5px;
      font-size: 20px;
      .icon-close{
        position: absolute;
        top: 21px;
        right: 25px;
        width:  20px;
        height: 20px;
        background: url('~@/assets/images/关闭.png') no-repeat center;
        background-size: contain;
        transition: transform .3s;
      }
      .icon-close:hover{
        transform: scale(1.5);
      }
    }
    .model-body{
      padding: 42px 40px 54px;
      font-size: 14px;
    }
    .model-footer{
      height: 82px;
      line-height: 82px;
      text-align: center;
      border-radius: 0 0 5px 5px;
      background-color: #f5f5f5;
      .btn{
        display: inline-block;
        width: 110px;
        height: 50%;
        line-height: 30px;
        text-align: center;
        background-color: #418ac3;
        color: #fff;
        border: none;
        cursor: pointer;
      }
    }
  }
}

</style>
