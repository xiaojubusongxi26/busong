<template>
  <div class="topic">
    <div class="bg"></div>
    <div class="mask"></div>
    <topic-window></topic-window>
    <topic-content></topic-content>
  </div>
</template>

<script>
import TopicWindow from '@/components/topic/TopicWindow.vue'
import TopicContent from '@/components/topic/TopicContent.vue'

export default {
  name: 'topic',
  components: { TopicContent, TopicWindow }
}
</script>

<style lang="scss" scoped>
.topic {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('~@/assets/images/topic/DSC05667.jpg') no-repeat fixed;
    background-size: cover;
  }
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(8px);
  }
}
</style>
