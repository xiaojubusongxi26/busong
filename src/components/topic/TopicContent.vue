<template>
  <div class="topic-content">
    <div class="common-list">
      <div class="func">
        <div class="write" @click="isRelease = !isRelease">
          <span>参与话题</span>
          <i class="el-icon-s-comment"></i>
        </div>
        <div class="sort">
          <span>最早发布</span>
          <i class="el-icon-s-fold"></i>
        </div>
        <div class="my focus">
          <span>只看我的</span>
          <i class="el-icon-view"></i>
        </div>
      </div>
      <transition name="release" mode="out-in">
        <release
          v-show="isRelease"
          background="rgba(255, 255, 255, 0.375)"
          color="#f2f2f2"
        />
      </transition>
      <div class="common"
           v-for="(item, index) in commentList"
           :key="index">
        <div class="header">
          <div class="avatar">
            <img :src="item.userAvatar" alt=""/>
          </div>
          <div class="info">
            <h2 class="name">{{ item.username }}</h2>
            <h3 class="time">{{ item.createTime }}</h3>
          </div>
        </div>
        <div class="text">
          {{ item.commentContent }}
        </div>
        <div class="imgs">
          <el-image
            v-for="(imgItem, imgIndex) in item.commentImg"
            :key="imgIndex"
            :fit="'cover'"
            :src="imgItem"
            :preview-src-list="item.commentImg">
          </el-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Release from '@/components/common/Release.vue'

export default {
  name: 'TopicContent',
  components: { Release },
  data () {
    return {
      isRelease: false,
      releaseContent: {
        name: ''
      },
      commentList: [
        {
          username: '王谢棠',
          userAvatar: require('@/assets/images/avatar/花.png'),
          createTime: '2023-03-02 14:56:03',
          updateTime: '2023-03-02 14:56:03',
          commentContent: `我怕自己本非美玉，故而不敢加以刻苦琢磨，却又半信自己是块美玉，胡又不肯庸庸碌碌，与瓦砾为伍。
\n
少年就是少年，他们看春风不喜，看夏蝉不烦，看冬雪不叹，看满身富贵懒察觉，看不公不允敢面对，只因他们是少年。
\n
那时我们有梦，关于文学，关于爱情，关于穿越世界的旅行。如今我们深夜饮酒，杯子碰在一起，都是梦破碎的声音。
\n
自童年起，我就独自一人，照顾着历代星辰。
\n
月光还是少年的光，九州一色还是李白的霜。
\n
酒入豪肠，七分酿成了月光。余下的三分啸成剑气。绣口一吐就半个盛唐。
\n
此后如竟没有炬火，我便是唯一的光。`,
          commentImg: [
            require('@/assets/images/topic/DSC05667.jpg'),
            require('@/assets/images/topic/DSC05845.jpg'),
            require('@/assets/images/topic/DSC05370.jpg')
          ]
        },
        {
          username: '王谢棠',
          userAvatar: '',
          createTime: '2023-03-02 14:56:03',
          updateTime: '2023-03-02 14:56:03',
          commentContent: `我怕自己本非美玉，故而不敢加以刻苦琢磨，却又半信自己是块美玉，胡又不肯庸庸碌碌，与瓦砾为伍。
\n
少年就是少年，他们看春风不喜，看夏蝉不烦，看冬雪不叹，看满身富贵懒察觉，看不公不允敢面对，只因他们是少年。
\n
那时我们有梦，关于文学，关于爱情，关于穿越世界的旅行。如今我们深夜饮酒，杯子碰在一起，都是梦破碎的声音。
\n
自童年起，我就独自一人，照顾着历代星辰。
\n
月光还是少年的光，九州一色还是李白的霜。
\n
酒入豪肠，七分酿成了月光。余下的三分啸成剑气。绣口一吐就半个盛唐。
\n
此后如竟没有炬火，我便是唯一的光。`,
          commentImg: [
            require('@/assets/images/topic/DSC05667.jpg'),
            require('@/assets/images/topic/DSC05845.jpg'),
            require('@/assets/images/topic/DSC05370.jpg')
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.topic-content {
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 2;
  .common-list {
    width: 60%;
    max-width: 1280px;
    padding: 0 0 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .func {
      position: absolute;
      right: -120px;
      top: 22px;
      div {
        margin-bottom: 20px;
        width: 40px;
        height: 40px;
        padding: 0 5px;
        background: rgba(255, 255, 255, 0.375);
        border-radius: 7px;
        cursor: pointer;
        text-align: center;
        color: #FFFFFF;
        transition: all .3s ease-out;
        position: relative;
        &:hover {
          //text-align: left;
          border-radius: 4px 0 0 4px;
          span {
            background: rgba(255, 255, 255, 0.375);
            width: 80px;
            opacity: 1;
          }
          i {
            color: #FFFFFF;
            opacity: 1;
          }
        }
        span {
          width: 0;
          opacity: 0;
          font-size: 14px;
          line-height: 40px;
          position: absolute;
          border-radius: 0 4px 4px 0;
          left: 40px;
          overflow: hidden;
          transition: all .2s ease-out;
          white-space: nowrap;
        }
        i {
          font-size: 22px;
          line-height: 40px;
          opacity: .8;
          transition: all .2s ease-out;
        }
      }
      .focus {
        transition: .5s;
        color: #ffffff;
        opacity: 1;
      }
    }
    .release-enter-active, .release-leave-active {
      transition: all .4s ease-out;
    }
    .release-enter, .release-leave-to /* .fade-leave-active below version 2.1.8 */ {
      width: 0;
      height: 0;
      padding: 0;
    }
    .release-enter, .release-leave-to textarea {
      height: 0;
      padding: 0;
    }
    .common {
      width: 100%;
      padding: 30px 40px;
      margin: 20px 0;
      border: 1px solid rgba(255, 255, 255, 0.125);
      border-radius: 2rem;
      background: rgba(255, 255, 255, 0.375);
      box-shadow: 0 0.75rem 2rem 0 rgba(0, 0, 0, 0.1);
      transition: all .3s ease-in-out;
      &:hover {
        background: rgba(255, 255, 255, 0.6);
        transform: scale(1.02) translateY(-10px);
        animation: inputBorder 1s infinite alternate;
        @keyframes inputBorder {
          from{
            box-shadow: none;
          }
          to{
            box-shadow: inset 0 0 2px rgba(143, 143, 143, 0.096),0 0 8px rgb(255, 255, 255);
          }
        }
      }
      .header {
        height: 60px;
        width: 100%;
        display: flex;
        .avatar {
          width: 60px;
          height: 60px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 30px;
          }
        }
        .info {
          margin-left: 12px;
          //padding: 10px 0;
          box-sizing: border-box;
          h2 {
            height: 40px;
            line-height: 40px;
            font-size: 18px;
            margin: 0;
          }
          h3 {
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            margin: 0;
          }
        }
      }
      .text {
        margin: 25px 0;
      }
      .imgs {
        .el-image {
          width: 150px;
          height: 150px;
          padding: 6px;
        }
      }
    }
  }
}
</style>
