<template>
    <el-dialog v-model="dialogFormVisible" title='再次申请出库' width="30%" center>
        <span>请确认，此操作将再次申请产品出库</span>
        <div class="product-name">您申请出库的产品是:&nbsp;&nbsp;{{ formData.product_name }}</div>
        <div class="product-name">该产品的库存还有:&nbsp;&nbsp;{{ formData.product_in_warehouse_number }}</div>
        <div class="dialog-content">
            <el-form ref="ruleFormRef" :model="formData" :label-position="labelPosition" :rules="rules"
                label-width="120px">
                <el-form-item label="申请出库编号" prop="product_out_id">
                    <el-input v-model="formData.product_out_id" />
                </el-form-item>
                <el-form-item label="出库数量" prop="product_out_number">
                    <el-input v-model="formData.product_out_number" />
                </el-form-item>
                <el-form-item label="出库申请人" prop="product_out_apply_person">
                    <el-input v-model="formData.product_out_apply_person" />
                </el-form-item>
                <el-form-item label="产品单价" prop="product_single_price">
                    <el-input v-model="formData.product_single_price" disabled />
                </el-form-item>
                <el-form-item label="申请出库备注" prop="apply_memo">
                    <el-input v-model="formData.apply_memo" :rows="2" type="textarea" />
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="applyProduct">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, reactive } from 'vue'
import { bus } from "@/utils/mitt.js"
import { applyOutProduct } from '@/api/product.js'
import { ElMessage } from 'element-plus'

bus.on('againId', (row: any) => {
    formData.id = row.id
    formData.product_in_warehouse_number = row.product_in_warehouse_number
    formData.product_name = row.product_name
    formData.product_single_price = row.product_single_price
    formData.product_out_apply_person = row.product_out_apply_person
    formData.product_out_number = row.product_out_number
})

interface FormData {
    id: number,
    product_name: string,
    product_out_id: number,
    product_in_warehouse_number: number,
    product_single_price: number,
    product_out_number: number,
    product_out_apply_person: string,
    apply_memo: string,
}
const formData = reactive<FormData>({
    id: null,
    product_name: null,
    product_out_id: null,
    product_in_warehouse_number: null,
    product_single_price: null,
    product_out_number: null,
    product_out_apply_person: '',
    apply_memo: ''
})

const emit = defineEmits(['success'])
const applyProduct = async () => {
    const res = (await applyOutProduct(formData)).data
    console.log(res)
    if (res.status == 0) {
        ElMessage({
            message: '产品申请出库成功',
            type: 'success',
        })
        emit('success')
        dialogFormVisible.value = false
    } else {
        ElMessage.error('产品申请出库失败')
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

<style lang="scss" scoped>
.dialog-content {
    display: flex;
    padding: 0 30px 20px 30px;
}

.product-name {
    display: flex;
    justify-content: center;
    font-size: 16px;
    margin: 10px;
    color: #333;
}

:deep(.el-form-item) {
    margin: 30px;
}
</style>