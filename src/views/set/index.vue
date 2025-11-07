<template>
    <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
    <div class="common-wrapped">
        <div class="common-content">
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="账号详情" name="first">
                    <div class="account-info-wrapped">
                        <span>用户头像：</span>
                        <div class="account-info-content">
                            <el-upload class="avatar-uploader" :action="avatarUrl"
                                :show-file-list="false" :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="userStore.imageUrl" :src="userStore.imageUrl" class="avatar" />
                                <el-icon v-else class="avatar-uploader-icon">
                                    <Plus />
                                </el-icon>
                            </el-upload>
                        </div>
                    </div>
                    <div class="account-info-wrapped">
                        <span>用户账号：</span>
                        <div class="account-info-content">
                            <el-input v-model="userStore.account" disabled></el-input>
                        </div>
                    </div>
                    <div class="account-info-wrapped">
                        <span>用户密码：</span>
                        <div class="account-info-content">
                            <el-button type="primary" @click="openChangePassword">修改密码</el-button>
                        </div>
                    </div>
                    <div class="account-info-wrapped">
                        <span>用户姓名：</span>
                        <div class="account-info-content">
                            <el-input v-model="userStore.name"></el-input>
                        </div>
                        <div class="account-save-button">
                            <el-button type="primary" @click="saveName">保存</el-button>
                        </div>
                    </div>
                    <div class="account-info-wrapped">
                        <span>用户性别：</span>
                        <div class="account-info-content">
                            <el-select v-model="userStore.sex" style="width: 240px">
                                <el-option label="男" value="男" />
                                <el-option label="女" value="女" />
                            </el-select>
                        </div>
                        <div class="account-save-button">
                            <el-button type="primary" @click="saveSex">保存</el-button>
                        </div>
                    </div>
                    <div class="account-info-wrapped">
                        <span>用户身份：</span>
                        <div class="account-info-content">
                            <el-input v-model="userStore.identity" disabled></el-input>
                        </div>
                    </div>
                    <div class="account-info-wrapped">
                        <span>用户部门：</span>
                        <div class="account-info-content">
                            <el-input v-model="userStore.department" disabled></el-input>
                        </div>
                    </div>
                    <div class="account-info-wrapped">
                        <span>用户邮箱：</span>
                        <div class="account-info-content">
                            <el-input v-model="userStore.email"></el-input>
                        </div>
                        <div class="account-save-button">
                            <el-button type="primary" @click="saveEmail">保存</el-button>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="公司信息" name="second" v-if="userStore.identity == '超级管理员'">
                    <div class="account-info-wrapped">
                        <span>公司名称：</span>
                        <div class="account-info-content">
                            <el-input v-model="companyName"></el-input>
                        </div>
                        <div class="account-save-button">
                            <el-button type="primary" @click="resetCompanyName">编辑公司名称</el-button>
                        </div>
                    </div>
                    <div class="account-info-wrapped">
                        <span>公司介绍：</span>
                        <div class="account-save-button">
                            <el-button type="success" @click="openEditor(1)">编辑公司介绍</el-button>
                        </div>
                    </div>
                    <div class="account-info-wrapped">
                        <span>公司架构：</span>
                        <div class="account-save-button">
                            <el-button type="success" @click="openEditor(2)">编辑公司架构</el-button>
                        </div>
                    </div>
                    <div class="account-info-wrapped">
                        <span>公司战略：</span>
                        <div class="account-save-button">
                            <el-button type="success" @click="openEditor(3)">编辑公司战略</el-button>
                        </div>
                    </div>
                    <div class="account-info-wrapped">
                        <span>公司高层：</span>
                        <div class="account-save-button">
                            <el-button type="success" @click="openEditor(4)">编辑公司高层</el-button>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="首页管理" name="third" v-if="userStore.identity == '超级管理员'">
                    <div class="home-wrapped">
                        <!-- 提示 -->
                        <div class="tips">
                            <span>
                                提示: 点击图片框进行切换首页轮播图
                            </span>
                        </div>
                        <!-- 轮播图 -->
                        <div class="swiper-wrapped" v-for="(item, index) in swiperData" :key="index">
                            <div class="swiper-name">轮播图{{ index + 1 }}:&nbsp;&nbsp;</div>
                            <el-upload class="avatar-uploader" :action="swiperUrl"
                                :show-file-list="false" :on-success="handleSwiperSuccess"
                                :before-upload="beforeAvatarUpload" :data='item'>
                                <template #trigger>
                                    <img v-if="imageUrl[index]" :src="imageUrl[index]" class="swiper" />
                                    <img v-else src="@/assets/mark.png" alt="">
                                </template>
                            </el-upload>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="其他设置" name="fourth">
                    <div class="other-set">
                        <div class="department-set" v-if="userStore.identity == '超级管理员'">
                            <span>部门设置</span>
                            <el-tag v-for="tag in dynamicTags" :key="tag" class="mx-1" closable
                                :disable-transitions="false" @close="handleClose(tag)">
                                {{ tag }}
                            </el-tag>
                            <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1 w-20"
                                size="small" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
                            <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
                                + 添加部门
                            </el-button>
                        </div>
                        <div class="product-set" v-if="userStore.identity == '超级管理员' || userStore.identity == '产品管理员'">
                            <span>产品设置</span>
                            <el-tag v-for="tag in dynamicProductTags" :key="tag" class="mx-1" closable
                                :disable-transitions="false" @close="handleProductClose(tag)">
                                {{ tag }}
                            </el-tag>
                            <el-input v-if="inputProductVisible" ref="InputProductRef" v-model="inputProductValue"
                                class="ml-1 w-20" size="small" @keyup.enter="handleInputProductConfirm"
                                @blur="handleInputProductConfirm" />
                            <el-button v-else class="button-new-tag ml-1" size="small" @click="showProductInput">
                                + 添加产品
                            </el-button>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
    <UserChangePassword ref="changeP"></UserChangePassword>
    <Editor ref="editorP"></Editor>
