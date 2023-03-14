<template>
  <div class="collect">
    <header></header>
    <div class="collect-left">
      <sidebar></sidebar>
    </div>
    <div class="collect-right">
      <drawer-content></drawer-content>
      <drawer-list></drawer-list>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/drawer/Sidebar.vue'
import DrawerContent from '@/components/drawer/DrawerContent.vue'
import DrawerList from '@/components/drawer/DrawerList.vue'

export default {
  components: { DrawerList, DrawerContent, Sidebar },
  props: {},
  data () {
    return {
    }
  },
  computed: {},
  methods: {},
  created () {
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/config.scss';
@import '@/assets/sass/drawer/drawer.scss';

</style>
