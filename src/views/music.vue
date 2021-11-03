<template>
  <div class="music-container">
    <div class="music-bg"></div>
    <carousel></carousel>
    <div class="my_mv">
      <div class="mv_hd">
        <h2>MV</h2>
      </div>
      <div class="mv_index_video">
        <div class="mv_video">
          <a @click="playMv(302093)" target="_blank">
            <img src="@/assets/images/music/sing/惊鸿一面.jpg" alt="">
          </a>
          <div class="sing_info">
            <h6>惊鸿一面</h6>
            <div class="singer">
              <p>许嵩</p> / <p>黄龄</p>
            </div>
          </div>
        </div>
        <div class="mv_video">
          <a @click="playMv(5441483)" target="_blank">
            <img src="@/assets/images/music/sing/黄昏.jpg" alt="">
          </a>
          <div class="sing_info">
            <h6>黄昏</h6>
            <div class="singer">
              <p>周传雄</p>
            </div>
          </div>
        </div>
        <div class="mv_video">
          <a @click="playMv(5342354)" target="_blank">
            <img src="@/assets/images/music/sing/我好像在哪见过你.jpg" alt="">
          </a>
          <i class="mark_mv"></i>
          <div class="sing_info">
            <h6>我好像在哪见过你</h6>
            <div class="singer">
              <p>薛之谦</p>
            </div>
          </div>
        </div>
        <div class="mv_video">
          <a @click="playMv(5779666)" target="_blank">
            <img src="@/assets/images/music/sing/张杰-天下.jpg" alt="">
          </a>
          <div class="sing_info">
            <h6>天下</h6>
            <div class="singer">
              <p>张杰</p>
            </div>
          </div>
        </div>
        <div class="mv_video">
          <a @click="playMv(14309539)" target="_blank">
            <img src="@/assets/images/music/sing/张靓颖.jpg" alt="">
          </a>
          <div class="sing_info">
            <h6>画心</h6>
            <div class="singer">
              <p>张靓颖</p>
            </div>
          </div>
        </div>
        <div class="mv_video">
          <a @click="playMv(10906470)" target="_blank">
            <img src="@/assets/images/music/sing/邓紫棋.jpg" alt="">
          </a>
          <div class="sing_info">
            <h6>句号</h6>
            <div class="singer">
              <p>邓紫棋</p> / <p>张靓颖</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="music">
      <div class="my_music">
        <div class="my_head">
          <h4>我的音乐</h4>
        </div>
        <div class="my_song">
          <div class="my_song_list">
            <div class="my_song_header">
              <div class="my_love"></div>
              <div class="my_song_name">歌名</div>
              <div class="my_singer">歌手</div>
              <div class="my_albun">专辑</div>
              <div class="my_song_time">时长</div>
            </div>
            <div class="my_song_single" v-for="(item,index) in sings" :key="index">
              <div class="my_love">
                <img :src="item.isLove ? loveImg2 : loveImg1" alt="" @click="changeLove(item)">
              </div>
              <div class="my_song_name">
                <p @click='playMusicMy(item, index)'>{{ item.songName }}</p>
                <div class="sing_mv" v-if="item.mvId!=0" @click="playMv(item.mvId)"></div>
              </div>
              <div class="my_singer" @click="pointSearch(item.singerName)">
                <p>{{ item.singerName }}</p>
              </div>
              <div class="my_albun" @click="pointSearch(item.albumName)">
                <p>{{ item.albumName }}</p>
              </div>
              <div class="my_song_time">
                {{ item.songTime | changeSongTime }}
              </div>
            </div>
          </div>
          <div class="music_bar">
            <div class="song_cover" v-show="nowSongName">
              <img :src="coverUrl" alt="">
            </div>
            <div class="song_bar" v-show="nowSongName">
              <div class="song_info">
                <span>{{ nowSongName }} - {{ nowSinger }}</span>
                <span>{{ nowTimeOne | changeSongTime }}/{{ nowTime | changeSongTime }}</span>
              </div>
              <div class="song_schedule" @click="changeProgress" @mouseleave="mouseLeave" @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp" ref="songSchedule">
                <div class="song_schedule_default"></div>
                <div class="song_schedule_now" ref="schedule">
                </div>
                <div ref="musicPoint" class="music_point"></div>
              </div>
            </div>
            <div class="song_control"  v-show="nowSongName">
              <div class="pre_song">
                <img @click="preMusic" src="@/assets/images/music/botton/上一曲.png" alt="">
              </div>
              <div class="play_button" @click="playAndPause">
                <img :src="isPlay ? playImg : pauseImg" alt="">
              </div>
              <div class="next_song">
                <img @click="nextMusic" src="@/assets/images/music/botton/下一曲.png" alt="">
              </div>
              <div class="sound">
                <transition name="el-fade-in-linear">
                  <div class="sound_bar" ref="soundBar" v-show="isBar">
                    <div class="bar" ref="bar"></div>
                  </div>
                </transition>
                <img @mouseenter="isBar = true" @mousewheel.prevent="mouseWheel" @mouseleave="isBar = false" @click="changeSound" :src="isSound ? turnSound : closeSound" alt="">
              </div>
              <div class="song_model">
                <img src="@/assets/images/music/botton/单曲循环.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="search">
        <div class="search_bar">
          <img src="@/assets/images/搜索.png" alt="">
          <input type="text" v-model='query' @keyup.enter="searchMusic">
        </div>
        <div class="search_sings">
          <div class="search_sings_list">
            <div class="search_header">搜索列表</div>
            <div class="search_sing" v-for="(item,index) in musicList" :key="index">
              <div class="collect_sing" @click="addLove(item)">
                <img :src="judgeLove(item.id) ? loveImg2 : loveImg1" alt="">
              </div>
              <div class="sing_name">
                <p @click='playMusic(item)'>{{ item.name }}</p>
              </div>
              <div class="singer">
                <p>{{ item.artists[0].name }}</p>
              </div>
              <div class="sing_mv" v-if="item.mvid!=0" @click="playMv(item.mvid)"></div>
            </div>
          </div>
        </div>
      </div>
      <audio ref='audio' style="display:none"  @play="play" @pause="pause" :src="musicUrl" controls autoplay loop class="myaudio"></audio>
      <div class="video_con" v-show="showVideo">
        <video ref='video' :src="mvUrl" controls="controls"></video>
        <div class="mask" @click="closeMv"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel.vue'

