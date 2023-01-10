<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="23px"><component :is="isFold ? 'Expand' : 'Fold'"></component></el-icon>
    </div>
    <div class="content">
      <header-crumb></header-crumb>
      <header-info></header-info>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import headerInfo from './header-cms/header-info.vue'
import headerCrumb from './header-cms/header-crumb.vue'
const isFold = ref<boolean>(false)
const emit = defineEmits(['foldChange'])

const handleMenuIconClick = () => {
  isFold.value = !isFold.value

  // 将折叠状态传递出去
  emit('foldChange', isFold.value)
}
</script>

<style scoped lang="less">
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
