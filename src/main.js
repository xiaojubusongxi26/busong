import Vue from 'vue'
import App from '@/App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

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

Vue.prototype.$qs = qs

Vue.prototype.$axios = axios

/* 动态修改网页标题 */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.use(mavonEditor)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
