<template>
<div class="countdown" @click="isEdit = true">
  <div class="title">
    <span> {{ thingName }} </span>
  </div>
  <div class="time">
    <span>{{ showTime }}</span>
    <span class="time-label">天</span>
  </div>
  <div class="setting-time">
    <el-dialog title="编辑倒计时"
     :visible.sync="isEdit"
     append-to-body
     custom-class='el-dialog-add'
     :lock-scroll=false
     top="35vh">
      <div slot="title" class="dialog-title">
        <span>编辑倒计时</span>
      </div>
      <div class="dialog-body">
        <ul>
          <li>
            <span>事件名称:</span>
            <el-input v-model="thingName" placeholder="请输入内容"></el-input>
          </li>
          <li>
            <span>目标时间:</span>
            <el-date-picker
              v-model="setTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </li>
          <li></li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isEdit = false">取 消</el-button>
        <el-button type="primary" @click="updateCountDown()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</div>
</template>

<script>
import Model from '../Model.vue'
export default {
  components: { },
  props: {},
  data () {
    return {
      isEdit: false,
      thingName: '考研倒计时',
      setTime: '',
      nowTime: new Date(),
      showTime: 260,
      thingLoop: '',
      value1: ''
    }
  },
  watch: {},
  computed: {},
  methods: {
    updateCountDown () {
      // console.log(this.setTime, this.nowTime)
      // 处理时间差
      this.showTime = Math.ceil((this.setTime.getTime() - this.nowTime.getTime()) / (24 * 60 * 60 * 1000))

      // 实例化对象，上传至后端
      const countDown = {
        countDownName: this.thingName,
        // 时间默认格式为：Sat Dec 24 2022 08:00:00 GMT+0800 (中国标准时间)
        // 格式化时间，方便存储和使用，格式为：2022-12-24T08:00:00
        countDownTime: this.setTime.getFullYear() + '-' + (this.setTime.getMonth() + 1).toString().padStart(2, '0') +
         '-' + this.setTime.getDate().toString().padStart(2, '0') +
         'T' + this.setTime.getHours().toString().padStart(2, '0') +
         ':' + this.setTime.getMinutes().toString().padStart(2, '0') +
         ':' + this.setTime.getSeconds().toString().padStart(2, '0'),
        countDownLoop: this.thingLoop
      }

      // 关闭弹窗
      this.isEdit = false
      console.log(countDown.countDownTime, new Date(countDown.countDownTime))
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang="scss" scoped>
// 弹窗样式
.dialog-title {
  font-size: 22px;
  font-weight: bold;
}
.dialog-body {
  ul {
    list-style: none;
    li {
      display: flex;
      margin: 10px 0;
      span {
        height: 40px;
        line-height: 40px;
        margin-right: 16px;
      }
      .el-input {
        max-width: 210px;
      }
    }
  }
}
.dialog-footer {
  display: flex;
  justify-content: center;
  .el-button--primary {
    background: #629ac0;
    border-color: #629ac0;
  }
  .el-button--primary:focus, .el-button--primary:hover {
    background: #93b5cf;
    border-color: #93b5cf;
  }
}
.el-button:focus, .el-button:hover {
    color: #629ac0;
    border-color: #93b5cf;
    background-color: #f0f8fd;
}
::v-deep .el-dialog__close:hover {
  color: #629ac0 !important;
}
.countdown {
  padding-bottom: 10px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  background-color: white;
  border-radius: 15px;
  user-select: none;
  cursor: pointer;
  .title {
    height: 56px;
    line-height: 56px;
    text-align: center;
    margin: 0 auto;
    border-radius: 15px 15px 0 0;
    background: #629ac0;
    color: #ffffff;
  }
  .time {
    height: 120px;
    line-height: 120px;
    text-align: center;
    margin: 0 auto;
    font-size: 4rem;
    font-weight: bolder;
    color: #629ac0;
    .time-label {
      margin-left: 12px;
      font-size: 2rem;
    }
  }
}
</style>
