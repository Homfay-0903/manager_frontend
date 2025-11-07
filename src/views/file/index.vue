<template>
    <breadCrumb ref="breadcrumb" :item='item'></breadCrumb>
    <div class="table-wrapped">
        <div class="table-top">
            <div class="table-header">
                <div></div>
                <div class="upload-wrapped">
                    <el-upload v-model:file-list="fileList" class="upload-demo"
                        :action="fileUrl" multiple :limit='3' :on-exceed='handleExceed'
                        :on-success="handleSuccess" :show-file-list='false'>
                        <el-button type="primary">上传文件</el-button>
                    </el-upload>
                </div>
            </div>
            <div class="table-content">
                <el-table :data='tableData' style="width: 100%;">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="file_name" label="文件名" />
                    <el-table-column prop="file_size" label="文件大小">
                        <template #default="{ row }">
                            <div>{{ row.file_size?.slice(0, 2) }}KB</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="upload_person" label="上传者" />
                    <el-table-column prop="download_number" label="下载次数" />
                    <el-table-column prop="upload_time" label="上传时间" width="200">
                        <template #default="{ row }">
                            <div>{{ row.upload_time?.slice(0, 10) }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200" fixed="right">
                        <template #default="{ row }">
                            <div>
                                <el-button type="success">
                                    <template #default>
                                        <a :href="row.file_url"
                                            @click="DownLoadAndchangeClick(row.download_number, row.id)">下载文件</a>
                                    </template>
                                </el-button>
                                <el-button type="danger" @click="deleteFile(row)">删除</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="table-footer">
            <el-pagination :page-size="1" :current-page="paginationData.fileCurrentPage" :pager-count="7"
                :total="paginationData.fileTotal" :page-count="paginationData.filePageCount"
                @current-change="fileCurrentChange" layout="prev, pager, next" />
        </div>
    </div>
    <DeleteFile ref="del_file" @success="getFirstPageFiles"></DeleteFile>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import breadCrumb from '@/components/bread_crumb.vue'
import {
    bindFileAndUser,
    fileListLength,
    returnFilesListData,
    updateDownload
} from '@/api/file'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { ElMessage } from 'element-plus'
import { bus } from "@/utils/mitt.js"
import DeleteFile from './components/delete.vue'

const breadcrumb = ref()
const item = ref({
    first: '文件管理'
})

const fileUrl = ref(`${import.meta.env.VITE_API_BASEURL}/file/uploadFile`)

const paginationData = reactive({
    // 文件总数
    fileTotal: 1,
    // 文件列表总页数
    filePageCount: 1,
    // 文件列表当前所处页数
    fileCurrentPage: 1,
})

const tableData = ref([])
const getFirstPageFiles = async () => {
    tableData.value = (await returnFilesListData(1)).data
}
getFirstPageFiles()


const fileList = ref<UploadUserFile[]>([])
const handleExceed: UploadProps['onExceed'] = () => {
    ElMessage.warning(
        '最多上传三个文件！'
    )
}
const handleSuccess = (response: any) => {
    console.log(response)
    if (response.status == 0) {
        (async () => {
            await bindFileAndUser(localStorage.getItem('name'), response.url)
        })()
        ElMessage({
            message: '上传文件成功',
            type: 'success',
        })
        getFirstPageFiles()
    } else {
        ElMessage.error('上传文件失败，请检查网络问题！')
    }
}

const DownLoadAndchangeClick = async (downLoadNumber: number, id: number) => {
    await updateDownload(downLoadNumber, id)
}


const getFileListLength = async () => {
    const res = (await fileListLength()).data
    paginationData.fileTotal = res.length
    paginationData.filePageCount = Math.ceil(res.length / 10)
}
getFileListLength()
const fileCurrentChange = async (value: number) => {
    tableData.value = (await returnFilesListData(value)).data
}

const del_file = ref()
const deleteFile = (row: any) => {
    bus.emit('File', row)
    del_file.value.open()
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