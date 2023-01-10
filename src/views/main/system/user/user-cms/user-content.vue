<template>
  <div class="user-content-panel">
    <div class="content-header">
      <h3 class="header-title">用户列表</h3>
      <el-button type="primary" @click="handleAddUserClick">新增用户</el-button>
    </div>
    <div class="user-table-panel">
      <el-table :data="usersList">
        <el-table-column align="center" type="selection" width="50px"></el-table-column>
        <el-table-column align="center" type="index" label="序号" width="60px"></el-table-column>
        <el-table-column align="left" prop="name" label="用户名" width="120px"></el-table-column>
        <el-table-column align="left" prop="realname" label="真实姓名" width="120px"></el-table-column>
        <el-table-column align="center" prop="cellphone" label="手机号码" width="150px"></el-table-column>
        <el-table-column align="center" prop="enable" label="状态" width="90px">
          <template #default="scope">
            <el-button :type="scope.row.enable ? 'primary' : 'danger'" plain>{{
              scope.row.enable ? '启用' : '禁用'
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button text @click="handleEditClick(scope.row)" type="primary" icon="Edit">编辑</el-button>
            <el-button @click="handleDeleteData(scope.row.id)" text type="danger" icon="Delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="user-footer-panel">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
// 发起请求获取usersList存入store
fetchUserListData()

// 获取userList数据。进行展示
const { usersList, usersTotalCount } = storeToRefs(systemStore)

// 页码逻辑

function handleSizeChange() {
  fetchUserListData()
}
function handleCurrentChange() {
  fetchUserListData()
}
// 定义函数用于发送网络请求
function fetchUserListData(searchForm: any = {}) {
  // 获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { size, offset }
  const queryInfo = { ...info, ...searchForm }
  systemStore.postUsersListAction(queryInfo)
}
defineExpose({
  fetchUserListData
})

// 处理删除逻辑
function handleDeleteData(id: number) {
  systemStore.deleteUserByIdAction(id)
  // 删除后重新请求数据
  fetchUserListData()
}

// 将新增用户事件暴露
const emit = defineEmits(['addUserClick', 'editUserClick'])
const handleAddUserClick = () => {
  emit('addUserClick')
}
// 编辑用户
function handleEditClick(user: any) {
  emit('editUserClick', user)
}
</script>

<style scoped lang="less">
.user-content-panel {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #fff;
  .content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
  }
  .user-footer-panel {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }
}
</style>
