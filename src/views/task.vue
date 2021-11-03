<template>
  <div class="task-container">
    <div class="task-bg"></div>
    <div class="task-header">
      <div class="countdown">
        <div class="countdown-top">考研倒计时</div>
        <div class="countdown-main">
          <span class="time">{{ countdown }}</span>
          <span>天</span>
        </div>
        <div class="countdown-footer">
          <div class="year">
            <span>{{ timeNow[0] }}</span>
            <span>YEAR</span>
          </div>
          <div class="month">
            <span>{{ timeNow[1] }}</span>
            <span>MONTH</span>
          </div>
          <div class="day">
            <span>{{ timeNow[2] }}</span>
            <span>DAY</span>
          </div>
          <div class="now-time">
            <span>{{ time[0] + ' : ' + time[1] + ' : ' + time[2]}}</span>
            <span>TIME</span>
          </div>
        </div>
      </div>
      <div class="search">
        <img src="@/assets/images/搜索.png" alt="">
        <input type="text" v-model="query" @keydown.enter="search()">
        <i class="el-icon-s-promotion" @click="search"/>
      </div>
    </div>
    <div class="task-main">
      12
    </div>
  </div>
</template>

<script>
export default {
  name: 'task',
  data () {
    return {
      timeNow: [],
      time: [],
      countdown: 0,
      // 搜索
      query: ''
    }
  },
  mounted () {
    this.getDate()

    const timer = setInterval(() => {
      const date = new Date()
      const f = (date.toLocaleString() + '').split(' ')[1].slice(0, 2)
      const arr = (date.toLocaleString() + '').split(' ')[1].slice(2)
      this.time = arr.split(':')
      if (f === '下午') {
        this.time[0] = parseInt(this.time[0]) + 12
      }
    }, 0)
  },
  methods: {
    getDate () {
      // 获取倒计时天数
      const leftDay = new Date()
      const today = new Date()
      leftDay.setFullYear(2022, 11, 24)
      this.countdown = leftDay.getTime() - today.getTime()
      this.countdown = Math.floor(this.countdown / (1000 * 60 * 60 * 24))
      // 获取当前时间
      const date = new Date()
      const arr = (date.toLocaleString() + '').split(' ')
      this.timeNow = arr[0].split('/')
      this.timeNow[0] = parseInt(this.timeNow[0]) % 100
    },
    search () {
      if (this.query === '') {
        return 0
      }
      window.open('http://www.baidu.com/s?wd=' + this.query)
    }
  }
}
</script>

<style lang="scss" scoped>
.task-container{
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  .task-bg{
    width: 100%;
    height: 100vh;
    min-height: 500px;
    background: url('~@/assets/images/wallhaven-9m9o2x.jpg');
    background-size: cover;
    background-position: bottom;
    position: fixed;
    z-index: -10;
  }
  .task-header{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .countdown{
      width: 780px;
      height: 500px;
      padding: 26px;
      border-radius: 26px;
      user-select: none;
      // backdrop-filter: blur(3px);
      background-color: rgba($color: #ffffff, $alpha: 0.5);
      .countdown-top{
        width: 100%;
        height: 70px;
        font-size: 42px;
        letter-spacing: 8px;
        background-image: linear-gradient(120deg, #0e3671 0%, #b6c7db 100%);
        background-clip:text;
        -webkit-background-clip:text;
        color: transparent;
        font-weight: bolder;
      }
      .countdown-main{
        width: 100%;
        height: 250px;
        line-height: 250px;
        user-select: none;
        text-align: center;
        span{
          font-size: 26px;
          background-image: linear-gradient(120deg, #0e3671 0%, #b6c7db 100%);
          background-clip:text;
          -webkit-background-clip:text;
          color: transparent;
          font-weight: bold;
        }
        .time{
          font-size: 168px;
          letter-spacing: 26px;
          background-image: linear-gradient(to top, #264d88 0%, #6295d8 100%);
          background-clip:text;
          -webkit-background-clip:text;
          color: transparent;
          font-weight: bolder;
          // font-style: oblique;
        }
      }
      .countdown-footer{
        height: 128px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        .year,.month,.day {
          height: 100%;
          width: 20%;
          flex-grow: 1;
          text-align: center;
          background-image: linear-gradient(120deg, #0e3671 0%, #b6c7db 100%);
          background-clip:text;
          -webkit-background-clip:text;
          color: transparent;
          span{
            display: block;
          }
          span:nth-child(1){
            font-size: 52px;
          }
          span:nth-child(2){
            font-size: 26px;
          }
        }
        .now-time{
          width: 40%;
          height: 100%;
          flex-grow: 3;
          text-align: center;
          background-image: linear-gradient(120deg, #48699b 0%, #b6c7db 100%);
          background-clip:text;
          -webkit-background-clip:text;
          color: transparent;
          span{
            display: block;
          }
          span:nth-child(1){
            font-size: 52px;
          }
          span:nth-child(2){
            font-size: 26px;
          }
        }
      }
    }
    .search{
      width: 780px;
      height: 50px;
      margin-top: 26px;
      border-radius: 56px;
      background-color: rgba($color: #ffffff, $alpha: 0.5);
      position: relative;
      img{
        position: absolute;
        top: 13px;
        left: 20px;
        width: 25px;
        height: 25px;
      }
      i{
        position: absolute;
        cursor: pointer;
        text-align: center;
        top: 2px;
        right: 20px;
        width: 50px;
        height: 46px;
        line-height: 46px;
        font-size: 26px;
        color: #fff;
        transition: .3s ease-in;
      }
      i::before{
        margin: auto 0;
      }
      i:hover{
        transform: scale(1.2);
        color: #0e3671;
      }
      input{
        outline-style: none;
        background-color: rgba($color: #fff, $alpha: 0);
        width: 100%;
        height: 50px;
        padding-left: 50px;
        padding-right: 20px;
        border-radius: 25px;
        border: 2px #fff solid;
        color: #0e3671;
        font-size: 16px;
      }
      input:focus{
        background-color: rgba($color: #fff, $alpha: 0.3);
        animation: inputBorder 2s infinite alternate;
        transition: 1s;
        @keyframes inputBorder {
          from{
            box-shadow: 0
          }
          to{
            box-shadow: inset 0 0 4px rgba(143, 143, 143, 0.096),0 0 18px rgb(255, 255, 255);
          }
        }
      }
    }
  }
  .task-main{
    width: 100%;
    height: 100vh;
    background-color: rgba($color: #eefaff, $alpha: 0.2);
  }
}
</style>
