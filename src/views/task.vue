<template>
  <div class="task-container">
    <!-- 背景 -->
    <div class="task-bg"></div>
    <!-- 网页指示卡片 -->
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
    <!-- 任务栏页面主要部分 -->
    <div class="task-main">
      <!-- 任务栏 -->
      <div class="task-list">
        <!-- 任务导航栏 -->
        <div class="task-list-nav">
          <ul>
            <li>
              <span>
                <svg t="1636473327693" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8717" width="26" height="26"><path d="M463.808 726.4h-0.256a39.584 39.584 0 0 1-28.48-12.416l-208.576-223.04a39.2 39.2 0 0 1 1.856-55.488 39.2 39.2 0 0 1 55.456 1.856l180.352 192.736 273.152-284.288a39.296 39.296 0 0 1 55.456-1.088c15.584 14.944 16.064 39.872 1.088 55.456l-301.824 314.112c-7.232 7.84-17.568 12.16-28.224 12.16z" p-id="8718" fill="#ffffff"></path><path d="M896.576 1020.864H124.288C55.808 1020.864 0 967.968 0 903.04V196.32c0-64.896 55.84-117.792 124.288-117.792h130.912c21.76 0 39.264 17.536 39.264 39.264s-17.536 39.264-39.264 39.264h-130.88c-25.28 0-45.792 17.664-45.792 39.264v706.752c0 21.6 20.48 39.264 45.76 39.264h772.16c25.28 0 45.76-17.664 45.76-39.264V196.32c0-21.6-20.48-39.264-45.76-39.264h-130.816A39.232 39.232 0 0 1 726.4 117.792c0-21.728 17.568-39.264 39.264-39.264h130.944c68.576 0 124.288 52.896 124.288 117.792v706.752c0 64.896-55.84 117.76-124.288 117.76z" p-id="8719" fill="#ffffff"></path><path d="M687.104 235.584H333.76a117.984 117.984 0 0 1-117.76-117.792A117.984 117.984 0 0 1 333.696 0h353.376a117.984 117.984 0 0 1 117.792 117.792 117.984 117.984 0 0 1-117.76 117.792zM333.76 78.528a39.36 39.36 0 0 0-39.264 39.264 39.36 39.36 0 0 0 39.264 39.264h353.376A39.36 39.36 0 0 0 726.4 117.792a39.36 39.36 0 0 0-39.264-39.264H333.76z" p-id="8720" fill="#ffffff"></path></svg>
              </span>
              <span class="nav-text">每日任务</span>
            </li>
            <li>
              <span>
                <svg t="1636473182970" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6598"
                 width="26" height="26"><path d="M401.408 412.16l-13.312 10.752c0 22.016 0.512 44.032 0.512 66.56h162.304L441.344 778.24v10.24l77.312 10.752 15.872-11.264 109.056-307.2V465.92l-10.752-53.76H401.408z" fill="#fff" p-id="6599"></path><path d="M865.28 117.76h-108.544V48.128c0-20.992-20.992-38.4-47.104-38.4s-47.104 16.896-47.104 38.4V117.76H357.376V50.688c0-20.992-20.992-38.4-47.104-38.4s-47.104 16.896-47.104 38.4V117.76H158.208c-81.92 0-148.48 57.856-148.48 129.024v637.952c0 70.656 66.56 129.024 148.48 129.024h706.56c81.92 0 148.48-57.856 148.48-129.024V246.784C1013.76 175.616 947.2 117.76 865.28 117.76z m45.568 766.464c0 12.8-19.968 27.136-45.568 27.136H158.72c-25.6 0-45.568-14.336-45.568-27.136V246.272c0-12.8 19.968-27.136 45.568-27.136h104.448v50.688c0 20.992 20.992 38.4 47.104 38.4s47.104-16.896 47.104-38.4v-50.176h306.176v48.128c0 20.992 20.992 38.4 47.104 38.4s47.104-16.896 47.104-38.4v-48.128h108.544c25.6 0 45.568 14.336 45.568 27.136l-1.024 637.44z" fill="#fff" p-id="6600"></path></svg>
              </span>
              <span class="nav-text">每周任务</span>
            </li>
            <li>
              <span>
                <svg t="1636473500824" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15726" width="26" height="26"><path d="M608.768 176c-17.6 0-32 14.4-32 32l0 224-224 0c-17.6 0-32 14.4-32 32l0 160L96 624c-17.6 0-32 14.4-32 32l0 256c0 17.6 14.4 32 32 32l831.232 0c17.6 0 32-14.4 32-32l0-128c0-17.6 0-46.4 0-64l0-64c0-17.6 0-46.4 0-64l0-128c0-17.6 0-46.4 0-64l0-192c0-17.6-14.4-32-32-32L608.768 176z" p-id="15727" fill="#ffffff"></path><path d="M576 80l384 0 0 64-384 0 0-64Z" p-id="15728" fill="#ffffff"></path><path d="M320 336l224 0 0 64-224 0 0-64Z" p-id="15729" fill="#ffffff"></path><path d="M64 528.448l224 0 0 64-224 0 0-64Z" p-id="15730" fill="#ffffff"></path></svg>
              </span>
              <span class="nav-text">阶段计划</span>
            </li>
          </ul>
        </div>
        <!-- 任务栏显示部分 -->
        <div class="task-list-main">
          <!-- 任务栏标题 -->
          <div class="task-list-main-title">
            <span>{{ '20' + timeNow[0] + '/' + timeNow[1] + '/' + timeNow[2]}}</span>
            <p>每日任务</p>
            <span @click="openAddTask()"><i class="el-icon-edit"></i></span>
          </div>
          <!-- 任务主要展示部分 -->
          <div class="task-list-main-show" @touchmove.prevent>
            <ul class="daily-task" @touchmove.prevent>
              <li v-for="(item,index) in dailyTask" :key="index" @touchmove.prevent>
                <!-- 完成状态 -->
                <el-checkbox v-model="item.isFinish"></el-checkbox>
                <span>
                  <img :src="finishTime(item.implementTime)" alt="">
                </span>
                <span :style="{ textDecoration: item.isFinish ? 'line-through' : '',
                   color: item.isFinish ? '#a4b9e3' : '' }">
                    {{ index + 1 + '. ' + item.dailyTaskInfo }}
                    <img src="@/assets/images/task/完成.png" v-show="item.isFinish" alt="">
                </span>
                <span class="delete-task">
                  <i class="el-icon-close" @click="delDailyTask(index)"></i>
                </span>
              </li>
              <div v-show="dailyTask.length === 0" class="nullTask">
                <span class="animation-text line">千里之行，始于足下</span>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <!-- 常用网站 -->
      <div class="nets">
        <ul class="nets-list">
          <li class="nets-header">常用网站</li>
          <li>
            <a href="https://www.bilibili.com/" target="blank">
              <span>哔哩哔哩</span>
            </a>
          </li>
          <li>
            <a href="https://translate.google.cn/" target="blank">
              <span>谷歌翻译</span>
            </a>
          </li>
          <li>
            <a href="https://www.w3school.com.cn/" target="blank">
              <span>w3school</span>
            </a>
          </li>
          <li>
            <a href="https://www.icourse163.org/" target="blank">
              <span>中国大学MOOC</span>
            </a>
          </li>
          <li>
            <a href="https://www.pintia.cn/" target="blank">
              <span style="width: 100%">PTA</span>
            </a>
          </li>
          <li>
            <a href="https://leetcode-cn.com/" target="blank">
              <span style="width: 100%">LeetCode 力扣网</span>
            </a>
          </li>
          <li>
            <a href="https://www.chaonengsou.com/" target="blank">
              <span style="width: 100%">超能搜</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!--  添加悬浮卡片层  -->
    <model
      title="日常任务"
      color="#bed7b4"
      submit='添加'
      :showModal="showEditModal"
      @cancel="showEditModal=false"
      @submit="addDailyTask()"
    >
      <template v-slot:body>
        <!-- 日常任务 -->
        <div class="dailyTask">
          <!-- 日常任务时间安排 -->
          <el-select v-model="addDailyTaskTime" placeholder="时间">
            <el-option
              v-for="item in dailyTaskTime"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input v-model="addDailyTaskInfo" @keydown.enter.native="addDailyTask()" placeholder="快写下你的新任务吧！"></el-input>
        </div>
      </template>
    </model>
  </div>
