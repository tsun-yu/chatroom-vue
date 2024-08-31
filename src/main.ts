import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { BiPersonCircle, OiPaperAirplane } from 'oh-vue-icons/icons';

addIcons(BiPersonCircle, OiPaperAirplane);

const app = createApp(App)

app.use(router)

app.component('v-icon', OhVueIcon).mount('#app')
