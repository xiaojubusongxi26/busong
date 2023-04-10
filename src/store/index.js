import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = { // 全局管理的数据存储
  isLogin: '0',
  userInfo: localStorage.getItem('userinfo') ? localStorage.getItem('userinfo') : {
    id: 0,
    username: '王谢棠',
    userTitle: 'Hello 王谢棠',
    userCity: '成都',
    userAvatar: require('@/assets/images/avatar/花.png'),
    userSign: '好久不见',
    userBg: require('@/assets/images/home/755ce8eegy1gjw0am3xs8j21fe2us1ky.png')
  },
  token: localStorage.getItem('token') ? localStorage.getItem('token') : '' // token
}

export default new Vuex.Store({
  state: state,
  mutations: {
    $_setToken (state, value) { // 设置存储token
      state.token = value
      localStorage.setItem('token', value)
    },
    $_removeStorage (state, value) { // 删除token
      localStorage.removeItem('token')
    },
    setUserInfo (state, value) {
      state.userInfo = { ...value, password: '' }
      localStorage.setItem('userinfo', JSON.stringify({ ...value, password: '' }))
    },
    setUserAvatar (state, value) {
      state.userInfo.userAvatar = value
      localStorage.setItem('userinfo', JSON.stringify(state.userInfo))
    },
    setUserBg (state, value) {
      state.userInfo.userBg = value
      sessionStorage.setItem('userinfo', JSON.stringify(state.userInfo))
    },
    updateCountDown (state, value) {
      state.isMask = value
    }
  },
  actions: {
    update_userBg: (context, payload) => {
      context.commit('setUserBg', payload)
    },
    update_userInfo: (context, payload) => {
      context.commit('setUserInfo', payload)
    },
    update_Avatar: (context, payload) => {
      context.commit('setUserAvatar', payload)
    },
    update_CountDown: (context, payload) => {
      context.commit('updateCountDown', payload)
    }
  },
  modules: {
  }
})
