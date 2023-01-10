const contentConfig = {
  pageName: 'menu',
  header: {
    title: '菜单列表',
    btnName: '新建菜单'
  },
  propsList: [
    { align: 'center', label: '菜单名称', prop: 'name', width: '120px' },
    { align: 'center', label: '级别', prop: 'type', width: '120px' },
    { align: 'center', label: '菜单url', prop: 'url', width: '200px' },
    { align: 'center', label: '菜单icon', prop: 'icon', width: '200px' },
    { align: 'center', label: '排序', prop: 'sort', width: '120px' },
    { align: 'center', label: '权限', prop: 'permission', width: '120px' },
    { type: 'timer', align: 'center', label: '创建时间', prop: 'createAt', width: '180px' },
    { type: 'timer', align: 'center', label: '更新时间', prop: 'updateAt', width: '180px' },
    { type: 'handler', align: 'center', label: '操作' }
  ]
}

export default contentConfig
