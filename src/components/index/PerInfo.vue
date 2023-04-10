<template>
<div class="perInfo">
  <div class="avatar">
    <a href="/user">
      <img :src="$store.state.userInfo.userAvatar ? $store.state.userInfo.userAvatar : defaultAvatar" alt="">
    </a>
  </div>
  <div class="name">
    <h5>{{ $store.state.userInfo.username }}</h5>
  </div>
  <!-- 统计 -->
<!--  <div class="statistics">
    <div class="dailyNum">
      日常
      <p>183</p>
    </div>
    <div class="notesNum">
      笔记
      <p>26</p>
    </div>
    <div class="bookNum">
      书籍
      <p>3</p>
    </div>
  </div>-->
</div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      // 默认头像
      defaultAvatar: require('@/assets/images/avatar/defaultAvatar.png')
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created () {},
  mounted () {}
}
</script>
<style lang="scss" scoped>
@import '@/assets/sass/config.scss';
@import '@/assets/sass/responsive.scss';

.perInfo{
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: rgba($color: $colorG, $alpha: 1);
  border-radius: 15px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  /* 个人头像面板 */
  .avatar{
    width: 150px;
    height: 150px;
    background-size: cover;
    border-radius: 100px;
    margin: 20px 0;
    img {
      width: 100%;
      height: 100%;
      border-radius: 100px;
      object-fit: cover;
    }
  }
  .name{
    h5{
      font-weight: bolder;
    }
  }
  /* 数量统计 */
  .statistics{
    display: flex;
    height: 60px;
    margin-top: 15px;
    width: 100%;
    justify-content: center;
    align-items: center;
    div{
      text-align: center;
      width: 30%;
      p{
        text-align: center;
      }
    }
  }
}
</style>
