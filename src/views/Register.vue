<template>
  <div class="auth-page">
    <h1>注册</h1>
    <form @submit.prevent="register" class="auth-form">
      <input type="text" v-model="loginname" placeholder="用户名" required />
      <input type="password" v-model="password" placeholder="密码" required />
      <button class="button" type="submit">注册</button>
    </form>
    <p>已有账号？<router-link to="/login" class="link">登录</router-link></p>

    <!-- 错误/成功提示 -->
    <p v-if="message" :class="{ error: isError, success: !isError }">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import { showSuccessToast, showFailToast } from "vant";
import router from "@/router";

export default {
  data() {
    return {
      loginname: '',
      password: '',
      message: '',
      isError: false
    };
  },
  methods: {
    async register() {
      if (!this.loginname || !this.password) {
        this.setMessage('请完整填写注册信息', true);
        return;
      }

      try {
        const response = await axios.post('/user/reg', {
          loginname: this.loginname,
          password: this.password
        });

        if (response.data.code == 200) {
          showSuccessToast(response.data.message);
          this.setMessage('注册成功！', false);

          setTimeout(() => {
            router.push("/login");
          }, 1000);
        } else {
          showFailToast(response.data.message);
          this.setMessage(response.data.message, true);
        }
      } catch (error) {
        this.setMessage('注册时发生错误，请稍后重试', true);
        console.error('Error during registration:', error);
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
/* 与Login.vue共享相同样式 */
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
