<template>
    <el-dialog v-model="state.changePasswordDialog" title="修改密码" width="400px">
        <el-form class="login-form" :label-position="labelPosition" :rules="rules">
            <el-form-item label="输入您的旧密码" prop="oldPassword">
                <el-input v-model="passwordData.oldPassword" placeholder="输入您的旧密码" show-password />
            </el-form-item>
            <el-form-item label="输入您的新密码" prop="newPassword">
                <el-input v-model="passwordData.newPassword" placeholder="输入您的新密码" show-password />
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="state.changePasswordDialog = false">取消</el-button>
                <el-button type="primary" @click="resetPassword">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { reset } from '@/api/login'
import { changePassword } from '@/api/userinfo'
//import { verify, reset } from '../../../api/login'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const state = reactive({
    changePasswordDialog: false
})

interface passwordData {
    oldPassword: string
    newPassword: string
}

const passwordData = reactive<passwordData>({
    newPassword: '',
    oldPassword: ''
})

const rules = reactive({
    oldPassword: [
        { required: true, message: '请输入您的注册账号', trigger: 'blur' },
    ],
    newPassword: [
        { required: true, message: '请输入您的注册邮箱', trigger: 'blur' },
    ]
})

const resetPassword = async () => {
    if (passwordData.oldPassword && passwordData.newPassword) {
        const res = await changePassword(localStorage.getItem('id'), passwordData.oldPassword, passwordData.newPassword)
        console.log(res)
        if (res.data.status == 0) {
            ElMessage({
                message: '修改成功',
                type: 'success',
            })
            state.changePasswordDialog = false
            router.push('/login')
        } else {
            ElMessage.error('修改失败,请检查密码是否一致')
        }
    } else {
        ElMessage.error('请输入内容')
    }

}

const open = () => {
    state.changePasswordDialog = true
}

defineExpose({
    open
})

</script>

<style lang="scss" scoped></style>