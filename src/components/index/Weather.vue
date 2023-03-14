<template>
<div class="weather">
  <div class="today">
    <i :class="climateType" :style="{ color: climateColor }"></i>
    <span :style="{ color: climateColor }">{{ this.nowTem | temperature }} {{ this.type }}</span>
    <p>{{ this.nowTime + ' ' + this.lowTem + '~' + this.highTem }}</p>
  </div>
  <span>{{ this.tip }}</span>
  <div class="city">
    <div class="demo-input-suffix" @keyup.enter="changeCity">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-location-information"
        v-model="currentCity">
      </el-input>
    </div>
  </div>
</div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      // 获取天气信息,
      nowTem: '',
      highTem: '',
      lowTem: '',
      weatherList: [],
      nowTime: '',
      tip: '',
      type: '',
      currentCity: '',
      // 当前天气状态，晴为1，多云为2,阴天为3,小雨为4，大雨为5
      climate: 0,
      // 对应的样式名字,颜色
      climateType: '',
      climateColor: ''

    }
  },
  /* watch: {
    currentCity (newVal, oldVal) {
      this.currentCity = newVal
    }
  }, */
  computed: {},
  methods: {
    getUserInfo () {
      this.$axios.get('http://localhost:1212/api/userinfo').then(res => {
        this.currentCity = res.data.userCity
      })
    },
    searchWeather () {
      this.axios.get('https://api.vvhan.com/api/weather?city=' + this.currentCity).then((res) => {
        const data = res.data.info
        console.log('________________', data)
        this.nowTime = data.date
        this.lowTem = data.low.slice(data.low.search(' '))
        this.highTem = data.high.slice(data.high.search(' '))
        this.tip = data.tip
        this.type = data.type
        this.nowTem = data.high.slice(data.high.search(' '), data.high.search('°'))
        this.changeClimateType()
      })
    },
    // 更改天气标签
    changeClimateType () {
      if (this.type === '小雨' || this.type === '中雨') {
        this.climateType = 'el-icon-light-rain'
        this.climateColor = '#2395b2'
        this.climate = 4
      } else if (this.type === '多云') {
        this.climateType = 'el-icon-cloudy-and-sunny'
        this.climateColor = '#7ddafb'
        this.climate = 2
      } else if (this.type === '大雨' || this.type === '暴雨') {
        this.climateType = 'el-icon-heavy-rain'
        this.climateColor = '#045da8'
        this.climate = 5
      } else if (this.type === '阴' || this.type === '霾') {
        this.climateType = 'el-icon-partly-cloudy'
        this.climateColor = '#555'
        this.climate = 3
      } else if (this.type === '晴') {
        this.climateType = 'el-icon-sunny'
        this.climateColor = '#ffcd03'
        this.climate = 1
      }
    },
    // 更改城市
    changeCity () {
      this.searchWeather()
    }
  },
  filters: {
    temperature: function (value) {
      return value + '℃'
    }
  },
  /*   beforeUpdate () {
    if (this.currentCity === '') {
      this.currentCity = JSON.parse(sessionStorage.getItem('userinfo')).userCity
      this.searchWeather()
    }
  }, */
  created () {
  },
  beforeUpdate () {
  },
  mounted () {
    this.getUserInfo()
    this.currentCity = this.$store.state.userInfo.userCity
    this.searchWeather()
  },
  updated () {
    if (this.climateType === '') {
      this.searchWeather()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/sass/config.scss';
@import '@/assets/sass/responsive.scss';

/* 天气展示面板 */
.weather{
  margin-top: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  background-color: $colorG;
  border-radius: 15px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  .city{
    // margin-bottom: 8px;
    user-select: none;
    i{
      font-size: $fontI;
    }
    ::v-deep .el-input__inner{
      // width: 80px;
      line-height:40px;
      color: #fff;
      text-align: center;
      background-color: $colorK;
      border: 1px solid $colorK;
      outline: none;
      float: left;
      vertical-align: middle;
    }
    ::v-deep .el-input__icon{
      color: #fff;
      font-size: 20px;
    }
    // 修改input框中placeholder文字颜色
    ::v-deep input::-webkit-input-placeholder {
      color: #fafafa !important;
    }
  }
  .city:hover{
    cursor: pointer;
  }
  /* 今日天气显示 */
  .today{
    padding: 20px 0;
    width: 100%;
    border-bottom: 1px $colorE solid;
    color: $colorI;
    i{
      color: $colorF;
      font-size: 45px;
    }
    span{
      color: $colorF;
      font-size: 20px;
    }
    p{
      margin: 5px;
      margin: 0;
      padding: 0;
    }
  }
  span{
    margin-top: 2px;
    padding: 20px 0;
    font-size: $fontK;
    color: #333;
  }
}
</style>
