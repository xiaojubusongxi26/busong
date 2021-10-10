<template>
  <div class="index">
    <div class="left">
      <div class="avatar"></div>
      <div class="name">
        <h5>小橘不颂兮</h5>
      </div>
      <div class="weather">
        <div class="city">
          <div class="demo-input-suffix" @keyup.enter="changeCity">
            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-location-information"
              v-model="currentCity">
            </el-input>
          </div>
        </div>
        <div class="today">
          <i :class="climateType" :style="{ color: climateColor }"></i>
          <span :style="{ color: climateColor }">{{ this.nowTem | temperature }} {{ this.type }}</span>
          <p>{{ this.nowTime + ' ' + this.lowTem + '~' + this.hightTem}}</p>
        </div>
        <span>{{ this.tell }}</span>
      </div>
    </div>
    <div class="main">
      <Audio></Audio>
    </div>
    <div class="right">
      <div class="memo">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>任务清单</span>
            <el-button type="text" @click="getFocus" v-if="!isInput">添加</el-button>
            <!-- <el-button type="text" v-else @click="isInupt = !isInput">关闭</el-button> -->
            <el-button type="text" @click="changeTask">
              <i class="" :class="[isTask ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
            </el-button>
            <el-collapse-transition>
              <div v-show="isInput">
                <el-input v-model="inputTask" ref="task_input"
                 placeholder="请输入内容" @blur="isInput = !isInput"
                  @keyup.enter.native="addTask"></el-input>
              </div>
            </el-collapse-transition>
          </div>
          <el-collapse-transition>
            <div v-show="isTask">
              <div style="text-align: center" v-if="taskList == ''">
              好耶，任务都完成了!
              </div>
              <!-- :class="[isTask ? '0' : 'closeTask']" -->
              <div v-for="(item,index) in taskList" :key="index" class="text item">
                <span>{{ index + 1 + '.' + item }}</span>
                <i class="el-icon-close" @click="removeTask(index)"></i>
                <hr>
              </div>
            </div>
          </el-collapse-transition>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import Audio from '@/components/Audio.vue'

