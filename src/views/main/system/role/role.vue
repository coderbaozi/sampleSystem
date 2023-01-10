<template>
  <div class="role">
    <page-search
      :search-config="searchConfig"
      @reset-click="handleResetClick"
      @query-click="handleQueryClick"></page-search>
    <page-content
      @edit-click="handleEditClick"
      @add-click="handleAddClick"
      ref="contentRef"
      :content-config="contentConfig"></page-content>
    <page-modal :other-info="otherInfo" :modal-config="modalConfig" @confirm-click="refreshPageData" ref="modalRef">
      <template #menuList>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          highlight-current
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck">
        </el-tree>
      </template>
    </page-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import pageSearch from '@/components/page/page-search.vue'
import pageContent from '@/components/page/page-content.vue'
import pageModal from '@/components/page/page-modal.vue'
import contentConfig from './config/content.config'
import searchConfig from './config/search.config'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'
import type { ElTree } from 'element-plus'
import { mapMenuListToIds } from '@/utils/map-menus'

const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)
const otherInfo = ref({})
const handleElTreeCheck = (data1: any, data2: any) => {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}
// 点击search，content刷新的操作
const { contentRef, handleQueryClick, handleResetClick, refreshPageData } = usePageContent()

// 处理新增/编辑
const { modalRef, handleAddClick, handleEditClick } = usePageModal(editCallback)

// 回显modal权限数据
const treeRef = ref<InstanceType<typeof ElTree>>()
function editCallback(itemData: any) {
  nextTick(() => {
    const menuIds = mapMenuListToIds(itemData.menuList)
    treeRef.value?.setCheckedKeys(menuIds)
  })
}
</script>

<style scoped lang="less"></style>
