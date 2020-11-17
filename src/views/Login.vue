<template>
  <div>
    <div class="login_top clearfix">
      <a href="index.html" class="login_logo"
        ><img src="images/logo02.png"
      /></a>
    </div>

    <div class="login_form_bg">
      <div class="login_form_wrap clearfix">
        <div class="login_banner fl"></div>
        <div class="slogan fl">日夜兼程 · 急速送达</div>
        <div class="login_form fr">
          <div class="login_title clearfix">
            <h1>用户登录</h1>
            <router-link to="/register">立即注册</router-link>
          </div>
          <div class="form_input">
            <form>
              <input
                type="text"
                name="username"
                class="name_input"
                placeholder="请输入用户名"
                v-model="username"
              />
              <input
                type="password"
                name="pwd"
                class="pass_input"
                placeholder="请输入密码"
                v-model="password"
              />
              <div class="errMsg">{{ message }}</div>
              <div class="more_input clearfix">
                <!-- <input type="checkbox" name="" /> -->
                <!-- <label>记住用户名</label> -->
                <router-link to="/">返回首页</router-link>
              </div>
              <input
                type="button"
                value="登录"
                class="input_submit"
                @click="login"
              />
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="footer no-mp">
      <div class="foot_link">
        <a href="#">关于我们</a>
        <span>|</span>
        <a href="#">联系我们</a>
        <span>|</span>
        <a href="#">招聘人才</a>
        <span>|</span>
        <a href="#">友情链接</a>
      </div>
      <p>CopyRight © 2016 北京天天生鲜信息技术有限公司 All Rights Reserved</p>
      <p>电话：010-****888 京ICP备*******8号</p>
    </div>
  </div>
</template>

<script>
import UserService from "@/service/UserService";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      message: "",
    };
  },
  methods: {
    //重置表单
    resetForm() {
      this.username = "";
      this.password = "";
    },
    async login() {
      const self = this
      let userService = new UserService();
      // 非空验证
      if (this.username == "" || this.password == "")
        return (this.message = "请输入用户名或密码");
      var params = new URLSearchParams();
      params.append("username", this.username);
      params.append("password", this.password);
      const { data: res } = await axios.post("/api/account/doLogin", params);
      // 登陆失败
      if (res.status !== 1) return (this.message = res.msg);
      //登录成功 获取地址栏查询字符串
      userService.saveUser(res.data);
      let query = this.$route.query.redirect;
      console.log(query)
      if (query && query.length > 1) {
        return self.$router.push(query); 
      }
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>
