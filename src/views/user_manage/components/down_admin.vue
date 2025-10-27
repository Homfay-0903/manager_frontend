<template>
    <el-dialog v-model="dialogFormVisible" title='删除操作' width="30%" center>
        <span v-if="adminId">是否去掉此用户的管理员职位？删除后此用户将重新展现在用户列表中</span>
        <span v-else>请慎重操作，删除后此用户将永久失去登录资格</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="DownAdmin">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { bus } from "@/utils/mitt.js"
import {
    changeIdentityToUser, deleteUser
} from '../../../api/userinfo'
import { ElMessage } from 'element-plus'

const adminId = ref()
bus.on('downAdmin', (id: number) => {
    adminId.value = id
})

//const emit = defineEmits(['success'])
const DownAdmin = async () => {
    if (adminId.value) {
        const res = await changeIdentityToUser(adminId.value)
        if (res.data.status == 0) {
            ElMessage({
                message: '对管理员降职成功',
                type: 'success',
            })
            //emit('success')
            bus.emit('adminDialogOff', 3)
            dialogFormVisible.value = false
        } else {
            ElMessage.error('对管理员降职失败')
            dialogFormVisible.value = false
        }
    }
}


// 弹窗开关
const dialogFormVisible = ref(false)

// 打开编辑管理员的弹窗
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