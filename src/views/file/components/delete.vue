<template>
    <el-dialog v-model="dialogFormVisible" title='删除文件' width="30%" center>
        <span>请慎重操作！您确定要真正删除这个文件吗？</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="DeleteFile">
                    删除
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { deleteFile } from '../../../api/file';

import { onBeforeUnmount, ref } from 'vue'
import { bus } from "@/utils/mitt.js"
import { ElMessage } from 'element-plus'

const FileId = ref()
const FileName = ref()
bus.on('File', (row: any) => {
    FileId.value = row.id
    FileName.value = row.file_name
})

const emit = defineEmits(['success'])
const DeleteFile = async () => {
    const res = (await deleteFile(FileId.value, FileName.value)).data
    if (res.status == 0) {
        ElMessage({
            message: '删除文件成功',
            type: 'success',
        })
        emit('success')
        dialogFormVisible.value = false
    } else {
        ElMessage.error('删除文件失败')
        dialogFormVisible.value = false
    }
}

const dialogFormVisible = ref(false)
const open = () => {
    dialogFormVisible.value = true
}
defineExpose({
    open
})
onBeforeUnmount(() => {
    bus.all.clear()
})
</script>

<style scoped></style>