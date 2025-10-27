import {
  createApp
} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import router from './router'

import 'virtual:svg-icons-register'
import '@/assets/css/common.scss'

import pinia from './store'

import './guardian'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus, {
  locale: zhCn,
})

app.use(pinia)

import { useMenu } from "@/store/menuStore";
const menuRouter = useMenu()
menuRouter.addRouter()

app.use(router).mount('#app')