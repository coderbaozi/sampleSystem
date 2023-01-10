<template>
  <div class="search-panel">
    <el-form ref="searchFormRef" :model="searchForm" label-width="80px" size="large">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder"></el-input>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  unlink-panels
                  range-separator="<>"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  size="large" />
              </template>
              <template v-if="item.type === 'select'">
                <el-select style="width: 100%" v-model="searchForm[item.prop]" :placeholder="item.placeholder">
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value"></el-option>
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
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

// ts中定义prop
interface IProps {
  searchConfig: {
    formItems: any[]
  }
}
const props = defineProps<IProps>()

// 定义form的数据
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.defaultValue ?? ''
}
const searchForm = reactive(initialForm)

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
