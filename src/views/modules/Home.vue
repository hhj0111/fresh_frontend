<template>
  <div>
    <div class="center_con clearfix">
      <ul class="subnav fl">
        <li><a href="#model01" class="fruit">新鲜水果</a></li>
        <li><a href="#model02" class="seafood">海鲜水产</a></li>
        <li><a href="#model03" class="meet">猪牛羊肉</a></li>
        <li><a href="#model04" class="egg">禽类蛋品</a></li>
        <li><a href="#model05" class="vegetables">新鲜蔬菜</a></li>
        <li><a href="#model06" class="ice">速冻食品</a></li>
      </ul>

      <!-- <lunbo></lunbo> -->
      <div class="slide fl">
        <div class="banner">
          <div class="item">
            <img :src="dataList[currentIndex]" />
          </div>
          <div class="page" v-if="this.dataList.length > 1">
            <ul class="lunbo_ul">
              <li @click="gotoPage(prevIndex)">&lt;</li>
              <li
                v-for="(item, index) in dataList"
                :key="item.id"
                @click="gotoPage(index)"
                :class="{ current: currentIndex == index }"
              >
                {{ index + 1 }}
              </li>
              <li @click="gotoPage(nextIndex)">&gt;</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="adv fl">
        <a href="#"><img src="images/adv01.jpg" /></a>
        <a href="#"><img src="images/adv02.jpg" /></a>
      </div>
    </div>

    <div
      class="list_model"
      v-for="(item, index) in typeProducts"
      :key="item.id"
    >
      <div class="list_title clearfix">
        <h3 class="fl" :id="'model0' + (index + 1)">{{ item.categoryname }}</h3>
        <router-link :to="'/productList/'+item.id" class="goods_more fr" id="fruit_more">查看更多 ></router-link>
      </div>

      <div class="goods_con clearfix">
        <div class="goods_banner fl">
          <img :src="'images/' + item.picture" />
        </div>
        <ul class="goods_list fl">
          <li v-for="pitem in item.product" :key="pitem.id">
            <h4>
              <router-link :to="'product/' + pitem.id">{{
                pitem.productname
              }}</router-link>
            </h4>
            <router-link :to="'product/' + pitem.id"
              ><img :src="'images/goods/' + pitem.picture"
            /></router-link>
            <div class="prize">¥ {{ pitem.unitprice }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>



<script>
name = "Home";
export default {
  mounted() {
    this.getProducts();
    this.openTimer();
  },
  data() {
    return {
      typeProducts: [],
      dataList: [
        "images/slide.jpg",
        "images/slide02.jpg",
        "images/slide03.jpg",
        "images/slide04.jpg",
      ],
      currentIndex: 0, //默认显示图片
      timer: null, //定时器
    };
  },
  // 监听属性，监听路由发生变化时执行函数
  // watch: {
  //   $route: "getProducts",
  // },
  methods: {
    // 发送异步请求，请求后台数据
    async getProducts() {
      let title = this.$route.query.name;
      // console.log(title)
      const { data: res } = await axios.get("/api/product/typeProduct");
      this.typeProducts = res.data;
      // if (title) {
      //   // 带了参数
      //   const { data: res } = await axios.get("/api/products?name=" + title);
      //   if (res.code !== 2000) return;
      //   this.products = res.data.data;
      // } else {
      //   const { data: res } = await axios.get("/api/products");
      //   if (res.code !== 2000) return;
      //   this.products = res.data.data;
      // }
    },
    gotoPage(index) {
      clearInterval(this.timer);
      this.currentIndex = index;
      this.openTimer();
    },
     openTimer() {
      this.timer = setInterval(() => {
        this.gotoPage(this.nextIndex);
      }, 3000);
    },
  },
  computed: {
    //上一张
    prevIndex() {
      clearInterval(this.timer);
      this.openTimer();
      if (this.currentIndex == 0) {
        return this.dataList.length - 1;
      } else {
        return this.currentIndex - 1;
      }
    },
    //下一张
    nextIndex() {
      clearInterval(this.timer);
      this.openTimer();
      if (this.currentIndex == this.dataList.length - 1) {
        return 0;
      } else {
        return this.currentIndex + 1;
      }
    },
   
  },
};
</script>

<style scoped>
ul.lunbo_ul li {
  list-style: none;
  float: left;
  width: 30px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}
.banner {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  /* margin-top: 60px; */
}
.banner img {
  width: 100%;
  display: block;
}
.banner .page {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
}
.banner .page ul {
  float: right;
}
ul.lunbo_ul li.current {
  color: #aaaaaa;
}
</style>

