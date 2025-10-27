<template>
    <el-dialog v-model="dialogFormVisible" title='编辑管理员信息' width="600px" align-center draggable>
        <div class="dialog-content">
            <el-form :model="AdminFormData" :rules="rules" label-width="100px">
                <el-form-item label="账号" prop="account">
                    <el-input v-model="AdminFormData.account" />
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="AdminFormData.name" />
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="AdminFormData.sex" placeholder="请选择性别">
                        <el-option label="男" value="男" />
                        <el-option label="女" value="女" />
                    </el-select>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="AdminFormData.email" />
                </el-form-item>
                <el-form-item label="部门" prop="department">
                    <el-select v-model="AdminFormData.department" placeholder="请选择部门">
                        <el-option v-for="item in departmentData" :key="item" :label="item" :value="item" />
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="edit">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeUnmount } from 'vue'
import { bus } from "../../../utils/mitt"
import { getDepartment } from '../../../api/setting'
import { editAdmin, getUserInfo } from '../../../api/userinfo'
import { ElMessage } from 'element-plus'

bus.on('EditId', async (id: number) => {
    const res = (await getUserInfo(id)).data
    AdminFormData.id = res.id
    AdminFormData.account = res.account
    AdminFormData.name = res.name
    AdminFormData.sex = res.sex
    AdminFormData.email = res.email
    AdminFormData.department = res.department

})

interface AdminFormData {
    id?: number,
    account: number,
    name: string,
    sex: string,
    email: string,
    department: string
}
const AdminFormData = reactive<AdminFormData>({
    id: null,
    account: null,
    name: '',
    sex: '',
    email: '',
    department: ''
})

const rules = reactive({
    account: [
        { required: true, message: '请输入管理员的注册账号', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入管理员的注册密码', trigger: 'blur' },
    ],
    name: [
        { required: true, message: '请输入管理员的名字', trigger: 'blur' },
    ],
    sex: [
        { required: true, message: '请输入管理员的性别', trigger: 'blur' },
    ],
    email: [
        { required: true, message: '请输入管理员的邮箱', trigger: 'blur' },
    ],
    department: [
        { required: true, message: '请输入管理员的部门', trigger: 'blur' },
    ],
})

const departmentData = ref()
const fetchDepartment = async () => {
    departmentData.value = (await getDepartment()).data
}
fetchDepartment()

//const emit = defineEmits(['success'])
const edit = async () => {
    const res = await editAdmin(AdminFormData)
    if (res.data.status == 0) {
        ElMessage({
            message: '编辑管理员信息成功',
            type: 'success',
        })
        //emit('success')
        bus.emit('adminDialogOff', 2)
        dialogFormVisible.value = false
    } else {
        ElMessage.error('编辑管理员信息失败')
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
    padding: 20px 30px;
}

:deep(.el-form-item) {
    margin: 30px;
}
</style>