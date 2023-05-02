<template>
  <div class="time_tree-body">
    <time-tree-trunk/>
    <time-tree-node :position="'right'"/>
  </div>
</template>

<script>
import TimeTreeTrunk from "@/components/timeTree/TimeTreeTrunk.vue";
import TimeTreeNode from "@/components/timeTree/TimeTreeNode.vue";

export default {
  name: "TimeTreeBody",
  components: {TimeTreeNode, TimeTreeTrunk},
  props: [],
  watch: {},
  data() {
    return {}
  },
  created() {
  },
  mounted() {
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
@import "@/assets/sass/common/mixin.scss";
.time_tree-body {
  width: 100%;
  flex: 1;
  overflow-y: scroll;
  @include scrollBarStyle(#e7efff);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
