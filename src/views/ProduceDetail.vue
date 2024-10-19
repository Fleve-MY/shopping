<template>
  <div class="product-detail-page">
    <button @click="goBack" class="back-button">返回首页</button>

    <div v-if="loading" class="loading">加载中...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="product" class="product-container">
      <div class="main-section">
        <aside class="sidebar">
          <h2>{{ product.proname }}</h2>
          <p><strong>价格:</strong> ¥{{ product.originprice }}</p>
          <p><strong>折扣:</strong> {{ product.discount }}%</p>
          <p><strong>品牌:</strong> {{ product.brand }}</p>
          <p><strong>类别:</strong> {{ product.category }}</p>
          <p><strong>库存:</strong> {{ product.stock }}</p>
          <p><strong>销量:</strong> {{ product.sales }}</p>
          <button @click="addToCart(product)" class="cart-button">加入购物车</button>
        </aside>

        <section class="main-content">
          <div class="carousel">
            <img :src="currentImage" :alt="product.proname" class="carousel-image" />
            <button v-if="product.imgs.length > 1" class="prev-button" @click="prevImage">&#10094;</button>
            <button v-if="product.imgs.length > 1" class="next-button" @click="nextImage">&#10095;</button>
          </div>

          <div class="description-section">
            <h3>描述</h3>
            <p>{{ product.desc }}</p>
          </div>
        </section>
      </div>

      <div class="comment-summary-section">
        <h3>评论</h3>
      </div>

      <div>
       <button @click="goToComments">查看更多评论</button>
      </div>

      <div class="image-gallery-section">
        <h3>图片集</h3>
        <div class="image-gallery">
          <img
            v-for="(img, index) in product.imgs"
            :key="index"
            :src="img"
            alt="商品图片"
            class="gallery-image"
            @click="openModal(index)"
          />
        </div>
      </div>

      <div v-if="isModalOpen" class="modal" @click.self="closeModal">
        <img class="modal-content" :src="modalImage" :alt="product.proname" />
        <span class="close" @click="closeModal">&times;</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      product: null,
      loading: true,
      error: null,
      currentImageIndex: 0,
      isModalOpen: false,
      modalImage: ''
    };
  },
  computed: {
    currentImage() {
      if (this.product && this.product.imgs.length > 0) {
        return this.product.imgs[this.currentImageIndex];
      }
      return '';
    }
  },
  methods: {
    goToComments() {
      this.$router.push('/comments');
    },
    async fetchProductDetails(proid) {
      try {
        const response = await axios.get(`/pro/detail/${proid}`);
        this.product = response.data.data;
      } catch (error) {
        this.error = '获取商品详情失败';
        console.error('获取商品详情失败:', error);
      } finally {
        this.loading = false;
      }
    },
    async addToCart(product) {
      if (!product.proid) {
        alert('产品 ID 无效，无法添加到购物车。');
        return;
      }

      try {
        const response = await axios.post('/cart/add', {
          productId: product.proid,
          quantity: 1
        });

        console.log('Add to Cart Response:', response.data);

        if (response.data.code === '200') {
          alert('商品已加入购物车！');
        } else {
          alert(`无法加入购物车，错误信息: ${response.data.message}`);
        }
      } catch (error) {
        console.error('加入购物车失败:', error);
        alert('加入购物车失败，请稍后重试。');
      }
    },



    goBack() {
      this.$router.push({ path: '/' });
    },
    prevImage() {
      if (this.product.imgs.length > 0) {
        this.currentImageIndex =
          (this.currentImageIndex - 1 + this.product.imgs.length) % this.product.imgs.length;
      }
    },
    nextImage() {
      if (this.product.imgs.length > 0) {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.product.imgs.length;
      }
    },
    openModal(index) {
      this.modalImage = this.product.imgs[index];
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.modalImage = '';
    }
  },
  mounted() {
    const proid = this.$route.params.proid;
    this.fetchProductDetails(proid);
  }
};
</script>


<style scoped>
.product-detail-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  position: relative;
}

.back-button {
  position: fixed;
  top: 20px;
  left: 20px;
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  z-index: 1000;
  font-size: 16px;
}

.back-button:hover {
  background-color: #34495e;
}

.product-container {
  margin-top: 70px;
}

.main-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sidebar {
  background-color: #ecf0f1;
  padding: 20px;
  border-radius: 8px;
}

.sidebar h2 {
  margin-bottom: 15px;
  color: #2c3e50;
}

.sidebar p {
  margin: 8px 0;
  font-size: 16px;
  color: #34495e;
}

.cart-button {
  background-color: #999;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 15px;
  width: 100%;
  font-size: 16px;
}

.cart-button:hover {
  background-color: #888;
}

.main-content {
  flex: 1;
}

.carousel {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.carousel-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.prev-button,
.next-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(44, 62, 80, 0.7);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
}

.prev-button {
  left: 10px;
}

.next-button {
  right: 10px;
}

.prev-button:hover,
.next-button:hover {
  background-color: rgba(44, 62, 80, 0.9);
}

.description-section {
  margin-top: 20px;
}

.description-section h3 {
  margin-bottom: 10px;
  color: #2c3e50;
}

.description-section p {
  font-size: 16px;
  line-height: 1.6;
  color: #34495e;
}

.image-gallery-section {
  margin-top: 40px;
}

.image-gallery-section h3 {
  margin-bottom: 15px;
  color: #2c3e50;
}

.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
  justify-items: center;
}

.gallery-image {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.gallery-image:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.loading,
.error {
  font-size: 20px;
  color: #7f8c8d;
  text-align: center;
  margin-top: 100px;
}

.modal {
  display: flex;
  position: fixed;
  z-index: 2000;
  padding-top: 60px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.8);
  align-items: center;
  justify-content: center;
}

.modal-content {
  max-width: 90%;
  max-height: 80%;
  border-radius: 8px;
}

.close {
  position: absolute;
  top: 30px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: color 0.3s;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}
</style>
