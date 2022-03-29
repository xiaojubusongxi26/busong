<template>
  <div>
    <div class="home-container">
    <div class="bg"></div>
    <header class="backimg">
      <div class="centerText">
        <h1>好久不见</h1>
        <div class="console-container">
          <span ref='text'></span>
          <div class='console-underscore' ref='con'
           :class="{ 'hidden': isHidden, 'console-underscore': isUnderscore }">&#95;</div>
        </div>
      </div>
    </header>
    <div class="">
      <div class="index">
        <div class="left">
          <div class="perInfo">
            <div class="avatar"></div>
            <div class="name">
              <h5>小橘不颂兮</h5>
            </div>
            <!-- 统计 -->
            <div class="statistics">
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
            </div>
          </div>
          <div class="weather">
            <div class="today">
              <i :class="climateType" :style="{ color: climateColor }"></i>
              <span :style="{ color: climateColor }">{{ this.nowTem | temperature }} {{ this.type }}</span>
              <p>{{ this.nowTime + ' ' + this.lowTem + '~' + this.hightTem}}</p>
            </div>
            <span>{{ this.tell }}</span>
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
        </div>
        <div class="main">
          <daily></daily>
        </div>
        <div class="right">
          <div class="memo">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>任务清单</span>
                <el-button type="text" @click="getFocus" v-if="!isInput">添加</el-button>
                <!-- <el-button type="text" v-else @click="isInupt = !isInput">关闭</el-button> -->
                <el-button type="text" @click="isTask = !isTask">
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
    </div>
  </div>
  </div>
</template>

<script>
import Daily from '@/components/Daily.vue'

