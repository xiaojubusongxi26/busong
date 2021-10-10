import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/home.vue'
import Index from '@/views/index.vue'
import Music from '@/views/music.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/index',
        name: 'index',
        component: Index
      }
    ]
  },
  {
    path: '/music',
    name: 'music',
    component: Music
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
