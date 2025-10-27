<template>
    <breadCrumb ref="breadcrumb" :item='item'></breadCrumb>
    <div class="table-wrapped">
        <div class="table-top">
            <div class="table-header">
                <div class="left-wrapped">
                    <div class="search-wrapped">
                        <el-input v-model="adminAccount" class="w-50 m-2" style="width: 240px" placeholder="输入账号进行搜索"
                            :prefix-icon="Search" @change='searchUserByAccount()' clearable @clear="clearInput" />
                    </div>
                    <div class="select-wrapped">
                        <el-select v-model="department" placeholder="请选择部门" style="width: 240px" clearable
                            @change="searchForDepartment" @clear="clearOperation">
                            <el-option v-for="item in departmentData" :key="item" :label="item" :value="item" />
                        </el-select>
                    </div>
                </div>
                <div class="button-wrapped">
                    <el-button plain type="primary" @click="banUserList">筛选冻结用户</el-button>
                    <el-button plain type="primary" @click="getFirstPageList">显示全部用户</el-button>
                </div>
            </div>
            <div class="table-content">
                <el-table :data="tableData" style="width: 100%" border @row-dblclick='openUser'>
                    <el-table-column type="index" width="50" />
                    <el-table-column prop="account" label="账号" />
                    <el-table-column prop="name" label="姓名" />
                    <el-table-column prop="sex" label="性别" />
                    <el-table-column prop="department" label="部门" />
                    <el-table-column prop="email" label="邮箱" />
                    <el-table-column prop="status" label="状态">
                        <template #default="{ row }">
                            <div>
                                <el-tag v-if="row.status == '1'" class="ml-2">冻结</el-tag>
                                <el-tag class="ml-2" type="success" v-else>正常</el-tag>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" label="创建时间">
                        <template #default="{ row }">
                            <div>{{ row.create_time?.slice(0, 10) }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="update_time" label="更新时间">
                        <template #default="{ row }">
                            <div>{{ row.update_time?.slice(0, 10) }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template #default="{ row }">
                            <div>
                                <el-button type="primary" @click="banUserById(row.id)"
                                    :disabled='row.status == 1'>冻结</el-button>
                                <el-button type="success" @click="hotUserById(row.id)"
                                    :disabled='row.status == 0'>解冻</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="table-footer">
                <el-pagination :page-size="1" :current-page="paginationData.currentPage" :pager-count="7" :total="1000"
                    :page-count="paginationData.pageCount" @current-change="currentChange" layout="prev, pager, next" />
            </div>
        </div>
    </div>
    <UserInfo ref="User"></UserInfo>

</template>

<script setup lang="ts">
import {
    ref, reactive, onBeforeUnmount,
} from 'vue'
import { Search } from '@element-plus/icons-vue'
import breadCrumb from '../../../components/bread_crumb.vue'
import { getDepartment } from '../../../api/setting'
import {
    searchUser, searchUserByDepartment,
    getAdminListLength, returnListData, getBanList, banUser, hotUser
} from '@/api/userinfo'
import { ElMessage } from 'element-plus'
import { bus } from "../../../utils/mitt"
import UserInfo from '../components/user_info.vue'

const breadcrumb = ref()
const item = ref({
    first: '用户管理',
    second: '用户列表'
})

const tableData = ref()
const fetchUsers = async () => {
    tableData.value = (await returnListData(1, '用户')).data
}
fetchUsers()

const adminAccount = ref<number>()
const department = ref()
const departmentData = ref([])
const fetchDepartment = async () => {
    departmentData.value = (await getDepartment()).data
}
fetchDepartment()

const searchUserByAccount = async () => {
    const res = (await searchUser(adminAccount.value, '用户')).data
    //console.log(res)
    tableData.value = res
}
const clearInput = () => {
    getFirstPageList()
}
const searchForDepartment = async () => {
    const res = (await searchUserByDepartment(department.value)).data
    tableData.value = res
}

const banUserList = async () => {
    const res = (await getBanList()).data
    tableData.value = res
}
const getFirstPageList = async () => {
    const res = (await returnListData(1, '用户')).data
    tableData.value = res
}

const fetchUsersByhotOrban = async () => {
    tableData.value = (await returnListData(paginationData.currentPage, '用户')).data
}
const banUserById = async (id: number) => {
    const res = (await banUser(id)).data
    if (res.status == 0) {
        ElMessage({
            message: '冻结用户成功',
            type: 'success',
        })
        fetchUsersByhotOrban()
        //tableData.value = (await returnListData(paginationData.currentPage, '用户'))
    } else {
        ElMessage.error('冻结用户失败')
    }
}
const hotUserById = async (id: number) => {
    const res = (await hotUser(id)).data
    if (res.status == 0) {
        ElMessage({
            message: '解冻用户成功',
            type: 'success',
        })
        fetchUsersByhotOrban()
        //tableData.value = (await returnListData(paginationData.currentPage, '用户'))
    } else {
        ElMessage.error('解冻用户失败')
    }
}


const paginationData = reactive({
    // 总页数
    pageCount: 1,
    // 当前所处页数
    currentPage: 1,
})
const adminTotal = ref<number>(0)
const returnUserListLength = async () => {
    const res = (await getAdminListLength('用户')).data
    //console.log(res)
    adminTotal.value = res.length
    paginationData.pageCount = Math.ceil(res.length / 10)
}
returnUserListLength()

const currentChange = async (value: number) => {
    paginationData.currentPage = value
    tableData.value = (await returnListData(paginationData.currentPage, '用户')).data
}

const User = ref()
const openUser = (row: any) => {
    bus.emit('userId', row)
    User.value.open()
}

bus.on('offDialog', async (id: number) => {
    const current = paginationData.currentPage
    if (id) {
        tableData.value = (await returnListData(paginationData.currentPage, '用户')).data
        if (tableData.value.length == 0) {
            paginationData.currentPage = current - 1
            returnAdminListLength()
        }
    }
})


</script>

<style lang="scss" scoped></style>