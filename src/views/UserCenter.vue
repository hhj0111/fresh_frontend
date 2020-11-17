<template>
  <div>
    <header-part></header-part>

    <div class="main_con clearfix">
      <div class="left_menu_con clearfix">
        <h3>用户中心</h3>
        <ul>
          <li>
            <a
              href=""
              :class="{ active: index === 1 }"
              @click.prevent="linkto('/center')"
              >· 个人信息</a
            >
          </li>
          <li>
            <a
              href=""
              :class="{ active: index === 2 }"
              @click.prevent="linkto('/center/order')"
              >· 全部订单</a
            >
          </li>
          <li>
            <a
              href=""
              :class="{ active: index === 3 }"
              @click.prevent="linkto('/center/address')"
              >· 收货地址</a
            >
          </li>
        </ul>
      </div>
      <div class="right_content clearfix">
        <router-view></router-view>
      </div>
    </div>

    <footer-part></footer-part>
  </div>
</template>

<script>
import FooterPart from "../components/FooterPart";
import HeaderPart from "../components/HeaderPart";
export default {
  components: {
    FooterPart,
    HeaderPart,
  },
  data() {
    return {
      index: 1,
    };
  },
  methods: {
    linkto(val) {
      if (val === "/center") this.index = 1;
      if (val === "/center/order") this.index = 2;
      if (val === "/center/address") this.index = 3;
      this.$router.push(val);
    },
  },
};
</script>

<style scoped>
</style>