<template>
    <el-dialog v-model="state.dialogFormVisible" :title="title" width="800px" destroy-on-close center>
        <el-container>
            <el-main>
                <div class="content" v-html="valueHtml"></div>
            </el-main>
        </el-container>
    </el-dialog>
</template>
<script lang="ts" setup>
import {
    onBeforeUnmount, ref, reactive
} from 'vue'
import { bus } from "@/utils/mitt.js"
import { getCompanyIntroduce } from '@/api/setting'
const title = ref()
const valueHtml = ref()
bus.on("introduce", async (id) => {
    if (id == 1) {
        title.value = '公司介绍'
        //const res = await getCompanyIntroduce('公司介绍')
        valueHtml.value = (await getCompanyIntroduce('公司介绍')).data
    }
    if (id == 2) {
        title.value = '公司架构'
        valueHtml.value = (await getCompanyIntroduce('公司架构')).data
    }
    if (id == 3) {
        title.value = '公司战略'
        valueHtml.value = (await getCompanyIntroduce('公司战略')).data
    }
    if (id == 4) {
        title.value = '公司高层'
        valueHtml.value = (await getCompanyIntroduce('公司高层')).data
    }
})
const state = reactive({
    dialogFormVisible: false,
});

// 暴露open方法
const open = () => {
    state.dialogFormVisible = true;
};
defineExpose({
    open,
});

// 取消订阅/监听
onBeforeUnmount(() => {
    bus.all.clear()
})
</script>

<style lang="scss" scoped>
.content {
    text-align: center;
}

:deep(.el-main) {
    min-height: 500px;
}
</style>