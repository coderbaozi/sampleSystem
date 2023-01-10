import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import router from './router'
import registerStore from './store'
import registerIcons from './global/register-icons'

//针对Elmessage 和 Elloading等组件引入样式
const app = createApp(App)
app.use(registerStore)
app.use(router)
app.use(registerIcons)
app.mount('#app')
