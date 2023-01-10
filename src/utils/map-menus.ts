import type { RouteRecordRaw } from 'vue-router'
function loadLocalRoutes() {
  // 动态添加路由
  const localRoutes: RouteRecordRaw[] = []
  // 读取router/main所有ts文件
  const files: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', {
    eager: true
  })
  // 将全部路由放在localRoutes中
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}

export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  // 加载本地路由
  const localRoutes = loadLocalRoutes()

  // 根据菜单匹配正确的路由
  const routes: RouteRecordRaw[] = []

  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      const route = localRoutes.find((item) => item.path === subMenu.url)
      if (route) {
        // 给route顶层增加菜单重定向
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        routes.push(route)
      }
      // 记录第一个被匹配到的菜单
      if (!firstMenu && route) firstMenu = subMenu
    }
  }
  return routes
}

/*
 * @Description: 根据路径匹配需要显示的菜单
 * @Author: baozi
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        return subMenu
      }
    }
  }
}

interface IBreadcrumb {
  name: string
  path: string
}

export function mapPathToBreadcrumb(path: string, userMenus: any[]) {
  // 定义面包屑
  const breadcrumb: IBreadcrumb[] = []
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        // 顶层菜单
        breadcrumb.push({ name: menu.name, path: menu.url })
        // 匹配菜单
        breadcrumb.push({ name: subMenu.name, path: subMenu.url })
      }
    }
  }
  return breadcrumb
}
// 菜单映射到id列表
export function mapMenuListToIds(menuList: any) {
  const ids: number[] = []

  function recordsGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recordsGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recordsGetId(menuList)

  return ids
}

// 菜单映射permission
export function mapMenusToPermissions(menuList: any[]) {
  const permisssions: string[] = []

  function getPermission(menus: any[]) {
    for (const item of menus) {
      if (item.type === 3) {
        permisssions.push(item.permission)
      } else {
        getPermission(item.children ?? [])
      }
    }
  }
  getPermission(menuList)
  return permisssions
}
