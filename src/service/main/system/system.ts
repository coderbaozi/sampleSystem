/* 用户模块的网络请求 */

import requestInstance from '@/service'

export function postUsersListData(queryInfo: any) {
  return requestInstance.post({
    url: '/users/list',
    data: queryInfo
  })
}

export function deleteUserById(userId: number) {
  return requestInstance.delete({
    url: `/users/${userId}`
  })
}

export function createUser(userInfo: any) {
  return requestInstance.post({
    url: '/users',
    data: userInfo
  })
}

export function editUser(userId: number, userInfo: any) {
  return requestInstance.patch({
    url: `/users/${userId}`,
    data: userInfo
  })
}

/* 封装页面的网络请求 */
export function postPageListData(pageName: string, queryInfo: any) {
  return requestInstance.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}

export function deletePageById(pageName: string, id: number) {
  return requestInstance.delete({
    url: `/${pageName}/${id}`
  })
}

export function createPageData(pageName: string, dataInfo: any) {
  return requestInstance.post({
    url: `/${pageName}`,
    data: dataInfo
  })
}

export function editPageData(pageName: string, id: number, pageInfo: any) {
  return requestInstance.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo
  })
}
