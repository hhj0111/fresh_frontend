<template>
  <div>
    <header-part></header-part>
    <div class="total_count">
      全部商品<em>{{ cart.length }}</em
      >件
    </div>
    <ul class="cart_list_th clearfix">
      <li class="col01">商品名称</li>
      <li class="col02">商品单位</li>
      <li class="col03">商品价格</li>
      <li class="col04">数量</li>
      <li class="col05">小计</li>
      <li class="col06">操作</li>
    </ul>

    <ul
      class="cart_list_td clearfix"
      v-for="(item, index) in cart"
      :key="item.product.id"
    >
      <li class="col01">
        <input type="checkbox" :value="item" v-model="checkItem" checked />
      </li>
      <li class="col02">
        <img :src="'images/goods/' + item.product.picture" />
      </li>
      <li class="col03">
        {{ item.product.productname }}<br /><em
          >{{ item.product.unitprice }}元/{{ item.product.unit }}</em
        >
      </li>
      <li class="col04">{{ item.product.unit }}</li>
      <li class="col05">{{ item.product.unitprice }}元</li>
      <li class="col06">
        <div class="num_add">
          <a href="" class="add fl" @click.prevent="addnum(index)">+</a>
          <input type="text" class="num_show fl" v-model="item.quantity" />
          <a href="" class="minus fl" @click.prevent="subnum(index)">-</a>
        </div>
      </li>
      <li class="col07">{{ item.totalPrice }}元</li>
      <li class="col08">
        <a href="" @click.prevent="removeProduct(item.product.id)"
          >删除{{ item.product.id }}</a
        >
      </li>
    </ul>

    <ul class="settlements">
      <li class="col01">
        <input type="checkbox" name="" checked @click="checkAll" />
      </li>
      <li class="col02">全选</li>
      <li class="col03">
        合计(不含运费)：<span>¥</span><em>{{ totalPrice }}</em
        ><br />共计<b>{{ checkItem.length }}</b
        >件商品
      </li>
      <li class="col04">
        <a href="" @click.prevent="commitOrder">提交订单</a>
      </li>
    </ul>
    <footer-part></footer-part>
  </div>
</template>

<script>
import FooterPart from "@/components/FooterPart.vue";
import HeaderPart from "@/components/HeaderPart.vue";
import UserService from "@/service/UserService";
import CartService from "@/service/CartService";

export default {
  components: {
    HeaderPart,
    FooterPart,
  },
  watch: {
    checkItem() {
      this.getTotalPrice();
    },
  },
  data() {
    return {
      cart: [],
      totalPrice: 0,
      checkItem: [],
      cartService: new CartService(),
    };
  },
  created() {
    this.initCart();
  },
  methods: {
    // 初始化购物车
    initCart() {
      this.cart = [];
      this.totalPrice = 0;
      this.checkItem = [];
      // 初始化购物车
      this.cartService.loadCart();
      this.cart = this.cartService.items;
      // 统计各商品价格
      this.cart.forEach((item) => {
        item.totalPrice = item.product.unitprice * item.quantity;
        this.checkItem.push(item);
      });
      this.getTotalPrice();
    },
    // 增加数量
    addnum(index) {
      this.cart[index].quantity++;
      this.countProductPrice(index);
    },
    // 减少数量
    subnum(index) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
      }
      this.countProductPrice(index);
    },
    // 计算单个商品总价格
    countProductPrice(index) {
      this.cart[index].totalPrice =
        this.cart[index].quantity * this.cart[index].product.unitprice;
      this.getTotalPrice();
    },
    // 计算总价格
    getTotalPrice() {
      let sum = 0;
      this.checkItem.forEach((item) => {
        sum += item.totalPrice;
      });
      this.totalPrice = sum;
    },
    // 全选或全不选
    checkAll() {
      if (this.checkItem.length < 1) {
        this.cart.forEach((item) => {
          this.checkItem.push(item);
        });
      } else {
        this.checkItem = [];
      }
      this.getTotalPrice();
    },
    // 删除商品
    removeProduct(productId) {
      this.cartService.removeCart(productId);
      //   console.log(productId)
      this.initCart();
    },

    // 提交订单
    async commitOrder() {
      let user = new UserService();
      let token = user.loadUser().token;
      // 查找用户是否以填写收货地址
      const { data: hasAddress } = await axios.get(
        "/api/user/findUserAddress",
        { headers: { Authorization: "Bearer " + token } }
      );
      if (hasAddress.status !== 1) return alert("请填写收货地址");

      let orders = [];
      this.checkItem.forEach((item) => {
        orders.push({ productId: item.product.id, quantity: item.quantity });
      });

      const { data: res } = await axios.post(
        "/api/order/addOrder",
        { orders: orders },
        { headers: { Authorization: "Bearer " + token } }
      );
      if (res.status === 401) {
        if (confirm("当前身份已过期，请重新登录")) {
          user.removeUser();
          this.$router.push("/login");
        }
        return;
      }
      alert(res.msg);
      this.cartService.clearCart()
      this.initCart()
    },
  },
};
</script>

<style scoped>
</style>