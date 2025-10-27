<template>
    <breadCrumb ref="breadcrumb" :item='item'></breadCrumb>
    <div class="module-common-wrapped">
        <div class="module-common-content">
            <el-tabs v-model="activeName" class="demo-tabs">
                <el-tab-pane label="公告管理" name="first">
                    <div class="pane-content">
                        <div class="pane-top">
                            <div class="module-common-header">
                                <div class="search-wrapped">
                                    <el-select v-model="department" placeholder="请选择部门" @change="getListByDepartment"
                                        width="240px">
                                        <el-option v-for="item in departmentData" :key="item" :label="item"
                                            :value="item" />
                                    </el-select>
                                    <el-radio-group v-model="radio2" class="ml-4" @change="getMessageListByLevel">
                                        <el-radio label="一般" size="large">一般</el-radio>
                                        <el-radio label="重要" size="large">重要</el-radio>
                                        <el-radio label="必要" size="large">必要</el-radio>
                                    </el-radio-group>
                                </div>
                                <div class="button-wrapped">
                                    <el-button type="primary" plain @click="getCompanyFirstPageList">全部公告</el-button>
                                    <el-button type="primary" @click="createMessage(1)">发布公告</el-button>
                                </div>
                            </div>
                            <div class="module-common-table">
                                <el-table :data="companyTableData" border style="width: 100%">
                                    <el-table-column type="index" width="50"></el-table-column>
                                    <el-table-column prop="message_title" label="公告主题" width="320" />
                                    <el-table-column prop="message_category" label="类别" />
                                    <el-table-column prop="message_publish_department" label="发布部门" />
                                    <el-table-column prop="message_publish_name" label="发布人" />
                                    <el-table-column prop="message_receipt_object" label="接收对象" />
                                    <el-table-column prop="message_level" label="公告等级" />
                                    <el-table-column prop="message_publish_time" label="发布时间" width="200">
                                        <template #default="{ row }">
                                            <div>{{ row.message_publish_time?.slice(0, 10) }}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="message_update_time" label="最新编辑时间" width="200">
                                        <template #default="{ row }">
                                            <div>{{ row.message_update_time?.slice(0, 10) }}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="message_click_number" label="阅读人数" />
                                    <el-table-column label="操作" width="200" fixed="right">
                                        <template #default="{ row }">
                                            <div>
                                                <el-button type="success" @click="editMessage(row)">编辑</el-button>
                                                <el-button type="danger" @click="deleteMessage(row)">删除</el-button>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <div class="table-footer">
                            <el-pagination :page-size="1" :current-page="paginationData.companyCurrentPage"
                                :pager-count="7" :total="paginationData.companyTotal"
                                :page-count="paginationData.companyPageCount" @current-change="companyCurrentChange"
                                layout="prev, pager, next" />
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="系统消息" name="second">
                    <div class="pane-content">
                        <div class="pane-top">
                            <div class="module-common-header">
                                <div class="search-wrapped">
                                </div>
                                <div class="button-wrapped">
                                    <el-button type="primary" @click="createMessage(2)">发布系统消息</el-button>
                                </div>
                            </div>
                            <div class="module-common-table">
                                <el-table :data="systemTableData" border style="width: 100%">
                                    <el-table-column type="index" width="50"></el-table-column>
                                    <el-table-column prop="message_title" label="消息主题" />
                                    <el-table-column prop="message_publish_name" label="发布者" />
                                    <el-table-column prop="message_click_number" label="阅读人数" />
                                    <el-table-column prop="message_publish_time" label="发布时间" width="200">
                                        <template #default="{ row }">
                                            <div>{{ row.message_publish_time?.slice(0, 10) }}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作" width="200" fixed="right">
                                        <template #default="{ row }">
                                            <div>
                                                <el-button type="success" @click="editSystemMessage(row)">编辑</el-button>
                                                <el-button type="danger" @click="deleteMessage(row)">删除</el-button>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <div class="table-footer">
                            <el-pagination :page-size="1" :current-page="paginationData.systemCurrentPage"
                                :pager-count="7" :total="paginationData.systemTotal"
                                :page-count="paginationData.systemCount" @current-change="systemCurrentChange"
                                layout="prev, pager, next" />
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
    <CreateOrEdit ref="creat_edit" @success="fetchLatestTableData"></CreateOrEdit>
    <DeleteOrRenew ref="operation" @success="fetchLatestTableData"></DeleteOrRenew>
