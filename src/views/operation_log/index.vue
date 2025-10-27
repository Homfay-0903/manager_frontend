<template>
    <breadCrumb ref="breadcrumb" :item='item'></breadCrumb>
    <div class="table-wrapped">
        <div class="table-top">
            <div class="table-header">
                <div>
                    <el-input v-model="name" class="w-50 m-2" size="large" placeholder="输入操作者进行搜索" :prefix-icon="Search"
                        @change="searchOperationPerson()" clearable @clear="getOperationFirstPageList" />
                </div>
                <div class="upload-wrapped">
                    <el-button type="danger" @click="clearList">清空操作日志</el-button>
                </div>
            </div>
            <div class="table-content">
                <el-table :data='tableData' style="width: 100%;">
                    <el-table-column prop="operation_person" label="操作者">
                        <template #default="{ row }">
                            <div :class="level(row.operation_level)">
                                <span class="person">{{ row.operation_person }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="operation_content" label="操作内容" />
                    <el-table-column prop="operation_level" label="操作等级">
                        <template #default="{ row }">
                            <el-tag class="ml-2" :type="level(row.operation_level)">{{ row.operation_level }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="operation_time" label="操作时间" width="200">
                        <template #default="{ row }">
                            <div>{{ row.operation_time?.slice(0, 16) }}</div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="table-footer">
            <el-pagination :page-size="1" :current-page="paginationData.operationCurrentPage" :pager-count="7"
                :total="paginationData.operationTotal" :page-count="paginationData.operationPageCount"
                @current-change="operationCurrentChange" layout="prev, pager, next" />
        </div>
    </div>
    <ClearLog ref="clear"></ClearLog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import breadCrumb from '@/components/bread_crumb.vue'
import ClearLog from './components/clear_log.vue'
import {
    operationLogListLength,
    returnOperationListData,
    searchOperationLogList
} from '@/api/log'
import { Search } from '@element-plus/icons-vue'

const breadcrumb = ref()
const item = ref({
    first: '操作日志'
})

const name = ref()
const tableData = ref([])

const searchOperationPerson = async () => {
    tableData.value = (await searchOperationLogList(name.value)).data
}
const getOperationFirstPageList = async () => {
    tableData.value = (await returnOperationListData(1)).data
}
getOperationFirstPageList()

const level = (level: string) => {
    if (level == '高级') return 'danger'
    if (level == '中级') return 'warning'
    if (level == '低级') return 'normal'
}

const clear = ref()
const clearList = () => {
    clear.value.open()
}

const paginationData = reactive({
    // 操作次数总数
    operationTotal: 1,
    // 操作次数列表总页数
    operationPageCount: 1,
    // 操作次数列表当前所处页数
    operationCurrentPage: 1,
})
const getOperationListLength = async () => {
    const res = (await operationLogListLength()).data
    paginationData.operationTotal = res.length
    paginationData.operationPageCount = Math.ceil(res.length / 10)
}
getOperationListLength()

const operationCurrentChange = async (value: number) => {
    tableData.value = (await returnOperationListData(value)).data
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

.person {
    margin-left: 8px;
}

.danger {
    border-left: 2px solid red;
}

.warning {
    border-left: 2px solid yellow;
}

.normal {
    border-left: 0;
}
</style>