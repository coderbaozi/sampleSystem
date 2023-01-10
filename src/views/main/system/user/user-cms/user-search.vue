<template>
  <div class="user-search-panel">
    <el-form ref="searchFormRef" :model="searchForm" label-width="80px" size="large">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入查询用户名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="姓名" prop="realname">
            <el-input v-model="searchForm.realname" size="large" placeholder="请输入查询用户真实姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话号码" prop="cellphone">
            <el-input v-model="searchForm.cellphone" placeholder="请输入查询电话号码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select v-model="searchForm.enable" style="width: 100%" placeholder="请选择下拉状态" size="large">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
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
import type { ISearchForm } from '../types/index'
const searchForm = reactive<ISearchForm>({ name: '', realname: '', cellphone: '', enable: '', createAt: '' })

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
.user-search-panel {
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
