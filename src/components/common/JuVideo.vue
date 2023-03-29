<template>
<div class="ju-video">
  <video :src="src"
         type="video/mp4"
         autoplay
         controls
         loop
  ></video>
</div>
</template>

<script>
export default {
  name: "JuVideo",
  props: {
    src: {
      type: String,
      default: null
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.ju-video {
  width: 100%;
  height: 100%;
  display: flex;
  video {
    width: 100%;
    height: 100%;
    background: #000000;
    object-fit: cover;
  }
}
</style>
