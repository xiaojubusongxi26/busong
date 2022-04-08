import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = { // 全局管理的数据存储
  isLogin: '0',
  userInfo: sessionStorage.getItem('userinfo') ? sessionStorage.getItem('userinfo') : {
    id: 0,
    username: '',
    userTitle: '',
    userCity: '',
    userAvatar: '',
    userSign: '',
    userBg: null
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
      state.userInfo = { ...value.data, password: '', userAvatar: '' }
      sessionStorage.setItem('userinfo', JSON.stringify({ ...value.data, password: '' }))
    },
    setUserAvatar (state, value) {
      state.userInfo.userAvatar = value
      sessionStorage.setItem('userinfo', JSON.stringify(state.userInfo))
    },
    setUserBg (state, value) {
      state.userInfo.userBg = value
      sessionStorage.setItem('userinfo', JSON.stringify(state.userInfo))
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
    }
  },
  modules: {
  }
})
