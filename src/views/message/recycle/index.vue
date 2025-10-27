<template>
    <breadCrumb ref="breadcrumb" :item='item'></breadCrumb>
    <div class="table-wrapped">
        <div class="table-top">
            <div class="table-content">
                <el-table :data="tableData" style="width: 100%;" border>
                    <el-table-column type="index" width="50" />
                    <el-table-column label="消息主题" prop="message_title" />
                    <el-table-column label="消息类别" prop="message_category" />
                    <el-table-column label="发布部门" prop="message_publish_department" />
                    <el-table-column label="接收对象" prop="message_receipt_object" />
                    <el-table-column label="删除日期" prop="message_delete_time">
                        <template #default="{ row }">
                            <div>{{ row.message_delete_time?.slice(0, 10) }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200" fixed="right">
                        <template #default="{ row }">
                            <div>
                                <el-button type="success" @click="renew(row)">还原</el-button>
                                <el-button type="danger" @click="realDelete(row.id)">删除</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="table-footer">
            <el-pagination :page-size="1" :current-page="paginationData.recycleCurrentPage" :pager-count="7"
                :total="paginationData.recycleTotal" :page-count="paginationData.recyclePageCount"
                @current-change="recycleCurrentChange" layout="prev, pager, next" />
        </div>
    </div>
    <renewAndDelete ref="reOrDel" @success="getRecycleFirstPageList"></renewAndDelete>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import breadCrumb from '@/components/bread_crumb.vue'
import { getRecycleMessageLength, returnRecycleListData } from '@/api/message'
import { bus } from "@/utils/mitt.js"
import renewAndDelete from '../components/deleteOrRenew.vue'

const breadcrumb = ref()
const item = ref({
    first: '消息管理',
    second: '回收站'
})

const tableData = ref([])
const paginationData = reactive({
    // 回收站总数
    recycleTotal: 1,
    // 回收站列表总页数
    recyclePageCount: 1,
    // 回收站列表当前所处页数
    recycleCurrentPage: 1,
})
const getRecycleListLength = async () => {
    const res = (await getRecycleMessageLength()).data
    paginationData.recycleTotal = res.length
    paginationData.recyclePageCount = Math.ceil(res.length / 10)
}
getRecycleListLength()
const getRecycleFirstPageList = async () => {
    tableData.value = (await returnRecycleListData(1)).data
}
getRecycleFirstPageList()

const reOrDel = ref()
const renew = (row: any) => {
    bus.emit('renewID', row)
    reOrDel.value.open()
}
const realDelete = (id: number) => {
    bus.emit('realDelete', id)
    reOrDel.value.open()
}
</script>

<style lang="scss" scoped>
.table-wrapped {
    padding: 8px;
    height: calc(100vh - 101px);
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .table-top {
        display: flex;
        flex-direction: column;

        .table-content {
            padding: 10px 20px 20px;
            margin-bottom: 8px;
            background: #fff;
        }
    }

    .table-footer {
        display: flex;
        justify-content: flex-end;
        background: #fff;
    }
}

:deep(.el-table .cell) {
    font-weight: 400;
}
</style>