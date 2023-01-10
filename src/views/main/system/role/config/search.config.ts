const searchConfig = {
  formItems: [
    {
      type: 'input',
      label: '角色名称',
      prop: 'name',
      placeholder: '请输入查询角色名称',
      defalutValue: ''
    },
    {
      type: 'input',
      label: '权限名称',
      prop: 'intro',
      placeholder: '请输入查询权限名称'
    },
    {
      type: 'date-picker',
      label: '创建时间',
      prop: 'createAt'
    }
  ]
}
export default searchConfig
