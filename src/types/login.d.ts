export interface IAccount {
  name: string
  password: string
}

// 可以使用json to ts 网站
export interface IloginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
}