export default {
  name: 'index',
  data () {
    return {
      // 获取天气信息,
      nowTem: '',
      hightTem: '',
      lowTem: '',
      weatherList: [],
      nowTime: '',
      tell: '',
      type: '',
      currentCity: '成都',
      city: [
        '成都',
        '重庆',
        '武汉',
        '杭州'
      ],
      // 当前天气状态，晴为1，多云为2,阴天为3,小雨为4，大雨为5
      climate: 0,
      // 对应的样式名字,颜色
      climateType: '',
      climateColor: '',

      // 控制任务列表展开
      isTask: true,
      // 任务列表
      taskList: [
        '我要吃饭',
        '吃了早饭吃午饭',
        '吃了午饭吃晚饭',
        '吃了晚饭睡大觉',
        '睡了大觉又吃饭'
      ],
      // 添加任务
      inputTask: '',
      isInput: false
    }
  },
  components: {
    Audio
  },
  mounted () {
    this.searchWeather()
  },
  methods: {
    searchWeather () {
      this.axios.get('http://wthrcdn.etouch.cn/weather_mini?city=' + this.currentCity).then((res) => {
        if (res.data.status === 1002) {
          this.currentCity = '成都'
          this.$message.warning('请输入正确的地名')
        }
        // 获取当前温度
        this.nowTem = res.data.data.wendu
        // 获得今日天气数据
        this.weatherList = res.data.data.forecast
        this.type = res.data.data.forecast[0].type
        // 得到今日日期
        const date = new Date()
        const arr = (date.toLocaleString() + '').split(' ')
        this.nowTime = arr[0]
        // 获取今日最高和最低气温
        this.hightTem = (this.weatherList[0].high.split(' '))[1]
        this.lowTem = (this.weatherList[0].low.split(' '))[1]
        // 获得天气提醒
        this.tell = res.data.data.ganmao
        this.changeClimateType(res.data.data.forecast[0].type)
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
      } else if (this.type === '阴') {
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
    },
    // 更改标签展开状态
    changeTask () {
      this.isTask = !this.isTask
    },
    // 获取焦点
    getFocus () {
      this.isInput = !this.isInput
      // this.$refs.task_input.focus()
      if (this.isInput) {
        this.$nextTick(() => {
          this.$refs.task_input.focus()
          // console.log(this.$refs.task_input.blur())
        })
      }
      console.log(this.$refs.task_input.focus())
    },
    // 添加任务
    addTask () {
      // 正则判断是否有全是空格
      const re = new RegExp('^[ ]+$')
      if (this.inputTask === '' || re.test(this.inputTask)) {
        console.log('不要乱输入哦!')
      } else {
        this.taskList.push(this.inputTask.trim())
      }
      // this.isInput = !this.isInput
      this.inputTask = ''
      console.log(this.isInput)
    },
    // 删除任务
    removeTask (index) {
      this.taskList.splice(index, 1)
    }
  },
  filters: {
    temperature: function (value) {
      return value + '℃'
    }
  },
  created () {
    this.searchWeather()
  },
  watch: {
    currentCity: {
      handler (newVal, oldVal) {
        this.currentCity = newVal
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/config.scss';
@import '@/assets/sass/responsive.scss';

.index{
  display: flex;
  justify-content: center;
  // width: 100vw;
  backdrop-filter: blur(3px);
  .left{
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 15px 50px;
    padding: 20px;
    width: 20vw;
    height: 500px;
    background-color: rgba($color: $colorG, $alpha: 0.95);
    border-radius: 15px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
    .avatar{
      width: 150px;
      height: 150px;
      background: url('~@/assets/images/mmexport1602954427757.jpg') no-repeat;
      background-size: cover;
      border-radius: 100px;
      margin: 20px 0;
    }
    .weather{
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      align-items: center;
      .city{
        margin-bottom: 8px;
        user-select: none;
        i{
          font-size: $fontI;
        }
        ::v-deep .el-input__inner{
          // width: 80px;
          line-height:40px;
          color: #fff;
          text-align: center;
          background-color: $colorF;
          border: 1px solid $colorF;
          outline: none;
          float: left;
          vertical-align: middle;
        }
        ::v-deep .el-input__icon{
          color: #fff;
          font-size: 20px;
        }
      }
      .city:hover{
        cursor: pointer;
      }
      .today{
        margin: 0 auto;
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
        font-size: $fontK;
        color: #333;
      }
    }
  }
  .main{
    display: flex;
    margin-top: 15px;
    width: 800px;
    height: 1500px;
    background-color: rgba($color: $colorL, $alpha: 0.25);
    border-radius: 15px 15px 0 0;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  }
  .right{
    margin: 15px 50px;
    // padding: 20px;
    width: 30vw;
    height: 0;
    background-color: rgba($color: $colorG, $alpha: 0.25);
    border-radius: 15px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
    .memo{
      .el-card{
        max-width: 300px;
        min-width: 110px;
        border-radius: 15px;
        background: url('~@/assets/images/加油猫.png') no-repeat center;
        background-size: 75%;
        background-color: #fffbee;
        ::v-deep .clearfix{
          color: $colorF;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          span{
            flex-grow: 5;
          }
          button{
            padding: 0 2px;
            flex-grow: 1;
          }
          div{
            // flex-shrink: 0;
            width: 100%;
          }
          .el-input{
            .el-input__inner{
              margin-top: 12px;
            border: 1px solid $colorF;
            box-shadow: 0 2px 4px 0 rgba(246, 207, 145, 0.274), 0 3px 10px 0 rgba(190, 190, 190, 0.19);
          }
          }
        }
        ::v-deep .el-card__body {
          padding: 10px 20px 30px 20px !important;
          .text{
            display: flex;
            border-bottom: 1px $colorE solid;
            align-items: center;
            position: relative;
            min-height: 60px;
            padding: 18px 0;
            span{
              margin: 0 2px;
              flex-grow: 8;
            }
            i{
              // right: 0;
              // position: absolute;
              flex-grow: 1;
            }
            .el-icon-close:hover{
              cursor: pointer;
              color: $colorF;
              transform:scale(1.5) .5s !important;
            }
          }
        }
        .closeTask{
          display: none !important;
          animation: task .5s linear !important;
        }
        .el-button--text{
          color: $colorF;
        }
      }
    }
  }
}
</style>
