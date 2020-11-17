<template>
  <div>
    <div class="breadcrumb">
      <a href="#">全部分类</a>
      <span>></span>
      <a href="#">新鲜水果</a>
      <span>></span>
      <a href="#">商品详情</a>
    </div>

    <div class="goods_detail_con clearfix">
      <div class="goods_detail_pic fl">
        <img :src="'../images/goods/' + product.picture" />
      </div>

      <div class="goods_detail_list fr">
        <h3>
          {{ product.productname
          }}<span class="warn" v-if="product.quantity < 1">(已无货)</span>
        </h3>
        <p>
          {{ product.description }}
        </p>
        <div class="prize_bar">
          <span class="show_pirze"
            >¥<em>{{ product.unitprice }}</em></span
          >
          <span class="show_unit">单 位：{{ product.unit }}</span>
          <span class="show_unit">库 存：{{ product.quantity }}</span>
        </div>
        <div class="goods_num clearfix">
          <div class="num_name fl">数 量：</div>
          <div class="num_add fl">
            <input
              type="number"
              class="num_show fl"
              v-model="num"
              @input="watchInput"
            />
            <a href="" class="add fr" @click.prevent="addNum">+</a>
            <a href="" class="minus fr" @click.prevent="subNum">-</a>
          </div>
        </div>
        <div class="total">
          总价：<em>{{ getTotalPrice }}</em>
        </div>
        <div class="operate_btn">
          <a
            href=""
            :class="{ buy_btn: true, oos: product.quantity < num }"
            @click.prevent="commitOrder"
            >立即购买</a
          >
          <a
            href=""
            :class="{ add_cart: true, oos: product.quantity < num }"
            id="add_cart"
            @click.prevent="addCart"
            >加入购物车</a
          >
        </div>
      </div>
    </div>

    <div class="main_wrap clearfix">
      <div class="l_wrap fl clearfix">
        <div class="new_goods">
          <h3>新品推荐</h3>
          <ul>
            <li v-for="item in newProduct" :key="item.id">
              <router-link :to="'/product/' + item.id"
                ><img :src="'../images/goods/' + item.picture"
              /></router-link>
              <h4>
                <a href="#">{{ item.productname }}</a>
              </h4>
              <div class="prize">￥{{ item.unitprice }}</div>
            </li>
          </ul>
        </div>
      </div>

      <div class="r_wrap fr clearfix">
        <ul class="detail_tab clearfix">
          <li class="active">商品介绍</li>
          <!-- <li >评论</li> -->
        </ul>

        <div class="tab_content">
          <dl>
            <dt>商品详情：</dt>
            <dd>
              {{ product.detail }}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartService from "@/service/CartService"; // @：src为根目录
import UserService from "@/service/UserService";
name: "ProductDdetail";
export default {
  mounted() {
    this.getNewProdcut();
  },
  data() {
    return {
      product: {},
      newProduct: {},
      num: 1,
      totalPrice: 0,
    };
  },
  watch: {
    $route: "getProduct",
  },
  methods: {
    // 获取地址栏路径参数
    async getProduct() {
      let id = this.$route.params.id;
      const { data: res } = await axios.get("/api/product/detail/" + id);
      if (res.status == 1) this.product = res.data;
      // console.log(this.product)
    },
    async getNewProdcut() {
      await this.getProduct();
      const { data: res } = await axios.get(
        "/api/product/getNewProductByCid?cid=" + this.product.cid
      );
      // console.log(res)
      this.newProduct = res.data;
      // console.log(this.product)
    },
    // 增加数量
    addNum() {
      if (this.num < this.product.quantity) {
        this.num++;
      }
    },
    // 减少数量
    subNum() {
      if (this.num > 1) {
        this.num--;
      }
    },
    // 检测输入数量
    watchInput() {
      if (this.num > this.product.quantity) {
        this.num = this.product.quantity;
      }
    },

    // 添加购物车
    addCart() {
      if (this.product.quantity < this.num) return;
      // 实例化购物车对象
      var cart = new CartService();
      // 加载购物车数据
      cart.loadCart();
      // 打印数据
      console.log(cart.items);
      // 添加购物车
      cart.addToCart(this.product, this.num);

      // 保存购物车
      cart.saveCart();

      // cart.addToCart(
      //   this.product.id,
      //   this.product.name,
      //   this.product.unitPrice
      // );
      // // 保存购物车
      // cart.saveCart();
      // // 舔砖到购物车页面
      // this.$router.push({ name: "Cart" });
    },
    // 直接购买
    async commitOrder() {
      if (this.product.quantity < this.num) return;
      let user = new UserService();
      let token = user.loadUser().token;
      // 查找用户是否以填写收货地址
      const { data: hasAddress } = await axios.get(
        "/api/user/findUserAddress",
        { headers: { Authorization: "Bearer " + token } }
      );
      if (hasAddress.status !== 1) return alert("请填写收货地址");
      let orders = [{ productId: this.product.id, quantity: this.num }];
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
      this.getProduct();
    },
  },
  computed: {
    getTotalPrice() {
      return this.num * this.product.unitprice;
    },
  },
};
</script>


<style scoped>
/* 隐藏 input:number 箭头 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.operate_btn .add_cart.oos,
.operate_btn .buy_btn.oos {
  background-color: gray;
}
.warn {
  color: red;
}
</style>
