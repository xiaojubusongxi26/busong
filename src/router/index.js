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
    redirect: '/',
    meta: {
      title: '不颂'
    },
    children: [
      {
        path: '/',
        name: 'index',
        component: Index
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
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '不颂'
    },
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// 导航守卫
router.beforeEach(async (to, from, next) => {
  // 从 Cookie 获取 Token
  const hasToken = localStorage.getItem('token')
  if (hasToken !== null) {
    // 判断目标路径是否为login，是则回到该页面
    if (to.name === 'login') next(from.name)
    else {
      next()
    }
  } else {
    if (to.name !== 'login') next({ name: 'login' })
    else {
      next()
    }
  }
  return false
})

export default router
