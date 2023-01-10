<template>
  <div class="login-panel">
    <!-- title -->
    <h2 class="login-title">后台管理</h2>

    <!-- tabs -->
    <el-tabs v-model="activeTabName" type="border-card" stretch>
      <!-- 账号登录 -->
      <el-tab-pane name="account">
        <template #label>
          <el-icon><UserFilled /></el-icon>
          <span>账号登录</span>
        </template>
        <account-panel ref="accountInstance"></account-panel>
      </el-tab-pane>

      <!-- 手机登录 -->
      <el-tab-pane name="phone">
        <template #label>
          <el-icon><Iphone /></el-icon>
          <span>手机登录</span>
        </template>
        <phone-panel></phone-panel>
      </el-tab-pane>
    </el-tabs>

    <!-- 按钮 -->
    <div class="login-btn">
      <el-checkbox v-model="rememberPassword" label="记住密码" size="large" />
      <el-link href="" type="primary">忘记密码</el-link>
    </div>

    <el-button class="login-now-btn" type="primary" @click="handleLogin">立即登录</el-button>
  </div>
</template>

<script lang="ts" setup>
import { localCache } from '@/utils/cache'
import { ref, watch } from 'vue'
import accountPanel from './account-panel.vue'
import phonePanel from './phone-panel.vue'
import { REMEMBER_PASSWORD } from '@/constant/index'
const rememberPassword = ref<boolean>(localCache.getCatch(REMEMBER_PASSWORD ?? false))
const activeTabName = ref<string>('account')

watch(rememberPassword, (newValue) => {
  localCache.setCatch(REMEMBER_PASSWORD, newValue)
})

const accountInstance = ref()
const handleLogin = () => {
  accountInstance.value.loginAction(rememberPassword.value)
}
</script>

<style scoped lang="less">
.login-panel {
  width: 350px;
  background-color: #fff;
  text-align: center;
  .login-title {
    padding: 10px;
  }
  .login-btn {
    display: flex;
    justify-content: space-around;
  }
  .login-now-btn {
    width: 99%;
    height: 36px;
  }
}
</style>
