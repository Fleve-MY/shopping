<template>
  <div class="home-page">
    <!-- 搜索框 -->
    <div class="search-container">
      <input
        v-model="searchQuery"
        @input="handleSearch"
        placeholder="点此搜索商品"
        class="search-box"
      />
      <div>
        <img src="https://img12.360buyimg.com/babel/jfs/t1/88327/19/50133/40463/66f197ceF34482145/7cb98ab506d6901c.jpg.avif" alt="新品" class="search-icon" width="100%" height="100%">
      </div>
    </div>
    <h5 style="text-align: left;">精选和推荐</h5>
    <!-- 轮播图 -->
    <div class="container">
      <div class="scroll-inline-container">
        <div class="scroll-container">
          <img src="https://m.360buyimg.com/babel/jfs/t1/89828/21/49857/31395/66ea449dFa7d5313b/3efe5539e1617c07.jpg" class="scroll-item"/>
          <img src="https://m.360buyimg.com/babel/jfs/t1/89828/21/49857/31395/66ea449dFa7d5313b/3efe5539e1617c07.jpg" class="scroll-item"/>
          <img src="https://m.360buyimg.com/babel/jfs/t1/89828/21/49857/31395/66ea449dFa7d5313b/3efe5539e1617c07.jpg" class="scroll-item"/>
          <img src="https://m.360buyimg.com/babel/jfs/t1/89828/21/49857/31395/66ea449dFa7d5313b/3efe5539e1617c07.jpg" class="scroll-item"/>
          <img src="https://m.360buyimg.com/babel/jfs/t1/89828/21/49857/31395/66ea449dFa7d5313b/3efe5539e1617c07.jpg" class="scroll-item"/>
        </div>
        <!-- 复制一份数据，添加至容器末尾 -->
        <div class="scroll-container">
          <img src="https://m.360buyimg.com/babel/jfs/t1/89828/21/49857/31395/66ea449dFa7d5313b/3efe5539e1617c07.jpg" class="scroll-item"/>
          <img src="https://m.360buyimg.com/babel/jfs/t1/89828/21/49857/31395/66ea449dFa7d5313b/3efe5539e1617c07.jpg" class="scroll-item"/>
          <img src="https://m.360buyimg.com/babel/jfs/t1/89828/21/49857/31395/66ea449dFa7d5313b/3efe5539e1617c07.jpg" class="scroll-item"/>
          <img src="https://m.360buyimg.com/babel/jfs/t1/89828/21/49857/31395/66ea449dFa7d5313b/3efe5539e1617c07.jpg" class="scroll-item"/>
          <img src="https://m.360buyimg.com/babel/jfs/t1/89828/21/49857/31395/66ea449dFa7d5313b/3efe5539e1617c07.jpg" class="scroll-item"/>
        </div>
      </div>
    </div>

    <!-- 内容块 -->
    <div class="content-blocks">
      <div
        v-for="block in filteredBlocks"
        :key="block.title"
        class="content-block"
        @click="handleClick(block)"
      >
        <h2>{{ block.title }}</h2>
        <p>{{ block.content }}</p>
      </div>
    </div>

    <!-- 商品展示区域 -->
    <div class="product-list" v-if="!loading && products.length">
      <div
        class="product-item"
        v-for="product in products"
        :key="product.proid"
        @click="goToProductDetail(product.proid)"
      >
        <img :src="product.banners" :alt="product.proname" class="product-image" />
        <h3>{{ product.proname }}</h3>
        <p>价格: ¥{{ product.originprice }}</p>
      </div>
    </div>

    <div v-if="loading" class="loading">加载中...</div>

    <!-- 无商品时 -->
    <div v-if="!loading && !products.length" class="no-products">暂无商品</div>
  </div>
</template>

<script>


import axios from 'axios';
export default {
  data() {
    return {
      searchQuery: '', // 搜索框输入内容
      blocks: [
        { title: '热门商品', content: 'XXXXXX', type: 'hot-products' },
        { title: '促销活动', content: 'XXXXXX', type: 'promotions' }
      ],
      products: [], // 商品列表
      loading: true // 加载状态
    };
  },
  computed: {
    filteredBlocks() {
      return this.blocks.filter(block =>
        block.title.includes(this.searchQuery) || block.content.includes(this.searchQuery)
      );
    }
  },
  methods: {
    handleSearch() {
      console.log(`搜索关键词: ${this.searchQuery}`);
    },
    handleClick(block) {
      switch (block.type) {
        case 'hot-products':
          this.goToHotProducts();
          break;
        case 'promotions':
          this.goToPromotions();
          break;
        default:
          console.log('未知类型');
      }
    },
    goToHotProducts() {
      console.log('热门商品');
      this.$router.push({path: '/hot-products'});
    },
    goToPromotions() {
      console.log('促销活动');
      this.$router.push({path: '/promotions'});
    },
    async fetchProducts() {
      try {
        const response = await axios.get('/pro/list', {
          params: {
            count: 1,
            limitNum: 10,
          },
        });
        this.products = response.data.data;
      } catch (error) {
        console.error('获取商品数据失败:', error);
      } finally {
        this.loading = false;
      }
    },
    goToProductDetail(proid) {
      this.$router.push({path: `/productdetail/${proid}`});
    }
  },
  mounted() {
    this.fetchProducts(); // 页面加载时获取商品数据
  }
};
</script>

<style scoped>
.home-page {
  padding: 20px;
  text-align: center;
}

.search-box {
  padding: 10px;
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
  font-size: 16px;
}

.content-blocks {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.content-block {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.content-block:hover {
  transform: scale(1.05);
}

.product-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px; /* 间距 */
}

.product-item {
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 10px;
  text-align: center;
  box-sizing: border-box;
  transition: transform 0.2s;
}

.product-item:hover {
  transform: scale(1.05);
}

.product-image {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.loading, .no-products {
  margin-top: 50px;
  font-size: 18px;
  color: #999;
}

.container {
        width: 100%;
        height: 20%;
        display: inline-block;
        overflow: hidden;
      }
      .scroll-inline-container {
        white-space: nowrap;
        overflow-x: scroll;
        font-size: 0;
      }
      .scroll-container {
        display: inline-block;
        animation: infiniteScroll 15s linear infinite;
      }

      @keyframes infiniteScroll {
        0% {
          transform: translate3d(0, 0, 0);
        }
        100% {
          transform: translate3d(-100%, 0, 0);
        }
      }
      .scroll-container .scroll-item {
        width: 90%;
        height: 60%;
        margin-right: 10px;
      }
</style>
