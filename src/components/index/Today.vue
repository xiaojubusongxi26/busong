<template>
<div class="memo">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>Today</span>
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
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      // 控制任务列表展开
      isTask: true,
      // 任务列表
      taskList: [],
      // 添加任务
      inputTask: '',
      isInput: false
    }
  },
  watch: {},
  computed: {},
  methods: {
    // 任务添加输入框获取焦点
    getFocus () {
      this.isInput = !this.isInput
      if (this.isInput) {
        this.$nextTick(() => {
          this.$refs.task_input.focus()
        })
      }
      // console.log(this.$refs.task_input.focus())
    },
    // 获取任务
    getTask () {
      this.axios({
        url: 'http://localhost:1212/api/getUserTask',
        method: 'get'
      }).then(res => {
        const list = JSON.parse(res.data[0].userTask)
        this.taskList = Object.values(list)
      })
    },
    // 更新任务
    updateTask () {
      this.inputTask = ''
      this.axios({
        url: 'http://localhost:1212/api/setUserTask',
        method: 'get',
        params: this.taskList
      }).then(res => {
        this.getTask()
      })
    },
    // 添加任务
    addTask () {
      // 正则判断是否有全是空格
      const re = new RegExp('^[ ]+$')
      if (this.inputTask === '' || re.test(this.inputTask)) {
        console.log('请添加有效内容！')
      } else {
        this.taskList.push(this.inputTask.trim())
      }
      this.updateTask()
    },
    // 删除任务
    removeTask (index) {
      this.taskList.splice(index, 1)
      this.updateTask()
    }
  },
  created () {},
  mounted () {
    this.getTask()
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/sass/config.scss';
@import '@/assets/sass/responsive.scss';

.memo{
  .el-card{
    max-width: 300px;
    min-width: 110px;
    border-radius: 15px;
    // background: url('~@/assets/images/加油猫.png') no-repeat center;
    background-size: 75%;
    background-color: rgba($color: #ffffff, $alpha: 1);
    /* 任务栏头部 */
    ::v-deep .clearfix{
      color: #000000;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      span{
        flex-grow: 5;
        font-weight: bold;
      }
      &:first-child {
        font-size: 22px;
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
</style>
