<template>
  <div>
    <div class="register_con">
      <div class="l_con fl">
        <a class="reg_logo"><img src="images/logo02.png" /></a>
        <div class="reg_slogan">足不出户 · 新鲜每一天</div>
        <div class="reg_banner"></div>
      </div>

      <div class="r_con fr">
        <div class="reg_title clearfix">
          <h1>用户注册</h1>
          <router-link to="/login">登录</router-link>
        </div>
        <div class="reg_form clearfix">
          <form>
            <ul>
              <li>
                <label>用户名:</label>
                <input
                  type="text"
                  name="user_name"
                  id="user_name"
                  v-model="userInfo.username"
                />
              </li>
              <li>
                <label>密码:</label>
                <input
                  type="password"
                  name="pwd"
                  id="pwd"
                  v-model="userInfo.password"
                />
              </li>
              <li>
                <label>确认密码:</label>
                <input
                  type="password"
                  name="cpwd"
                  id="cpwd"
                  v-model="userInfo.rpassword"
                />
              </li>
              <li>
                <label>邮箱:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  v-model="userInfo.email"
                />
              </li>
              <li class="agreement">
                <!-- <input
                  type="checkbox"
                  name="allow"
                  id="allow"
                  checked="checked"
                />
                <label>同意”天天生鲜用户使用协议“</label> -->
                <div class="errorMsg">{{ msg }}</div>
                <router-link to="/" class="toHome">返回首页</router-link>
              </li>
              <li class="reg_sub">
                <input type="button" value="注 册" @click="commitForm" />
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>

    <footer-part></footer-part>
  </div>
</template>

<script>
import FooterPart from "../components/FooterPart";
export default {
  name: "Register",
  components: {
    FooterPart,
  },
  data() {
    return {
      msg: "",
      userInfo: {},
    };
  },
  methods: {
    async commitForm() {
      let userInfo = this.userInfo;
      if (!userInfo.username || userInfo.username.length < 3) {
        return (this.msg = "用户名最少三个字符");
      }
      if (!userInfo.password || userInfo.password.length < 5) {
        return (this.msg = "密码最少5个字符");
      }
      if (userInfo.password !== userInfo.rpassword) {
        return (this.msg = "两次密码输入不一致");
      }
      if (!userInfo.email) {
        return (this.msg = "请输入邮箱");
      }
      // 验证邮箱
      let reg = /^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/;
      if (!reg.test(userInfo.email)) {
        return (this.msg = "邮箱格式不正确");
      }
      // 验证用户名是否存在
      const { data: isHasUsername } = await axios.get(
        "/api/account/checkUsername?username=" + this.userInfo.username
      );
      if (isHasUsername.status === 0) return (this.msg = isHasUsername.msg);
      // 验证邮箱是否已被注册
      const { data: isHasEmail } = await axios.get(
        "/api/account/checkEmail?email=" + this.userInfo.email
      );
      if (isHasEmail.status === 0) return (this.msg = isHasEmail.msg);

      // 进行注册
      const { data: res } = await axios.post("/api/account/doRegister", {
        username: userInfo.username,
        password: userInfo.password,
        email: userInfo.email,
      });
      if (res.status !== 1) return (this.msg = res.msg);
      this.msg = res.msg;
    },
  },
};
</script>

<style scoped>
.toHome {
  color: #a8a8a8;
  line-height: 40px;
  height: 40px;
}
.errorMsg {
  line-height: 40px;
  height: 40px;
  float: left;
  color: red;
  width: 310px;
}
</style>