</template>

<script setup lang="ts">
import breadCrumb from '../../../components/bread_crumb.vue'
import { ref, reactive } from 'vue';
import { bus } from "@/utils/mitt.js"
import {
    searchMessageBydepartment,
    searchMessageByLevel,
    getCompanyMessageLength,
    getSystemMessageLength,
    returnCompanyListData,
    returnSystemListData,
    companyMessageList,
    systemMessageList
} from '@/api/message.js'
import { getDepartment } from '@/api/setting'

import CreateOrEdit from '../components/create_edit.vue';
import DeleteOrRenew from '../components/deleteOrRenew.vue';

const breadcrumb = ref()
const item = ref({
    first: '消息管理',
    second: '消息列表'
})

const activeName = ref('first')

const companyTableData = ref([])
const systemTableData = ref([])

const department = ref()
const departmentData = ref([])
const fetchDepartment = async () => {
    departmentData.value = (await getDepartment()).data
    console.log(departmentData.value)
}
fetchDepartment()
const getListByDepartment = async () => {
    const res = (await searchMessageBydepartment(department.value)).data
    companyTableData.value = res
}
const radio2 = ref()
const getMessageListByLevel = async () => {
    companyTableData.value = (await searchMessageByLevel(radio2.value)).data
}


const getCompanyFirstPageList = () => {
    fetchLatestTableData()
    radio2.value = null
    department.value = null
}

//const getCompanyFirstPageList = async () => {
//    companyTableData.value = await returnCompanyListData(1)
//}
//getCompanyFirstPageList()
//
//const getSystemFirstPageList = async () => {
//    systemTableData.value = await returnSystemListData(1)
//}
//getSystemFirstPageList()


const fetchLatestTableData = async () => {
    companyTableData.value = (await returnCompanyListData(1)).data
    systemTableData.value = (await returnSystemListData(1)).data
}
fetchLatestTableData()


const creat_edit = ref()
const createMessage = (id: number) => {
    bus.emit('createMessage', id)
    creat_edit.value.open()
}
const editMessage = (row: any) => {
    bus.emit('editMessage', row)
    creat_edit.value.open()
}
const operation = ref()
const deleteMessage = (row: any) => {
    bus.emit('deleteMessageId', row)
    operation.value.open()
}

////////////////////////
const editSystemMessage = (row: any) => {
    bus.emit('editSystemMessage', row)
    creat_edit.value.open()
}
////////////////////////

// 分页数据
const paginationData = reactive({
    // 公司公告总数
    companyTotal: 1,
    // 公司公告列表总页数
    companyPageCount: 1,
    // 公司公告列表当前所处页数
    companyCurrentPage: 1,
    // 系统消息总数
    systemTotal: 1,
    // 系统消息总页数
    systemCount: 1,
    // 系统消息当前所处页数
    systemCurrentPage: 1,
})

const getCompanyListLength = async () => {
    const res = (await getCompanyMessageLength()).data
    paginationData.companyTotal = res.length
    paginationData.companyPageCount = Math.ceil(res.length / 10)
}
getCompanyListLength()

const getSystemListLength = async () => {
    const res = (await getSystemMessageLength()).data
    paginationData.systemTotal = res.length
    paginationData.systemCount = Math.ceil(res.length / 10)
}
getSystemListLength()

const companyCurrentChange = async (value: number) => {
    paginationData.companyCurrentPage = value
    companyTableData.value = await returnCompanyListData(paginationData.companyCurrentPage)
}
const systemCurrentChange = async (value: number) => {
    paginationData.systemCurrentPage = value
    systemTableData.value = (await returnSystemListData(paginationData.systemCurrentPage))
}
</script>

<style lang="scss" scoped>
:deep(.el-table .cell) {
    font-weight: 400;
}

.search-wrapped {
    align-items: center;
    gap: 20px;
}

:deep(.el-select) {
    flex-shrink: 0; // 禁止选择器收缩
}

:deep(.el-radio-group) {
    flex-shrink: 1; // 允许单选组适当收缩
    flex-wrap: nowrap;
    min-width: 0; // 重要：允许内容最小宽度为0
}
</style>