<template>
  <div>
    <h3 class="common_title2">收货地址</h3>
    <div class="site_con">
      <dl>
        <dt>当前地址：</dt>
        <dd v-show="addressInfo.consignee">
          {{ addressInfo.address }} （{{ addressInfo.consignee }} 收）
          {{ addressInfo.phone }}
        </dd>
      </dl>
    </div>
    <h3 class="common_title2">编辑地址</h3>
    <div class="site_con">
      <form>
        <div class="form_group">
          <label>收件人：</label>
          <input type="text" v-model="address.consignee" />
        </div>
        <div class="form_group form_group2">
          <label>详细地址：</label>
          <textarea class="site_area" v-model="address.address"></textarea>
        </div>
        <div class="form_group">
          <label>邮编：</label>
          <input type="text" name="" v-model="address.postcard" />
        </div>
        <div class="form_group">
          <label>手机：</label>
          <input type="text" name="" v-model="address.phone" />
        </div>
        <div class="form_group errorMessage">
          <label>{{ errMsg }}</label>
        </div>
        <input
          type="button"
          @click="commitForm"
          value="提交"
          class="info_submit"
        />
      </form>
    </div>
  </div>
</template>

<script>
import UserService from "@/service/UserService";
export default {
  data() {
    return {
      addressInfo: {},
      address: {},
      errMsg: "",
      user: new UserService(),
    };
  },
  created() {
    this.getAddressInfo();
  },
  methods: {
    async getAddressInfo() {
      let token = this.user.loadUser().token;
      const { data: res } = await axios.get("/api/user/findUserAddress", {
        headers: { Authorization: "Bearer " + token },
      });
      if (res.status === 1) this.addressInfo = res.data;
    },
    async commitForm() {
      let address = this.address;
      if (
        !address.consignee ||
        !address.address ||
        !address.postcard ||
        !address.phone
      ) {
        return (this.errMsg = "请完善地址");
      } else {
        this.errMsg = "";
      }
      let token = this.user.loadUser().token;
      const { data: res } = await axios.post(
        "/api/user/saveAddress",
        { address: this.address },
        { headers: { Authorization: "Bearer " + token } }
      );
      console.log(res);
      if (res.status !== 1) return (this.errMsg = res.msg);
      this.addressInfo = res.data;
      this.errMsg = res.msg;
    },
  },
};
</script>

<style scoped>
.errorMessage {
  color: red;
  width: 300px;
}
.errorMessage label {
  width: 100%;
  float: none;
}
</style>