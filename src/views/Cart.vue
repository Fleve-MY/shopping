<template>
  <div class="cart-page">
    <h1>我的购物车</h1>

    <div v-if="loading" class="loading">加载中...</div>

    <div v-if="!loading && cartItems.length">
      <div class="cart-item" v-for="item in cartItems" :key="item.id">
        <img :src="item.image" alt="item.name" class="cart-item-image" />
        <div class="cart-item-details">
          <h3>{{ item.name }}</h3>
          <p>单价: ¥{{ item.price }}</p>
          <p>数量: {{ item.quantity }}</p>
          <div class="cart-item-actions">
            <button @click="removeFromCart(item.id)">移除</button>
            <button @click="increaseQuantity(item.id)">增加</button>
            <button @click="decreaseQuantity(item.id)">减少</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!loading && !cartItems.length" class="empty-cart">购物车为空</div>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from '@/axios'; // 使用配置了拦截器的 Axios

export default {
  data() {
    return {
      cartItems: [], // 购物车内容
      loading: true,
      error: null, // 错误信息
    };
  },
  methods: {
    // 获取购物车商品列表
    async fetchCartItems() {
      try {
        const response = await axios.get('/cart/list'); // API 路径需要检查是否正确
        this.cartItems = response.data.data || [];
      } catch (error) {
        console.error('获取购物车失败:', error);
        this.error = '无法获取购物车，请稍后重试。';
      } finally {
        this.loading = false;
      }
    },

    // 从购物车中移除商品
    async removeFromCart(itemId) {
      try {
        await axios.post('/cart/remove', {productId: itemId});
        this.cartItems = this.cartItems.filter(item => item.id !== itemId); // 更新购物车数据
        alert('商品已从购物车移除');
      } catch (error) {
        console.error('移除商品失败:', error);
        alert('移除商品失败，请稍后重试。');
      }
    },

    // 增加商品数量
    async increaseQuantity(itemId) {
      try {
        await axios.post('/cart/increase', {productId: itemId});
        const item = this.cartItems.find(item => item.id === itemId);
        item.quantity += 1; // 更新商品数量
        alert('商品数量增加');
      } catch (error) {
        console.error('增加商品数量失败:', error);
        alert('增加商品数量失败，请稍后重试。');
      }
    },

    // 减少商品数量
    async decreaseQuantity(itemId) {
      try {
        await axios.post('/cart/decrease', {productId: itemId});
        const item = this.cartItems.find(item => item.id === itemId);
        if (item.quantity > 1) {
          item.quantity -= 1; // 减少商品数量
        }
        alert('商品数量减少');
      } catch (error) {
        console.error('减少商品数量失败:', error);
        alert('减少商品数量失败，请稍后重试。');
      }
    },
  },
  mounted() {
    this.fetchCartItems(); // 页面加载时获取购物车数据
  },
};
</script>

<style scoped>
.cart-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.cart-item {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cart-item-image {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  margin-right: 15px;
}

.cart-item-details {
  flex-grow: 1;
  text-align: left;
}

.cart-item-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

button {
  background-color: #666;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #444;
}

.loading, .empty-cart, .error {
  font-size: 18px;
  color: #999;
}
</style>
