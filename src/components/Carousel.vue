<template>
  <div class="carousel">
    <!-- <div class="mask"></div> -->
    <swiper :options="swiperOption">
      <swiper-slide>
        <img src="@/assets/images/music/singer/林俊杰.jpg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/images/music/singer/张信哲.jpg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/images/music/singer/银临.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/images/music/singer/许嵩2.jpg" alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div><!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div><!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

export default {
  name: 'carousel',
  data () {
    return {
      swiperOption: {
        autoplay: true,
        loop: true,
        effect: 'fade',
        cubeEffect: {
          slideShadows: true,
          shadow: false,
          shadowOffset: 1000,
          shadowScale: 0.6
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        fadeEffect: {
          crossFade: true
        }
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/config.scss';
@import '@/assets/sass/responsive.scss';

.carousel{
  margin-top: 100px;
  width: 80vw;
  height: 45vw;
  max-width: 1580px;
  max-height: 878px;
  .mask {
    width: 100%;
    height: 100%;
    // backdrop-filter: blur(400px);
  }
  .swiper-container{
    --swiper-pagination-color: $colorK !important;
    height: 100%;
    img{
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
    ::v-deep .swiper-pagination-bullet-active{
      background: $colorK !important;
    }
  }
}
</style>
