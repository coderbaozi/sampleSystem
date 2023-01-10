<template>
  <div class="system-user-panel">
    <user-serach @reset-click="handleClickReset" @query-click="handleClickQuery"></user-serach>
    <user-content
      @edit-user-click="handleEditUserClick"
      @add-user-click="handleAddUserClick"
      ref="userFormRef"></user-content>
    <user-modal @confirm-click="refreshContentData" ref="userModalRef"></user-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import userSerach from './user-cms/user-search.vue'
import userContent from './user-cms/user-content.vue'
import userModal from './user-cms/user-modal.vue'
const userFormRef = ref<InstanceType<typeof userContent>>()
const handleClickQuery = (searchForm: any) => {
  userFormRef.value?.fetchUserListData(searchForm)
}
const handleClickReset = () => {
  userFormRef.value?.fetchUserListData()
}

// 新增用户点击，打开modal
const userModalRef = ref<InstanceType<typeof userModal>>()
const handleAddUserClick = () => {
  userModalRef.value?.setModalVisible()
}
// 处理编辑用户
const handleEditUserClick = (user: any) => {
  userModalRef.value?.setModalVisible(user)
}
// 点击确定，刷新数据,还在当前位置
const refreshContentData = () => {
  userFormRef.value?.fetchUserListData()
}
</script>

<style scoped lang="less">
.system-user-panel {
  overflow: hidden;
  border-radius: 6px;
}
</style>
