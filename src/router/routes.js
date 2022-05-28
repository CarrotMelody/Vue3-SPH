// 引入路由組件
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuceess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
import myOrder from "@/pages/Center/myOrder";
import groupOrder from "@/pages/Center/groupOrder";

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
    path: "/trade",
    name: "Trade",
    component: Trade,
    meta: { showFooter: true },
  },
  {
    path: "/pay",
    name: "Pay",
    component: Pay,
    meta: { showFooter: true },
  },
  {
    path: "/paysuccess",
    name: "PaySuceess",
    component: PaySuceess,
    meta: { showFooter: true },
  },
  {
    path: "/center",
    name: "Center",
    component: Center,
    meta: { showFooter: true },
    children: [
      {
        path: "myorder",
        name: "MyOrder",
        component: myOrder,
      },
      {
        path: "grouporder",
        name: "GroupOrder",
        component: groupOrder,
      },
      {
        path: "/center",
        redirect: "/center/myorder",
      },
    ],
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
