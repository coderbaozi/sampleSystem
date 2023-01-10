import { LOGIN_TOKEN } from '@/constant'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/Main.vue')
    },
    {
      path: '/:pathMatch(.*)', //not found
      component: () => import('../views/notFound/404.vue')
    }
  ]
})

// 用户进行刷新：判断用户是否登录以及是否包含userMenu菜单
router.beforeEach((to) => {
  // 只有登录成功才能进入main
  const token = localCache.getCatch(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login' // 没有登录，让他登录
  }
  // 如果进入到main
  if (to.path === '/main') {
    return firstMenu?.url
  }
})

// 动态添加路由

//导航守卫 to:跳转到的位置 from:从哪里跳转过来
// 返回值： 不返回或者返回undefined会默认跳转
// router.beforeEach((to, from) => {})

export default router
