<template>
  <div>
    <el-form
      ref="formDataRef"
      :rules="accountFromRules"
      :model="accountFormData"
      label-width="68px"
      style="max-width: 460px">
      <el-form-item label="帐号" prop="name">
        <el-input v-model="accountFormData.name" size="large" />
      </el-form-item>
      <el-form-item size="large" prop="password" label="密码">
        <el-input type="password" show-password v-model="accountFormData.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { ElForm, FormRules } from 'element-plus'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { CACHE_NAME, CACHE_PASSWORD } from '@/constant/index'
// 定义表单项数据
const accountFormData = reactive<IAccount>({
  name: localCache.getCatch('name') ?? '',
  password: localCache.getCatch('password') ?? ''
})

// 定义校验规则
const accountFromRules: FormRules = {
  name: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 6, max: 16, message: '用户名必须6-16位字符' }
  ],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
}

// 执行账号的登录逻辑
const formDataRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(rememberPassword: boolean) {
  formDataRef.value?.validate((valid) => {
    if (valid) {
      const name = accountFormData.name
      const password = accountFormData.password
      loginStore.loginAccountAction({ name, password })

      //判断是否需要记住密码
      if (rememberPassword) {
        localCache.setCatch(CACHE_NAME, name)
        localCache.setCatch(CACHE_PASSWORD, password)
      } else {
        localCache.deleteCatch(CACHE_NAME)
        localCache.deleteCatch(CACHE_PASSWORD)
      }
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style scoped lang="less"></style>
