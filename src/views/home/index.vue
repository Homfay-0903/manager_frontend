<template>
    <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
    <div class="home-wrapped">
        <div class="swiper-wrapped">
            <el-carousel :interval="4000" indicator-position="outside" type="card" height="200px">
                <el-carousel-item v-for="(item, index) in imageUrl" :key="index">
                    <img class="swiper" :src="item" />
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="layout-wrapped">
            <el-row :gutter="20">
                <el-col :span="6" v-for="(item, index) in companyIntroduce" :key="index"
                    @click="openIntroduce(index + 1)">
                    <div class="company-message-area">
                        <span>{{ item.set_name }}</span>
                        <div v-html='item.set_text' class="company-introduce"></div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="two-table-wrapped">
            <div class="company-notice">
                <span class="title">公司公告</span>
                <el-table :data="companyData" style="width: 100%" :show-header='false' @row-dblclick="openCompany">
                    <el-table-column prop="message_title" label="公告主题">
                        <template #default='{ row }'>
                            <div class="message_title">{{ row.message_title }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="message_level" label="等级">
                        <template #default='{ row }'>
                            <el-tag class="mx-1" round v-if="row.message_level == '一般'">{{ row.message_level }}</el-tag>
                            <el-tag type="warning" class="mx-1" round v-if="row.message_level == '重要'">{{
                                row.message_level }}</el-tag>
                            <el-tag type="danger" class="mx-1" round v-if="row.message_level == '必要'">{{
                                row.message_level }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="message_publish_department" label="发布部门" />
                    <el-table-column prop="message_publish_time" label="发布时间" width="200">
                        <template #default="{ row }">
                            <div>{{ row.message_publish_time?.slice(0, 10) }}</div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="system-message">
                <span class="title">系统消息</span>
                <el-table :data="systemData" style="width: 100%" :show-header='false' @row-dblclick="openSysterm">
                    <el-table-column prop="message_title" label="公告主题" />
                    <el-table-column prop="message_publish_time" label="发布时间" width="200">
                        <template #default="{ row }">
                            <div>{{ row.message_publish_time?.slice(0, 10) }}</div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
    <Introduce ref="introduceP"></Introduce>
    <CommonMsg ref="common_msg"></CommonMsg>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import breadCrumb from '../../components/bread_crumb.vue'
import { getAllSwiper, getAllCompanyIntroduce } from '../../api/setting';
import { companyMessageList, systemMessageList } from '@/api/message'
import Introduce from './components/introduce.vue'
import CommonMsg from '../../components/common_msg.vue';
import { bus } from "@/utils/mitt.js"

const companyData = ref()
const systemData = ref()
const getMessageList = async () => {
    companyData.value = (await companyMessageList()).data
    systemData.value = (await systemMessageList()).data
}
getMessageList()

const common_msg = ref()
const openCompany = (row: any) => {
    bus.emit('homeCompany', row)
    common_msg.value.open()
}
const openSysterm = (row: any) => {
    bus.emit('homeSystem', row)
    common_msg.value.open()
}

const item = ref({
    first: '首页'
})

const imageUrl = ref([])
const fetchAllSwiper = async () => {
    const res = await getAllSwiper()
    imageUrl.value = res.data
}
fetchAllSwiper()

const companyIntroduce = ref([])
const fetchCompanyIntroduce = async () => {
    const res = await getAllCompanyIntroduce()
    const [name, ...introduce] = res.data
    companyIntroduce.value = introduce
}
fetchCompanyIntroduce()

const introduceP = ref()
const openIntroduce = (id) => {
    bus.emit('introduce', id)
    introduceP.value.open()
}

</script>

<style lang="scss" scoped>
@mixin table-class {
    height: 220px;
    width: 48%;
    display: flex;
    flex-direction: column;

}

// 首页外壳
.home-wrapped {
    padding: 8px;
    height: calc(100vh - 101px);
    background: #f5f5f5;
    display: flex;
    flex-direction: column;

    // 轮播图外壳
    .swiper-wrapped {
        padding: 0 20px;
        background: #fff;
        margin-bottom: 8px;

        .swiper {
            width: 100%;
            height: 100%;
        }
    }

    // 栅格布局外壳
    .layout-wrapped {
        padding: 5px;
        margin-bottom: 8px;
        background: #fff;

        // 公司信息区域
        .company-message-area {
            background: #f5f5f5;
            height: 145px;
            padding: 8px;
            cursor: pointer;

            span {
                border-bottom: 1px solid #409eff;
                font-size: 14px;
            }

            .company-introduce {
                text-indent: 24px;
                font-size: 14px;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 3;
                display: -webkit-box;
                -webkit-box-orient: vertical;
            }
        }

        .company-message-area:hover {
            cursor: pointer;
            background-color: #eef5ff;
        }
    }

    // 表格外壳
    .two-table-wrapped {
        height: 220px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background: #fff;

        // 公司公告
        .company-notice {
            @include table-class
        }

        // 系统消息
        .system-message {
            @include table-class
        }

        .title {
            font-size: 14px;
            margin-bottom: 5px;
            border-bottom: 1px solid #ea0709;
        }
    }
}

.message_title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

// 轮播图默认样式
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>
