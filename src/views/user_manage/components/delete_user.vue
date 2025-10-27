<template>
    <el-dialog v-model="dialogFormVisible" title='删除操作' width="30%" center>
        <span>请慎重操作，删除后此用户将永久失去登录资格</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="DeleteUserOrDownAdmin">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { deleteUser, changeIdentityToUser } from '../../../api/userinfo';
import { tracking } from '@/utils/operation.js'
import { bus } from "../../../utils/mitt"
import { ElMessage } from 'element-plus'

//const adminId = ref()
const userId = ref()
const account = ref()
const name = ref()
bus.on('deleteUserId', (userinfo: any) => {
    userId.value = userinfo.id
    account.value = userinfo.account
    name.value = userinfo.name
})
//bus.on('downAdmin', (id: number) => {
//    adminId.value = id
//})

const emit = defineEmits(['success'])
const DeleteUserOrDownAdmin = async () => {
    if (userId.value) {
        const res = (await deleteUser(userId.value, account.value)).data
        console.log(res)
        console.log(userId.value, account.value)
        if (res.status == 0) {
            ElMessage({
                message: '删除用户成功',
                type: 'success',
            })
            // 假设用户第二页 我们的用户为第一条数据 删除之后 页面变为第一页
            // 假设用户第二页 我们的用户不为第一条数据 删除之后 页面依然为第二页
            tracking('管理员', localStorage.getItem('name'), name.value, '高级')
            dialogFormVisible.value = false
            bus.emit('offDialog', 1)
        } else {
            ElMessage.error('删除用户失败')
            dialogFormVisible.value = false
        }
    }
}

const dialogFormVisible = ref()
const open = () => {
    dialogFormVisible.value = true
}
defineExpose({
    open
})
</script>

<style scoped></style>