import { ref } from 'vue'
import type pageModal from '@/components/page/page-modal.vue'
type EditFnType = (data: any) => void
function usePageModal(editCallback?: EditFnType) {
  const modalRef = ref<InstanceType<typeof pageModal>>()
  const handleEditClick = (itemData: any) => {
    modalRef.value?.setModalVisible(itemData)
    if (editCallback) {
      editCallback(itemData)
    }
  }
  const handleAddClick = () => {
    modalRef.value?.setModalVisible()
  }
  return {
    modalRef,
    handleEditClick,
    handleAddClick
  }
}

export default usePageModal
