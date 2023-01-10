const contentConfig = {
  pageName: 'department',
  header: {
    title: '部门列表',
    btnName: '新建部门'
  },
  propsList: [
    // selection / index
    { type: 'selection', align: 'center', label: '选择', width: '80px' },
    { type: 'index', align: 'center', label: '序号', width: '80px' },
    // normal
    { type: 'normal', align: 'center', label: '部门名称', prop: 'name', width: '180px' },
    { type: 'normal', align: 'center', label: '部门领导', prop: 'leader', width: '180px' },
    { type: 'normal', align: 'center', label: '上级部门', prop: 'parentId', width: '180px' },
    // timer
    { type: 'timer', align: 'center', label: '创建时间', prop: 'createAt', width: '200px' },
    { type: 'timer', align: 'center', label: '更新时间', prop: 'updateAt', width: '200px' },
    // handle
    { type: 'handler', align: 'center', label: '操作' }
    // custom
    // { type: 'custom', align: 'center', label: '部门领导自定义', prop: 'leader', slotName: 'leader' },
    // { type: 'custom', align: 'center', label: '上级部门自定义', prop: 'parentId', slotName: 'parent' }
  ]
}

export default contentConfig
