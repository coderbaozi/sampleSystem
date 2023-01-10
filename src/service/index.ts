import { BASE_URL, TIME_OUT } from './config'
import Request from './request'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/constant'
const requestInstance = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      /* 这里的函数好像会执行两次的bug */
      const token = localCache.getCatch(LOGIN_TOKEN)
      if (config.headers && token) {
        config.headers = {
          Authorization: 'Bearer ' + localCache.getCatch(LOGIN_TOKEN)
        }
      }
      return config
    },
    requestFilureFn: (err) => {
      return err
    },
    responseSuccessFn: (res) => {
      return res
    },
    responseFilureFn: (err) => {
      return err
    }
  }
})

export default requestInstance
