<template>
  <div>
    <Header />
    <router-view />
    <Footer v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 通過 vuex 發送請求獲取數據, 存儲於倉庫中
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
a {
  cursor: pointer;
}
button {
  cursor: pointer;
}
</style>
