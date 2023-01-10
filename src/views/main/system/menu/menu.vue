<template>
  <div class="menu-panel">
    <page-content :content-config="contentConfig"></page-content>
  </div>
</template>

<script lang="ts" setup>
import pageContent from '@/components/page/page-content.vue'
import contentConfig from './config/content.config'
</script>

<style scoped lang="less"></style>
