<template>
<div class="settings">
  <div class="user-components">
    <div class="user-main-header">
      <h3>
        首页组件
        <span>
          <i class="el-icon-warning-outline"></i>
          可拖动进行排序</span>
      </h3>
    </div>
    <div class="title">左侧</div>
    <draggable :List="leftList"></draggable>
    <div class="title">右侧</div>
    <draggable :List="rightList"></draggable>
  </div>
  <div class="user-main">
    <div class="user-main-header">
      <h3>基本信息</h3>
    </div>
    <ul>
      <li>
        <div class="user-title">
          <span>我的昵称：</span>
        </div>
        <div class="user-input">
          <el-input type="text" :placeholder="userInfo.username" v-model="userInfoSet.username"  maxlength="7" show-word-limit/>
          <!-- <input type="text" v-model="userInfoSet.username" :placeholder="userInfo.username"> -->
        </div>
      </li>
      <li>
        <div class="user-title">
          <span>见面语：</span>
        </div>
        <div class="user-input">
          <el-input type="text" :placeholder="userInfo.userTitle" v-model="userInfoSet.userTitle"  maxlength="6" show-word-limit/>
          <!-- <input type="text" v-model="userInfoSet.userTitle" :placeholder="userInfo.userTitle"> -->
        </div>
      </li>
      <li>
        <div class="user-title">
          <span>我的签名：</span>
        </div>
        <div class="user-input">
          <el-input type="text" :placeholder="userInfo.userSign" v-model="userInfoSet.userSign"  maxlength="20" show-word-limit/>
          <!-- <input type="text" v-model="userInfoSet.userSign" :placeholder="userInfo.userSign"> -->
        </div>
      </li>
      <li>
        <div class="user-title">
          <span>居住城市：</span>
        </div>
        <div class="user-input">
          <el-input type="text" :placeholder="userInfo.userCity" v-model="userInfoSet.userCity"/>
          <!-- <input type="text" v-model="userInfoSet.userCity" :placeholder="userInfo.userCity"> -->
        </div>
      </li>
    </ul>
    <div class="submit">
      <el-button type="primary" @click="cancelChange()">取消</el-button>
      <el-button type="primary" @click="changeUserInfo()">保存</el-button>
    </div>
  </div>
</div>
</template>

<script>
import Draggable from '@/components/common/Draggable.vue'

