const contentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnName: '新建角色'
  },
  propsList: [
    { type: 'selection', align: 'center', label: '选择', width: '100px' },
    { type: 'index', align: 'center', label: '序号', width: '100px' },
    { type: 'normal', align: 'center', label: '角色名称', prop: 'name', width: '200px' },
    { type: 'normal', align: 'center', label: '角色权限', prop: 'intro', width: '200px' },
    { type: 'timer', align: 'center', label: '创建时间', prop: 'createAt', width: '200px' },
    { type: 'timer', align: 'center', label: '更新时间', prop: 'updateAt', width: '200px' },
    { type: 'handler', align: 'center', label: '操作' }
  ]
}

export default contentConfig
