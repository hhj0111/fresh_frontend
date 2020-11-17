import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPart from '@/views/Login'
import ProductDetail from '@/views/modules/ProductDetail'


Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'Login',
    component: LoginPart,
    // 元数据 设置该组件不需要拦截，允许匿名访问
    meta: {
      isLogin: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
    meta: {
      isLogin: true
    }
  }, {
    path: '/center',
    component: () => import('@/views/UserCenter'),
    children: [{
        path: '',
        name: 'userinfo',
        component: () => import('@/views/modules/center/UserInfo.vue')
      },
      {
        path: '/center/address',
        name: 'address',
        component: () => import('@/views/modules/center/Address.vue')
      },
      {
        path: '/center/order',
        name: 'order',
        component: () => import('@/views/modules/center/Order.vue')
      },
    ]
  },
  {
    path: '/',
    component: () => import('@/views/Index.vue'),
    children: [{
        path: '',
        name: 'admin',
        component: () => import('@/views/modules/Home.vue'),
        meta: {
          isLogin: true
        }
      },
      {
        path: '/product/:id',
        name: 'product',
        component: () => import('@/views/modules/ProductDetail.vue'),
        meta:{
          isLogin:true
        }
      },
      {
        path: '/productList/:cid',
        name: 'productList',
        component: () => import('@/views/modules/ProductList.vue'),
        meta:{
          isLogin:true
        }
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('@/views/modules/SearchPage.vue'),
        meta:{
          isLogin:true
        }
      },
    ]
  },
  // {
  //   path: '/product/:id',
  //   name: 'Product',
  //   component: ProductDetail,
  //   meta:{
  //     isLogin:true
  //   }
  // },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/Cart.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
