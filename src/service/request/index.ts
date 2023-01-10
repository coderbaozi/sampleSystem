import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { powerRequestConfig } from './type'

class Request {
  instance: AxiosInstance

  // 每一个Request实例 => axios的实例
  constructor(config: powerRequestConfig) {
    this.instance = axios.create(config)

    //每个instance实例添加 全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        // 什么情况下会触发这种？
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )

    // 针对特定的Request实例添加拦截器 可选链 可以传入undefined时可以用
    this.instance.interceptors.request.use(config.interceptors?.requestSuccessFn, config.interceptors?.requestFilureFn)
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFilureFn
    )
  }

  //封装网络请求的方法 可增加单次请求增加拦截器
  request<T = any>(config: powerRequestConfig<T>) {
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次成功响应拦截
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: powerRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: powerRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: powerRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: powerRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default Request
