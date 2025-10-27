<template>
    <el-dialog v-model="dialogPromoteVisible" title="赋权操作" center width="30%">
        <el-radio-group v-model="radio" class="ml-4">
            <el-radio label="产品管理员" size="large">产品管理员</el-radio>
            <el-radio label="用户管理员" size="large">用户管理员</el-radio>
            <el-radio label="消息管理员" size="large">消息管理员</el-radio>
        </el-radio-group>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="commit">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { bus } from "../../../utils/mitt"
import { changeIdentityToAdmin } from '../../../api/userinfo'
import { ElMessage } from 'element-plus'

const userId = ref()
bus.on('promoteId', (id: number) => {
    userId.value = id
})

const radio = ref()
const commit = async () => {
    const res = (await changeIdentityToAdmin(userId.value, radio.value)).data
    if (res.status == 0) {
        ElMessage({
            message: '赋权管理员成功',
            type: 'success',
        })
        bus.emit('offDialog', 1)
        dialogPromoteVisible.value = false
    } else {
        ElMessage.error('赋权管理员失败')
        dialogPromoteVisible.value = false
    }
}

const dialogPromoteVisible = ref(false)
const open = () => {
    dialogPromoteVisible.value = true
}
defineExpose({
    open
})
onBeforeUnmount(() => {
    bus.all.clear()
})
</script>

<style lang="scss" scoped>
.el-radio-group {
    display: flex;
    justify-content: center;
}
</style>