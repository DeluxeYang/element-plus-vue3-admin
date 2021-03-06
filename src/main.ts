// @ts-ignore
import { createApp } from 'vue'
import App from '/@/App.vue'
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import direct from '/@/directive/action'
import dialogDrag from '/@/directive/dialogDrag'
import router from '/@/router/index'
import { store } from '/@/store'
import '/@/permission'
// import '/@/mock/index'

import 'element-plus/lib/theme-chalk/index.css'
import 'element-plus/lib/theme-chalk/display.css'
import 'nprogress/nprogress.css'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '/@/styles/index.scss' // global css

import svgIcon from '/@/components/SvgIcon/index.vue'
import permsButton from '/@/components/PermsButton/index.vue'


// @ts-ignore
const app = createApp(App)
direct(app)
dialogDrag(app)
app.use(ElementPlus, { locale })
app.use(router)
app.use(store)
app.component('SvgIcon', svgIcon)
app.component('PermsButton', permsButton)
app.mount('#app')
