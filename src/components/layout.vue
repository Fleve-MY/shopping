<template>
  <div class="app-layout">
    <!-- 页面主体内容 -->
    <main class="content">
      <router-view></router-view>
    </main>

    <!-- 底部导航栏 -->
    <nav class="navbar">
      <!-- 首页导航项 -->
      <div
        class="nav-item"
        :class="{ active: activeTab === 0 }"
        @click="goToHome"
      >
        <span class="iconfont icon-shouye nav-icon"></span>
        <span class="nav-text">首页</span>
      </div>

      <!-- 购物车导航项 -->
      <div
        class="nav-item"
        :class="{ active: activeTab === 1 }"
        @click="goToCart"
      >
        <span class="iconfont icon-gouwuchekong nav-icon"></span>
        <span class="nav-text">购物车</span>
      </div>

      <!-- 个人信息导航项 -->
      <div
        class="nav-item"
        :class="{ active: activeTab === 2 }"
        @click="goToProfile"
      >
        <span class="iconfont icon-yonghu nav-icon"></span>
        <span class="nav-text">个人信息</span>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 0,  // 当前选中的导航项
    };
  },
  methods: {
    goToHome() {
      this.$router.push('/');
      this.activeTab = 0;  // 切换到首页
    },
    goToCart() {
      this.$router.push('/cart');
      this.activeTab = 1;  // 切换到购物车
    },
    goToProfile() {
      this.$router.push('/login');
      this.activeTab = 2;  // 切换到个人信息
    }
  }
};
</script>

<style scoped>
/* 引入阿里巴巴矢量图标库 */
@import url('https://at.alicdn.com/t/c/font_4690430_h5561eylle4.css');

/* 布局样式 */
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex-grow: 1;
  padding-bottom: 60px; /* 为底部导航栏留出空间 */
}

/* 底部导航栏样式 */
.navbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #333;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  z-index: 100;
}

/* 导航项样式 */
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: color 0.3s ease;
}

.nav-item:hover {
  color: #00bfff;
}

/* 选中状态 */
.nav-item.active .nav-icon {
  animation: fill-and-grow 0.4s ease forwards;
}

/* 动画效果，三个阶段0，50，100*/
@keyframes fill-and-grow {
  0% {
    transform: scale(1); /* 初始大小 */
    color: white; /* 初始颜色 */
  }
  50% {
    transform: scale(1.2); /* 放大 */
    color: #00bfff; /* 填充颜色 */
  }
  100% {
    transform: scale(1); /* 恢复原始大小 */
    color: #00bfff; /* 保持填充颜色 */
  }
}

/* 图标样式 */
.nav-icon {
  font-size: 24px;
  transition: transform 0.3s ease;
}

/* 文本样式 */
.nav-text {
  margin-top: 4px;
  font-size: 14px;
}
</style>
