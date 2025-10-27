<template>
    <el-dialog v-model="dialogFormVisible" title='编辑用户信息' width="600px" align-center draggable>
        <div class="dialog-content">
            <el-form :model="formData" :rules="rules" label-width="100px">
                <el-form-item label="账号" prop="account">
                    <el-input v-model="formData.account" disabled />
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="formData.name" />
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="formData.sex" placeholder="请选择性别">
                        <el-option label="男" value="男" />
                        <el-option label="女" value="女" />
                    </el-select>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="formData.email" />
                </el-form-item>
                <el-form-item label="部门" prop="department">
                    <el-select v-model="formData.department" placeholder="请选择部门">
                        <el-option v-for="item in departmentData" :key="item" :label="item" :value="item" />
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="editUser">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeUnmount } from 'vue'
import { getDepartment } from '../../../api/setting'
import { getUserInfo, editAdmin } from '../../../api/userinfo'
import { bus } from "../../../utils/mitt"
import { ElMessage } from 'element-plus'

bus.on('editId', async (id: number) => {
    const res = (await getUserInfo(id)).data
    formData.id = res.id
    formData.account = res.account
    formData.name = res.name
    formData.sex = res.sex
    formData.email = res.email
    formData.department = res.department
})

interface formData {
    id?: number | null,
    account: number | null,
    name: string,
    sex: string,
    email: string,
    department: string,
    identity: string
}
const formData = reactive<formData>({
    id: null,
    account: null,
    name: '',
    sex: '',
    email: '',
    department: '',
    identity: '用户'
})

const rules = reactive({
    name: [
        { required: true, message: '请输入要修改的名字', trigger: 'blur' },
    ],
    sex: [
        { required: true, message: '请输入要修改的性别', trigger: 'blur' },
    ],
    email: [
        { required: true, message: '请输入要修改的邮箱', trigger: 'blur' },
    ],
    department: [
        { required: true, message: '请输入要修改的部门', trigger: 'change' },
    ],
})

const departmentData = ref()
const fetchDepartment = async () => {
    departmentData.value = (await getDepartment()).data
    console.log(departmentData.value)
}
fetchDepartment()

const editUser = async () => {
    const res = (await editAdmin(formData)).data
    console.log(res)
    if (res.status == 0) {
        ElMessage({
            message: '编辑用户信息成功',
            type: 'success',
        })
        bus.emit('offDialog', 1)
        dialogFormVisible.value = false
    } else {
        ElMessage.error('编辑用户信息失败')
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