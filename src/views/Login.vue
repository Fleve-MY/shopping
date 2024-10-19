<template>
  <div class="auth-page">
    <h1>登录</h1>

    <form @submit.prevent="login" class="auth-form">
      <input type="text" v-model="username" placeholder="用户名" required />
      <input type="password" v-model="password" placeholder="密码" required />
      <button class="button" type="submit" :disabled="loading">
        {{ loading ? '登录中...' : '登录' }}
      </button>
    </form>

    <button class="button wx-button" @click="wechatLogin">
      使用微信登录
    </button>

    <p>没有账号？<router-link to="/register" class="link">注册</router-link></p>

    <p v-if="message" :class="{ error: isError, success: !isError }">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import { showSuccessToast } from "vant";

export default {
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      message: '',
      isError: false
    };
  },
  methods: {
    wechatLogin() {
      window.location.href = '/user/wxlogin';
    },
    async login() {
      if (!this.username || !this.password) {
        this.setMessage('请输入用户名和密码', true);
        return;
      }

      this.loading = true;
      this.setMessage('');

      try {
        const response = await axios.post('/user/login', {
          loginname: this.username,
          password: this.password,
        });

        if (response.data.code === '200') {
          const { token, userid } = response.data.data;
          const user = {
            userid,
            username: this.username,
            email: response.data.data.email || ''
          };

          // 存储 token 和用户信息到 Vuex
          this.$store.dispatch('login', { token, user });

          showSuccessToast(response.data.message || '登录成功');
          // 跳转到 Profile 页面
          this.$router.push("/profile").catch(err => console.error("跳转错误:", err));
        } else {
          this.setMessage(response.data.message || '未知错误', true);
        }
      } catch (error) {
        this.setMessage('登录时发生错误，请稍后重试', true);
        console.error('Error during login:', error);
      } finally {
        this.loading = false;
      }
    },
    setMessage(msg, isError = false) {
      this.message = msg;
      this.isError = isError;
    }
  }
};
</script>


<style scoped>
.auth-page {
  text-align: center;
  margin-top: 40px;
  max-width: 400px;
  margin: 0 auto;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input {
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #666;
  outline: none;
}

.button {
  background-color: #666;
  color: white;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:disabled {
  background-color: #ccc;
}

.button:hover:not(:disabled) {
  background-color: #666;
}

.wx-button {
  background-color: #1aad19;
  margin-top: 10px;
}

.link {
  color: #666;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.error {
  color: red;
  margin-top: 15px;
}

.success {
  color: green;
  margin-top: 15px;
}
</style>