</template>

<script setup lang="ts">
import breadCrumb from '../../components/bread_crumb.vue'
import { ref, reactive, nextTick, toRaw } from 'vue';
import type { InputInstance } from 'element-plus'
import { useUserInfoStore } from '@/store/userinfoStore'
import { bind, changeName, changeSex, changeEmail } from '@/api/userinfo';
import UserChangePassword from './components/change_password.vue'

import type { TabsPaneContext } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import { ElInput } from 'element-plus'

import {
    getCompanyName, changeCompanyName,
    getAllSwiper, setDepartment, getDepartment,
    setProduct, getProduct
} from '../../api/setting';

import { bus } from '../../utils/mitt'
import Editor from './components/editor.vue';

const breadcrumb = ref()

const item = ref({
    first: '系统设置'
})

const userStore = useUserInfoStore()

const avatarUrl = ref(`${import.meta.env.VITE_API_BASEURL}/user/uploadAvatar`)
const swiperUrl = ref(`${import.meta.env.VITE_API_BASEURL}/set/uploadSwiper`)

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response
) => {
    if (response.status == 0) {
        userStore.$patch({
            imageUrl: response.url
        })
        ElMessage({
            message: '头像更新成功',
            type: 'success',
        });

        (async () => {
            const res = await bind(userStore.account, response.onlyId, response.url)
            //console.log(res)
        })()
    } else {
        ElMessage.error('头像更新失败')
    }
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}

interface userData {
    account: number | string | null,
    name: string,
    sex: string,
    identity: string,
    department: string,
    email: string
}

const userData = reactive<userData>({
    account: null,
    name: '',
    sex: '',
    identity: '',
    department: '',
    email: ''
})

const changeP = ref()
const openChangePassword = () => {
    changeP.value.open()
}

