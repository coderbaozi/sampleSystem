import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 针对于AxiosRequestConfig配置进行扩展 此处泛型用于单独拦截回调
export interface powerInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestFilureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFilureFn?: (err: any) => any
}

export interface powerRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: powerInterceptors<T>
}
