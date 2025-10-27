<template>
    <el-dialog v-model="dialogFormVisible" :title='title' width="30%" center>
        <span v-if="title.value == '删除信息'" v-html="tips"></span>
        <span v-else-if="title.value == '恢复消息'" v-html="tips"></span>
        <span v-else v-html="tips"></span>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="operationMessage">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { bus } from "@/utils/mitt.js"
import { firstDelete, recover, deleteMessage } from '@/api/message.js'
import { ElMessage } from 'element-plus'
import { changeUserReadList, changeUserReadListButDelete } from '@/api/dep_msg.js'
import { useMsgStore } from '@/store/messageStore.js'

const title = ref()
const tips = ref()
const messageId = ref()
const department = ref()

bus.on('deleteMessageId', (row: any) => {
    title.value = '删除信息'
    tips.value = '您确定要删除这个公告吗？您可在回收站进行后续处理'
    messageId.value = row.id
    department.value = row.message_receipt_object
})
bus.on('renewID', (row: any) => {
    title.value = '恢复消息'
    tips.value = '您确定要恢复这个公告吗？'
    messageId.value = row.id
    department.value = row.message_receipt_object
})
bus.on('realDelete', (id: number) => {
    title.value = '真正删除信息'
    tips.value = '请慎重操作！您确定要真正删除这个公告吗？'
    messageId.value = id
})

const msgStore = useMsgStore()
const emit = defineEmits(['success'])
const operationMessage = async () => {
    if (title.value == '删除信息') {
        const res = (await firstDelete(messageId.value)).data
        if (res.status == 0) {
            await changeUserReadListButDelete(messageId.value, department.value)
            msgStore.returnReadList(localStorage.getItem('id'))
            ElMessage({
                message: '删除公告成功',
                type: 'success',
            })
            emit('success')
            dialogFormVisible.value = false
        } else {
            ElMessage.error('删除公告失败')
            dialogFormVisible.value = false
        }
    }
    if (title.value == '恢复消息') {
        const res = (await recover(messageId.value)).data
        if (res.status == 0) {
            await changeUserReadList(messageId.value, department.value)
            msgStore.returnReadList(localStorage.getItem('id'))
            ElMessage({
                message: '恢复公告成功',
                type: 'success',
            })
            emit('success')
            dialogFormVisible.value = false
        } else {
            ElMessage.error('恢复公告失败')
            dialogFormVisible.value = false
        }
    }
    if (title.value == '真正删除信息') {
        const res = (await deleteMessage(messageId.value)).data
        console.log(res)
        if (res.status == 0) {
            ElMessage({
                message: '删除公告成功',
                type: 'success',
            })
            emit('success')
            dialogFormVisible.value = false
        } else {
            ElMessage.error('删除公告失败')
            dialogFormVisible.value = false
        }
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