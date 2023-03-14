import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue'),
    redirect: '/',
    meta: {
      title: '不颂'
    },
    children: [
      {
        path: '/',
        name: 'index',
        component: () => import('@/views/index.vue')
      },
      {
        path: '/drawer',
        name: 'drawer',
        component: () => import('@/views/drawer.vue'),
        meta: {
          title: '收藏'
        }
      },
      {
        path: '/topic',
        name: 'topic',
        component: () => import('@/views/topic.vue'),
        meta: {
          title: '话题'
        }
      },
      {
        path: '/timeTree',
        name: 'timeTree',
        component: () => import('@/views/timeTree.vue'),
        meta: {
          title: '时间树'
        }
      },
      {
        path: '/music',
        name: 'music',
        component: () => import('@/views/music.vue'),
        meta: {
          title: '来听听音乐吧~'
        }
      },
      {
        path: '/task',
        name: 'task',
        component: () => import('@/views/task.vue'),
        meta: {
          title: '历程'
        }
      },
      {
        path: '/notes',
        name: 'notes',
        component: () => import('@/views/notes.vue'),
        meta: {
          title: '文档'
        }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user.vue'),
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
    component: () => import('@/views/login/login.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// 导航守卫
/* router.beforeEach(async (to, from, next) => {
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
}) */

export default router
