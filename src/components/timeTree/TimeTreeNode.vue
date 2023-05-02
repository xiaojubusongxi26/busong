<template>
  <div class="time_tree-node">
    <div class="time_tree-node--trunk">
      <div class="time_tree-leaf">
        <div class="time_tree-branche--bar hidden"></div>
      </div>
      <div class="time_tree-node--pot border--focus"></div>
      <div class="time_tree-leaf">
        <div class="time_tree-branche--bar"></div>
        <div class="time_tree-leaf--content">
          <textarea></textarea>
          <div class="demo-image__lazy">
            <el-image v-for="url in urls" :key="url" :src="url" lazy></el-image>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "TimeTreeNode",
  props: {
    position: {
      type: String,
      default: 'left'
    }
  },
  watch: {},
  data() {
    return {
      urls: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
      ]
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import "@/assets/sass/timetree/node.scss";
.time_tree-node {
  display: flex;
  width: 100%;
  padding: 30px;
  justify-content: center;
  .time_tree-node--trunk {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    justify-content: center;
    align-items: center;
    .time_tree-node--pot {
      position: absolute;
      top: 0;
      width: 30px;
      height: 30px;
      border-radius: 15px;
      background: #996600;
      cursor: pointer;
    }
    .time_tree-leaf {
      flex: 1;
      max-width: 700px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      .time_tree-leaf--content {
        margin-top: 20px;
        border: 3px solid #ffcc99;
        border-radius: 12px;
        box-sizing: border-box;
        padding: 20px;
        textarea {
          width: 100%;
          border: none;
          background: rgba(0,0,0,0);
          padding: 20px;
          &:focus {
            outline: 2px solid #000;
            border-radius: 4px;
          }
        }
      }
      .time_tree-branche--bar {
        height: 20px;
        background: #996600;
        margin-top: 5px;
        border-radius: 0 10px 10px 0;
      }
    }
  }

  .time_tree-node--branche {
    flex: 1;
    height: 300px;
    display: flex;
  }
}
// 边框选中效果
.border--focus {
  box-sizing: border-box;
  border: 3px solid #FFCC99;
}
// 隐藏效果
.hidden {
  visibility: hidden;
}
</style>
