<template>
  <div class="sidebar">
    <header>
      <div class="func">
<!--        <div class="circle"></div>-->
        <div class="func-add" @click="isShowDrawerWindow = true">
          <i class="el-icon-plus"></i>
        </div>
      </div>
    </header>
    <div class="collect-list">
      <sidebar-draggable :List="drawerList"></sidebar-draggable>
    </div>
    <el-dialog title="创建抽屉" width="600px" :visible.sync="isShowDrawerWindow">
      <el-form :model="drawerForm">
        <el-form-item label="抽屉名称" label-width="120px">
          <el-input v-model="drawerForm.drawerName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="抽屉图标" label-width="120px">
          <el-select v-model="drawerForm.drawerIcon">
            <el-option v-for="(item, index) in iconList" :key="index" :label="item.iconText" :value="item.iconClass">
              <i :class="item.iconClass" style="font-size: 16px;margin-right: 8px"></i>
              <span>{{ item.iconText }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDrawerWindow = false">取 消</el-button>
        <el-button type="primary" @click="isShowDrawerWindow = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SidebarDraggable from '@/components/drawer/SidebarDraggable.vue'

export default {
  name: 'sidebar',
  components: { SidebarDraggable },
  data () {
    return {
      // 创建抽屉
      drawerForm: {
        drawerName: '',
        drawerIcon: '',
        drawerOrder: 0
      },
      // 抽屉图标
      iconList: [
        {
          iconClass: 'el-icon-star-on',
          iconText: '收藏'
        },
        {
          iconClass: 'el-icon-edit',
          iconText: '文本'
        },
        {
          iconClass: 'el-icon-s-promotion',
          iconText: '创意'
        },
        {
          iconClass: 'el-icon-sunny',
          iconText: '旅行'
        }
      ],
      // 控制创建抽屉窗口
      isShowDrawerWindow: false,
      drawerList: [
        {
          drawerId: '1',
          drawerIconClass: 'el-icon-food',
          drawerTitle: 'My Recipe',
          drawerTime: '2023-03-04 12:50:23',
          drawerItem: []
        },
        {
          drawerId: '2',
          drawerIconClass: 'el-icon-sunny',
          drawerTitle: 'My Travel',
          drawerTime: '2023-03-04 12:50:23',
          drawerItem: []
        },
        {
          drawerId: '3',
          drawerIconClass: 'el-icon-reading',
          drawerTitle: '若天下不定，吾往。若世道不平，不回。',
          drawerTime: '2023-03-04 12:50:23',
          drawerItem: []
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/config.scss';
@import '@/assets/sass/drawer/sidebar.scss';
</style>
