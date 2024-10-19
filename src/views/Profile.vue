<template>
  <div class="profile-page">
    <h1>个人信息</h1>

    <div v-if="!isAuthenticated" class="login-section">
      <p>您还未登录</p>
      <router-link to="/login" class="login-btn">登录</router-link>
    </div>

    <div v-else>
      <div class="user-info">
        <img :src="user.avatarUrl" alt="用户头像" class="avatar" />
        <div class="info">
          <p><strong>用户名:</strong> {{ user.username }}</p>
          <p><strong>邮箱:</strong> {{ user.email }}</p>
          <p><strong>绑定时间:</strong> {{ user.bindDate }}</p>
        </div>
      </div>

      <div class="options">
        <!-- 功能选项 -->
        <div @click="toggleEditProfile" class="option-item">更改个人资料</div>
        <div v-if="showEditProfile" class="edit-profile">
          <form @submit.prevent="updateProfile" class="profile-form">
            <input v-model="newAvatarUrl" type="text" placeholder="新的头像URL" />
            <input v-model="newUsername" type="text" placeholder="新的用户名" />
            <button type="submit" class="action-btn">保存更改</button>
          </form>
          <p v-if="profileError" class="error">{{ profileError }}</p>
        </div>

        <div @click="toggleOrders" class="option-item">订单列表</div>
        <div v-if="showOrders" class="order-list">
          <ul>
            <li v-for="order in orders" :key="order.id">{{ order.name }} - {{ order.date }}</li>
          </ul>
        </div>

        <div @click="togglePasswordChange" class="option-item">安全设置</div>
        <div v-if="showPasswordChange" class="update-password">
          <form @submit.prevent="updatePassword" class="password-form">
            <input v-model="oldPassword" type="password" placeholder="旧密码" required />
            <input v-model="newPassword" type="password" placeholder="新密码" required />
            <button type="submit" class="action-btn">修改密码</button>
          </form>
          <p v-if="passwordError" class="error">{{ passwordError }}</p>
        </div>

        <div @click="switchAccount" class="option-item">更换账号</div>
        <div @click="logout" class="option-item">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      passwordError: '',
      profileError: '',
      orders: [],
      showOrders: false,
      showPasswordChange: false,
      showEditProfile: false,
      newAvatarUrl: '',
      newUsername: ''
    };
  },
  computed: {
    isAuthenticated() {
      // 从 Vuex 获取登录状态
      return this.$store.getters.isAuthenticated;
    },
    user() {
      // 从 Vuex 获取当前用户信息
      return this.$store.state.user;
    }
  },
  methods: {
    toggleEditProfile() {
      this.showEditProfile = !this.showEditProfile;
    },
    async updateProfile() {
      try {
        if (this.newAvatarUrl) {
          await axios.post('/user/binduseravatar', {
            avatarUrl: this.newAvatarUrl
          });
        }

        if (this.newUsername) {
          await axios.post('/user/bindusername', {
            username: this.newUsername
          });
        }

        alert('个人资料更新成功');
        this.fetchUserInfo();
        this.showEditProfile = false;
      } catch (error) {
        this.profileError = '更新个人资料时发生错误，请稍后重试';
        console.error('Update profile error:', error);
      }
    },
    fetchUserInfo() {
      // 从服务器获取并更新用户信息
    },
    toggleOrders() {
      this.showOrders = !this.showOrders;
      if (this.showOrders && this.orders.length === 0) {
        this.fetchOrders();
      }
    },
    togglePasswordChange() {
      this.showPasswordChange = !this.showPasswordChange;
    },
    async logout() {
      // 调用 Vuex 的登出逻辑
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
    switchAccount() {
      this.logout();
    },
    async fetchOrders() {
      try {
        const response = await axios.get('/user/orderlist');
        this.orders = response.data.orders;
      } catch (error) {
        console.error('获取订单列表失败:', error);
      }
    },
    async updatePassword() {
      try {
        const response = await axios.post('/user/updatePassword', {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        });
        if (response.data.code === '200') {
          alert('密码修改成功');
        } else {
          this.passwordError = '密码修改失败: ' + response.data.message;
        }
      } catch (error) {
        this.passwordError = '修改密码时发生错误，请稍后重试';
        console.error('修改密码错误:', error);
      }
    }
  }
};
</script>

<style scoped>
.profile-page {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.user-info {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 15px;
}

.info {
  text-align: left;
  flex-grow: 1;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center; /* 中心对齐 */
}

.option-item {
  background-color: #666;
  color: white;
  padding: 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;
  width: 100%; /* 占满整行 */
  max-width: 400px; /* 限制最大宽度，使得按钮保持一致 */
}

.option-item:hover {
  background-color: #555;
}

.order-list, .update-password, .edit-profile {
  background-color: #eef2f7;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}

.profile-form, .password-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
