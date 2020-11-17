<template>
  <div>
    <h3 class="common_title2">全部订单</h3>
    <div v-for="item in orders" :key="item.id">
      <ul class="order_list_th w978 clearfix">
        <li class="col01">{{item.ordertime}}</li>
        <li class="col02">订单号：{{item.ordernum}}</li>
        <li class="col02 stress">已完成</li>
      </ul>

      <table class="order_list_table w980">
        <tbody>
          <tr>
            <td width="55%">
              <ul class="order_goods_list clearfix" v-for="ditem in item.detail" :key="ditem.id">
                <li class="col01"><img :src="'/images/goods/'+ditem.picture" /></li>
                <li class="col02">{{ditem.productname}}<em>{{ditem.unitprice}}元/{{ditem.unit}}</em></li>
                <li class="col03">{{ditem.quantity}}</li>
                <li class="col04">{{ditem.quantity*ditem.unitprice}}元</li>
              </ul>
            </td>
            <td width="15%">{{item.totalprice}}元</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- <ul class="order_list_th w978 clearfix">
      <li class="col01">2016-8-21 17:36:24</li>
      <li class="col02">订单号：56872934</li>
      <li class="col02 stress">已支付</li>
    </ul>
    <table class="order_list_table w980">
      <tbody>
        <tr>
          <td width="55%">
            <ul class="order_goods_list clearfix">
              <li class="col01"><img src="images/goods02.jpg" /></li>
              <li class="col02">嘎啦苹果嘎啦苹果<em>11.80元/500g</em></li>
              <li class="col03">1</li>
              <li class="col04">11.80元</li>
            </ul>
            <ul class="order_goods_list clearfix">
              <li class="col01"><img src="images/goods02.jpg" /></li>
              <li class="col02">嘎啦苹果嘎啦苹果<em>11.80元/500g</em></li>
              <li class="col03">1</li>
              <li class="col04">11.80元</li>
            </ul>
          </td>
          <td width="15%">33.60元</td>
          <td width="15%">已付款</td>
          <td width="15%"><a href="#" class="oper_btn">查看物流</a></td>
        </tr>
      </tbody>
    </table> -->
    <!-- 
    <div class="pagenation">
      <a href="#">&gt;上一页</a>
      <a href="#" class="active">1</a>
      <a href="#">2</a>
      <a href="#">3</a>
      <a href="#">4</a>
      <a href="#">5</a>
      <a href="#">下一页></a>
    </div> -->
  </div>
</template>

<script>
import UserService from "@/service/UserService";
export default {
  data() {
    return {
      orders: [],
    };
  },
  created() {
    this.getOrders();
  },
  methods: {
    async getOrders() {
      const user = new UserService();
      let token = user.loadUser().token;
      const { data: res } = await axios.get("/api/order/findOrder", {
        headers: { Authorization: "Bearer " + token },
      });
      this.orders = res
      console.log(res);
    },
  },
};
</script>

<style scoped>
</style>