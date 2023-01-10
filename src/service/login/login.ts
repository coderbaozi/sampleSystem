import requestInstance from '../index'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
export function accountLoginRequest(account: IAccount) {
  return requestInstance.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return requestInstance.get({
    url: `/users/${id}`
    // headers: {
    //   Authorization: 'Bearer ' + localCache.getCatch('login/token')
    // }
  })
}

export function getUserMenuByRoleId(id: number) {
  return requestInstance.get({
    url: `/role/${id}/menu`
  })
}
