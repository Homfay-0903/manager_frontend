<template>
    <div class="common-layout">
        <el-container class="full-height">
            <el-aside width="210px" class="aside-container">
                <el-menu class="el-menu-vertical-demo" router>
                    <div class="title">通用后台系统管理</div>
                    <el-menu-item index="/home">
                        <el-icon>
                            <House />
                        </el-icon>
                        <span>首页</span>
                    </el-menu-item>
                    <el-menu-item index="/overview" v-if="userStore.identity == '超级管理员'">
                        <el-icon>
                            <Document />
                        </el-icon>
                        <span>系统概览</span>
                    </el-menu-item>
                    <el-sub-menu index="3" v-if="userStore.identity == '超级管理员' || userStore.identity == '用户管理员'">
                        <template #title>
                            <el-icon>
                                <User />
                            </el-icon>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item-group title="管理员管理">
                            <el-menu-item index="/product_manage">产品管理员</el-menu-item>
                            <el-menu-item index="/users_manage">用户管理员</el-menu-item>
                            <el-menu-item index="/message_manage">消息管理员</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="员工管理">
                            <el-menu-item index="/user_list">用户列表</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="4"
                        v-if="userStore.identity == '超级管理员' || userStore.identity == '产品管理员' || userStore.identity == '用户'">
                        <template #title>
                            <el-icon>
                                <TakeawayBox />
                            </el-icon>
                            <span>产品管理</span>
                        </template>
                        <el-menu-item-group title="入库管理">
                            <el-menu-item index="/product_management">产品列表</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="出库管理">
                            <el-menu-item index="/out_product_manage_list">出库列表</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="5" v-if="userStore.identity == '消息管理员' || userStore.identity == '超级管理员'">
                        <template #title>
                            <el-icon>
                                <ChatSquare />
                            </el-icon>
                            <span>消息管理</span>
                        </template>
                        <el-menu-item-group title="消息管理">
                            <el-menu-item index="/message_list">消息列表</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="回收站">
                            <el-menu-item index="/recycle">回收站</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-menu-item index="/file">
                        <el-icon>
                            <Files />
                        </el-icon>
                        <span>合同管理</span>
                    </el-menu-item>
                    <el-menu-item index="/operation_log" v-if="userStore.identity == '超级管理员'">
                        <el-icon><icon-menu /></el-icon>
                        <span>操作日志</span>
                    </el-menu-item>
                    <el-menu-item index="/login_log" v-if="userStore.identity == '超级管理员'">
                        <el-icon>
                            <Histogram />
                        </el-icon>
                        <span>登录日志</span>
                    </el-menu-item>
                    <el-menu-item index="/set">
                        <el-icon>
                            <Tools />
                        </el-icon>
                        <span>系统设置</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container class="main-container">
                <el-header>
                    <span class="header-left-content">尊敬的{{ userStore.name }}欢迎您登录本系统</span>
                    <div class="header-right-content">
                        <el-badge :is-dot='msgStore.read_list.length > 0 ? true : false' class="item"
                            @click="openDepMsg">
                            <el-icon :size="20" class="message">
                                <Message />
                            </el-icon>
                        </el-badge>
                        <el-avatar :size="24" :src="userStore.imageUrl" />
                        <el-dropdown>
                            <span class="el-dropdown-link">
                                设置
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item>设置账号</el-dropdown-item>
                                    <el-dropdown-item>更改头像</el-dropdown-item>
                                    <el-dropdown-item @click="goLogin">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
    <depMsg ref="dep_msg"></depMsg>
</template>

<script setup lang="ts">
import {
    Menu as IconMenu,
} from '@element-plus/icons-vue'
//import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { reactive, ref, toRefs } from 'vue'
import { useUserInfoStore } from '@/store/userinfoStore'
import { useMsgStore } from '@/store/messageStore.js'
import depMsg from '../../components/depMsg.vue'

const userStore = useUserInfoStore()
const msgStore = useMsgStore()

const router = useRouter()

const dep_msg = ref()
const openDepMsg = () => {
    dep_msg.value.open()
    //console.log(msgStore.read_list.length)
}

const goLogin = () => {
    router.push('/login')
}

//const $route = useRoute()
</script>

<style lang="scss" scoped>
// 基础样式重置
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html,
body {
    height: 100%;
    overflow: hidden;
}

#app {
    height: 100vh; // 使用视口高度
    overflow: hidden;
}

.common-layout {
    height: 100vh; // 使用视口高度
    overflow: hidden;
}

// 整体容器使用flex布局
.full-height {
    height: 100vh; // 使用视口高度
    display: flex;
    flex-direction: row;
}

// 侧边栏样式 - 修复空白间隙
.aside-container {
    background: #2b303b;
    height: 100vh; // 固定高度
    overflow: hidden;

    .el-menu {
        background: #2b303b;
        width: 100%;
        border-right: 0;
        height: 100%;
        padding: 0; // 去除默认内边距，避免顶部/底部空白

        // 修复菜单项间隙
        .el-menu-item,
        :deep(.el-sub-menu__title) {
            height: 48px; // 统一高度
            line-height: 48px;
            margin: 0;
        }

        // 标题样式
        .title {
            padding: 20px;
            display: flex;
            justify-content: center;
            color: #fff;
            background: #2b303b;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            height: 64px; // 固定标题高度
        }

        .el-menu-item {
            color: #fff;

            // 激活状态样式
            &.is-active {
                background: #006eff;
                color: #fff;
            }
        }

        // 修复子菜单项间隙
        :deep(.el-menu-item-group) {
            .el-menu-item-group__title {
                padding: 8px 20px 4px;
                color: rgba(255, 255, 255, 0.7);
                font-size: 12px;
            }

            .el-menu-item {
                height: 40px;
                line-height: 40px;
                min-width: auto;
                padding-left: 50px !important; // 子菜单缩进
            }
        }
    }
}

// 主内容区域容器 - 修复滚动条问题
.main-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    /* 移除固定高度，避免与子元素叠加导致溢出 */
    /* height: 100vh; */
    /* 允许子项在flex容器内正确收缩，避免产生额外滚动条 */
    min-height: 0;
    overflow: hidden;
}

.el-header {
    height: 55px !important;
    background: #262f3e;
    color: #c1c6c8;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0; // 防止头部被压缩

    .header-left-content {
        font-size: 14px;
    }

    .header-right-content {
        width: 160px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
}

.el-main {
    --el-main-padding: 0;
    background-color: #f3f4fa;
    flex: 1;
    overflow-y: auto;
    /* 交由flex撑满剩余空间，避免calc误差导致出现滚动条 */
    /* height: calc(100vh - 55px); */
}

// 菜单交互样式
.el-menu-item:hover {
    background: #006eff;
}

// 子菜单样式
:deep(.el-sub-menu__title:hover) {
    background: #006eff;
}

:deep(.el-sub-menu__title) {
    color: #fff;
}

:deep(.el-menu--inline) {
    background: #2b303b;
}

// 移除默认的菜单项间隙
:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
    margin: 0;
}

// 徽章
.item {
    cursor: pointer;
}
</style>