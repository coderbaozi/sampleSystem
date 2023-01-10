<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isCreate ? modalConfig.header.createTitle : modalConfig.header.editTitle"
      width="30%"
      center>
      <span>
        <el-form :model="formData" label-width="80px">
          <template v-for="item in props.modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder"></el-input>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="daterange"
                  unlink-panels
                  range-separator="<>"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  size="large" />
              </template>
              <template v-if="item.type === 'select'">
                <el-select style="width: 100%" v-model="formData[item.prop]" :placeholder="item.placeholder">
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value"></el-option>
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
        </el-form>
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button>取消</el-button>
          <el-button @click="handleConfirmClick" type="primary">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import useSystemStore from '@/store/main/system/system'
// 定义props
interface IProps {
  modalConfig: {
    pageName: string
    header: {
      createTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
}
const props = defineProps<IProps>()

// 定义内部的属性
const initialData: any = {}
for (const item of props.modalConfig.formItems) {
  initialData[item.prop] = ''
}

// 表单对应数据
const formData = reactive<any>(initialData)
const itemId = ref()

// 定义dialog的显示
const dialogVisible = ref(false)

const isCreate = ref(true)
// 定义设置dialogVisible的方法
const setModalVisible = (itemData?: any) => {
  dialogVisible.value = true
  if (itemData) {
    //编辑数据
    itemId.value = itemData.id
    isCreate.value = false
    for (const key in formData) {
      formData[key] = itemData[key]
    }
  } else {
    //新建数据
    for (const key in formData) {
      const item = props.modalConfig.formItems.find((item) => item.prop == key)
      formData[key] = item?.defaultValue ?? ''
    }
  }
}
defineExpose({ setModalVisible })
// 暴露表单提交事件
const emit = defineEmits(['confirmClick'])
// 确定新增用户表单提交
const systemStore = useSystemStore()
// 处理点击确定按钮
const handleConfirmClick = async () => {
  let infoData = formData
  if (props.otherInfo) {
    infoData = { ...props.otherInfo, ...formData }
  }
  if (isCreate.value) {
    // 新增用户点击
    await systemStore.createPageDataAction(props.modalConfig.pageName, infoData)
  } else {
    // 编辑用户点击,防止先刷新数据然后刷新
    await systemStore.editPageDataAction(props.modalConfig.pageName, itemId.value, infoData)
  }
  // 刷新数据操作
  emit('confirmClick')
  dialogVisible.value = false
}
</script>

<style scoped lang="less"></style>
