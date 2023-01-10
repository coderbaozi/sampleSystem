<template>
  <div class="department-panel">
    <page-search
      :search-config="searchConfig"
      @reset-click="handleResetClick"
      @query-click="handleQueryClick"></page-search>
    <page-content
      :content-config="contentConfig"
      @edit-click="handleEditClick"
      @add-click="handleAddClick"
      ref="contentRef">
    </page-content>
    <page-modal :modal-config="modalConfigRef" @confirm-click="refreshPageData" ref="modalRef"></page-modal>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import pageSearch from '@/components/page/page-search.vue'
import pageContent from '@/components/page/page-content.vue'
import pageModal from '@/components/page/page-modal.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import useMainStore from '@/store/main/main'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
// 对modalConfig进行操作
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options?.push(...departments)
    }
  })
  return modalConfig
})
// 点击search，content刷新的操作
const { contentRef, handleQueryClick, handleResetClick, refreshPageData } = usePageContent()

// 处理新增/编辑
const { modalRef, handleAddClick, handleEditClick } = usePageModal()
</script>

<style scoped lang="less"></style>