// 本地网易云在线接口的位置 http://localhost:3000

export default {
  components: { Carousel },
  name: 'music',
  data () {
    return {
      // 搜索关键字
      query: '',
      // 歌曲列表
      musicList: [],
      // 歌曲url
      musicUrl: '',
      // 是否正在播放
      isPlay: false,
      nowSongName: '',
      nowSinger: '',
      nowTime: '',
      // 当前播放音乐索引
      nowIndex: -1,
      // 当前音乐播放的时长
      nowTimeOne: 0,
      // 歌曲封面地址
      coverUrl: '',
      // 显示视频播放
      showVideo: false,
      // mv地址
      mvUrl: '',
      // 当前音量
      nowSound: 1,
      // 音乐条显示
      isBar: false,
      // 声音控制
      isSound: true,
      turnSound: require('@/assets/images/music/botton/声音.png'),
      closeSound: require('@/assets/images/music/botton/声音静音.png'),
      // 收藏图片改变
      loveImg1: require('@/assets/images/music/喜欢.png'),
      loveImg2: require('@/assets/images/music/喜欢2.png'),
      // 播放/暂停
      playImg: require('@/assets/images/music/botton/播放中.png'),
      pauseImg: require('@/assets/images/music/botton/暂停.png'),
      sings: [
        { albumName: '起风了', isLove: true, mvId: 10782615, singerName: '买辣椒也用券', songId: 1330348068, songName: '起风了', songTime: 325 },
        { albumName: '半城烟沙', isLove: true, mvId: 0, singerName: '许嵩', songId: 167744, songName: '半城烟沙', songTime: 294 },
        { albumName: '摩天动物园', isLove: true, mvId: 10906470, singerName: 'G.E.M.邓紫棋', songId: 1405283464, songName: '句号', songTime: 235 },
        { albumName: '倾尽天下', isLove: true, mvId: 333042, singerName: '河图', songId: 27571867, songName: '倾尽天下', songTime: 265 },
        { albumName: '腐草为萤', isLove: true, mvId: 0, singerName: '银临', songId: 28188425, songName: '瀘沽寻梦', songTime: 224 },
        { albumName: '小黄', isLove: true, mvId: 0, singerName: '李荣浩', songId: 133998, songName: '老街', songTime: 318 },
        { albumName: 'Xposed', isLove: true, mvId: 221004, singerName: 'G.E.M.邓紫棋', songId: 233931, songName: '泡沫', songTime: 258 },
        { albumName: '明天过后', isLove: true, mvId: 5779666, singerName: '张杰', songId: 191254, songName: '天下', songTime: 219 }
      ],
      // 定时器
      timer: null,
      timerMusic: null,
      // 鼠标拖动音乐条
      startMouse: '',
      endMouse: '',
      // 鼠标当前移动的位置
      moveMouse: 0
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      if (this.nowSongName !== '') {
        setTimeout(this.audioInfo, 0)
      }
    }, 0)
  },
  methods: {
    // 点击进度条改变音乐进度
    changeProgress (event) {
      /* 获取点击位置相对于父元素的偏移量 */
      // console.log(event.layerX)
      /* 获取父元素的宽度 */
      // console.log(this.$refs.songSchedule.clientWidth)
      this.$refs.schedule.style.width = event.layerX / this.$refs.songSchedule.clientWidth * 100 + '%'
      this.$refs.audio.currentTime = event.layerX / this.$refs.songSchedule.clientWidth * this.nowTime
      this.$refs.musicPoint.style.left = event.layerX - 5 + 'px'
    },
    // 鼠标按住拖动事件
    mouseDown (event) {
      this.$refs.audio.muted = true
      this.timerMusic = setInterval(() => {
        this.$refs.schedule.style.width = this.moveMouse / this.$refs.songSchedule.clientWidth * 100 + '%'
        this.$refs.audio.currentTime = this.moveMouse / this.$refs.songSchedule.clientWidth * this.nowTime
        this.$refs.musicPoint.style.left = this.moveMouse - 5 + 'px'
      }, 0)
    },
    // 鼠标移动事件
    mouseMove (event) {
      this.moveMouse = event.layerX
    },
    mouseUp (event) {
      // this.moveMouse = 0
      this.$refs.audio.muted = false
      clearTimeout(this.timerMusic)
    },
    mouseLeave (event) {
      this.$refs.audio.muted = false
      clearTimeout(this.timerMusic)
    },
    // 搜索歌曲
    searchMusic () {
      if (this.query === 0) {
        return 0
      }
      this.axios.get('http://localhost:3000/search?keywords=' + this.query).then(response => {
        // 保存内容
        // console.log(response)
        this.musicList = response.data.result.songs
      })
    },
    // 按点击搜索
    pointSearch (name) {
      this.query = name
      this.searchMusic()
    },
    // 播放歌曲
    playMusic (music) {
      // 获取歌曲url
      this.axios.get('http://localhost:3000/song/url?id=' + music.id).then(response => {
        // 保存歌曲url地址
        // console.log(response)
        this.musicUrl = response.data.data[0].url
      })
      // 获取歌曲封面
      this.axios.get('http://localhost:3000/song/detail?ids=' + music.id).then(response => {
        // console.log(response)
        // 设置封面
        this.coverUrl = response.data.songs[0].al.picUrl
      })
      // 歌曲为播放中
      this.isPlay = !this.isPlay
      if (music) {
        this.nowSongName = music.name
        this.nowSinger = music.artists[0].name
        this.nowTime = Math.floor(music.duration / 1000)
      }
      // console.log(this.nowTime)
      // console.dir(this.sings)
    },
    playMusicMy (value, index) {
      // 获取歌曲url
      this.axios.get('http://localhost:3000/song/url?id=' + value.songId).then(response => {
        // 保存歌曲url地址
        // console.log(response)
        this.musicUrl = response.data.data[0].url
      })
      // 获取歌曲封面
      this.axios.get('http://localhost:3000/song/detail?ids=' + value.songId).then(response => {
        // console.log(response)
        // 设置封面
        this.coverUrl = response.data.songs[0].al.picUrl
      })
      // 歌曲为播放中
      this.isPlay = !this.isPlay
      this.nowIndex = index
      if (value) {
        this.nowSongName = value.songName
        this.nowSinger = value.singerName
        this.nowTime = value.songTime
      }
    },
    // 添加歌曲到收藏
    addLove (song) {
      for (let i = 0; i < this.sings.length; i++) {
        if (song.id === this.sings[i].songId) {
          return 0
        }
      }
      function Song () {
      }
      const songNow = new Song()
      songNow.songId = song.id
      songNow.songName = song.name
      songNow.singerName = song.artists[0].name
      songNow.albumName = song.album.name
      songNow.mvId = song.mvid
      songNow.isLove = true
      songNow.songTime = Math.floor(song.duration / 1000)
      this.sings.unshift(songNow)
    },
    // 判断是否为我喜欢
    judgeLove (num) {
      for (let i = 0; i < this.sings.length; i++) {
        if (num === this.sings[i].songId) {
          return 1
        }
      }
      return 0
    },
    // 更改收藏状态
    changeLove (value) {
      console.log(value)
      console.log(value.songId)
      if (value.isLove) {
        value.isLove = false
        let flag = -1
        for (let i = 0; i < this.sings.length; i++) {
          if (this.sings[i].songId === value.songId) {
            flag = i
          }
        }
        delete this.sings.splice(flag, 1)
      }
    },
    // 上一首
    preMusic () {
      if (this.nowIndex === 0) {
        this.nowIndex = this.sings.length - 1
      } else {
        this.nowIndex -= 1
      }
      this.playMusicMy(this.sings[this.nowIndex], this.nowIndex)
    },
    // 下一首
    nextMusic () {
      if (this.nowIndex === this.sings.length - 1) {
        this.nowIndex = 0
      } else {
        this.nowIndex += 1
      }
      this.playMusicMy(this.sings[this.nowIndex], this.nowIndex)
    },
    // 鼠标滚动
    mouseWheel (event) {
      if (event.wheelDelta > 0) {
        if (this.nowSound >= 1) {
          this.nowSound = 1
        } else {
          this.isSound = true
          this.nowSound += 0.05
          /* 防止出现精度问题 */
          this.nowSound = (this.nowSound * 100).toFixed(2) / 100
        }
      } else {
        if (this.nowSound <= 0) {
          this.nowSound = 0
          this.isSound = false
        } else {
          this.isSound = true
          this.nowSound -= 0.05
          /* 防止出现精度问题 */
          this.nowSound = (this.nowSound * 100).toFixed(2) / 100
        }
      }
      this.$refs.audio.volume = this.nowSound
      this.$refs.bar.style.height = this.nowSound * 80 + 'px'
    },
    // 音量控制
    changeSound () {
      this.isSound = !this.isSound
      if (this.isSound === true) {
        this.$refs.audio.volume = 1
        this.nowSound = 1
      } else {
        this.$refs.audio.volume = 0
        this.nowSound = 0
      }
      this.$refs.audio.volume = this.nowSound
      this.$refs.bar.style.height = this.nowSound * 80 + 'px'
    },
    // audio的play事件
    play () {
      this.isPlay = true
      // 清空mv的信息
      this.mvUrl = ''
    },
    // audio的pause事件
    pause () {
      this.isPlay = false
    },
    playAndPause () {
      if (this.isPlay) {
        this.isPlay = false
        this.$refs.audio.pause()
      } else {
        this.isPlay = true
        this.$refs.audio.play()
      }
    },
    playMv (vid) {
      console.log(vid)
      if (vid) {
        this.showVideo = true
        // 获取mv信息
        this.axios.get('https://autumnfish.cn/mv/url?id=' + vid).then(response => {
          // console.log(response)
          // 暂停歌曲播放
          this.$refs.audio.pause()
          console.log(response.data)
          // 获取mv地址
          this.mvUrl = response.data.data.url
        })
      }
    },
    // 关闭mv界面
    closeMv () {
      this.showVideo = false
      this.$refs.video.pause()
    },
    audioInfo () {
      if (this.$refs.audio.currentTime) {
        this.nowTimeOne = this.$refs.audio.currentTime
        this.$refs.schedule.style.width = this.$refs.audio.currentTime / this.nowTime * 100 + '%'
        this.$refs.musicPoint.style.left = this.$refs.songSchedule.clientWidth * this.$refs.audio.currentTime / this.nowTime - 5 + 'px'
      }
    }
  },
  filters: {
    changeSongTime (value) {
      return '0' + Math.floor((value / 60)) + ':' + ((value % 60) < 10 ? '0' + parseInt(value % 60) : parseInt(value % 60))
    }
  },
  // 页面销毁清楚定时器
  beforeDestroy () {
    clearTimeout(this.timer)
    clearTimeout(this.timerMusic)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/config.scss';
@import '@/assets/sass/responsive.scss';

.music-container{
  margin: 0;
  padding: 0;
  width: 100%;
  background-image: linear-gradient(125deg,#94b2cf,#7beec8,#8dc2e6,#ffa59b,#e7b0ff);
  background-size: 400%;
  overflow: hidden;
  overflow-x: auto;
  white-space: nowrap;
  background-position: bottom;
  z-index: -9;
  display: flex;
  flex-direction: column;
  align-items: center;
  .music-bg{
    width: 100%;
    height: 100vh;
    min-height: 500px;
    background-image: linear-gradient(125deg,#94b2cf,#7beec8,#8dc2e6,#ffc7c0,#eec8ff);
    background-size: cover;
    background-position: bottom;
    position: fixed;
    z-index: -10;
  }
  .my_mv{
    margin: 50px 0;
    padding-top: 20px;
    border-radius: 15px;
    background-image: linear-gradient(#f2f2f2, #f5f5f5);
    width: 80vw;
    max-width: 1580px;
    .mv_hd{
      text-align: center;
      h2{
        font-weight: bolder;
        letter-spacing: 3px;
      }
    }
    .mv_index_video{
      width: 100%;
      padding: 20px;
      border-radius: 0 0 15px 15px;
      background: #f8f8f8;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      color: #999;
      .mv_video{
        display: flex;
        position: relative;
        align-items: center;
        flex-direction: column;
        padding-top: 20px;
        margin: 0px auto;
        width: 30%;
        img{
          width: 278px;
          height: 156px;
          object-fit:cover;
          transition: .5s;
          object-fit: cover;
        }
        img:hover{
          transform: scale(1.03);
          opacity: 0.8;
          cursor: pointer;
        }
        .sing_info{
          width: 278px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          h6{
            color: #000;
            padding-top: 10px;
            cursor: pointer;
          }
          h6:hover{
            color: $colorF;
          }
          p{
            display: inline;
            color: #999;
            cursor: pointer;
          }
          p:hover{
            color: $colorF;
          }
        }
      }
    }
  }
  .music{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80vw;
    max-width: 1580px;
    height: 80vh;
    border-radius: 15px;
    margin-bottom: 50px;
    padding: 15px 0;
    background-color: rgba($color: $colorG, $alpha: 0.25);
    .my_music{
      width: 70%;
      height: 100%;
      margin: 0 15px;
      background-color: rgba($color: $colorG, $alpha: 0.98);
      border-radius: 15px;
      .my_head{
        width: 100%;
        background-image: linear-gradient(#f3f3f3, #fafafa);
        border-bottom: 1px #dedede solid;
        border-radius: 15px 15px 0 0;
        padding: 20px 0 15px;
        text-align: center;
        h4{
          letter-spacing: 3px;
          margin: 0;
          font-weight: bold;
        }
      }
      .my_song{
        display: flex;
        flex-direction: column;
        height: calc(100% - 60px);
        .my_song_list{
          /* 隐藏滚动条 */
          scrollbar-width: none; /* firefox */
          -ms-overflow-style: none; /* IE 10+ */
          overflow-x: hidden;
          overflow-y: auto;
          width: 100%;
          height: 100%;
          min-height: calc(100% - 70px);
          background-color: #f2f2f2;
          .my_song_header{
            width: 100%;
            height: 50px;
            background-color: #f7f7f7;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #999999;
          }
          .my_song_single{
            width: 100%;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .my_song_single:nth-child(odd){
            background-color: #fafafa;
          }
          .my_song_single:nth-child(even){
            background-color: #f7f7f7;
          }
          .my_love{
            width: 10%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            img{
              cursor: pointer;
              width: 20px;
              height: 20px;
              transition: .5s;
            }
            img:hover{
              transform: scale(1.1);
            }
          }
          .my_song_name{
            width: 40%;
            display: flex;
            align-items: center;
            .sing_mv{
              margin: 0 10px;
              width: 20px;
              height: 20px;
              background: url('~@/assets/images/music/视频.png') no-repeat;
              background-size: cover;
              cursor: pointer;
            }
          }
          .my_singer{
            width: 20%;
          }
          .my_albun{
            width: 15%;
          }
          .my_song_time{
            width: 15%;
          }
          p{
            /* 文本溢出省略 */
            // display: inline;
            width: auto;
            margin: auto 0;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            /* 禁止文本选中 */
            user-select: none;
            cursor: pointer;
          }
          p:hover{
            color: $colorF;
          }
        }
        /* 隐藏滚动条 */
        .my_song_list::-webkit-scrollbar {
          display: none;
        }
        .music_bar{
          width: 100%;
          height: 20%;
          max-height: 80px;
          border-top: 1px #d8d8d8 solid;
          border-radius: 0 0 15px 15px;
          background-color: #fafafa;
          display: flex;
          align-items: center;
          .song_cover {
            width: 70px;
            height: 70px;
            padding: 5px;
            img{
              width: 60px;
              height: 60px;
              border-radius: 15px;
            }
          }
          .song_bar {
            flex-grow: 10;
            height: 70px;
            padding: 10px 5px 0 5px;
            display: flex;
            flex-direction: column;
            .song_info{
              display: flex;
              align-items: center;
              height: 25px;
              width: 100%;
              font-size: 14px;
              span:first-child{
                flex-grow: 16;
              }
              span:last-child{
                flex-grow: 1;
              }
            }
            .song_schedule{
              position: relative;
              width: 100%;
              height: 35px;
              padding: 11px 0 21px 0;
              cursor: pointer;
              .song_schedule_default{
                width: 100%;
                height: 100%;
                background-color: #dedede;
                cursor: pointer;
              }
              .song_schedule_now{
                position: absolute;
                top: 11px;
                height: 3px;
                background-color: $colorF;
              }
              .music_point{
                top: 7.5px;
                position: absolute;
                width: 10px;
                height: 10px;
                background-image: radial-gradient(circle,$colorF 40%, #fff);
                border-radius: 10px;
                z-index: 2;
              }
            }
          }
          .song_control{
            display: flex;
            position: relative;
            justify-content: center;
            align-items: center;
            height: 70px;
            width: 150px;
            padding-right: 5px;
            div{
              flex-grow: 1;
            }
            img{
              cursor: pointer;
              width: 25px;
              height: 25px;
            }
            .sound{
              width: 25px;
              height: 25px;
            }
            .sound_bar{
              width: 25px;
              height: 100px;
              padding: 10px;
              position: absolute;
              background-color: rgba(255, 255, 255, 0.5);
              box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.041), 0 3px 5px 0 rgba(0, 0, 0, 0.082);
              border-radius: 25px;
              bottom: 45px;
              .bar{
                position: absolute;
                bottom: 10px;
                cursor: pointer;
                margin: 10px auto 0;
                height: 80px;
                border-radius: 10px;
                width: 5px;
                background: $colorF;
              }
            }
          }
        }
      }
    }
    .search{
      width: 30%;
      height: 100%;
      max-width: 400px;
      min-width: 300px;
      margin: 0 15px;
      border-radius: 15px;
      // background-color: rgba($color: $colorG, $alpha: 0.98);
      .search_bar{
        width: 100%;
        margin-top: 10px;
        height: 50px;
        position: relative;
        img{
          position: absolute;
          top: 13px;
          left: 20px;
          width: 25px;
          height: 25px;
        }
        input{
          outline-style: none;
          background-color: rgba($color: $colorG, $alpha: 0);
          width: 100%;
          height: 50px;
          padding-left: 50px;
          padding-right: 20px;
          border-radius: 25px;
          border: 2px $colorG solid;
          color: #314c7a;
          font-size: 16px;
        }
        input:focus{
          background-color: rgba($color: $colorG, $alpha: 0.3);
          animation: inputBorder 2s infinite alternate;
          transition: 1s;
          @keyframes inputBorder {
            from{
              box-shadow: 0
            }
            to{
              box-shadow: inset 0 0 4px rgba(143, 143, 143, 0.096),0 0 18px rgb(255, 255, 255);
            }
          }
        }
      }
      .search_sings{
        height: calc(100% - 95px);
        width: 100%;
        border-radius: 15px;
        margin: 30px 0;
        padding: 10px;
        background-color: rgba($color: $colorG, $alpha: 0.4);
        .search_sings_list{
          background-color: #fafafa;
          /* 隐藏滚动条 */
          scrollbar-width: none; /* firefox */
          -ms-overflow-style: none; /* IE 10+ */
          overflow-x: hidden;
          overflow-y: auto;
          width: 100%;
          height: 100%;
          // padding: 15px 10px;
          border-radius: 15px;
          display: flex;
          flex-direction: column;
          .search_header{
            height: 40px;
            padding: 10px;
            text-align: center;
            letter-spacing: 3px;
            margin: 15px 10px 5px 10px;
            font-weight: bold;
            border-bottom: 1px rgba(204, 204, 204, 0.603) solid;
          }
          .search_sing{
            width: 100%;
            height: 50px;
            padding: 13px 0;
            background-color: #f7f7f7;
            display: flex;
            align-items: center;
            p{
              /* 文本溢出省略 */
              margin: auto 0;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            p:hover{
              color: $colorF;
            }
            .collect_sing{
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 0 10px;
              width: 20px;
              height: 20px;
              img{
                cursor: pointer;
                width: 20px;
                height: 20px;
                transition: .5s;
              }
              img:hover{
                transform: scale(1.1);
              }
            }
            .sing_name{
              flex: 0 0;
              flex-grow: 5;
              max-width: 46%;
              user-select: none;
              cursor: pointer;
            }
            .singer{
              flex: 0 0;
              flex-grow: 3;
              max-width: 23%;
              margin: 0 0 0 10px;
              user-select: none;
              cursor: pointer;
            }
            .sing_mv{
              margin: 0 10px;
              width: 20px;
              height: 20px;
              background: url('~@/assets/images/music/视频.png') no-repeat;
              background-size: cover;
              cursor: pointer;
            }
          }
          /* 奇孩子 */
          .search_sing:nth-child(odd){
            background-color: #f7f7f7;
          }
          /* 偶孩子 */
          .search_sing:nth-child(even){
            background-color: #fafafa;
          }
        }
        /* 隐藏滚动条 */
        .search_sings_list::-webkit-scrollbar {
          display: none;
        }
      }
    }
    .video_con video {
      position: fixed;
      width: 800px;
      height: 546px;
      left: 50%;
      top: 50%;
      margin-top: -273px;
      transform: translateX(-50%);
      z-index: 990;
    }
    .video_con .mask {
      position: fixed;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 980;
      background-color: rgba(0, 0, 0, 0.6);
    }
    .video_con .shutoff {
      position: fixed;
      width: 40px;
      height: 40px;
      background: url("~@/assets/images/关闭.png") no-repeat;
      left: 50%;
      margin-left: 400px;
      margin-top: -273px;
      top: 50%;
      z-index: 995;
    }
  }
}
</style>
