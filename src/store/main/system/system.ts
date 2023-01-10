import {
  postUsersListData,
  deleteUserById,
  createUser,
  editUser,
  postPageListData,
  deletePageById,
  createPageData,
  editPageData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'

interface ISystemState {
  usersList: any[]
  usersTotalCount: number
  pageList: any[]
  pageTotalCount: number
}

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const usersListRes = await postUsersListData(queryInfo)
      const { totalCount, list } = usersListRes.data
      this.usersList = list
      this.usersTotalCount = totalCount
    },
    async deleteUserByIdAction(userid: number) {
      const deleteRes = await deleteUserById(userid)
      console.log(deleteRes)
    },
    async createUserAction(userInfo: any) {
      // 创建新用户
      const createRes = await createUser(userInfo)
      console.log(createRes)
    },
    async editUserAction(userid: number, userInfo: any) {
      // 更新用户数据
      const editRes = await editUser(userid, userInfo)
      console.log(editRes)
    },
    /* 针对页面的数据 */
    async postPageListDataAction(pageName: string, queryInfo: any) {
      const pageListRes = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListRes.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const deleteRes = await deletePageById(pageName, id)
      console.log(deleteRes)
    },
    async createPageDataAction(pageName: string, pageInfo: any) {
      const createRes = await createPageData(pageName, pageInfo)
      console.log(createRes)
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const editRes = await editPageData(pageName, id, pageInfo)
      console.log(editRes)
    }
  }
})

export default useSystemStore
