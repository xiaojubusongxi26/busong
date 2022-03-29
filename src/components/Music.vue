<template>
  <div>
    <div class="music-contain">
    <!-- 音乐 -->
    <audio ref='audio' style="display:none"  @play="play" @pause="pause" :src="musicUrl" controls autoplay loop  class="myaudio"></audio>
    <!-- 底部音乐条 -->
    <div class="musicbar">
      <div class="song_cover">
        <img :src="coverUrl" alt="">
      </div>
      <div class="song-control">
        <div class="pre" @click="preMusic">
          <svg t="1640941285146" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3159" width="20" height="20"><path d="M364.302083 465.602819L687.954365 218.588294c38.416414-29.327534 93.791393-1.929039 93.791392 46.396277v494.029051c0 48.325316-55.374979 75.725617-93.791392 46.398084L364.302083 558.397181c-30.600916-23.357989-30.600916-69.436372 0-92.794362zM238.945254 780.798397V451.684117v-164.562559c0-19.628152-5.904521-60.475733 17.057907-75.841215 25.523642-17.068744 59.747828 1.210165 59.747828 31.919454v493.676839c0 19.628152 5.915358 60.473927-17.047069 75.841215-25.53448 17.068744-59.758666-1.211971-59.758666-31.919454z" fill="#f28647" p-id="3160"></path></svg>
        </div>
        <div class="play-pause" @click="playAndPause">
          <svg t="1640941449614" v-show="isPlay" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5070" width="35" height="35"><path d="M512 0C229.227168 0 0 229.227168 0 512s229.227168 512 512 512S1024 794.772832 1024 512 794.772832 0 512 0z m-20.161312 635.748744a34.760883 34.760883 0 0 1-69.521767 0v-247.497488a34.760883 34.760883 0 0 1 69.521767 0z m125.139179 0a34.760883 34.760883 0 1 1-69.521766 0v-247.497488a34.760883 34.760883 0 0 1 69.521766 0z" p-id="5071" fill="#f28647"></path></svg>
          <svg t="1640951419273" v-show="!isPlay" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1822" width="35" height="35"><path d="M512 0C229.227168 0 0 229.227168 0 512s229.227168 512 512 512S1024 794.772832 1024 512 794.772832 0 512 0z m108.745947 550.932189l-159.357793 132.286017a38.348206 38.348206 0 0 1-57.522309-33.203596v-264.460799a38.348206 38.348206 0 0 1 57.522309-33.203595l159.357793 132.230399a38.348206 38.348206 0 0 1 0 66.351574z" p-id="1823" fill="#f28647"></path></svg>
        </div>
        <div class="next" @click="nextMusic">
          <svg t="1640941396055" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3450" width="20" height="20"><path d="M655.706179 465.602819L332.053897 218.588294c-38.414608-29.327534-93.791393-1.929039-93.791392 46.396277v494.029051c0 48.325316 55.376785 75.725617 93.791392 46.398084l323.652282-247.014525c30.602722-23.357989 30.602722-69.436372 0-92.794362zM781.064814 780.798397V451.684117v-164.562559c0-19.628152 5.904521-60.475733-17.057907-75.841215-25.523642-17.068744-59.747828 1.210165-59.747828 31.919454v493.676839c0 19.628152-5.915358 60.473927 17.047069 75.841215 25.532673 17.068744 59.758666-1.211971 59.758666-31.919454z" fill="#f28647" p-id="3451"></path></svg>
        </div>
      </div>
      <!-- 音乐进度条 -->
      <div class="song_bar">
        <!-- 歌名、歌词、时长 -->
        <div class="song_info">
          <span>{{ nowSongName }} - {{ nowSinger }}</span>
          <span class="lyrics">{{ nowLyrics }}</span>
          <span>{{ nowTimeOne | changeSongTime }} / {{ nowTime | changeSongTime }}</span>
        </div>
        <div class="song_schedule" @click="changeProgress" @mouseleave="mouseLeave" @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp" ref="songSchedule">
          <div class="song_schedule_default"></div>
          <div class="song_schedule_now" ref="schedule">
          </div>
          <div ref="musicPoint" class="music_point"></div>
        </div>
      </div>
      <!-- 右侧按钮 -->
      <div class="song-features">
        <div class="my-love">
          <img :src="judgeLove(nowId) ? loveImg2 : loveImg1" alt="" @click="changeLove(nowMusic)">
        </div>
        <div class="mv" @click="playMv(nowMvId)">
          <img src="@/assets/images/music/视频.png" alt="">
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
          <img :src="nowPalyTypeImg" @click="changePalyType()" alt="">
        </div>
        <div class="song-list" @click="isShow = !isShow">
          <img src="@/assets/images/music/botton/列表.png" alt="">
        </div>
      </div>
    </div>
    <!-- 音乐列表 -->
    <transition name="show">
      <div class="music" v-show="isShow">
        <!-- 左侧显示我的音乐 -->
        <div class="my_music">
          <h3 class="music-title">歌曲列表</h3>
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
        </div>
        <!-- 右侧显示搜索列表 -->
        <div class="search">
          <div class="search_bar">
            <img src="@/assets/images/music/搜索.png" alt="">
            <input type="text" v-model='query' @keyup.enter="searchMusic">
          </div>
          <div class="search_sings">
            <div class="search_sings_list">
              <div class="search_header">搜索列表</div>
              <div class="search_sing" v-for="(item,index) in musicList"  :key="index">
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
      </div>
    </transition>
    </div>
    <!-- mv -->
    <div class="video_con" v-show="showVideo">
      <video ref='video' :src="mvUrl" controls="controls"></video>
      <div class="mask" @click="closeMv"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Music',
  data () {
    return {
      // 是否展开音乐列表
      isShow: false,
      // 搜索关键字
      query: '',
      // 歌曲列表
      musicList: [],
      // 歌曲url
      musicUrl: '',
      // 播放模式，1 单曲循环，2 列表循环，3 随机播放，4 顺序播放
      palyType: [
        { palyTypeId: 1, palyTypeImg: require('@/assets/images/music/botton/单曲循环.png') },
        { palyTypeId: 2, palyTypeImg: require('@/assets/images/music/botton/列表循环.png') },
        { palyTypeId: 3, palyTypeImg: require('@/assets/images/music/botton/随机播放.png') },
        { palyTypeId: 4, palyTypeImg: require('@/assets/images/music/botton/顺序播放.png') }
      ],
      // 是否正在播放
      isPlay: false,
      nowMusic: {},
      nowId: '',
      nowMvId: '',
      nowSongName: '',
      nowSinger: '',
      nowTime: '',
      nowLyrics: '',
      nowPalyType: 1,
      nowPalyTypeImg: require('@/assets/images/music/botton/单曲循环.png'),
      // 保存返回的当前歌曲的歌词信息
      lyrics: [],
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
        { albumName: '琉璃', mvId: 10949345, isLove: true, singerName: '银临', songId: 1465162316, songName: '琉璃', songTime: 281 },
        { albumName: '不如吃茶去', isLove: true, mvId: 302093, singerName: '许嵩', songId: 28854182, songName: '惊鸿一面', songTime: 256 },
        { albumName: '少年中国说', isLove: true, mvId: 14383247, singerName: '张杰', songId: 1885551650, songName: '少年中国说', songTime: 201 },
        { albumName: '忘记 transfer', isLove: true, mvId: 0, singerName: '周传雄', songId: 190062, songName: '记事本', songTime: 261 },
        { albumName: '半城烟沙', isLove: true, mvId: 0, singerName: '许嵩', songId: 167744, songName: '半城烟沙', songTime: 294 },
        { albumName: '忘记 transfer', isLove: true, mvId: 5441483, singerName: '周传雄', songId: 190072, songName: '黄昏', songTime: 344 },
        { albumName: '倾尽天下', isLove: true, mvId: 333042, singerName: '河图', songId: 27571867, songName: '倾尽天下', songTime: 265 },
        { albumName: '腐草为萤', isLove: true, mvId: 0, singerName: '银临', songId: 28188425, songName: '瀘沽寻梦', songTime: 224 },
        { albumName: '小黄', isLove: true, mvId: 0, singerName: '李荣浩', songId: 133998, songName: '老街', songTime: 318 },
        { albumName: '滚石香港黄金十年 伍佰精选', isLove: true, mvId: 10930176, singerName: '伍佰', songId: 156915, songName: '挪威的森林', songTime: 392 },
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
    this.playMusicMy(this.sings[0], 0)
    this.isPlay = false
    this.getLyrics()
    // 实时刷新播放音乐进度
    this.timer = setInterval(() => {
      if (this.nowSongName !== '') {
        setTimeout(() => {
          this.audioInfo()
        }, 0)
      }
    }, 0)
    this.axios.get('http://1.117.145.128:5000/personalized/mv').then(response => {
      // 保存内容
      console.log(response)
    })
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
      this.axios.get('http://1.117.145.128:5000/search?keywords=' + this.query).then(response => {
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
      this.axios.get('http://1.117.145.128:5000/song/url?id=' + music.id).then(response => {
        // 保存歌曲url地址
        // console.log(response)
        this.musicUrl = response.data.data[0].url
      })
      // 获取歌曲封面
      this.axios.get('http://1.117.145.128:5000/song/detail?ids=' + music.id).then(response => {
        // console.log(response)
        // 设置封面
        this.coverUrl = response.data.songs[0].al.picUrl
      })
      // 歌曲为播放中
      this.isPlay = !this.isPlay
      console.log(music)
      if (music) {
        this.nowId = music.id
        this.nowSongName = music.name
        this.nowMvId = music.mvid
        this.nowSinger = music.artists[0].name
        this.nowTime = Math.floor(music.duration / 1000)
        this.getLyrics()
      }
    },
    playMusicMy (value, index) {
      // 获取歌曲url
      this.axios.get('http://1.117.145.128:5000/song/url?id=' + value.songId).then(response => {
        // 保存歌曲url地址
        // console.log(response)
        this.musicUrl = response.data.data[0].url
      })
      // 获取歌曲封面
      this.axios.get('http://1.117.145.128:5000/song/detail?ids=' + value.songId).then(response => {
        // console.log(response)
        // 设置封面
        this.coverUrl = response.data.songs[0].al.picUrl
      })
      // 歌曲为播放中
      this.isPlay = !this.isPlay
      this.nowIndex = index
      if (value) {
        this.nowId = value.songId
        this.nowSongName = value.songName
        this.nowMvId = value.mvId
        this.nowSinger = value.singerName
        this.nowTime = value.songTime
        this.getLyrics()
      }
    },
    // 添加歌曲到收藏
    addLove (song) {
      for (let i = 0; i < this.sings.length; i++) {
        if (song.id === this.sings[i].songId) {
          return 0
        }
      }
      // 定义对象
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
      console.log(songNow)
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
      if (this.nowPalyType !== 3) {
        if (this.nowIndex === 0) {
          this.nowIndex = this.sings.length - 1
        } else {
          this.nowIndex -= 1
        }
      } else {
        // 随机播放
        this.nowIndex = Math.round(Math.random() * this.sings.length + 1)
      }
      this.playMusicMy(this.sings[this.nowIndex], this.nowIndex)
    },
    // 下一首
    nextMusic () {
      if (this.nowPalyType !== 3) {
        if (this.nowIndex === this.sings.length - 1) {
          this.nowIndex = 0
        } else {
          this.nowIndex += 1
        }
      } else {
        // 随机播放
        this.nowIndex = Math.round(Math.random() * this.sings.length + 1)
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
    // 更改播放歌曲的模式
    changePalyType () {
      this.nowPalyType < 4 ? this.nowPalyType++ : this.nowPalyType = 1
      this.nowPalyTypeImg = this.palyType[this.nowPalyType - 1].palyTypeImg
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
      if (vid) {
        this.showVideo = true
        // 获取mv信息
        this.axios.get('http://1.117.145.128:5000/mv/url?id=' + vid).then(response => {
          // console.log(response)
          // 暂停歌曲播放
          this.$refs.audio.pause()
          console.log(response.data)
          // 获取mv地址
          this.mvUrl = response.data.data.url
        })
      } else {
        this.$message.warning('该歌曲暂时没有MV哦')
      }
    },
    // 关闭mv界面
    closeMv () {
      this.showVideo = false
      this.$refs.video.pause()
    },
    // 实时刷新播放音乐进度
    audioInfo () {
      if (this.$refs.audio.currentTime) {
        this.nowTimeOne = this.$refs.audio.currentTime
        this.$refs.schedule.style.width = this.$refs.audio.currentTime / this.nowTime * 100 + '%'
        this.$refs.musicPoint.style.left = this.$refs.songSchedule.clientWidth * this.$refs.audio.currentTime / this.nowTime - 5 + 'px'
        for (let i = 0; i < this.lyrics.length; i++) {
          // 截取时间
          const temp = this.lyrics[i].split(']')
          // 获取时间
          const minute = temp[0].slice(1).split(':')[0]
          const second = temp[0].slice(1).split(':')[1]
          if ((parseInt(second) + parseInt(minute) * 60).toFixed(2) === this.nowTimeOne.toFixed(2)) {
            // 当前的歌词
            this.nowLyrics = temp[1]
          }
        }
      }
    },
    // 获取歌词
    getLyrics () {
      this.axios.get('http://1.117.145.128:5000/lyric?id=' + this.nowId).then(response => {
        // console.log(response.data.lrc.lyric)
        this.lyrics = response.data.lrc.lyric.split('\n')
      })
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

<style lang='scss' scoped>
@import '@/assets/sass/config.scss';
@import '@/assets/sass/responsive.scss';

.music-contain{
  height: 80px;
  width: 100vw;
  background: rgba($color: #fff, $alpha: 0.95);
  backdrop-filter: blur(1px);
  position: fixed;
  display: flex;
  z-index: 8;
  bottom: 0;
  .musicbar {
    width: 100vw;
    height: 100%;
    max-width: 1224px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .song_cover {
      width: 70px;
      height: 70px;
      padding: 5px;
      img{
        width: 60px;
        height: 60px;
      }
    }
    .song-control {
      width: 160px;
      padding: 0 30px;
      height: 100%;
      display: flex;
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
      .pre .next{
        flex-grow: 1;
      }
      .play-pause {
        flex-grow: 2;
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
        span:nth-child(2){
          text-align: center;
          flex-grow: 16;
          color: #7c7c7c;
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
    .song-features {
      width: 260px;
      height: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-right: 5px;
      div {
        width: 50px;
        // padding: 0 10px;
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      img{
        cursor: pointer;
        width: 25px;
        height: 25px;
      }
      .sound{
        z-index: 9;
        width: 25px;
        height: 25px;
        .sound_bar{
          width: 25px;
          height: 100px;
          padding: 10px;
          position: absolute;
          background-color: rgba(255, 255, 255, 0.75);
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.041), 0 3px 5px 0 rgba(0, 0, 0, 0.082);
          border-radius: 25px;
          bottom: 55px;
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
  .music {
    width: 100vw;
    height: 500px;
    max-width: 1224px;
    border: 10px solid #f2f2f2;
    margin: 0 auto;
    background: rgba($color: #f2f2f2, $alpha: 0.9);
    backdrop-filter: blur(3px);
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 80px;
    overflow: hidden;
    display: flex;
    .my_music {
      width: 70%;
      height: 100%;
      margin: 0;
      .music-title {
        height: 60px;
        line-height: 60px;
        font-weight: bolder;
        text-align: center;
        background-color: rgba($color: #f2f2f2, $alpha: 0.9);
        border-bottom: 2px solid #999999;
        margin: 0;
      }
      .my_song_list{
        /* 隐藏滚动条 */
        scrollbar-width: none; /* firefox */
        -ms-overflow-style: none; /* IE 10+ */
        overflow-x: hidden;
        overflow-y: auto;
        width: 100%;
        height: 100%;
        min-height: calc(100% - 70px);
        background-color: rgba($color: #f2f2f2, $alpha: 0.8);
        .my_song_header{
          width: 100%;
          height: 50px;
          background-color: rgba($color: #f7f7f7, $alpha: 0);
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
        .my_song_single:nth-child(even){
          background-color: rgba($color: #fafafa, $alpha: 0.7);
        }
        .my_song_single:nth-child(odd){
          background-color: rgba($color: #f7f7f7, $alpha: 0.7);
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
    }
    .search{
      width: 30%;
      height: 100%;
      max-width: 400px;
      // min-width: 300px;
      padding: 20px 15px 0;
      background-color: rgba($color: #f2f2f2, $alpha: 0.9);
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
          background-color: rgba($color: #f3f3f3, $alpha: 1);
          width: 100%;
          height: 50px;
          padding-left: 50px;
          padding-right: 20px;
          border-radius: 25px;
          border: 2px #999999 solid;
          color: #4d4d4d;
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
        height: calc(100% - 87px);
        width: 100%;
        margin: 30px 0;
        // padding: 10px;
        // background-color: rgba($color: $colorG, $alpha: 0.4);
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
          border-radius: 5px;
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
  }
  // 过渡效果
  .show-enter-active,.show-leave-active{
    transition: linear .3s;
  }
  .show-enter,.show-leave-to{
    height: 0;
    opacity: 0.7;
  }
  .show-enter-to,.show-leave{
    height: 500px;
    opacity: 1;
  }
}
.video_con video {
  position: fixed;
  width: 80vw;
  height: auto;
  max-width: 800px;
  max-height: 546px;
  left: 50%;
  top: 20vh;
  // margin-top: -32vh;
  transform: translateX(-50%);
  z-index: 1000;
}
.video_con .mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
