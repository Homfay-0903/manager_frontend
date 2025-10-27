<template>
    <breadCrumb ref="breadcrumb" :item='item'></breadCrumb>
    <div class="table-wrapped">
        <div class="table-top">
            <div class="table-header">
                <div>
                    <el-input v-model="account" class="w-50 m-2" size="large" placeholder="输入账号进行搜索"
                        :prefix-icon="Search" @change="searchLoginAccount()" clearable @clear="getLoginFirstPageList" />
                </div>
                <div class="upload-wrapped">
                    <el-button type="danger" @click="clearList">清空操作日志</el-button>
                </div>
            </div>
            <div class="table-content">
                <el-table :data='tableData' style="width: 100%;">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="account" label="账号" />
                    <el-table-column prop="name" label="名字" />
                    <el-table-column prop="email" label="联系方式">
                    </el-table-column>
                    <el-table-column prop="login_time" label="登录时间" width="200">
                        <template #default="{ row }">
                            <div>{{ row.login_time?.slice(0, 16) }}</div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="table-footer">
            <el-pagination :page-size="1" :current-page="paginationData.loginCurrentPage" :pager-count="7"
                :total="paginationData.loginTotal" :page-count="paginationData.loginPageCount"
                @current-change="loginCurrentChange" layout="prev, pager, next" />
        </div>
    </div>
    <ClearLog ref="clear"></ClearLog>
</template>

<script setup lang="ts">
import {
    ref,
    reactive
} from 'vue'
import breadCrumb from '@/components/bread_crumb.vue'
import ClearLog from './components/clear_log.vue'
import {
    loginLogListLength,
    returnLoginListData,
    searchLoginLogList
} from '@/api/log'
import {
    Search
} from '@element-plus/icons-vue'

const breadcrumb = ref()
const item = ref({
    first: '登录日志'
})

const account = ref()
const tableData = ref([])
const getLoginFirstPageList = async () => {
    tableData.value = (await returnLoginListData(1)).data
}
getLoginFirstPageList()

const searchLoginAccount = async () => {
    tableData.value = (await searchLoginLogList(account.value)).data
}

const clear = ref()
const clearList = () => {
    clear.value.open()
}

const paginationData = reactive({
    // 登录次数总数
    loginTotal: 1,
    // 登录次数列表总页数
    loginPageCount: 1,
    // 登录次数列表当前所处页数
    loginCurrentPage: 1,
})
const getLoginListLength = async () => {
    const res = (await loginLogListLength()).data
    paginationData.loginTotal = res.length
    paginationData.loginPageCount = Math.ceil(res.length / 10)
}
getLoginListLength()
const loginCurrentChange = async (value: number) => {
    tableData.value = (await returnLoginListData(value)).data
}
</script>

<style lang="scss" scoped>
:deep(.el-table .cell) {
    font-weight: 400;
}

a {
    color: #fff;
    display: block;
    text-decoration: none;
}
</style>