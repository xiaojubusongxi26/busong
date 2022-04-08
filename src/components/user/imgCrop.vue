<template>
  <article v-if="cropVisibility">
    <el-dialog :visible.sync="cropVisibility" title="剪裁图片" :close-on-click-modal="false" append-to-body width="800px">
      <div style="width: 760px;height: 480px">
        <vueCropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.size"
          :full="option.full" :canMove="option.canMove" :canMoveBox="option.canMoveBox"
          :centerBox="option.centerBox"
          :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight" :fixedBox="option.fixedBox"
          :fixed="option.fixed"
          :fixedNumber="option.fixedNumber"/>
      </div>
      <template v-slot:footer>
        <el-button size="small" @click="$emit('close')">取 消</el-button>
        <el-button size="small" type="primary" @click="finish">确认</el-button>
      </template>
    </el-dialog>
  </article>
</template>

<script>
import { VueCropper } from 'vue-cropper'

export default {
  name: 'imgCrop',
  components: { VueCropper },
  props: {
    cropVisibility: {
      type: Boolean,
      default: false
    },
    fileInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    cropPicture: {
      type: String,
      default: ''
    },
    fixedNumber: {
      type: Array,
      default: () => {
        return [480, 270]
      }
    }
  },
  computed: {
    option () {
      const me = this
      const obj = {
        img: me.cropPicture,
        outputSize: 1, // 裁剪生成图片的质量  (默认:1)
        full: false, // 是否输出原图比例的截图 选true生成的图片会非常大  (默认:false)
        canMove: true, // 上传图片是否可以移动  (默认:true)
        canMoveBox: false, // 截图框能否拖动  (默认:true)
        centerBox: true, // 截图框是否被限制在图片里面
        autoCrop: true, // 是否默认生成截图框  (默认:false)
        autoCropWidth: me.fixedNumber[0], // 默认生成截图框宽度  (默认:80%)
        autoCropHeight: me.fixedNumber[1], // 默认生成截图框高度  (默认:80%)
        fixedBox: true, // 固定截图框大小 不允许改变  (默认:false)
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: me.fixedNumber // 截图框宽高比例
      }
      return obj
    }
  },
  methods: {
    finish () {
      const me = this
      const formData = new FormData()
      me.$refs.cropper.getCropBlob((data) => {
        const _obj = { name: me.fileInfo.name } // 原图url
        const X = me.fileInfo.name.substring(me.fileInfo.name.lastIndexOf('.'), me.fileInfo.name.length)
        _obj.name = me.fileInfo.name.substring(0, me.fileInfo.name.lastIndexOf('.'))
        const reg = /^[\u4e00-\u9fa5\\_a-zA-Z0-9]+$/
        if (!reg.test(_obj.name)) {
          _obj.name = _obj.name.replace(/[^\u4e00-\u9fa5\\_a-zA-Z0-9]+/g, '')
        }
        _obj.name = _obj.name + X
        formData.append('file', data, _obj.name)
        me.$api.post('上传图片接口', formData).then(res => {
          me.$emit('finishCrop', res.data.fullPath)
          me.$emit('close')
        })
      })
    }
  }
}
</script>
