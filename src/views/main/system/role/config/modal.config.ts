const modalConfig = {
  pageName: 'role',
  header: {
    createTitle: '新建角色',
    editTitle: '编辑角色'
  },
  formItems: [
    { type: 'input', label: '角色名称', prop: 'name', placeholder: '请输入角色名称' },
    { type: 'input', label: '权限名称', prop: 'intro', placeholder: '请输入权限名称' },
    { type: 'custom', slotName: 'menuList' }
  ]
}

export default modalConfig
