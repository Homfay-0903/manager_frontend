<template>
    <el-dialog v-model="state.forgetPasswordDialog" title="忘记密码" width="400px">
        <el-form class="login-form" :label-position="labelPosition" :rules="rules">
            <el-form-item label="输入您的注册账号" prop="account">
                <el-input v-model="forgetData.account" placeholder="输入您的注册账号" />
            </el-form-item>
            <el-form-item label="输入您的个人邮箱" prop="email">
                <el-input v-model="forgetData.email" placeholder="输入您的个人邮箱" />
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="state.forgetPasswordDialog = false">取消</el-button>
                <el-button type="primary" @click="verifyAccount">
                    下一步
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="state.changePasswordDialog" title="修改密码" width="400px">
        <el-form class="login-form" :label-position="labelPosition" :rules="rules">
            <el-form-item label="输入您的新密码" prop="password">
                <el-input v-model="forgetData.password" placeholder="输入您的新密码" show-password />
            </el-form-item>
            <el-form-item label="再次确认您的新密码" prop="nextPassword">
                <el-input v-model="forgetData.nextPassword" placeholder="再次确认您的新密码" show-password />
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
import { verify, reset } from '@/api/login'
//import { verify, reset } from '../../../api/login'
import { ElMessage } from 'element-plus'

const labelPosition = ref('top')

interface forgetData {
    account: string | number | null
    email: string
    password: string
    nextPassword: string
}

const forgetData: forgetData = reactive({
    account: null,
    email: '',
    password: '',
    nextPassword: '',
})

const rules = reactive({
    account: [
        { required: true, message: '请输入您的注册账号', trigger: 'blur' },
    ],
    email: [
        { required: true, message: '请输入您的注册邮箱', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入您想修改的密码', trigger: 'blur' },
    ],
    nextPassword: [
        { required: true, message: '请再次确认您的新密码', trigger: 'blur' },
    ],
})

const state = reactive({
    forgetPasswordDialog: false,
    changePasswordDialog: false,
})

const verifyAccount = async () => {
    const res = await verify(forgetData)
    if (res.data.status == 0) {
        ElMessage({
            message: '验证成功',
            type: 'success',
        })
        localStorage.setItem('id', res.data.id)

        state.forgetPasswordDialog = false
        state.changePasswordDialog = true
    } else {
        ElMessage.error('验证失败')
    }
}

const resetPassword = async () => {
    if (forgetData.password === forgetData.nextPassword) {
        const newPassword = forgetData.nextPassword

        const res = await reset(localStorage.getItem('id'), newPassword)
        if (res.data.status == 0) {
            ElMessage({
                message: '修改成功',
                type: 'success',
            })
        } else {
            ElMessage.error('修改失败,请检查密码是否一致')
        }
    }
}


const open = () => {
    state.forgetPasswordDialog = true
}

defineExpose({
    open
})

</script>

<style lang="scss" scoped></style>