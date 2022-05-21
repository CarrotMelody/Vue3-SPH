// 引入路由組件
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";

export default [
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      showFooter: true, // 判斷 footer 是否顯示
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      showFooter: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      showFooter: false,
    },
  },
  {
    path: "/detail/:skuid",
    name: "Detail",
    component: Detail,
    meta: {
      showFooter: true,
    },
  },
  {
    path: "/addcartsuccess",
    name: "Addcartsuccess",
    component: AddCartSuccess,
    meta: { showFooter: true },
  },
  {
    path: "/shopCart",
    name: "ShopCart",
    component: ShopCart,
    meta: { showFooter: true },
  },
  {
    path: "/search/:keyword?",
    name: "Search",
    component: Search,
    meta: {
      showFooter: true,
    },
    // 路由組件傳遞 props 數據
    props: ($route) => ({
      keyword: $route.params.keyword,
      k: $route.query.k,
    }),
  },
  // 重定向
  {
    path: "/:pathMatch(.*)",
    redirect: "/home",
  },
];
