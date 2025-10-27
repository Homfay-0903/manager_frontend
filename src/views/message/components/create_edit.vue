<template>
    <el-dialog v-model="dialogFormVisible" :title='title' width="50%" align-center append-to-body
        :destroy-on-close='true'>
        <div class="dialog-content">
            <el-form :model="formData" label-width="120px" style="max-width: 600px;" :rules="rules"
                :label-position="labelPosition">
                <el-form-item label="主题" prop='message_title'>
                    <el-input v-model="formData.message_title" />
                </el-form-item>
                <el-form-item label="发布部门" prop='message_publish_department' v-if="title == '发布公告' || title == '编辑公告'">
                    <el-select v-model="formData.message_publish_department" placeholder="请选择发布部门">
                        <el-option v-for="item in member" :key="item.value" :label="item.value" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="发布人" prop='message_publish_name'>
                    <el-input v-model="formData.message_publish_name" disabled />
                </el-form-item>
                <el-form-item label="接收部门" prop='message_receipt_object'>
                    <el-select v-model="formData.message_receipt_object" placeholder="请选择接收部门">
                        <el-option v-for="item in allmembers" :key="item.value" :label="item.value"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="公告等级" prop='message_level' v-if="title == '发布公告' || title == '编辑公告'">
                    <el-select v-model="formData.message_level" placeholder="选择公告等级">
                        <el-option label="一般" value="一般" />
                        <el-option label="重要" value="重要" />
                        <el-option label="必要" value="必要" />
                    </el-select>
                </el-form-item>
                <el-form-item label="内容" prop='message_content'>
                    <div style="border: 1px solid #ccc">
                        <!-- wangEditor结构 -->
                        <Toolbar style="border-bottom: 1px solid #ccc;width: 600px;" :editor="editorRef"
                            :defaultConfig="toolbarConfig" :mode="mode" />
                        <Editor style="height: 300px; overflow-y: hidden;width: 600px;" v-model="valueHtml"
                            :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" />
                    </div>
                </el-form-item>
            </el-form>
        </div>
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
import { onBeforeUnmount, reactive, ref, shallowRef } from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { publishMessage, editMessage } from '@/api/message.js'
import { getDepartment } from '@/api/setting'
import { bus } from "@/utils/mitt.js"
import { ElMessage } from 'element-plus'
import { changeUserReadList } from '@/api/dep_msg.js'
import { useMsgStore } from '@/store/messageStore.js'

const title = ref()
const valueHtml = ref()
const labelPosition = ref('left')
bus.on('createMessage', (id: number) => {
    if (id == 1) {
        title.value = "发布公告"
        valueHtml.value = ''
        formData.message_title = ''
    }
    if (id == 2) {
        title.value = "发布系统消息"
        valueHtml.value = ''
        formData.message_title = ''
    }
})

bus.on('editMessage', (row: any) => {
    title.value = "编辑公告"
    valueHtml.value = ''
    formData.id = row.id
    formData.message_title = row.message_title
    formData.message_publish_department = row.message_publish_department
    formData.message_publish_name = row.message_publish_name
    formData.message_receipt_object = row.message_receipt_object
    formData.message_level = row.message_level
    formData.message_content = row.message_content
})
bus.on('editSystemMessage', (row: any) => {
    title.value = "编辑系统消息"
    valueHtml.value = ''
    formData.id = row.id
    formData.message_title = row.message_title
    formData.message_publish_name = row.message_publish_name
    formData.message_content = row.message_content
})

// 不包括全体成员
const member = ref([])
// 全体成员
const allmembers = ref([])
const fetchDepartment = async () => {
    const res = (await getDepartment()).data
    const data = []
    const dataPro = []
    for (let i = 0; i < res.length; i++) {
        let obj = {
            value: res[i]
        }
        data.push(obj)
        dataPro.push(obj)
    }
    member.value = data
    dataPro.push({ value: "全体成员" })
    allmembers.value = dataPro
}
fetchDepartment()


const editorRef = shallowRef()
const mode = ref('default')
const toolbarConfig = {
    excludeKeys: []
}
const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: {
    }
}
toolbarConfig.excludeKeys = [
    'blockquote',
    'bgColor',
    'color',
    'group-more-style',
    'fontFamily',
    'bulletedList',
    'numberedList',
    'lineHeight',
    'todo',
    'emotion',
    'insertLink',
    'group-video',
    'insertTable',
    'codeBlock',
    'divider',
    'fullScreen',
    'group-image',
]
const handleCreated = (editor: any) => {
    editorRef.value = editor
}
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})


interface Formdata {
    id: number | null;
    message_title: string;
    message_publish_department: string;
    message_publish_name: string | null;
    message_category: string;
    message_receipt_object: string;
    message_level: string;
    message_content: string;
}
const formData = reactive<Formdata>({
    id: 0,
    message_title: '',
    message_publish_department: '',
    message_publish_name: localStorage.getItem('name'),
    message_category: '',
    message_receipt_object: '',
    message_level: '',
    message_content: '',
})

const rules = reactive({
    message_title: [
        { required: true, message: '请输入公告标题', trigger: 'blur' },
    ],
    message_publish_department: [
        { required: true, message: '请选择发布部门', trigger: 'blur' },
    ],
    message_publish_name: [
        { required: true, message: '请输入发布人', trigger: 'blur' },
    ],
    message_receipt_object: [
        { required: true, message: '请选择的接收对象', trigger: 'blur' },
    ],
    message_level: [
        { required: true, message: '请选择公告等级', trigger: 'blur' },
    ],
    message_content: [
        { required: true, message: '请输入公告内容', trigger: 'blur' },
    ],
})



//const department = ref()
//const fetchdepartment = async () => {
//    department.value = (await getDepartment()).data
//    console.log(department.value)
//}
//fetchdepartment()


const msgStore = useMsgStore()
const emit = defineEmits(['success'])
const commit = async () => {
    if (title.value == '发布公告') {
        formData.message_category = '公司公告'
        //console.log(valueHtml.value)
        formData.message_content = valueHtml.value
        const res = (await publishMessage(formData)).data
        if (res.status == 0) {
            await changeUserReadList(res.id, formData.message_receipt_object)
            msgStore.returnReadList(localStorage.getItem('id'))
            ElMessage({
                message: '发布公告成功',
                type: 'success',
            })
            emit('success')
            dialogFormVisible.value = false
        } else {
            ElMessage.error('发布公告失败')
            dialogFormVisible.value = false
        }
    }
    if (title.value == '发布系统消息') {
        formData.message_content = valueHtml.value
        formData.message_category = '系统消息'
        const res = (await publishMessage(formData)).data
        if (res.status == 0) {
            await changeUserReadList(res.id, formData.message_receipt_object)
            msgStore.returnReadList(localStorage.getItem('id'))
            ElMessage({
                message: '发布公告成功',
                type: 'success',
            })
            emit('success')
            dialogFormVisible.value = false
        } else {
            ElMessage.error('发布公告失败')
            dialogFormVisible.value = false
        }
    }

    if (title.value == '编辑公告' || title.value == '编辑系统消息') {
        formData.message_content = valueHtml.value
        const res = (await editMessage(formData)).data
        msgStore.returnReadList(localStorage.getItem('id'))
        if (res.status == 0) {
            ElMessage({
                message: '编辑内容成功',
                type: 'success',
            })
            emit('success')
            dialogFormVisible.value = false
        } else {
            ElMessage.error('编辑内容失败')
            dialogFormVisible.value = false
        }
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