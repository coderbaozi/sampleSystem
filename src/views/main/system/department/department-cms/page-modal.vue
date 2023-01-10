<template>
  <div class="page-modal">
    <el-dialog v-model="dialogVisible" :title="isCreate ? '新建部门' : '编辑部门'" width="30%" center>
      <span>
        <el-form :model="formData" label-width="80px">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入部门名称" />
          </el-form-item>
          <el-form-item label="上级部门" prop="departmentId">
            <el-select style="width: 100%" v-model="formData.parentId" placeholder="请选择部门">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="领导名称" prop="leader">
            <el-input v-model="formData.leader" placeholder="请输入部门名称" />
          </el-form-item>
        </el-form>
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button>取消</el-button>
          <el-button @click="handleConfirmClick" type="primary">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'

// 表单对应数据
const formData = reactive<any>({})
const itemId = ref()
// 获取全部department数据
const mainStore = useMainStore()
const { entireDepartments } = storeToRefs(mainStore)

// 定义dialog的显示
const dialogVisible = ref(false)

const isCreate = ref(true)
// 定义设置dialogVisible的方法
const setModalVisible = (itemData?: any) => {
  dialogVisible.value = true
  if (itemData) {
    //编辑数据
    itemId.value = itemData.id
    isCreate.value = false
    for (const key in formData) {
      formData[key] = itemData[key]
    }
  } else {
    //新建数据
    for (const key in formData) {
      formData[key] = ''
    }
  }
}
defineExpose({ setModalVisible })
// 暴露表单提交事件
const emit = defineEmits(['confirmClick'])
// 确定新增用户表单提交
const systemStore = useSystemStore()
// 处理点击确定按钮
const handleConfirmClick = async () => {
  if (isCreate.value) {
    // 新增用户点击
    await systemStore.createPageDataAction('department', formData)
  } else {
    // 编辑用户点击,防止先刷新数据然后刷新
    await systemStore.editPageDataAction('department', itemId.value, formData)
  }
  // 刷新数据操作
  emit('confirmClick')
  dialogVisible.value = false
}
</script>

<style scoped lang="less"></style>