</template>

<script>
import Model from '@/components/Model.vue'
export default {
  name: 'task',
  data () {
    return {
      timeNow: [], // 年月日
      time: [], // 时分秒
      countdown: 0, // 倒计时天数
      // 搜索
      query: '',
      // 定时器
      timer: '',

      showEditModal: false, // 是否显示任务添加弹框
      addTask: true, // 添加任务

      // 日常任务 {implementTime:任务安排时间 dailyTaskInfo:任务内容}
      dailyTask: [
        { implementTime: '下午', dailyTaskInfo: '写代码', isFinish: false },
        { implementTime: '晚上', dailyTaskInfo: '刷题', isFinish: true }
      ],

      // 日常任务时段
      dailyTaskTime: [
        {
          value: '上午',
          label: '上午'
        },
        {
          value: '下午',
          label: '下午'
        },
        {
          value: '晚上',
          label: '晚上'
        }
      ],

      // 添加任务
      addDailyTaskTime: '', // 添加任务执行时间
      addDailyTaskInfo: '' // 添加日常任务信息
    }
  },
  components: {
    Model
  },
  mounted () {
    this.getDate()

    /* 实时刷新倒计时 */
    this.timer = setInterval(() => {
      const date = new Date()
      // 获取当前为上午还是下午，采用二十四小时制
      const f = (date.toLocaleString() + '').split(' ')[1].slice(0, 2)
      // 当前时间
      const arr = (date.toLocaleString() + '').split(' ')[1].slice(2)
      // this.time[0] 为当前小时
      this.time = arr.split(':')
      if (this.time[0] < 10) {
        this.time[0] = '0' + this.time[0]
      }
      if (f === '上午' && this.time[0] === '12') {
        this.time[0] = '0' + 0
      }
      // 设置为24小时制
      if (f === '下午') {
        if (parseInt(this.time[0]) !== 0) {
          this.time[0] = parseInt(this.time[0]) + 12
        }
      }
    }, 0)
  },
  beforeDestroy () {
    /* 销毁定时器 */
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    /* 获得当前日期信息 */
    getDate () {
      // 获取倒计时天数
      const leftDay = new Date()
      const today = new Date()
      /* 目标日期 */
      leftDay.setFullYear(2022, 11, 23)
      // leftDay.setFullYear(2022, 1, 0)
      /* 计算当前日期——目标日期的毫秒差 */
      this.countdown = leftDay.getTime() - today.getTime()
      /* 将时间差转换为天数 */
      this.countdown = Math.floor(this.countdown / (1000 * 60 * 60 * 24))
      // 获取当前时间
      const date = new Date()
      /* 处理时间，获得格式 (2021/11/13 上午1:01:16) */
      const arr = (date.toLocaleString() + '').split(' ')
      this.timeNow = arr[0].split('/')
      // 取年份后两位
      this.timeNow[0] = parseInt(this.timeNow[0]) % 100
    },
    /* 搜索 */
    search () {
      if (this.query === '') {
        return 0
      }
      window.open('http://www.baidu.com/s?wd=' + this.query)
    },
    /* 打开添加任务卡片 */
    openAddTask () {
      this.showEditModal = true
    },
    /* 添加日常任务 */
    addDailyTask () {
      /* 判断是否输入相应的值 */
      if (this.addDailyTaskTime === '' || this.addDailyTaskInfo === '') {
        return 0
      }
      const newDailyTask = {
        implementTime: this.addDailyTaskTime,
        dailyTaskInfo: this.addDailyTaskInfo
      }
      /* 添加新任务进数组 */
      this.dailyTask.push(newDailyTask)

      /* 添加完毕后，关闭添加栏 */
      this.addDailyTaskTime = ''
      this.addDailyTaskInfo = ''
      this.showEditModal = false
    },
    /* 删除日常任务 */
    delDailyTask (index) {
      let flag = -1
      for (let i = 0; i < this.dailyTask.length; i++) {
        if (i === index) {
          flag = i
        }
      }
      delete this.dailyTask.splice(flag, 1)
    },
    /* 动态绑定某任务完成时间小图片地址 */
    finishTime (t) {
      if (t === '上午') {
        return require('@/assets/images/task/太阳.png')
      } else if (t === '下午') {
        return require('@/assets/images/task/午后.png')
      } else {
        return require('@/assets/images/task/月亮.png')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/responsive.scss';
@import '@/assets/sass/config.scss';

*{
  margin: 0;
  padding: 0;
}
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
    background: url('~@/assets/images/home/a9061e6fgy1gx6egjec84j23e82jo1ky.jpg');
    background-size: cover;
    background-position: bottom;
    position: fixed;
    z-index: -10;
  }
  /* 页面指示可卡片 */
  .task-header{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* 计时器 */
    .countdown{
      width: 780px;
      height: 500px;
      padding: 26px;
      border-radius: 26px;
      user-select: none;
      // backdrop-filter: blur(3px);
      background-color: rgba($color: #ffffff, $alpha: 0.6);
      /* 计时器主题：考研倒计时 */
      .countdown-top{
        width: 100%;
        height: 70px;
        font-size: 42px;
        letter-spacing: 8px;
        background-image: linear-gradient(120deg, #ffffff 0%, #ffffff 100%);
        background-clip:text;
        -webkit-background-clip:text;
        color: transparent;
        font-weight: bolder;
      }
      /* 倒计时主要天数 */
      .countdown-main{
        width: 100%;
        height: 250px;
        line-height: 250px;
        user-select: none;
        text-align: center;
        span{
          font-size: 26px;
          background-image: linear-gradient(120deg, #c96a4a 0%, #fe6659 100%);
          background-clip:text;
          -webkit-background-clip:text;
          color: transparent;
          font-weight: bold;
        }
        .time{
          font-size: 168px;
          letter-spacing: 26px;
          background-image: linear-gradient(120deg, #faac67 0%, #fa6b43 100%);
          background-clip:text;
          -webkit-background-clip:text;
          color: transparent;
          font-weight: bolder;
          // font-style: oblique;
        }
      }
      /* 当前年月日时分秒 */
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
          background-image: linear-gradient(120deg, #ffffff 0%, #ffffff 100%);
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
          background-image: linear-gradient(120deg, #ffffff 0%, #ffffff 100%);
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
    /* 底部搜索框 */
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
        color: #fa7b4c;
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
        color: #fa7b4c;
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
  /* 任务页面主要内容 */
  .task-main{
    width: 100%;
    height: 100vh;
    background-color: rgba($color: #f8f8f8, $alpha: 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    /* 任务栏 */
    .task-list{
      width: 50%;
      height: 80vh;
      margin: 10px;
      display: flex;
      border: 2px #fff solid;
      border-left: 0px;
      background-color: rgba($color: #fff, $alpha: 0.95);
      /* 任务导航栏 */
      .task-list-nav {
        width: 50px;
        height: 100%;
        background-color: rgba($color: #ec8478, $alpha: 0.95);
        ul{
          user-select: none;
          padding: 15px 0;
          list-style: none;
          color:#fff;
          overflow: hidden;
          li {
            height: 50px;
            margin: 15px 0;
            padding: 0 12px;
            cursor: pointer;
            transition: all .3s;
            line-height: 50px;
            position: relative;
            overflow: hidden;
            span {
              height: 100%;
            }
            .nav-text {
              left: 50px;
              position: absolute;
            }
          }
          li:hover {
            transform: scale(1.1);
            background-color: rgba($color: #fff, $alpha: 0.55);
          }
        }
        transition: all .3s;
      }
      /* 任务导航栏悬停 */
      .task-list-nav:hover {
        width: 200px;
        background-color: rgba($color: #eb6e5e, $alpha: 0.95);
      }
      .task-list-main{
        width: 100%;
        height: 100%;
        padding: 30px;
        color: #4e4e4e;
        /* 隐藏滚动条 */
        scrollbar-width: none !important; /* firefox */
        -ms-overflow-style: none !important; /* IE 10+ */
        overflow-x: hidden !important;
        overflow-y: auto !important;
        .task-list-main-title {
          width: 100%;
          height: 70px;
          text-align: center;
          background: rgba($color: rgb(233, 233, 233), $alpha: 0.1);
          border-bottom: 2px solid #4e4e4e;
          font-family:'Courier New', Courier, monospace;
          font-weight: bolder;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          /* 任务栏头部文字标签：如每日任务 */
          p {
            flex-grow: 16;
            font-family:'Courier New', Courier, monospace;
            font-size: 26px;
            line-height: 70px;
            font-weight: bolder;
            letter-spacing: 3px;
          }
          // 时间
          span:nth-child(1) {
            position: absolute;
            left: 0;
            font-size: 26px;
            font-weight: 100;
          }
          // 添加按钮
          span:last-child {
            position: absolute;
            right: 0;
            font-size: 26px;
            cursor: pointer;
            overflow: hidden;
            white-space: nowrap;
          }
        }
        /* 任务展示 */
        .task-list-main-show {
          height: calc(100% - 70px);
          ul {
            height: 100%;
            list-style: none;
            position: relative;
            li {
              width: 100%;
              min-height: 50px;
              line-height: 50px;
              padding: 0 10px;
              position: relative;
              .el-checkbox {
                width: 20px;
                height: 100%;
                display: inline-block;
                align-items: center;
                ::v-deep .el-checkbox__input{
                  top: -1px;
                }
                ::v-deep .el-checkbox__inner {
                  box-sizing: border-box;
                  width: 20px;
                  height: 20px;
                  border: 1px solid#409eff;
                }
                ::v-deep .el-checkbox__inner::after {
                  border: 4px solid #FFF;
                  height: 10px;
                  left: 6px;
                  border-left: 0;
                  border-top: 0;
                }
              }
              /* 任务时间 */
              span{
                color: #4e4e4e;
                margin: 0 10px;
                img {
                  margin: 0 10px;
                  width: 20px;
                  height: 20px;
                }
              }
              .delete-task {
                position: absolute;
                cursor: pointer;
                right: 0;
                widows: 20px;
                height: 20px;
                .el-icon-close {
                  transition: all .5s;
                }
                .el-icon-close:hover {
                  transform: scale(1.3);
                }
              }
            }
            li:nth-child(odd) {
              background: #f1f1f1;
            }
            li:nth-child(even) {
              background: rgb(251, 251, 251);
            }
            /* 空任务时显示 */
            .nullTask {
              position: absolute;
              width: 100%;
              // height: 100%;
              top: 50%;
              text-align: center;
              color: #4e4e4e;
              overflow: hidden;
              user-select: none;
            }
            /* 打字机效果样式 */
            .line {
              display: inline-block;
              width: 170px;
              height: 26px;
              overflow: hidden;
              border-right: 2px solid #4e4e4e;
            }
            .animation-text {
              animation:  grow  3s  steps(36)  2s infinite  both,
                blink 200ms steps(26) infinite normal;
            }
            @keyframes grow {
              0% {
                width: 0;
              }
              75% {
                width: 170px;
              }
            }
            @keyframes blink {
              from {
                border-right-color: #4e4e4e;
              }
              to {
                border-right-color: transparent;
              }
            }
          }
        }
      }
      /* 隐藏滚动条 */
      .task-list-main::-webkit-scrollbar {
          display: none !important;
      }
    }
    /* 常用网站 */
    .nets{
      margin: 10px;
      width: 20%;
      max-width: 246px;
      height: 80vh;
      border: 2px #fff solid;
      background-color: rgba($color: #fff, $alpha: 0.95);
      /* 常用网站组 */
      .nets-list{
        list-style: none;
        margin: 0;
        padding: 10px;
        /* 网站标签 */
        li{
          height: 50px;
          text-align: center;
          margin: 10px 0;
          // border: 1px #b6c7db solid;
          border-radius: 4px;
          overflow: hidden;
          a{
            position: relative;
            display: flex;
            justify-content: center;
            height: 50px;
            line-height: 40px;
            border-radius: 6px;
            width: 100%;
            font-size: 16px;
            color: #5d5d5d;
            list-style: none;
            text-decoration: none;
            text-transform: capitalize;
            background: transparent;
            letter-spacing: 2px;
            border: 5px solid #5d5d5d;
            transition: .3s;
            z-index: 5;
            span {
              position: absolute;
              transition: .1s;
              font-size: 14px;
              height: 40px;
              margin: 0 auto;
            }
          }
          a:hover{
            color: #fff;
            transform: scale(1.05);
            span {
              font-size: 16px;
            }
          }
          a:before{
            content: '';
            position: absolute;
            width: 8%;
            height: 600%;
            background-color: rgba($color: #fbfeff, $alpha: 0.95);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-60deg);
            transition: all .5s;
          }
          a:hover:before {
            transform: translate(-50%, -50%) rotate(-90deg);
            width: 100%;
            background: #eb6e5e;
          }
        }
        li:hover{
          box-shadow: inset 0 0 2px #6295d863,0 0 8px #6295d848;
        }
        /* 常用网站头部 */
        .nets-header{
          user-select: none;
          margin-bottom: 5px;
          border: 0px;
          border-radius: 0;
          font-weight: bolder;
          letter-spacing: 6px;
          font-size: 26px;
          line-height: 50px;
          border-bottom: 1px rgb(126, 126, 126) solid;
        }
        .nets-header:hover{
          box-shadow: none !important;
        }
      }
    }
  }
  /* 添加任务卡片栏子组件model */
  .model{
    // 日常任务样式
    .dailyTask{
      .el-select {
        display: inline-block;
        width: 100px;
      }
      .el-input{
        display: inline-block;
        width: 480px;
        padding-left: 30px;
      }
    }
  }
}
</style>
