import { createApp } from 'vue';
import App from './App.vue';
import Vant from 'vant';
import router from './router';
import store from './store/store';
import axios from 'axios';  // 引入 axios

// 全局配置 axios 基础 URL
axios.defaults.baseURL = 'http://localhost:3001/api';  // 替换为后端 API 地址
// 将 axios 挂载到 Vue 原型上，全局可通过 this.$axios 调用
const app = createApp(App);
app.config.globalProperties.$axios = axios;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // 或从 Vuex 获取
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


app.use(Vant)
app.use(router);
app.use(store);
app.mount('#app');
