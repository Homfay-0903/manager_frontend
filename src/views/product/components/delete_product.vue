<template>
    <el-dialog v-model="dialogFormVisible" title='删除产品' width="30%" center>
        <span>请慎重操作，删除后将失去此产品的记录</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="Delete">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, onBeforeUnmount } from 'vue'
import { deleteProduct } from '@/api/product'
import { ElMessage } from 'element-plus'
import { bus } from "@/utils/mitt.js"

const productId = ref()
bus.on('deleteProductId', (id: number) => {
    productId.value = id
})

const emit = defineEmits(['success'])
const Delete = async () => {
    const res = (await deleteProduct(productId.value)).data
    if (res.status == 0) {
        ElMessage({
            message: '删除产品成功',
            type: 'success',
        })
        emit('success')
        dialogFormVisible.value = false
    } else {
        ElMessage.error('删除产品失败')
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
</script>

<style scoped></style>