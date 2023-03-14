<template>
  <div class="drawer-list">
    <div class="header">
      <span>My Recipe</span>
      <transition name="search">
        <input type="text" v-show="isSearch"/>
      </transition>
      <div>
        <i class="el-icon-search" @click="isSearch = !isSearch"></i>
        <i class="el-icon-sort"></i>
        <i class="el-icon-delete"></i>
      </div>
    </div>
    <div class="mid">
      <div class="drawer-list-item" v-for="(item, index) of drawerList"
           :key="index"
           @click="showItem(item)"
      >
        <div class="drawer-item-frame">
          <img :src="item.drawerCover" alt="">
        </div>
        <div class="drawer-item-title">
          {{ item.drawerItemTitle }}
        </div>
        <div class="drawer-item-text">
          {{ item.drawerItemContent }}
        </div>
        <div class="drawer-item-time">
          {{ item.drawerTime }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DrawerList',
  data () {
    return {
      // 展开表项
      isOpen: false,
      isSearch: false,
      drawerList: [
        {
          drawerItemId: 1,
          drawerCover: require('@/assets/images/home/DSC02840.jpg'),
          drawerItemTitle: '这是一个标题',
          drawerItemContent: '长风破浪会有时，直挂云帆济沧海。行路难，行路难，多歧路，今安在',
          drawerTime: '1 week ago'
        },
        {
          drawerItemId: 2,
          drawerCover: require('@/assets/images/home/DSC05369.jpg'),
          drawerItemTitle: '这是一个标题',
          drawerItemContent: '对待生命，你不妨大胆一点，因为我们始终要失去它',
          drawerTime: '1 week ago'
        },
        {
          drawerItemId: 3,
          drawerCover: require('@/assets/images/home/a9061e6fgy1gx6egjec84j23e82jo1ky.jpg'),
          drawerItemTitle: '这是一个标题',
          drawerItemContent: '世间风物论自由 喜一生我有 共四海丰收',
          drawerTime: '1 week ago'
        },
        {
          drawerItemId: 4,
          drawerCover: require('@/assets/images/home/755ce8eegy1gjw0am3xs8j21fe2us1ky.png'),
          drawerItemTitle: '独白',
          drawerItemContent: `月光还是少年的月光\n
九州一色还是李白的霜
祖国已非少年的祖国
纵我见青山一发多妩媚
深圳河那边的郁郁垒垒
还记得三十年前那少年？
料青山见我是青睐是白眼？
回头不再是少年的乌头
白是新白青是古来就青青
月落铁轨静，边界只几颗星
高高低低在标点着浑沌
等星都溺海，天上和地下
鬼窥神觊只最后一盏灯
最后灯熄，只一个不寐的人
一头独白对四周的全黑
不共夜色同黯的本色
也不管多久才曙色
寻文化之根，找诗歌之魂`,
          drawerTime: '1 week ago'
        },
        {
          drawerItemId: 5,
          drawerCover: require('@/assets/images/home/755ce8eegy1gepvjznz8yj21fe2ushdt.jpg'),
          drawerItemTitle: '我们在此相遇',
          drawerItemContent: '有时候遇见一个人的意义,就是为了和他告别。',
          drawerTime: '1 week ago'
        }
      ]
    }
  },
  methods: {
    showItem (val) {
      this.$bus.$emit('drawerInfo', val)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/config.scss';
.drawer-list {
  flex: 1;
  min-width: 400px;
  height: 100%;
  box-sizing: border-box;
  padding: 30px 25px 70px;
  border-left: 1px solid #e3e7f7;
  background: #f5f8ff;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: flex-start;
  .header {
    height: 80px;
    width: 100%;
    margin-bottom: 20px;
    position: relative;
    span {
      display: inline-block;
      position: absolute;
      left: 10px;
      height: 100%;
      font-size: 28px;
      font-weight: bolder;
      line-height: 80px;
      cursor: default;
    }
    input {
      outline-style: none;
      position: absolute;
      right: 150px;
      height: 50px;
      top: 13px;
      border: none;
      border-radius: 8px;
      background: #c3cff4;
      width: 40%;
      padding: 0 40px 0 20px;
      box-sizing: border-box;
    }
    .search-enter-active, .search-leave-active {
      transition: all .1s;
    }
    .search-enter, .search-leave-to /* .fade-leave-active below version 2.1.8 */ {
      width: 0;
    }
    &>div {
      height: 80px;
      line-height: 80px;
      position: absolute;
      right: 20px;
      i {
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
        font-size: 22px;
        font-weight: bolder;
        transition: all .2s;
        border-radius: 8px;
        margin-right: 10px;
        &:hover {
          background: #c3cff4;
          color: #FFFFFF;
        }
      }
      .el-icon-delete {
        &:hover {
          background: #e66b6b;
          color: #FFFFFF;
        }
      }
    }
  }
  .mid {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    /*滚动条设置*/
    overflow-x: auto;
    //display: -webkit-box;
    -webkit-overflow-scrolling: touch;
    //margin: 0.5rem 0.5rem;
    &::-webkit-scrollbar {
      display: none;
    }
    .drawer-list-item {
      width: 340px;
      min-width: 300px;
      max-width: 30%;
      height: 340px;
      flex: 1;
      border-radius: 30px;
      background: #ffffff;
      color: #363331;
      display: flex;
      flex-direction: column;
      //align-items: center;
      margin: 0 30px 30px 0;
      overflow: hidden;
      cursor: pointer;
      position: relative;
      &:hover {
        .drawer-item-frame {
          transform: scale(1.2);
          height: 220px;
        }
      }
      .drawer-item-frame {
        position: absolute;
        width: 100%;
        height: 190px;
        transition: all .4s;
        z-index: 5;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .drawer-item-title {
        margin-top: 200px;
        padding: 0 25px;
        height: 50px;
        line-height: 50px;
        font-size: 24px;
        //z-index: 1;
        font-weight: bolder;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .drawer-item-text {
        height: 48px;
        padding: 0 25px;
        text-overflow:ellipsis;/*设置隐藏部分为省略号*/
        overflow: hidden;/*设置隐藏*/
        display: -webkit-box;
        -webkit-line-clamp: 2;/*设置显示行数，此处为2行，可设置其他数字*/
        -webkit-box-orient: vertical;
      }
      .drawer-item-time {
        z-index: 0;
        position: absolute;
        bottom: 16px;
        right: 33px;
        font-size: 14px;
        color: #7a7a8b;
      }
    }
  }
}
</style>
