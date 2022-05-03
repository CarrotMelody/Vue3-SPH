// 配置路由
import { createRouter, createWebHistory } from "vue-router";

// 引入路由組件
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";

const routes = [
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

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// // 先把 router 的 push, replace 方法保存
// let originPush = router.push;
// let originReplace = router.replace;

// // 重寫 push | replace
// router.push = function (location, resolve, reject) {
//   if (resolve && reject) {
//     originPush.call(this, location, resolve, reject);
//   } else {
//     originPush.call(
//       this,
//       location
//     );
//   }
// };

// router.replace = function (location, resolve, reject) {
//   if (resolve && reject) {
//     originReplace.call(this, location, resolve, reject);
//   } else {
//     originReplace.call(
//       this,
//       location,
//       () => {},
//       () => {}
//     );
//   }
// };

export default router;
