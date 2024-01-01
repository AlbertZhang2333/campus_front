import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import App from './App.vue'
import router from './router'
import '@/css/global.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
import axios from 'axios'

Vue.prototype.$axios = axios;
Vue.prototype.$httpUrl = 'http://localhost:8081/';

import Chat from 'vue-beautiful-chat'
import store from "@/store";
Vue.use(Chat)


const axiosInstance = axios.create();

// 添加请求拦截器
axiosInstance.interceptors.request.use(
    (config) => {
        const storedToken = localStorage.getItem('passToken');
        if (storedToken) {
            config.headers['passToken'] = `${storedToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 在应用程序中使用这个全局的 Axios 实例，而不是直接使用 axios
export default axiosInstance;

new Vue({
    store,
    router,
    render: h=>h(App)
}).$mount('#app')
