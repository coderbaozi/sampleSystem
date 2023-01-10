<template>
  <div class="search-panel">
    <el-form ref="searchFormRef" :model="searchForm" label-width="80px" size="large">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入查询部门名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="searchForm.leader" size="large" placeholder="请输入查询部门领导"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              unlink-panels
              range-separator="<>"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              size="large" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="search-btn">
      <el-button icon="Refresh" @click="handleCilckReset">重置</el-button>
      <el-button icon="Search" type="primary" @click="handleClickQuery">查询</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { ElForm } from 'element-plus'
const searchForm = reactive({ name: '', leader: '', createAt: '' })

// 将reset和query暴露出去
const emit = defineEmits(['resetClick', 'queryClick'])

// 重置form表单
const searchFormRef = ref<InstanceType<typeof ElForm>>()
const handleCilckReset = () => {
  searchFormRef.value?.resetFields()
  emit('resetClick')
}

// 根据form表单查询
const handleClickQuery = () => {
  emit('queryClick', searchForm)
}
</script>

<style scoped lang="less">
.search-panel {
  background-color: #fff;
  padding: 20px 40px;
  .el-form-item {
    padding: 8px;
  }
  .search-btn {
    text-align: right;
    margin-right: 68px;
  }
}
</style>