export default {
  name: 'index',
  data () {
    return {
      // 打字机文字
      words: [
        '你要去相信,时光且长,你终将长成自己想要的模样,拥抱独属于你的未来.',
        '你的心要如溪水般柔软,你的眼波要像春天般明媚.',
        '愿所有梦见过远方的人,心有惊雷,生似静湖.'
      ],
      isUnderscore: true,
      isHidden: false,
      // 定时器
      timer1: false,
      timer2: false,
      // 获取天气信息,
      nowTem: '',
      hightTem: '',
      lowTem: '',
      weatherList: [],
      nowTime: '',
      tell: '',
      type: '',
      currentCity: '成都',
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
    Daily
  },
  mounted () {
    this.searchWeather()
    this.consoleText()
  },
  methods: {
    // 打字机
    consoleText () {
      let visible = true
      let letterCount = 1
      let x = 1
      let waiting = false
      this.$refs.text.style.color = '#fff'

      // 输出文字内容
      this.timer1 = setInterval(() => {
        if (letterCount === 0 && waiting === false) {
          waiting = true
          this.$refs.text.innerHTML = this.words[0].substring(0, letterCount)
          setTimeout(() => {
            const usedWord = this.words.shift()
            this.words.push(usedWord)
            x = 1
            letterCount += x
            waiting = false
          }, 1000)
        } else if (letterCount === this.words[0].length + 1 && waiting === false) {
          waiting = true
          setTimeout(() => {
            x = -1
            letterCount += x
            waiting = false
          }, 1000)
        } else if (waiting === false) {
          this.$refs.text.innerHTML = this.words[0].substring(0, letterCount)
          letterCount += x
        }
      }, 100)

      // 打字字符闪烁
      this.timer2 = setInterval(() => {
        if (visible === true) {
          this.isHidden = true
          this.isUnderscore = true
          visible = false
        } else {
          this.isHidden = false
          visible = true
        }
      }, 400)
    },
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
    },
    // 任务添加输入框获取焦点
    getFocus () {
      this.isInput = !this.isInput
      if (this.isInput) {
        this.$nextTick(() => {
          this.$refs.task_input.focus()
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
    // 天气搜索
    this.searchWeather()
  },
  destroyed () {
    // 销毁打字机定时器
    clearInterval(this.timer1)
    clearInterval(this.timer2)
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

// 在线字体
@import url(https://fonts.googleapis.com/css?family=Khula:700);

.home-container {
  margin: 0;
  padding: 0;
  // 开启3d效果
  // transform-style: preserve-3d;
  .bg{
    background-color: #fafafa;
    // background: url('~@/assets/images/home/texture.png');
    width: 100vw;
    height: 100vh;
    // background-size: cover;
    background-position: bottom;
    position: fixed;
    z-index: -10;
  }
  // 主页图片以及文字
  header{
    background: url("~@/assets/images/home/755ce8eegy1gjw0am3xs8j21fe2us1ky.png") no-repeat;
    background-origin: content-box;
    width: 100%;
    height: 55vh;
    // line-height: 750px;
    background-size: cover;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    .centerText{
      text-align: center;
      margin: auto 0;
      // margin-bottom: 55vh;
      h1{
        font-size: 8vmin;
        font-weight: 900;
        color: #fff;
        letter-spacing: 20px;
        text-shadow: 1px 1px 4px #fff, 0px 0px 5px #5f639b, 0 0 5px #424570;
      }
      // 打字机效果
      .console-container{
        font-family:Khula;
        font-size: 22px;
        text-align:center;
        height: 50px;
        line-height: 50px;
        display:block;
        // position:absolute;
        color:white;
        text-shadow: 1px 1px 4px #fff, 0px 0px 5px #5f639b, 0 0 5px #424570;
        .console-underscore {
          display:inline-block;
          position:relative;
          top:0;
          left:10px;
        }
        .hidden {
          opacity:0;
        }
      }
    }
  }
}
.index{
  display: flex;
  justify-content: center;
  // width: 100vw;
  padding: 50px 0;
  backdrop-filter: blur(2px);
  // 改变文字被选中时的颜色及背景
  ::selection {
    background: $colorK;
    color:#fff;
  }
  ::-moz-selection {
    background: $colorK;
    color:#fff;
  }
  ::-webkit-selection {
    background: $colorK;
    color:#fff;
  }
  /* 主页左侧区域：个人头像以及天气 */
  .left{
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 15px 0px;
    // padding: 20px 0;
    width: 20vw;
    max-width: 220px;
    height: 600px;
    // background-color: rgba($color: $colorG, $alpha: 0.85);
    border-radius: 15px;
    .perInfo{
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;
      background-color: rgba($color: $colorG, $alpha: 1);
      border-radius: 15px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
      /* 个人头像面板 */
      .avatar{
        width: 150px;
        height: 150px;
        background: url('~@/assets/images/avatar/mmexport1603512250737.jpg') no-repeat;
        background-size: cover;
        border-radius: 100px;
        margin: 20px 0;
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
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
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
  }
  /* 主页中间区域：日常动态展示以及发布 */
  .main{
    margin-top: 15px;
    width: 800px;
    min-width: 320px;
    padding: 0 20px;
    overflow-x: auto;
    overflow-y: hidden;
    // background-color: rgba($color: $colorL, $alpha: 0.25);
    border-radius: 10px;
  }
  /* 主页右侧区域：今日任务栏 */
  .right{
    margin: 15px 0px;
    width: 30vw;
    max-width: 250px;
    min-height: 500px;
    // background-color: rgba($color: $colorG, $alpha: 0.25);
    border-radius: 15px;
    // box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
    .memo{
      .el-card{
        max-width: 300px;
        min-width: 110px;
        border-radius: 15px;
        background: url('~@/assets/images/加油猫.png') no-repeat center;
        background-size: 75%;
        background-color: rgba($color: #ffffff, $alpha: 1);
        /* 任务栏头部 */
        ::v-deep .clearfix{
          color: $colorK;
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
            width: 100%;
          }
          /* 任务添加输入框，默认隐藏 */
          .el-input{
            .el-input__inner{
              margin-top: 12px;
            border: 1px solid $colorK;
            box-shadow: 0 2px 4px 0 rgba(246, 207, 145, 0.274), 0 3px 10px 0 rgba(190, 190, 190, 0.19);
          }
          }
        }
        /* 任务展示面板 */
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
              flex-grow: 1;
            }
            .el-icon-close:hover{
              cursor: pointer;
              color: $colorK;
            }
          }
        }
        /* 收起任务栏 */
        .closeTask{
          display: none !important;
          animation: task .5s linear !important;
        }
        .el-button--text{
          color: $colorK;
        }
      }
    }
  }
}
</style>
