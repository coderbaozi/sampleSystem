import { getEntireDepartments, getEntireRoles, getEntireMenus } from '@/service/main/main'
import { defineStore } from 'pinia'

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
  entireMenus: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => {
    return {
      entireRoles: [],
      entireDepartments: [],
      entireMenus: []
    }
  },
  actions: {
    async fetchEntireDataAction() {
      const rolesRes = await getEntireRoles()
      const departmentRes = await getEntireDepartments()
      const menusRes = await getEntireMenus()
      this.entireMenus = menusRes.data.list
      this.entireRoles = rolesRes.data.list
      this.entireDepartments = departmentRes.data.list
    }
  }
})

export default useMainStore
