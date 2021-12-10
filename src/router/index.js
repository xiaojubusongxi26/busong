import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/home.vue'
import Index from '@/views/index.vue'
import Music from '@/views/music.vue'
import Task from '@/views/task.vue'
import Notes from '@/views/notes.vue'
import User from '@/views/user.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '小橘不颂兮'
    },
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
    component: Music,
    meta: {
      title: '来听听音乐吧~'
    }
  },
  {
    path: '/task',
    name: 'task',
    component: Task,
    meta: {
      title: '历程'
    }
  },
  {
    path: '/notes',
    name: 'notes',
    component: Notes,
    meta: {
      title: '笔记'
    }
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    meta: {
      title: '个人信息'
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
