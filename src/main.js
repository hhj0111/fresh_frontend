import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import UserService from '@/service/UserService'

// 设置路由拦截 
router.beforeEach((to,from,next)=>{
  // 判断路由是否允许匿名访问
  if(to.meta.isLogin){
    next();
  }else{
    // 判断是否已经登录
    let user = new UserService()
    if(user.loadUser()){
      next();
    }else{
      // 跳转到登录页面，并记录下当前用户请求的路径
      next({
        path:'/login',
        // 将跳转的路由path作为参数，登陆成功后跳转到该路由
        query:{redirect:to.fullPath}
      })
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
