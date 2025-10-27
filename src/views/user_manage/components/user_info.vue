<template>
    <el-dialog v-model="dialogUserVisible" title='用户信息' width="500px" center draggable>
        <el-container>
            <el-aside width="200px">
                <el-avatar shape="square" :size="120" />
            </el-aside>
            <el-main>
                <div>账号：{{ userData.account }}</div>
                <div>姓名：{{ userData.name }}</div>
                <div>性别：{{ userData.sex }}</div>
                <div>部门：{{ userData.department }}</div>
                <div>邮箱：{{ userData.email }}</div>
                <div>状态：
                    <span v-if="userData.status == 0">正常</span>
                    <span v-else>冻结</span>
                </div>
            </el-main>
        </el-container>
        <el-footer>
            <span @click="openEdit(userData.id)">编辑</span>
            <span @click="openPromote(userData.id)">赋权</span>
            <span @click="openDelete(userData.id)">删除用户</span>
        </el-footer>
    </el-dialog>
    <PromoteUser ref="Promote"></PromoteUser>
    <EditUser ref="Edit"></EditUser>
    <DeleteUser ref="Delete"></DeleteUser>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeUnmount } from 'vue';
import {
    bus
} from "../../../utils/mitt"
import PromoteUser from '../components/promote_user.vue'
import EditUser from './edit_user.vue';
import DeleteUser from './delete_user.vue';

const userData = reactive({
    id: 0,
    imageUrl: '',
    account: 0,
    name: '',
    sex: '',
    email: '',
    department: '',
    status: 0,
})

bus.on('userId', (row: any) => {
    userData.id = row.id
    userData.imageUrl = row.imageUrl
    userData.account = row.account
    userData.name = row.name
    userData.sex = row.sex
    userData.email = row.email
    userData.department = row.department
    userData.status = row.status
})

bus.on('offDialog', (id: number) => {
    if (id) {
        dialogUserVisible.value = false
    }
})

const Promote = ref()
const openPromote = (id: number) => {
    bus.emit('promoteId', id)
    Promote.value.open()
}

const Edit = ref()
const openEdit = (id: number) => {
    bus.emit('editId', id)
    Edit.value.open()
}

const Delete = ref()
const openDelete = (id: number) => {
    let userinfo = {
        id: id,
        account: userData.account,
        name: userData.name
    }
    bus.emit('deleteUserId', userinfo)
    Delete.value.open()
}

const dialogUserVisible = ref(false)
const open = () => {
    dialogUserVisible.value = true
}
defineExpose({
    open
})
onBeforeUnmount(() => {
    bus.all.clear()
})
</script>

<style lang="scss" scoped>
.el-main>div {
    margin-bottom: 8px;
}

.el-main {
    --el-main-padding: 0px;
}

.el-footer {
    display: flex;
    justify-content: flex-end;
    --el-footer-height: 8px;

    span {
        margin-left: 8px;
        color: #409eff;
        cursor: pointer;
    }
}
</style>