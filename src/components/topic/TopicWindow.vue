<template>
  <div class="topic-window">
    <div class="window">
      <header>
<!--        <h2>春日游，杏花吹满头</h2>-->
        <video src="@/assets/images/topic/无尽夏.mp4"
               type="video/mp4"
               controls
               autoplay
               loop
        ></video>
      </header>
      <div class="details">
        若夫气霁地表，云敛天末，洞庭始波，木叶微脱。菊散芳于山椒，雁流哀于江濑。升清质之悠悠，降澄辉之蔼蔼。列宿掩缛，长河韬映，柔祇雪凝，圆灵水镜。连观霜缟，周除冰净。君王乃厌晨欢，乐宵宴，收妙舞，弛清县。去烛房，即月殿，芳酒登，鸣琴荐。</div>
      <div class="search">
        <input type="text" v-model="topicSearch">
        <i class="el-icon-search"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopicWindow',
  data () {
    return {
      topicImg: require('@/assets/images/task/wallhaven-l3gq1q.jpg'),
      topicSearch: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.topic-window {
  width: 100%;
  //height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .window {
    top: 30vh;
    width: 60%;
    margin-top: 20vh;
    max-width: 1280px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    z-index: 2;
    header {
      width: 100%;
      //height: 60vh;
      background: rgba(255, 255, 255, 0.375);
      box-shadow: 0 0.75rem 2rem 0 rgba(0, 0, 0, 0.1);
      border-radius: 2rem;
      //border: 1px solid rgba(255, 255, 255, 0.125);
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      > * {
        width: 100%;
        //height: 100%;
      }
      h2 {
        height: 200px;
        line-height: 200px;
        font-size: 86px;
        font-family: 钟齐志莽行书;
        color: #ffffff;
      }
      video {
        width: 100%;
        height: 100%;
        background: #000000;
        object-fit: cover;
      }
    }
    .details {
      padding:  40px 10PX;
      font-size: 18px;
      color: #f4f4f4;
      font-weight: bolder;
      text-indent:50px;
      line-height: 30PX;
    }
    .search {
      //padding: 0 20px;
      margin-top: 40px;
      position: relative;
      input {
        outline-style: none;
        border: 2px solid #FFFFFF;
        background: rgba(#ffffff, .5);
        height: 50px;
        width: 100%;
        padding: 0 50px 0 20px;
        border-radius: 25px;
        font-weight: bolder;
        transition: .5s;
        &:focus {
          animation: inputBorder 1s infinite alternate;
          @keyframes inputBorder {
            from{
              box-shadow: none;
            }
            to{
              box-shadow: inset 0 0 4px rgba(143, 143, 143, 0.096),0 0 18px rgb(255, 255, 255);
            }
          }
        }
      }
      i {
        position: absolute;
        right: 16px;
        top: 10px;
        font-size: 30px;
        color: #FFFFFF;
      }
    }
  }
}
</style>
