<template>
  <div class="user-modal">
    <el-dialog v-model="dialogVisible" :title="isCreateUser ? '新建用户' : '编辑用户'" width="30%" center>
      <span>
        <el-form :model="formData" label-width="80px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="formData.realname" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item v-if="isCreateUser" label="密码" prop="password">
            <el-input v-model="formData.password" show-password placeholder="请输入登录密码"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="cellphone">
            <el-input v-model="formData.cellphone" placeholder="请输入电话号码"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="roleId">
            <el-select style="width: 100%" v-model="formData.roleId" placeholder="请选择角色">
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="部门" prop="departmentId">
            <el-select style="width: 100%" v-model="formData.departmentId" placeholder="请选择部门">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
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
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'

// 表单对应数据
const formData = reactive<any>({ name: '', realname: '', password: '', cellphone: '', roleId: '', departmentId: '' })
const userId = ref()
// 获取roles和department数据
const mainStore = useMainStore()
const { entireRoles, entireDepartments } = storeToRefs(mainStore)

// 定义dialog的显示
const dialogVisible = ref(false)

const isCreateUser = ref(true)
// 定义设置dialogVisible的方法
const setModalVisible = (user?: any) => {
  dialogVisible.value = true
  if (user) {
    //编辑数据
    userId.value = user.id
    isCreateUser.value = false
    for (const key in formData) {
      formData[key] = user[key]
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
  if (isCreateUser.value) {
    // 新增用户点击
    await systemStore.createUserAction(formData)
  } else {
    // 编辑用户点击,防止先刷新数据然后刷新
    await systemStore.editUserAction(userId.value, formData)
  }
  // 刷新数据操作 ,接口问题？修改后查询用户列表没有改变
  emit('confirmClick')
  dialogVisible.value = false
}
</script>

<style scoped lang="less"></style>
