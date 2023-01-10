<template>
  <div class="main-panel">
    <el-container>
      <el-aside :width="isFold ? '60px' : '210px'">
        <main-menu :isFold="isFold"></main-menu>
      </el-aside>
      <el-container>
        <el-header>
          <main-header @fold-change="handleFoldChange"></main-header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import mainMenu from '@/components/main-menu/main-menu.vue'
import mainHeader from '@/components/main-header/main-header.vue'

// 处理main-header折叠变化
const isFold = ref<boolean>(false)
const handleFoldChange = (flag: boolean) => {
  isFold.value = flag
}
</script>

<style scoped lang="less">
.main-panel {
  height: 100%;
  .el-aside {
    /*重置elside样式*/
    overflow-x: hidden;
    overflow-y: auto;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    &::-webkit-scrollbar {
      display: none;
    }

    transition: width 0.3s ease;
  }
  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
