import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Comments from '../views/Comments.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Profile from '../views/Profile.vue';
import Layout from '../components/layout.vue';
import Cart from '../views/Cart.vue';
import ProductDetail from '../views/ProduceDetail.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', component: Home },
      { path: '/Comments', component: Comments },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: '/cart', component: Cart },
      { path: '/productdetail/:proid', component: ProductDetail },
      { path: 'profile', component: Profile, meta: { requiresAuth: true } }
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 导航守卫，保护路由
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login');  // 未登录时重定向到登录页面
  } else {
    next();  // 继续导航
  }
});

export default router;
