<template>
  <div class="content-panel">
    <div class="content-header">
      <h3 class="header-title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <el-button v-if="createPermission" type="primary" @click="handleAddClick">{{
        contentConfig?.header?.btnName ?? '新建数据'
      }}</el-button>
    </div>
    <div class="user-table-panel">
      <el-table :data="pageList" row-key="id">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column v-bind="item">
              <template #default="scope">
                <el-button v-if="updatePermission" text @click="handleEditClick(scope.row)" type="primary" icon="Edit"
                  >编辑</el-button
                >
                <el-button
                  v-if="deletePermission"
                  @click="handleDeleteData(scope.row.id)"
                  text
                  type="danger"
                  icon="Delete"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column v-bind="item">
              <template #default="scope" :prop="item.prop">
                <slot :name="item.slotName" v-bind="scope"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column v-bind="item"></el-table-column>
          </template>
        </template>
        <!-- <el-table-column align="center" type="selection" width="50px"></el-table-column>

        <el-table-column align="left" prop="name" label="部门名称" width="120px"></el-table-column>
        <el-table-column align="left" prop="leader" label="部门领导" width="120px"></el-table-column>
        <el-table-column align="center" prop="parentId" label="上级部门" width="150px"></el-table-column> -->
        <!-- <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div class="user-footer-panel">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
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
import usePermissions from '@/hooks/usePermissions'
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title: string
      btnName: string
    }
    propsList: any[]
  }
}
const props = defineProps<IProps>()
// 发起请求获取pageList存入store

// 获取PageList数据。进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)
// 判断用户是否有增删改查权限
const createPermission = usePermissions(`${props.contentConfig.pageName}:create`)
const deletePermission = usePermissions(`${props.contentConfig.pageName}:delete`)
const updatePermission = usePermissions(`${props.contentConfig.pageName}:update`)
const queryPermission = usePermissions(`${props.contentConfig.pageName}:query`)
// 页码逻辑
fetchPageListData()
function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}
// 定义函数用于发送网络请求
function fetchPageListData(searchForm: any = {}) {
  if (!queryPermission) {
    return
  }
  // 获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { size, offset }
  const queryInfo = { ...info, ...searchForm }
  systemStore.postPageListDataAction(props.contentConfig.pageName, queryInfo)
}
defineExpose({
  fetchPageListData
})

// 处理删除逻辑
function handleDeleteData(id: number) {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
  // 删除后重新请求数据
  fetchPageListData()
}

// 将新增事件暴露
const emit = defineEmits(['addClick', 'editClick'])
const handleAddClick = () => {
  emit('addClick')
}
// 编辑用户
function handleEditClick(itemData: any) {
  emit('editClick', itemData)
}
</script>

<style scoped lang="less">
.content-panel {
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
