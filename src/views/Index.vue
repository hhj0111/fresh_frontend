<template>
  <div>
    <header-part></header-part>
    <router-view></router-view>
    <footer-part></footer-part>
  </div>
</template>
<script>
import HeaderPart from "../components/HeaderPart";
import FooterPart from "../components/FooterPart";
export default {
  name: "Index",
  
  components: {
    HeaderPart,
    FooterPart,
  },
};
</script>
