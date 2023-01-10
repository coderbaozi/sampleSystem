import requestInstance from '..'

// 获取所有角色
export function getEntireRoles() {
  return requestInstance.post({
    url: '/role/list'
  })
}

// 获取所有部门
export function getEntireDepartments() {
  return requestInstance.post({
    url: '/department/list'
  })
}

// 获取完整菜单
export function getEntireMenus() {
  return requestInstance.post({
    url: '/menu/list'
  })
}