const saveName = async () => {
    const res = await changeName(localStorage.getItem('id'), userStore.name)
    console.log(res)
    if (res.data.status == 0) {
        ElMessage({
            message: '修改成功',
            type: 'success',
        })
    } else {
        ElMessage.error('修改失败,请重新尝试')
    }
}

const saveSex = async () => {
    const res = await changeSex(localStorage.getItem('id'), userStore.sex)
    if (res.data.status == 0) {
        ElMessage({
            message: '修改成功',
            type: 'success',
        })
    } else {
        ElMessage.error('修改失败,请重新尝试')
    }
}

const saveEmail = async () => {
    const res = await changeEmail(localStorage.getItem('id'), userStore.email)
    if (res.data.status == 0) {
        ElMessage({
            message: '修改成功',
            type: 'success',
        })
    } else {
        ElMessage.error('修改失败,请重新尝试')
    }
}

const companyName = ref()
const fetchCompanyName = async () => {
    const res = await getCompanyName()
    companyName.value = res.data
}
fetchCompanyName()

const resetCompanyName = async () => {
    const res = await changeCompanyName(companyName.value)
    if (res.data.status == 0) {
        ElMessage({
            message: '修改公司名称成功',
            type: 'success',
        })
    } else {
        ElMessage.error('修改公司名称失败，请重新输入！')
    }
}

const editorP = ref()
const openEditor = (id: number) => {
    // 第一个参数是 标记,第二个参数要传入的值
    bus.emit('editorTitle', id)
    editorP.value.open()
}

const swiperData = [{
    name: 'swiper1'
}, {
    name: 'swiper2'
}, {
    name: 'swiper3'
}, {
    name: 'swiper4'
}, {
    name: 'swiper5'
}, {
    name: 'swiper6'
}]
// 上传轮播图成功
const handleSwiperSuccess: UploadProps['onSuccess'] = (
    response
) => {
    returnAllSwiper()
}
// 轮播图
const imageUrl = ref([])
// 获取轮播图
const returnAllSwiper = async () => {
    const res = await getAllSwiper()
    imageUrl.value = res.data
}
returnAllSwiper()


const inputValue = ref('')
const dynamicTags = ref<string[]>([])
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()

const fetchDepartment = async () => {
    //dynamicTags.value = (await getDepartment()).data

    const res = (await getDepartment())

    if (Array.isArray(res.data)) {
        dynamicTags.value = res.data
    } else if (typeof res.data === 'string') {
        const normalized = res.data.replace(/'/g, '"')
        dynamicTags.value = JSON.parse(normalized)
    }


    //console.log(dynamicTags.value)
    //console.log(JSON.stringify(toRaw(res)))
    //dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
    //console.log(JSON.stringify(toRaw(dynamicTags.value)))

}
fetchDepartment()

const handleClose = async (tag: string) => {
    dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
    const res = await setDepartment(JSON.stringify(toRaw(dynamicTags.value)))
    if (res.data.status == 0) {
        ElMessage({
            message: '删除部门成功',
            type: 'success',
        })
    } else {
        ElMessage.error('删除部门失败，请重新输入！')
    }
}

const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        InputRef.value!.input!.focus()
    })
}

const handleInputConfirm = async () => {
    if (inputValue.value) {
        dynamicTags.value.push(inputValue.value)
        const res = await setDepartment(JSON.stringify(toRaw(dynamicTags.value)))
        if (res.data.status == 0) {
            ElMessage({
                message: '添加部门设置成功',
                type: 'success',
            })
        } else {
            ElMessage.error('添加部门失败，请重新输入！')
        }
    }
    inputVisible.value = false
    inputValue.value = ''
}

///////////////////////////

const inputProductValue = ref('')
const dynamicProductTags = ref<string[]>([])
const inputProductVisible = ref(false)
const InputProductRef = ref<InstanceType<typeof ElInput>>()

