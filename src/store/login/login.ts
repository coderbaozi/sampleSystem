import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenuByRoleId } from '@/service/login/login'
import type { IAccount, IloginState } from '@/types'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN, LOGIN_USERINFO, LOGIN_USERMENUS } from '@/constant'
import router from '@/router'
import type { RouteRecordRaw } from 'vue-router'
import useMainStore from '../main/main'
import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/map-menus'
const useLoginStore = defineStore('login', {
  state: (): IloginState => ({
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginRes = await accountLoginRequest(account)
      const id = loginRes.data.id
      this.token = loginRes.data.token
      const username = loginRes.data.name
      localCache.setCatch(LOGIN_TOKEN, this.token)
      // 获取用户角色信息 roles
      const userInfoRes = await getUserInfoById(id)
      this.userInfo = userInfoRes.data

      // 根据用户角色获取用户权限(menus)
      const userMenusRes = await getUserMenuByRoleId(this.userInfo.role.id)
      this.userMenus = userMenusRes.data

      // 本地缓存
      localCache.setCatch(LOGIN_USERINFO, this.userInfo)
      localCache.setCatch(LOGIN_USERMENUS, this.userMenus)

      // 请求所有roles、department数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // 获取登录用户的所有按钮的权限
      const permissions = mapMenusToPermissions(this.userMenus)
      this.permissions = permissions

      // 动态添加路由
      const routes = mapMenusToRoutes(this.userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      // 登录成功页面跳转
      router.push('/main')
    },
    loadLocalCacheAction() {
      // 用户刷新加载数据
      const token = localCache.getCatch(LOGIN_TOKEN)
      const userInfo = localCache.getCatch(LOGIN_USERINFO)
      const userMenus = localCache.getCatch(LOGIN_USERMENUS)
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 刷新重新请求所有roles、department数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        // 获取按钮权限
        const permissions = mapMenusToPermissions(this.userMenus)
        this.permissions = permissions
        // 动态添加路由
        const routes = mapMenusToRoutes(this.userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