export default {
  components: { Draggable },
  data () {
    return {
      // 清单组件
      leftList: [
        {
          title: '天气',
          icon: '<svg t="1649128877731" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2285" width="26" height="26"><path d="M745.472 976H240c-114.688 0-207.744-93.056-207.744-207.744V262.784C32.256 148.096 125.312 55.04 240 55.04h505.472c114.688 0 207.744 93.056 207.744 207.744v505.472c0 114.688-93.056 207.744-207.744 207.744z" fill="#00A9FA" p-id="2286"></path><path d="M350.08 480.512c3.456-69.76 55.424-126.336 122.752-137.6-25.984-49.28-77.696-82.944-137.344-82.944-85.76 0-155.264 69.504-155.264 155.264 0 61.312 35.584 114.176 87.168 139.392 13.824-36.352 44.544-64.256 82.688-74.112z" fill="#FFCA33" p-id="2287"></path><path d="M665.6 438.528c-9.728 0-19.328 1.024-28.544 2.944-19.456-58.624-74.752-100.864-139.904-100.864-8.32 0-16.384 1.024-24.32 2.432 11.392 21.632 17.92 46.208 17.92 72.32 0 85.76-69.504 155.264-155.264 155.264-24.448 0-47.488-5.76-68.096-15.872-4.992 13.184-7.936 27.52-7.936 42.496 0 66.816 54.144 120.832 120.832 120.832H665.6c77.184 0 139.776-62.592 139.776-139.776S742.784 438.528 665.6 438.528z" fill="#DBEEF7" p-id="2288"></path><path d="M490.752 415.232c0-26.112-6.528-50.688-17.92-72.32-67.328 11.264-119.296 67.968-122.752 137.6-38.144 9.856-68.864 37.76-82.688 74.112 20.608 10.112 43.648 15.872 68.096 15.872 85.76 0 155.264-69.504 155.264-155.264z" fill="#FFFAE1" p-id="2289"></path></svg>',
          isShow: true
        },
        {
          title: '快捷清单',
          icon: '<svg t="1649129635203" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4815" width="26" height="26"><path d="M804.352 76.5952H220.5184c-50.8928 0-92.16 41.2672-92.16 92.16v697.6512c0 50.8928 41.2672 92.16 92.16 92.16H804.352c50.8928 0 92.16-41.2672 92.16-92.16V168.7552c0-50.8928-41.2672-92.16-92.16-92.16zM403.4048 781.5168c0 16.9472-13.7728 30.72-30.72 30.72H279.8592c-16.9472 0-30.72-13.7728-30.72-30.72v-92.8256c0-16.9472 13.7728-30.72 30.72-30.72h92.8256c16.9472 0 30.72 13.7728 30.72 30.72v92.8256z m0-223.1296c0 16.9472-13.7728 30.72-30.72 30.72H279.8592c-16.9472 0-30.72-13.7728-30.72-30.72V465.6128c0-16.9472 13.7728-30.72 30.72-30.72h92.8256c16.9472 0 30.72 13.7728 30.72 30.72v92.7744z m0-223.0784c0 16.9472-13.7728 30.72-30.72 30.72H279.8592c-16.9472 0-30.72-13.7728-30.72-30.72V242.4832c0-16.9472 13.7728-30.72 30.72-30.72h92.8256c16.9472 0 30.72 13.7728 30.72 30.72v92.8256z m361.8816 425.3696h-252.8768c-14.1312 0-25.6-11.4688-25.6-25.6s11.4688-25.6 25.6-25.6h252.8768c14.1312 0 25.6 11.4688 25.6 25.6s-11.4688 25.6-25.6 25.6z m0-217.4976h-252.8768c-14.1312 0-25.6-11.4688-25.6-25.6s11.4688-25.6 25.6-25.6h252.8768c14.1312 0 25.6 11.4688 25.6 25.6s-11.4688 25.6-25.6 25.6z m0-239.1552h-252.8768c-14.1312 0-25.6-11.4688-25.6-25.6s11.4688-25.6 25.6-25.6h252.8768c14.1312 0 25.6 11.4688 25.6 25.6s-11.4688 25.6-25.6 25.6z" fill="#FF623E" p-id="4816"></path></svg>',
          isShow: false
        }
      ],
      rightList: [
        {
          title: 'Today',
          icon: '<svg t="1649129946587" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18252" width="26" height="26"><path d="M757.8624 939.9296H263.8336c-73.5232 0-133.12-59.5968-133.12-133.12V301.2608c0-73.5232 59.5968-133.12 133.12-133.12h494.0288c73.5232 0 133.12 59.5968 133.12 133.12v505.5488c0 73.5232-59.5968 133.12-133.12 133.12z" fill="#FFD05C" p-id="18253"></path><path d="M638.5664 298.9056h-255.488c-54.7328 0-99.1232-44.3904-99.1232-99.1232v-36.8128c0-54.7328 44.3904-99.1232 99.1232-99.1232h255.488c54.7328 0 99.1232 44.3904 99.1232 99.1232v36.8128c0 54.784-44.3904 99.1232-99.1232 99.1232z" fill="#FFD05C" p-id="18254"></path><path d="M284.0064 168.1408v30.9248c0 55.1424 44.6976 99.84 99.84 99.84h254.0032c55.1424 0 99.84-44.6976 99.84-99.84v-30.9248H284.0064z" fill="#FCA235" p-id="18255"></path><path d="M338.944 672.512c-10.3936 0-20.8384-3.9424-28.8256-11.8784-16.0768-15.9232-16.1792-41.8304-0.3072-57.9072l115.3024-116.4288c8.0384-8.1408 19.2512-12.4416 30.5664-12.1344 11.4176 0.4096 22.1696 5.5808 29.6448 14.2848l64 74.5984 106.5984-92.16c17.1008-14.7968 43.008-12.9024 57.7536 4.1984 14.7968 17.1008 12.9024 42.9568-4.1984 57.7536l-137.728 119.0912a41.0112 41.0112 0 0 1-29.8496 9.8816 41.19552 41.19552 0 0 1-28.0576-14.1824L452.096 575.5392l-84.0192 84.8384a40.93952 40.93952 0 0 1-29.1328 12.1344z" fill="#FFFFFF" p-id="18256"></path></svg>',
          isShow: true
        },
        {
          title: '日历',
          icon: '<svg t="1649130342593" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="25836" width="26" height="26"><path d="M819.8 960.1H204.2c-42.1 0-76.3-34.2-76.3-76.3V351.9H896v531.9c0.1 42.1-34.1 76.3-76.2 76.3z" fill="#3173E7" p-id="25837"></path><path d="M808 931.1H216c-48.6 0-88-39.4-88-88V209.4c0-48.6 39.4-88 88-88h592c48.6 0 88 39.4 88 88v633.7c0.1 48.6-39.4 88-88 88z" fill="#5EADEF" p-id="25838"></path><path d="M819.8 931.1H204.2c-42.1 0-76.3-34.2-76.3-76.3V322.9H896v531.9c0.1 42.2-34.1 76.3-76.2 76.3z" fill="#E7F5FD" p-id="25839"></path><path d="M353.3 200.5m-70.2 0a70.2 70.2 0 1 0 140.4 0 70.2 70.2 0 1 0-140.4 0Z" fill="#E7F5FD" p-id="25840"></path><path d="M676.1 200.1m-70.2 0a70.2 70.2 0 1 0 140.4 0 70.2 70.2 0 1 0-140.4 0Z" fill="#E7F5FD" p-id="25841"></path><path d="M362.4 237.5h-15.7c-27 0-48.9-21.9-48.9-48.9v-75.3c0-27 21.9-48.9 48.9-48.9h15.7c27 0 48.9 21.9 48.9 48.9v75.3c-0.1 27-21.9 48.9-48.9 48.9zM685.5 237.1h-17.4c-27.4 0-49.5-22.2-49.5-49.5v-74.1c0-27.4 22.2-49.5 49.5-49.5h17.4c27.4 0 49.5 22.2 49.5 49.5v74.1c0 27.3-22.2 49.5-49.5 49.5z" fill="#FCCA4C" p-id="25842"></path><path d="M685.5 64H666.9c26.8 0.7 48.3 22.6 48.3 49.5v74.1c0 26.9-21.5 48.8-48.3 49.5H685.5c27.4 0 49.5-22.2 49.5-49.5v-74.1c0-27.3-22.2-49.5-49.5-49.5zM362.2 64.5H343.6c26.8 0.7 48.3 22.6 48.3 49.5v74.1c0 26.9-21.5 48.8-48.3 49.5H362.2c27.4 0 49.5-22.2 49.5-49.5V114c0.1-27.3-22.1-49.5-49.5-49.5z" fill="#FEE5A6" p-id="25843"></path><path d="M408.7 666.8v33.8H219.4c-0.3-8.5 1.1-16.6 4.1-24.4 4.8-12.9 12.5-25.6 23.2-38.1 10.6-12.5 25.9-27 46-43.4 31.1-25.5 52.2-45.7 63.1-60.7 10.9-14.9 16.4-29 16.4-42.3 0-13.9-5-25.7-14.9-35.3-10-9.6-23-14.4-39-14.4-16.9 0-30.5 5.1-40.6 15.2-10.2 10.2-15.3 24.2-15.4 42.2l-36.1-3.7c2.5-27 11.8-47.5 27.9-61.6 16.1-14.1 37.8-21.2 65.1-21.2 27.5 0 49.2 7.6 65.2 22.9 16 15.2 24 34.1 24 56.7 0 11.5-2.3 22.7-7 33.8-4.7 11.1-12.5 22.7-23.3 35-10.9 12.2-28.9 29-54.2 50.4-21.1 17.7-34.6 29.7-40.6 36-6 6.3-10.9 12.7-14.8 19h140.2zM446.4 559.4c0-33.9 3.5-61.1 10.5-81.8 7-20.6 17.3-36.6 31.1-47.8 13.7-11.2 31-16.8 51.9-16.8 15.4 0 28.8 3.1 40.4 9.3 11.6 6.2 21.2 15.1 28.7 26.8 7.6 11.7 13.5 25.9 17.8 42.6 4.3 16.7 6.4 39.3 6.4 67.7 0 33.6-3.5 60.7-10.4 81.4-6.9 20.6-17.2 36.6-31 47.9-13.7 11.3-31.1 16.9-52.1 16.9-27.6 0-49.3-9.9-65.1-29.7-18.8-23.9-28.2-62.8-28.2-116.5z m36.1 0c0 47 5.5 78.3 16.5 93.9 11 15.6 24.6 23.3 40.7 23.3s29.7-7.8 40.7-23.4c11-15.6 16.5-46.9 16.5-93.8 0-47.1-5.5-78.5-16.5-94s-24.7-23.2-41.1-23.2c-16.2 0-29 6.8-38.7 20.5-12 17.4-18.1 49.6-18.1 96.7z" fill="#3173E7" p-id="25844"></path><path d="M787.4 487.3H726c-7.7 0-13.9-6.2-13.9-13.9v-61.5c0-7.7 6.2-13.9 13.9-13.9h61.5c7.7 0 13.9 6.2 13.9 13.9v61.5c0 7.7-6.3 13.9-14 13.9zM787.4 660.7H726c-7.7 0-13.9-6.2-13.9-13.9v-61.5c0-7.7 6.2-13.9 13.9-13.9h61.5c7.7 0 13.9 6.2 13.9 13.9v61.5c0 7.7-6.3 13.9-14 13.9zM787.4 833.9H726c-7.7 0-13.9-6.2-13.9-13.9v-61.5c0-7.7 6.2-13.9 13.9-13.9h61.5c7.7 0 13.9 6.2 13.9 13.9V820c0 7.7-6.3 13.9-14 13.9zM624.4 815.8H227.2c-7.9 0-14.3-6.4-14.3-14.3s6.4-14.3 14.3-14.3h397.2c7.9 0 14.3 6.4 14.3 14.3-0.1 7.9-6.4 14.3-14.3 14.3z" fill="#5EADEF" p-id="25845"></path><path d="M810.1 121.4h-44.3c47.3 0 85.7 40.5 85.7 90.4v629c0 49.9-38.4 90.4-85.7 90.4h44.3c59.6 4.5 85.8-36.5 85.7-90.4v-629c0-49.9-38.4-90.4-85.7-90.4z" fill="#F0F8FC" p-id="25846"></path><path d="M895.8 321.9V211.8c0-29.3-13.2-55.3-33.7-71.8-14.9-11.6-33.7-18.6-54.1-18.6h-42.3c47.3 0 85.7 40.5 85.7 90.4v111.3l44.4-1.2z" fill="#BFDEF9" p-id="25847"></path></svg>',
          isShow: false
        },
        {
          title: '倒计时',
          icon: '<svg t="1649130427166" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="28946" width="26" height="26"><path d="M766.208 958.336H269.696c-112.768 0-204.032-91.392-204.032-204.032V257.792c0-112.64 91.264-204.032 204.032-204.032h496.512c112.64 0 204.032 91.392 204.032 204.032v496.512c0 112.768-91.392 204.032-204.032 204.032z" fill="#FF9429" p-id="28947"></path><path d="M705.408 743.04c-1.664-10.624-3.84-20.992-6.272-30.976-1.152-4.736-2.688-9.216-4.096-13.824-1.792-6.016-3.456-12.032-5.632-17.792-1.92-5.248-3.968-10.112-6.144-15.232-2.048-4.736-3.968-9.6-6.144-14.208-2.432-5.12-5.12-10.112-7.808-14.976-2.176-3.968-4.48-7.936-6.784-11.776-2.944-4.864-6.144-9.472-9.344-14.08-2.432-3.456-4.864-6.656-7.424-9.856-3.456-4.352-7.04-8.704-10.752-12.8-2.688-2.816-5.376-5.504-8.064-8.192-3.84-3.84-7.808-7.552-11.904-11.008-2.944-2.432-6.016-4.48-8.96-6.656-4.224-3.072-8.32-6.272-12.672-8.832-0.256-0.128-0.512-0.384-0.768-0.512-13.312-7.936-21.376-22.016-21.376-37.504v-17.536c0-15.488 8.192-29.568 21.376-37.504 0.256-0.128 0.512-0.384 0.768-0.512 4.352-2.688 8.448-5.76 12.672-8.832 3.072-2.176 6.016-4.224 8.96-6.656 4.096-3.456 7.936-7.168 11.904-11.008 2.688-2.688 5.504-5.376 8.192-8.192 3.712-4.096 7.296-8.32 10.752-12.672 2.56-3.2 4.992-6.528 7.424-9.856 3.2-4.48 6.4-9.216 9.344-14.08 2.432-3.84 4.608-7.808 6.784-11.776 2.688-4.864 5.376-9.856 7.808-14.976 2.176-4.608 4.224-9.344 6.144-14.208 2.048-4.992 4.224-9.984 6.144-15.232 2.048-5.76 3.84-11.776 5.632-17.792 1.408-4.608 2.944-9.088 4.096-13.824 2.56-10.112 4.608-20.48 6.272-30.976 0.128-0.896 0.384-1.664 0.512-2.56 4.096-26.752-16.384-51.072-43.52-51.072H373.376c-27.136 0-47.616 24.32-43.52 51.072 0.128 0.896 0.384 1.664 0.512 2.56 1.664 10.624 3.84 20.992 6.272 31.104 1.152 4.736 2.688 9.216 4.096 13.824 1.792 6.016 3.456 12.032 5.632 17.792 1.92 5.248 3.968 10.112 6.144 15.232 2.048 4.736 3.968 9.6 6.144 14.208 2.432 5.12 5.12 10.112 7.808 14.976 2.176 3.968 4.48 7.936 6.784 11.776 2.944 4.864 6.144 9.472 9.344 14.08 2.432 3.456 4.864 6.656 7.424 9.856 3.456 4.352 7.04 8.704 10.752 12.672 2.688 2.816 5.376 5.504 8.192 8.192 3.84 3.84 7.808 7.552 11.904 11.008 2.944 2.432 6.016 4.48 8.96 6.656 4.224 3.072 8.32 6.272 12.672 8.832 0.256 0.128 0.512 0.384 0.768 0.512 13.312 7.936 21.376 22.016 21.376 37.504v17.536c0 15.488-8.192 29.568-21.376 37.504-0.256 0.128-0.512 0.384-0.768 0.512-4.352 2.688-8.448 5.76-12.672 8.832-2.944 2.176-6.016 4.224-8.96 6.656-4.096 3.456-7.936 7.168-11.904 11.008-2.688 2.688-5.504 5.248-8.064 8.192-3.712 4.096-7.296 8.32-10.752 12.8-2.56 3.2-4.992 6.528-7.424 9.856-3.2 4.608-6.4 9.216-9.344 14.08-2.304 3.84-4.608 7.808-6.784 11.776-2.688 4.864-5.376 9.856-7.808 14.976-2.176 4.608-4.224 9.344-6.144 14.208-2.048 4.992-4.224 9.984-6.144 15.232-2.048 5.76-3.84 11.776-5.632 17.792-1.408 4.608-2.944 9.088-4.096 13.824-2.56 10.112-4.608 20.48-6.272 31.104-0.128 0.896-0.384 1.664-0.512 2.56-4.096 26.752 16.384 51.072 43.52 51.072h289.024c27.136 0 47.616-24.32 43.52-51.072-0.256-1.024-0.512-1.92-0.64-2.816z" fill="#FFFFFF" p-id="28948"></path><path d="M415.872 755.712h204.16c7.68 0 11.264-9.728 5.248-14.592l-93.952-73.216c-1.92-1.536-2.944-3.84-2.944-6.4V425.856c0-2.304 1.024-4.48 2.688-6.016l55.936-45.952c5.504-5.12 1.92-14.336-5.632-14.336H454.4c-7.552 0-11.136 9.216-5.632 14.336l55.296 45.696c1.664 1.536 2.688 3.712 2.688 6.016v235.648c0 2.432-1.152 4.736-2.944 6.4L410.496 741.12c-5.888 4.992-2.432 14.592 5.376 14.592z" fill="#FF9429" p-id="28949"></path></svg>',
          isShow: false
        }
      ],
      userInfo: '',
      userInfoSet: ''
    }
  },
  watch: {},
  computed: {},
  methods: {
    async getUserInfo () {
      const res = await this.$axios.get('http://localhost:1212/api/userinfo')
      this.$store.dispatch('update_userInfo', res)
      sessionStorage.setItem('userinfo', JSON.stringify({ ...res.data, password: '' }))
      this.userInfo = JSON.parse(sessionStorage.getItem('userinfo'))
      this.userInfoSet = res.data
      this.userInfo = Object.assign({}, res.data)
      // 获取用户头像
      this.axios({
        url: 'http://localhost:1212/api/get_article',
        method: 'get',
        params: res.data.id,
        responseType: 'blob'
      }).then(res => {
        // console.log(res)
        const userAvatar = URL.createObjectURL(new Blob([res.data]))
        this.$store.dispatch('update_Avatar', userAvatar)
      })
      // 获取背景图
      this.axios({
        url: 'http://localhost:1212/api/getUserBg',
        method: 'get',
        responseType: 'blob'
      }).then(res => {
        // console.log('封面', res)
        const userBg = URL.createObjectURL(new Blob([res.data]))
        this.$store.dispatch('update_userBg', userBg)
      })
    },
    cancelChange () {
      this.userInfoSet = Object.assign({}, this.userInfo)
    },
    changeUserInfo () {
      const msg = this.checkInfo()
      if (msg !== true) {
        this.$message.warn(msg)
      } else {
        this.axios({
          method: 'post',
          url: 'http://localhost:1212/api/changeUserTask',
          data: this.userInfoSet
        }).then(res => {
          // console.log(res)
          if (!res.status) {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            })
          }
          this.getUserInfo()
        })
      }
    },
    checkInfo () {
      if (this.userInfoSet.username > 7) {
        return '用户名超出最大长度'
      } else if (!this.userInfoSet.username) {
        return '请输入用户名'
      } else if (this.userInfoSet.userTitle > 4) {
        return '招呼语超出最大长度'
      } else if (this.userInfoSet.userSign > 20) {
        return '签名超出最大长度'
      } else if (!this.userInfoSet.userCity) {
        return '请输入城市名称'
      }
      return true
    }
  },
  created () {
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>
<style lang="scss" scoped>
.settings {
  display: flex;
  width: 100vw;
  max-width: 1000px;
  margin-top: 15px;
  user-select: none;
  // 公共头部
  .user-main-header {
    height: 60px;
    padding: 0 20px;
    border-radius:  8px 8px 0 0;
    background: #ffffff;
    border-bottom: 1px solid #e6e6e6;
    h3 {
      height: 60px;
      line-height: 60px;
      margin: 0;
      font-size: 20px;
      font-weight: bolder;
      position: relative;
      span {
        position: absolute;
        right: 0;
        font-size: 14px;
        color: #707070;
      }
    }
  }
  .user-components {
    flex: 3;
    margin-right: 15px;
    padding-bottom: 10px;
    border-radius: 8px;
    backdrop-filter: blur(3px);
    background-color: #fcfcfc;
    box-shadow: 0 2px 4px 0 rgba(97, 97, 97, 0.2), 0 3px 5px 0 rgba(131, 131, 131, 0.19);
    .title {
      height: 40px;
      line-height: 40px;
      padding-left: 10px;
      margin-left: 15px;
      color: #151515;
      font-size: 16px;
      font-weight: bold;
    }
    .title::before {
      display: inline-block;
      content: '';
      width: 5px;
      height: 16px;
      position: absolute;
      left: 16px;
      margin-top: 12px;
      background: #418ac3;
      border-radius: 5px;
    }
  }
  .user-main {
    flex: 7;
    margin: 0;
    border-radius: 8px;
    padding-bottom: 40px;
    backdrop-filter: blur(3px);
    background-color: #fafafa;
    box-shadow: 0 2px 4px 0 rgba(97, 97, 97, 0.2), 0 3px 5px 0 rgba(131, 131, 131, 0.19);
    position: relative;
    ul {
      list-style: none;
      margin: 20px 40px;
      padding: 0;
      li {
        height: 80px;
        line-height: 80px;
        width: 100%;
        .user-title {
          display: inline-block;
          height: 80px;
          width: 120px;
          box-sizing: border-box;
          padding-right: 30px;
          color: #707070;
          text-align: end;
        }
        .user-input {
          width: 100%;
          max-width: 350px;
          // margin-left: 120px;
          display: inline-block;
          // position: absolute;
          input {
            display: inline-block;
            width: 100%;
            height: 40px;
            color: #404040;
            font-size: 14px;
            outline: none;
            border: 1px solid #e6e6e6;
            padding-left: 10px;
            border-radius: 4px;
            transition: ease-out .3s;
          }
          ::v-deep .el-input__inner:focus {
            color: #418ac3 !important;
            border: 1px solid #418ac3 !important;
          }
          input::-webkit-input-placeholder{
              color:#929292;
          }
          input::-moz-placeholder{   /* Mozilla Firefox 19+ */
              color:#929292;
          }
          input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
              color:#929292;
          }
          input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
              color:#929292;
          }
        }
      }
      .upBg {
        height: 80px;
      }
    }
    .submit{
      width: 100%;
      border-bottom: 0;
      margin-top: 30px;
      display: flex;
      justify-content: center;
      button {
        width: 90px;
        display: block;
        margin: 0 10px;
        &:first-child {
          background: #aaaaaa;
          border-color: #bbbbbb;
        }
      }
      ::v-deep .el-button {
        display: inline-block;
      }
      ::v-deep .el-button--primary {
        background: #418ac3;
        border-color: #418ac3;
      }
    }
  }
}
</style>
