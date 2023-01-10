/// <reference types="vite/client" />

// 配置vue文件模板
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module '*.mjs'
