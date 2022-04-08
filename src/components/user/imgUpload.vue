<template>
  <article id='img-upload'>
    <section class="img-upload-content" :style="uploadStyle">
      <div class="have-img" v-if="copyPath">
        <el-image class="img" :src="copyPath" fit="contain" />
        <div class="img-slot">
          <el-upload action="http://localhost:1212/api/setUserBg" :show-file-list="false" :on-change="uploadChange" with-credentials>
            <i class="el-icon-edit-outline"></i>
          </el-upload>
          <i @click="deleteImg" class="el-icon-delete"></i>
          <i @click="toCropImg" class="el-icon-crop"></i>
        </div>
      </div>
      <template v-else>
        <slot name='defCover' v-if="btnUpload"></slot>
        <el-upload class="imgUpload" action="http://localhost:1212/api/setUserBg" :show-file-list="false" :on-change="uploadChange" with-credentials v-else>
          <slot name='imgUpload'></slot>
        </el-upload>
      </template>
    </section>
    <slot name='tip'></slot>
    <el-upload action="http://localhost:1212/api/setUserBg" :show-file-list="false" :on-change="uploadChange" with-credentials v-if="btnUpload">
      <slot name='btnUpload'></slot>
    </el-upload>
    <img-crop v-bind="$attrs" :crop-visibility="cropVisibility" :fileInfo="fileInfo" :crop-picture="cropPicture" @finishCrop="finishCrop" @close="cropVisibility=false" />
  </article>
</template>

<script>
import ImgCrop from './imgCrop'

export default {
  name: 'ImgUpload',
  components: { ImgCrop },
  props: {
    width: String,
    height: String,
    path: String,
    maxSize: {
      type: Number,
      default: 5 * 1024 * 1024
    },
    bgColor: {
      type: String,
      default: 'white'
    },
    border: {
      type: Boolean,
      default: false
    },
    borderWidth: {
      type: String,
      default: '1px'
    },
    borderColor: {
      type: String,
      default: '#d1d1d1'
    },
    borderStyle: {
      type: String,
      default: 'solid'
    },
    borderRadius: {
      type: String,
      default: '5px'
    },
    btnUpload: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'path',
    event: 'change'
  },
  data () {
    return {
      copyPath: '',
      fileInfo: null,
      cropVisibility: false,
      cropPicture: ''
    }
  },
  computed: {
    uploadStyle () {
      const borderObj = {
        borderWidth: this.borderWidth,
        borderRadius: this.borderRadius,
        borderColor: this.borderColor,
        borderStyle: this.borderStyle
      }
      const styleObj = {
        width: this.width,
        height: this.height,
        backgroundColor: this.bgColor
      }
      if (this.border) {
        Object.assign(styleObj, borderObj)
      }
      return styleObj
    },
    action () {
      const me = this
      // 向后端要图片上传地址
      return 'http://localhost:1212/api/setUserBg/'
    },
    maxImageSize () {
      const me = this
      const _M = me.maxSize / 1024 / 1024
      const _Kb = me.maxSize / 1024 + ''
      if (_M >= 1) {
        const y = String(_M).indexOf('.') + 1
        if (y > 0) {
          return _M.toFixed(2) + 'M'
        } else {
          return _M + 'M'
        }
      } else {
        return parseInt(_Kb) + 'Kb'
      }
    }
  },
  watch: {
    path: {
      immediate: true,
      handler (val) {
        const me = this
        me.copyPath = val
      }
    }
  },
  methods: {
    uploadChange (file) {
      const me = this
      if (file.size > me.maxSize) {
        me.$message.error('上传失败，图片大于' + this.maxImageSize)
        return
      }
      me.fileInfo = file
      if (file.response) {
        me.$nextTick(() => {
          me.cropPicture = file.response.data.fullPath
          me.cropVisibility = true
        })
      }
    },
    toCropImg () {
      const me = this
      const index = me.copyPath.lastIndexOf('/')
      const str = this.copyPath.substring(index + 1)
      me.fileInfo = { name: str }
      me.cropPicture = me.copyPath
      me.cropVisibility = true
    },
    finishCrop (data) {
      const me = this
      me.copyPath = data
      me.$emit('change', data)
    },
    deleteImg () {
      const me = this
      me.copyPath = ''
      me.$emit('change', '')
    }
  }
}
</script>

<style scoped lang="scss">

#img-upload {
  .img-upload-content {
    overflow: hidden;
    .have-img {
      width: 100vw;
      height: 100vh;
      position: relative;
      .img {
        width: 100vw;
        height: 100vh;
      }
      .img-slot {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: #424242;
        z-index: 1;
        background-color: rgba(0, 0, 0, 0.5);
        transition: 0.3s;
        display: flex;
        justify-content: space-evenly;
        align-items: flex-end;
        opacity: 0;

        i {
          cursor: pointer;
          line-height: 40px;
          font-style: normal;
          font-weight: 400;
          font-size: 20px;
          color: white;
        }
      }
      &:hover .img-slot {
        opacity: 1;
      }
    }
  }
  .imgUpload {
    height: 100%;
    ::v-deep .el-upload {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
