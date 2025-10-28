<template>
    <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
    <div class="table-wrapped">
        <div class="table-top">
            <div class="table-header">
                <div class="search-wrapped">
                    <el-input class="w-50 m-2" v-model="adminAccount" size="large" placeholder="输入账号进行搜索"
                        :prefix-icon="Search" @change='searchAdmin()' clearable @clear="clearInput" />
                </div>
                <div class="button-wrapped">
                    <el-button type="primary" @click="openCreate(2)">添加消息管理员</el-button>
                </div>
            </div>
            <div class="table-content">
                <el-table :data="tableData" style="width: 100%" border>
                    <el-table-column type="index" width="50" />
                    <el-table-column prop="account" label="账号" />
                    <el-table-column prop="name" label="姓名" />
                    <el-table-column prop="sex" label="性别" />
                    <el-table-column prop="department" label="部门" />
                    <el-table-column prop="email" label="邮箱" />
                    <el-table-column prop="update_time" label="更新时间">
                        <template #default="{ row }">
                            <div>{{ row.update_time?.slice(0, 10) }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template #default="{ row }">
                            <div>
                                <el-button type="success" @click="openEdit(row.id)">编辑</el-button>
                                <el-button type="danger" @click="downEdit(row.id)">删除</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="table-footer">
            <el-pagination :page-size="20" :current-page="paginationData.currentPage" :pager-count="7" :total="1000"
                :page-count="paginationData.pageCount" @current-change="currentChange" layout="prev, pager, next" />
        </div>
    </div>
    <CreateAdmin ref="Create"></CreateAdmin>
    <editAdmin ref="Edit"></editAdmin>
    <DownAdmin ref="Delete"></DownAdmin>
</template>

<script setup lang="ts">
import breadCrumb from '../../../components/bread_crumb.vue'
import { ref, reactive } from 'vue';

import { searchUser, getAdminListLength, returnListData } from '../../../api/userinfo';

import CreateAdmin from '../components/create_admin.vue'
import editAdmin from '../components/edit_admin.vue'
import DownAdmin from '../components/down_admin.vue'
import { bus } from "../../../utils/mitt"

const breadcrumb = ref()
const item = ref({
    first: '用户管理',
    second: '消息管理员'
})

const tableData = ref([
    {
        id: 1
    }
])

const Create = ref()
const openCreate = (id: number) => {
    bus.emit('createId', id)
    Create.value.open()
}

const Edit = ref()
const openEdit = (id: number) => {
    bus.emit('EditId', id)
    Edit.value.open()
}

const Delete = ref()
const downEdit = (id: number) => {
    bus.emit('downAdmin', id)
    Delete.value.open()
}

const adminAccount = ref<number>()
const searchAdmin = async () => {
    tableData.value = (await searchUser(adminAccount.value, '消息管理员')).data
}
const clearInput = () => {
    getFirstPageList()
}

const paginationData = reactive({
    // 总页数
    pageCount: 1,
    // 当前所处页数
    currentPage: 1,
})
const adminTotal = ref<number>()
const returnAdminListLength = async () => {
    const res = (await getAdminListLength('消息管理员')).data
    adminTotal.value = res.length
    paginationData.pageCount = Math.ceil(res.length / 10)
}
returnAdminListLength()

const getFirstPageList = async () => {
    tableData.value = (await returnListData(1, '消息管理员')).data
}
getFirstPageList()

const currentChange = async (value: number) => {
    paginationData.currentPage = value
    tableData.value = (await returnListData(paginationData.currentPage, '消息管理员')).data
}

bus.on('adminDialogOff', async (id: number) => {
    const current = paginationData.currentPage
    if (id == 1) {
        getFirstPageList()
    }
    if (id == 2) {
        tableData.value = (await returnListData(paginationData.currentPage, '消息管理员')).data
    }
    if (id == 3) {
        tableData.value = (await returnListData(paginationData.currentPage, '消息管理员')).data
        if (tableData.value.length == 0) {
            paginationData.currentPage = current - 1
            returnAdminListLength()
        }
    }
})

//const fetchAdminList = () => {
//    //tableData.value = (await getAdminList('产品管理员')).data
//    //const res = await getAdminList('产品管理员')
//    //console.log(res)
//    returnAdminListLength()
//}
//fetchAdminList()

</script>

<style scoped></style>