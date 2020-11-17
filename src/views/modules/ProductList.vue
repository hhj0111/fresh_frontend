<template>
  <div>
    <div class="breadcrumb">
      <router-link to="/">全部分类</router-link>
      <span>></span>
      <a>{{categoryname}}</a>
    </div>
    <div class="main_wrap clearfix">
      <div class="l_wrap fl clearfix">
        <div class="new_goods">
          <h3>新品推荐</h3>
          <ul>
            <li v-for="item in newProduct" :key="item.id">
              <router-link :to="'/product/' + item.id"
                ><img :src="'/images/goods/' + item.picture"
              /></router-link>
              <h4>
                <router-link :to="'/product/' + item.id">{{
                  item.productname
                }}</router-link>
              </h4>
              <div class="prize">￥{{ item.unitprice }}</div>
            </li>
          </ul>
        </div>
      </div>

      <div class="r_wrap fr clearfix">
        <div class="sort_bar">
          <a
            href="#"
            :class="{ active: sortProperty === 'updatedate' }"
            @click.prevent="changshor('updatedate')"
            >默认</a
          >
          <a
            href="#"
            :class="{ active: sortProperty === 'unitprice' }"
            @click.prevent="changshor('unitprice')"
            >价格</a
          >
          <a
            href="#"
            :class="{ active: sortProperty === 'heat' }"
            @click.prevent="changshor('heat')"
            >人气</a
          >
        </div>

        <ul class="goods_type_list clearfix">
          <li v-for="item in products.data" :key="item.id">
            <router-link :to="'/product/' + item.id"
              ><img :src="'/images/goods/' + item.picture"
            /></router-link>
            <h4>
              <router-link :to="'/product/' + item.id">{{
                item.productname
              }}</router-link>
            </h4>
            <div class="operate">
              <span class="prize">￥{{ item.unitprice }}</span> 
              <span class="unit">{{ item.unit }}</span>
              <!-- <a href="#" class="add_goods" title="加入购物车"></a> -->
            </div>
          </li>
        </ul>

        <div class="pagenation">
          <a href="#" v-show="products.currentPage > 1" @click.prevent="prev()"
            >&lt;上一页</a
          >
          <a
            href="#"
            :class="{ active: index == products.currentPage }"
            v-for="index in products.totalPage"
            :key="index"
            @click.prevent="goPage(index)"
            >{{ index }}</a
          >
          <!-- <a href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          <a href="#">5</a> -->
          <a
            href="#"
            v-show="products.currentPage < products.totalPage"
            @click.prevent="next()"
            >下一页></a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  data() {
    return {
      products: {
        data: [],
        currentPage: 0,
        totalRow: 0,
        totalPage: 0,
      },
      newProduct: {},
      sortType: "desc",
      isDesc: true,
      sortProperty: "updatedate",
      cid: 0,
      categoryname: "",
    };
  }, 
  watch: {
    $route: ["getProductList", "getNewProdcut", "getCategoryName"],
  },
  mounted() {
    this.getProductList();
    this.getNewProdcut();
    this.getCategoryName()
  },
  methods: {
    getCid() {
      this.cid = this.$route.params.cid;
    },
    async getProductList() {
      const { data: res } = await axios.get(
        `/api/product/getProductByCid?cid=${this.$route.params.cid}
        &sortType=${this.isDesc ? "desc" : "asc"}&sortProperty=${
          this.sortProperty
        }&currentPage=${this.products.currentPage}`
      );
      if (res.status == 1) this.products = res.data;
      // console.log(this.product)
    },
    async getNewProdcut() {
      const { data: res } = await axios.get(
        "/api/product/getNewProductByCid?cid=" + this.$route.params.cid
      );
      this.newProduct = res.data;
    },
    async getCategoryName() {
      const { data: res } = await axios.get(
        "/api/category/findNameById?id=" + this.$route.params.cid
      );
      if (res.status === 1) this.categoryname = res.data.categoryname;
      console.log(this.categoryname)
    },
    prev() {
      if (this.products.currentPage > 1) {
        this.products.currentPage--;
      }
      this.getProductList();
    },
    next() {
      if (this.products.currentPage < this.products.totalPage) {
        this.products.currentPage++;
      }
      this.getProductList();
    },
    goPage(index) {
      this.products.currentPage = index;
      this.getProductList();
    },
    changshor(e) {
      this.sortProperty = e;
      this.isDesc = !this.isDesc;
      this.getProductList();
    },
  },
};
</script>

<style scoped>
</style>