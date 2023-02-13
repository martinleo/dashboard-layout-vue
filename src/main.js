import { createApp } from 'vue'
import App from './App.vue'
import DashboardLayout from './index'

const app = createApp(App);
app.use(DashboardLayout)

app.mount('#app')
