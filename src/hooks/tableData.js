import { searchUser, getAdminListLength, returnListData } from '../api/userinfo'
import { ref, reactive, watch } from "vue"
import { bus } from '../utils/mitt'

export const useTable = (identity) => {
  // 分页数据
  const paginationData = reactive({
    // 总页数
    pageCount: 1,
    // 当前所处页数
    currentPage: 1,
  })
  
  // 总的管理员人数
  const adminTotal = ref(0)
  // 搜索框的modelValue
  const adminAccount = ref()
  // 表格内容
  const tableData = ref([])

  // 返回管理员列表长度
  const returnAdminListLength = async () => {
    const res = (await getAdminListLength(identity)).data
    adminTotal.value = res.length
    paginationData.pageCount = Math.ceil(res.length / 10)
  }
  
  // 获取第一页的数据
  const getFirstPageList = async () => {
    tableData.value = (await returnListData(1, identity)).data
  }
  
  // 监听换页
  const currentChange = async (value) => {
    paginationData.currentPage = value
    tableData.value = (await returnListData(paginationData.currentPage, identity)).data
  }
  
  // 通过账号搜索管理员
  const searchAdmin = async () => {
    tableData.value = (await searchUser(adminAccount.value, identity)).data
  }
  
  // 当搜索内容清空后,返回当前页面的数据
  const clearInput = async () => {
    tableData.value = (await returnListData(paginationData.currentPage, identity)).data
  }

  // 监听事件总线中的管理员对话框关闭事件
  bus.on('adminDialogOff', async (id) => {
    // 当前页数
    const current = paginationData.currentPage
    
    // 1为创建管理员
    if (id == 1) {
      await getFirstPageList()
    }
    // 2为编辑管理员
    if (id == 2) {
      tableData.value = (await returnListData(paginationData.currentPage, identity)).data
    }
    // 3为对管理员进行降职
    if (id == 3) {
      tableData.value = (await returnListData(paginationData.currentPage, identity)).data
      if (tableData.value.length == 0) {
        paginationData.currentPage = current - 1
        await returnAdminListLength()
      }
    }
  })
  
  // 监听分页数据变化
  watch(
    paginationData,
    () => {
      returnAdminListLength()
      getFirstPageList()
    },
    { immediate: true, deep: true }
  )
  
  // 监听当前页码变化
  watch(
    () => paginationData.currentPage,
    () => {
      currentChange(paginationData.currentPage)
    },
    { immediate: true, deep: true }
  )
  
  // 监听管理员总数变化
  watch(
    adminTotal,
    () => {
      returnAdminListLength()
    },
    { immediate: true, deep: true }
  )
  
  return {
    adminAccount,
    paginationData,
    adminTotal,
    tableData,
    currentChange,
    searchAdmin,
    clearInput
  }
}