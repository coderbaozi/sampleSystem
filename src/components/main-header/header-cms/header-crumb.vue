<template>
  <div class="header-crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadcrumb" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import useLoginStore from '@/store/login/login'
import { mapPathToBreadcrumb } from '@/utils/map-menus'
import { useRoute } from 'vue-router'

const route = useRoute()
const userMenus = useLoginStore().userMenus
const breadcrumb = computed(() => {
  return mapPathToBreadcrumb(route.path, userMenus)
})
</script>

<style scoped lang="less"></style>
