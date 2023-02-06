import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './modules'
import './assets/css/index.css'
import axios from 'axios'
import { createPinia } from 'pinia';
import mainCustomPlugin from './plugins/main-custom-plugins'
import { createAuth } from '@websanova/vue-auth';
import driverAuthBearer from '@websanova/vue-auth/dist/drivers/auth/bearer.esm.js';
import driverHttpAxios from '@websanova/vue-auth/dist/drivers/http/axios.1.x.esm.js';
import driverRouterVueRouter from '@websanova/vue-auth/dist/drivers/router/vue-router.2.x.esm.js';
import { NOTIFICATION_MESSAGE } from './composables/notification-message'
import infiniteScroll from 'vue3-infinite-scroll-better'
import mitt from 'mitt'
import CKEditor from '@ckeditor/ckeditor5-vue';

const pinia = createPinia()
const emitter = mitt();
var auth = createAuth({
    plugins: {
        http: axios,
        router: router
    },
    drivers: {
        http: driverHttpAxios,
        auth: driverAuthBearer,
        router: driverRouterVueRouter,
    },
    tokenStore: ['localStorage'],
    options: {
        fetchData: { enabled: false },
        rolesKey: 'type',
        notFoundRedirect: { name: 'user-account' },
    }
});

const app = createApp(App);
app.use(auth);
app.use(pinia)
app.use(mainCustomPlugin)
app.use(infiniteScroll)
app.use(emitter)
app.use(CKEditor)
app.provide('NOTIFICATION_MESSAGE', NOTIFICATION_MESSAGE)
app.use(store).use(router).mount('#app')
