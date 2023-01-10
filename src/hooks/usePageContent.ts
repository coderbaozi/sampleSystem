import { ref } from 'vue'
import type pageContent from '@/components/page/page-content.vue'
function usePageContent() {
  // 点击search，content数据刷新的操作
  const contentRef = ref<InstanceType<typeof pageContent>>()

  const handleQueryClick = (queryInfo: any) => {
    contentRef.value?.fetchPageListData(queryInfo)
  }
  const handleResetClick = () => {
    contentRef.value?.fetchPageListData()
  }
  const refreshPageData = () => {
    contentRef.value?.fetchPageListData()
  }
  return {
    contentRef,
    handleQueryClick,
    handleResetClick,
    refreshPageData
  }
}

export default usePageContent
