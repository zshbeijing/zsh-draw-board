import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue'
import anDV from "ant-design-vue"
import App from './App.vue'

const app = createApp(App)

app.use(createPinia()).component("svg-icon",SvgIcon).use(anDV)

app.mount('#app')
