import Vue from 'vue'
import App from '@/App.vue'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import bus from '@/utils/eventBus'
// 引入markdown
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// 引入swipper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

// 引入bootstrap
import $ from 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

// 引入elementui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入qs
import qs from 'qs'

// 引入切图插件
import VueCropper from 'vue-cropper'

Vue.prototype.$qs = qs

Vue.prototype.$axios = axios
Vue.prototype.$bus = bus
// 根据前端的跨域方式做调整 /a/b : /api/a/b => /a/b
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 8000 // 延迟时间8秒

Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.use(mavonEditor)
Vue.use(VueCropper)

// 接口错误拦截
axios.interceptors.response.use(function (response) {
  const res = response.data
  const path = location.pathname
  // console.log(response)
  if (res.status === 0 || res.status === 200) {
    return res
  } else if (res.status === 1) {
    /* if (path !== '/index') {
      window.location.href = '/login'
    } */
    ElementUI.Message.error(res.message)
    return Promise.reject(res)
  } else if (res.status === 401) {
    ElementUI.Message.error(res.message)
    window.location.href = '/login'
    return Promise.reject(res)
  }
  return response
}, (error) => {
  const res = error.response
  console.log(error)
  // ElementUI.error(res.data.message)
  return Promise.reject(error)
})

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    // console.log(config)
    if (!config.url.includes('http://localhost:9090')) { return config }
    if (localStorage.getItem('token') && config.url.includes('http://localhost:9090')) {
      config.headers.Authorization = localStorage.getItem('token')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
