<template>
  <div class="info_con clearfix">
    <h3 class="common_title2">基本信息</h3>
    <ul class="user_info_list">
      <li><span>用户名：</span>{{ userInfo.username }}</li>
      <li><span>联系方式：</span>{{ userInfo.phone }}</li>
      <li><span>联系地址：</span>{{ userInfo.address }}</li>
    </ul>
  </div>
</template>

<script>
import UserService from "@/service/UserService";
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      const user = new UserService();
      let token = user.loadUser().token;
      const { data: res } = await axios.get("/api/user/findUserInfo", {
        headers: { Authorization: "Bearer " + token },
      });
      if (res.status === 1) this.userInfo = res.data;
      console.log(res);
      //   console.log(token)
    },
  },
};
</script>

<style scoped>
</style>