<template>
  <div class="login-view">
    <login-panel></login-panel>
  </div>
</template>

<script lang="ts" setup>
import loginPanel from './login-cms/login-panel.vue'
</script>

<style scoped lang="less">
.login-view {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  // background-image: url('../../assets/img/login-bg.jpg');
}
</style>
