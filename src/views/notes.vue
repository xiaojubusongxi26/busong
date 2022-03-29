<template>
  <div class="notes-container">
    <div class="bg"></div>
    <!-- 文档分类 -->
    <div class="notes-sort">
      <!-- 文档树 -->
      <div class="notes-sort-header">
        <span>
          我的文档
          <img src="~@/assets/images/notes/猫.png" alt="">
        </span>
        <i class="el-icon-plus" @click="showEditModal = true"></i>
      </div>
      <!-- 文档列表 -->
      <div class="notes-sort-list">
        <el-collapse v-model="activeName" accordion>
          <!-- 遍历文档列表 -->
          <el-collapse-item :title="item.notesClassName" v-for="(item, index) in this.notesClass"
              :key="index" :name="item.notesClassName">
              <!-- 遍历文档 -->
              <div class="del-notes-class">
                <i class="el-icon-delete"></i>
              </div>
            <div v-for="(item_notes, index_notes) in item.notes"
             :key="index_notes">{{ item_notes.notesName }}
              <img src="@/assets/images/notes/星星.png" alt="">
              <i class="el-icon-delete"></i>
             </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <mavon-editor v-model="sqlData.markdown" ref=md  @save="saveArticle" @imgAdd="$imgAdd" @imgDel="$imgDel"/>
    <!--  添加悬浮卡片层  -->
    <model
      title="ヾ(❀^ω^)ﾉﾞ崽~快来写一篇笔记吧"
      color="#FCB69F"
      submit="添加"
      :showModal="showEditModal"
      @cancel="showEditModal=false"
      @submit="addNote()"
    >
      <template v-slot:body>
        <!-- 添加笔记 -->
        <div class="add-note">
          <!-- 新建分类 -->
          <div class="new" @click="addShow = true" :style="{ color: addShow ? '#FCB69F' : '#000'}">
            (｡◕ˇ∀ˇ◕)  分类
          </div>
          <!-- 新建笔记 -->
          <div class="new" @click="addShow = false" :style="{ color: !addShow ? '#FCB69F' : '#000'}">
            (◕ᴗ◕✿)  笔记
          </div>
          <!-- 分类 -->
          <div class="category" v-show="addShow">
            <span>(～￣▽￣)～ 你想把我放在哪一类呢？</span>
            <el-input
              placeholder="快来创建一个新的分类吧"
              v-model="newClassName"
              @keydown.enter.native="addNote()"
              clearable>
            </el-input>
          </div>
          <!-- 笔记 -->
          <div class="category" v-show="!addShow">
            <span>
              (๑╹◡╹)ﾉ"""好耶!又多一篇笔记~
              <img src="~@/assets/images/notes/星星.png" alt="">
            </span>
            <el-input placeholder="请给我取一个好听又好用的名字吧~" v-model="newNoteName"
            class="input-with-select" @keydown.enter.native="addNote()">
              <el-select v-model="selectClass" slot="prepend" placeholder="选我!选我!">
                <el-option :label="item.notesClassName" v-for="(item, index) in notesClass"
                   :key="index" :value="item.notesClassName"></el-option>
              </el-select>
            </el-input>
          </div>
        </div>
      </template>
    </model>
  </div>
</template>

<script>
import Model from '@/components/Model.vue'
import axios from 'axios'

const areaAxios = axios.create({
  headers: { 'Content-Type': 'application/json;charset=utf-8' }, // 设置传输内容的类型和编码
  withCredentials: true// 指定某个请求应该发送凭据
})
const fileAxios = axios.create({
  headers: { 'Content-Type': 'multipart/form-data' }, // 设置传输内容的类型和编码
  withCredentials: true// 指定某个请求应该发送凭据
})
const areaFormAxios = axios.create({
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, // 设置传输内容的类型和编码
  withCredentials: true// 指定某个请求应该发送凭据
})

export default {
  name: 'notes',
  data () {
    return {
      // 笔记
      mark: '# 不再看，天上太阳透过云彩的光',
      sqlData: {
        markdown: '',
        html: ''
      },
      link: '',
      img_file: {}, // 一次上次多张图片时使用
      /* 新建类型 */
      addShow: true,
      newClassName: '', // 新建分类的名称
      newNoteName: '', // 新建笔记的名称
      selectClass: '', // 创建笔记所在分类
      /* 文件分类 */
      notesClass: [
        {
          notesClassName: '计算机',
          notes: [
            { notesName: '操作系统' },
            { notesName: '数据结构' }
          ]
        },
        {
          notesClassName: '数学',
          notes: [
            { notesName: '高等数学' },
            { notesName: '线性代数' },
            { notesName: '概率论' }
          ]
        }
      ],
      /* 文件列表 */
      activeName: '',
      /* 添加文件 */
      showEditModal: false,
      /* 菜单栏 */
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      defaultProps: {
        children: 'notes',
        label: 'notesName'
      }
    }
  },
  components: {
    Model
  },
  mounted () {
    // 如果原始md字符串中存在曾上传的图片， 则需要将对应<img>中的src替换为base64
    this.$nextTick(() => {
      // $vm.$imgUpdateByUrl 详情见本页末尾
      this.$refs.md.$imgUpdateByUrl(0, 'base64内容')
    })
    // this.getArticle()
  },
  methods: {
    /* 添加笔记 */
    addNote () {
      /* 分类的添加 */
      if (this.addShow) {
        /* 判断是否传入空值 */
        if (this.newClassName === '') return
        const temporarily = {
          notesClassName: this.newClassName,
          notes: []
        }
        this.notesClass.push(temporarily)

        this.newClassName = ''
      } else {
        /* 添加笔记 */

        /* 判断是否传入空值 */
        if (this.selectClass === '' || this.newNoteName === '') return
        const temporarily = {
          notesName: this.newNoteName
        }
        for (const item of this.notesClass) {
          if (item.notesClassName === this.selectClass) {
            item.notes.push(temporarily)
          }
        }

        this.newNoteName = ''
        this.selectClass = ''
      }
    },
    $imgDel (pos) {
      delete this.img_file[pos]
    },
    // 绑定@imgAdd event
    $imgAdd (pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('file', $file)
      axios({
        url: '/api/md-content/uploadImg?mdId=2',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data', 'Jwt-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6IuWwj-apmCIsImV4cCI6MTYzOTgzMjU5MiwidXNlcklkIjoiMiIsImlhdCI6MTYzNzI0MDU5Mn0.2KcwoebtnSK1fKjsvhtq6M0qmUr4fNUooad3i8lVWAQ' }
      }).then((res) => {
        // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
        /**
        * $vm 指为mavonEditor实例，可以通过如下两种方式获取
        * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
        * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
        */
        console.log(res)
        this.$refs.md.$img2Url(pos, 'http://192.168.3.30:9421/md/2/MySQL1.assets/' + res.data.data.url)
      })
    },
    // 获取文章
    getArticle () {
      areaFormAxios.get('/api/get', {
        params: { id: 12 }
      }).then(response => {
        console.log(this.sqlData)
        this.sqlData = response.data
      }).catch(() => {
        alert('请求失败')
      })
    },
    // 保存文章
    saveArticle () {
      const htmlCode = this.$refs.md.d_render
      const markdownCode = this.$refs.md.d_value
      // console.log(htmlCode)
      if (htmlCode.length === 0 || markdownCode.length === 0) {
        alert('请填写')
        return
      }
      this.exportRaw('text.md', markdownCode) // 第一个参数是文件名称,第二个参数为字符串
      axios({
        url: '/api/md-content/test?mdTitle=MySQL2',
        method: 'post',
        // data: JSON.stringify({ 'markdown': markdownCode, 'html': htmlCode }),
        params: {
          'md-Content': markdownCode
        },
        headers: { 'Jwt-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6IuWwj-apmCIsImV4cCI6MTYzOTgzMjU5MiwidXNlcklkIjoiMiIsImlhdCI6MTYzNzI0MDU5Mn0.2KcwoebtnSK1fKjsvhtq6M0qmUr4fNUooad3i8lVWAQ' }
      }).then((response) => {
        // console.log(response)
        if (response.data > 0) {
          alert('成功')
        } else {
          alert('失败')
        }
      })
    },
    fakeClick (obj) {
      var ev = document.createEvent('MouseEvents')
      ev.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      obj.dispatchEvent(ev)
    },
    exportRaw (name, data) {
      var urlObject = window.URL || window.webkitURL || window
      var exportBlob = new Blob([data])
      var saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
      this.link = saveLink
      console.log(this.link)
      saveLink.href = urlObject.createObjectURL(exportBlob)
      saveLink.download = name
      this.fakeClick(saveLink)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/config.scss';
@import '@/assets/sass/responsive.scss';

.notes-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  margin: 0;
  padding: 0;
  .bg{
    background-image: linear-gradient(135deg,#fcb69f 20%, #ffecd2 100%);
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-position: bottom;
    position: fixed;
    z-index: -10;
  }
  /* 文档分类 */
  .notes-sort {
    width: 50px;
    height: calc(100vh - 50px);
    // position: absolute;
    background: #fcb69f;
    font-family:'Courier New', Courier, monospace;
    font-weight: bold;
    margin-top: 50px;
    transition: all .5s;
    .notes-sort-header{
      width: 250px;
      height: 50px;
      line-height: 50px;
      margin-left: 50px;
      padding: 0 10px;
      background: #76a2b1;
      color: #fff;
      border-bottom: 5px #fff solid;
      span{
        display: inline-block;
        width: 210px;
      }
      /* 添加文档 */
      .el-icon-plus{
        display: inline-block;
        cursor: pointer;
        font-size: 18px;
        &:hover{
          color: #ff6600;
        }
      }
    }
    /* 文档列表 */
    .notes-sort-list {
      width: 250px;
      height: calc(100% - 50px);
      margin-left: 50px;
      background-color: rgba($color: #fff, $alpha: 0.55);
      ::v-deep .el-collapse-item {
        position: relative;
        /* 类名 */
        .el-collapse-item__header {
          padding: 0 10px;
          font-size: 16px;
          font-weight: bold;
          border-bottom: 1px #fff solid;
          background-color: rgba($color: #76a2b1, $alpha: 0.95);
          color: #fff;
          &:hover {
            color: #fcb69f;
            background: #76a2b1;
          }
        }
        /* 文档部分 */
        .el-collapse-item__wrap {
          background-color: rgba($color: #76a2b1, $alpha: 0.85);
          .el-collapse-item__content {
            padding-bottom: 10px;
            .del-notes-class {
              position: absolute;
              padding: 0 !important;
              margin: 0;
              top: 6px;
              right: 20px;
              z-index: 1;
            }
            div{
              min-height: 36px;
              line-height: 36px;
              font-size: 14px;
              padding-left: 30px;
              user-select: none;
              position: relative;
              color: #fff;
              &:hover {
                color: #fcb69f;
                background-color: rgba($color: #fff, $alpha: 0.25);
              }
              .el-icon-delete {
                position: absolute;
                cursor: pointer;
                right: 30px;
                font-size: 16px;
                line-height: 36px;
              }
            }
          }
        }
      }
    }
  }
  // 悬浮展开
  .notes-sort:hover{
    width: 300px;
  }
  /* markdown主体部分 */
  .markdown-body{
    z-index: 4;
    height: calc(100vh - 50px);
    width: 100%;
    right: 0;
    // position: absolute;
    top: 50px;
    /* 左侧编辑区域 */
    ::v-deep .v-note-edit {
      background-color:#fffbee !important;
      /* 文字外区域边框部分 */
      .content-input-wrapper{
        background-color:#fffbee !important;
        /* 输入文字区域 */
        .auto-textarea-input {
          background-color:#fffbee !important;
        }
      }
    }
    /* 右侧预览区域 */
    ::v-deep .v-show-content{
      background-color: #fffcf7 !important;
    }
  }
  /* 添加窗口样式 */
  .model{
    .add-note{
      display: flex;
      height: 150px;
      width: 100%;
      position: relative;
      /* 选择要新建的类型 */
      .new{
        width: 50%;
        height: 50px;
        line-height: 50px;
        border: 1px #f4f5f7 solid;
        text-align: center;
        user-select: none;
        cursor: pointer;
        background: #fff;
        font-size: 18px;
      }
      /* 功能页部分 */
      .category{
        display: block;
        position: absolute;
        top: 80px;
        width: 100%;
        height: 70px;
        ::v-deep .el-select .el-input {
          width: 130px;
        }
        span {
          display: inline-block;
          font-size: 18px;
          margin: 8px 0;
        }
      }
    }
  }
}
</style>
