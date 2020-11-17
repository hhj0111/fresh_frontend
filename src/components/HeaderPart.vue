<template>
  <div>
    <div class="header_con">
      <div class="header">
        <div class="welcome fl">欢迎来到天天生鲜!</div>
        <div class="fr">
          <div class="login_info fl" v-show="username">
            欢迎您：<em>{{ username }}</em>
          </div>
          <div class="login_btn fl" v-show="!username">
            <router-link to="/login">登录</router-link>
            <span>|</span>
            <router-link to="/register">注册</router-link>
          </div>
          <div class="user_link fl">
            <span v-show="username">|</span>
            <a v-show="username" @click="logout">退出登录</a>
            <span>|</span>
            <router-link to="/center">用户中心</router-link>
            <span>|</span>
            <router-link to="/cart">我的购物车</router-link>
            <span>|</span>
            <a href="/center/order">我的订单</a>
          </div>
        </div>
      </div>
    </div>

    <div class="search_bar clearfix">
      <router-link to="/" class="logo fl"
        ><img src="../../public/images/logo.png"
      /></router-link>
      <div class="search_con fl">
        <input
          type="text"
          class="input_text fl"
          v-model="query"
          placeholder="搜索商品"
        />
        <input type="button" class="input_btn fr"  value="搜索" @click="search"/>
      </div>
      <div class="guest_cart fr">
        <router-link to="/cart" class="cart_name fl">我的购物车</router-link>
        <!-- <div class="goods_count fl" id="show_count">1</div> -->
      </div>
    </div>

    <div class="navbar_con">
      <div class="navbar clearfix">
        <div :class="{ 'subnav_con fl': isOtherPath }">
          <h1 class="fl">全部商品分类</h1>
          <span></span>
          <ul class="subnav" v-show="isOtherPath">
            <li>
              <router-link to="/productList/1" class="fruit"
                >新鲜水果</router-link
              >
            </li>
            <li>
              <router-link to="/productList/2" class="seafood"
                >海鲜水产</router-link
              >
            </li>
            <li>
              <router-link to="/productList/3" class="meet"
                >猪牛羊肉</router-link
              >
            </li>
            <li>
              <router-link to="/productList/4" class="egg"
                >禽类蛋品</router-link
              >
            </li>
            <li>
              <router-link to="/productList/5" class="vegetables"
                >新鲜蔬菜</router-link
              >
            </li>
            <li>
              <router-link to="/productList/6" class="ice"
                >速冻食品</router-link
              >
            </li>
          </ul>
        </div>
        <ul class="navlist fl">
          <li><router-link to="/">首页</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import UserService from "@/service/UserService";
export default {
  created() {
    this.loginStatus();
  },
  watch: {
    $route(to) {
      if (to.path.length > 0) {
        this.isOtherPath = true;
      } else {
        this.isOtherPath = false;
      }
    },
  },
  data() {
    return {
      isOtherPath: false,
      username: null,
      query:''
    };
  },
  methods: {
    loginStatus() {
      let user = new UserService();
      let userInfo = user.loadUser();
      if (userInfo) {
        this.username = userInfo.username;
      }
    },
    // 退出登录
    logout() {
      let user = new UserService();
      user.removeUser();
      this.$router.push('/login')
    },
    search() {
      if(this.query.length<1) return

      this.$router.push({name:'search',query:{query:this.query}})
    },
  },
};
</script>