const handleProductClose = async (tag: string) => {
    dynamicProductTags.value.splice(dynamicProductTags.value.indexOf(tag), 1)
    const res = await setProduct(JSON.stringify(toRaw(dynamicProductTags.value)))
    if (res.data.status == 0) {
        ElMessage({
            message: '删除产品成功',
            type: 'success',
        })
    } else {
        ElMessage.error('删除产品失败，请重新输入！')
    }
}

const showProductInput = () => {
    inputProductVisible.value = true
    nextTick(() => {
        InputProductRef.value!.input!.focus()
    })
}

const handleInputProductConfirm = async () => {
    if (inputProductValue.value) {
        dynamicProductTags.value.push(inputProductValue.value)
        const res = await setProduct(JSON.stringify(toRaw(dynamicProductTags.value)))
        if (res.data.status == 0) {
            ElMessage({
                message: '添加产品设置成功',
                type: 'success',
            })
        } else {
            ElMessage.error('添加产品失败，请重新输入！')
        }
    }
    inputProductVisible.value = false
    inputProductValue.value = ''
}

const fetchProduct = async () => {
    //dynamicTags.value = (await getDepartment()).data

    const res = (await getProduct())

    if (Array.isArray(res.data)) {
        dynamicProductTags.value = res.data
    } else if (typeof res.data === 'string') {
        const normalized = res.data.replace(/'/g, '"')
        dynamicProductTags.value = JSON.parse(normalized)
    }


    //console.log(dynamicTags.value)
}
fetchProduct()
</script>

<style lang="scss" scoped>
// 外壳
.common-wrapped {
    padding: 8px;
    background: #f5f5f5;
    // 计算 减去了头部还有面包屑 + 2X8=16边距
    height: calc(100vh - 101px);

    // 内容
    .common-content {
        padding: 0 10px;
        height: 100%;
        background: #fff;

        // 账号信息外壳
        .account-info-wrapped {
            display: flex;
            align-items: center;
            padding-left: 50px;
            margin-bottom: 24px;
            font-size: 14px;

            // 账号信息内容
            .account-info-content {
                margin-left: 24px;
                margin-right: 16px;
            }

            // 按钮
            .account-save-button {
                margin-left: 16px;
            }
        }

        // 首页管理外壳
        .home-wrapped {
            padding-left: 50px;
            display: flex;
            flex-direction: column;

            // 提示
            .tips {
                display: flex;
                align-items: center;
                margin-bottom: 8px;

                span {
                    font-size: 14px;
                    color: silver;
                }
            }

            // 轮播图
            .swiper-wrapped {
                display: flex;
                margin-bottom: 16px;

                // 轮播图名字
                .swiper-name {
                    font-size: 14px;
                    margin-bottom: 24px;
                }

                .swiper {
                    width: 336px;
                    height: 96px;
                }
            }
        }

        .demo-tabs {
            flex: 1;
            display: flex;
            flex-direction: column;
            min-height: 0;

            :deep(.el-tabs__content) {
                flex: 1;
                overflow-y: auto; // 关键：只有内容区域可滚动
                background: #fff;

                .el-tab-pane {
                    background: #fff;
                    min-height: 100%;
                }
            }
        }
    }
}

// 其他设置
.other-set {
    padding-left: 50px;
    font-size: 14px;

    .department-set {
        margin-bottom: 24px;

        span {
            margin-right: 24px;
        }
    }

    .product-set {

        span {
            margin-right: 24px;
        }
    }
}

// 标签页
//.demo-tabs>.el-tabs__content {
//    padding: 32px;
//    color: #6b778c;
//    font-size: 32px;
//    font-weight: 600;
//    overflow-y: auto;
//}

// 上传头像
.avatar-uploader .avatar {
    width: 100px;
    height: 100px;
    display: block;
}

// 输入框的长度
:deep(.el-input) {
    width: 240px;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    text-align: center;
}
</style>