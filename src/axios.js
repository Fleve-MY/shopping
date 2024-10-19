import axios from 'axios';
import store from './store/store';

// 添加请求拦截器，自动附加 token 到请求头
axios.interceptors.request.use(
  (config) => {
    const token = store.state.token; // 从 Vuex 获取 token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 添加 token 到请求头
    } else {
      console.error("Token missing, unable to authenticate request.");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
