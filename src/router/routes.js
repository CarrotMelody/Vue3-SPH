/*
當打包構建應用時, JS 包會變得非常大, 影響頁面加載
如果能把不同路由對應的組件分割成不同的代碼塊, 然後當路由被訪問時才加載對應組件, 這樣會更高效
*/

export default [
  {
    path: "/home",
    name: "Home",
    component: () => import("@/pages/Home"),
    meta: {
      showFooter: true, // 判斷 footer 是否顯示
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/Login"),
    meta: {
      showFooter: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/pages/Register"),
    meta: {
      showFooter: false,
    },
  },
  {
    path: "/detail/:skuid",
    name: "Detail",
    component: () => import("@/pages/Detail"),
    meta: {
      showFooter: true,
    },
  },
  {
    path: "/addcartsuccess",
    name: "Addcartsuccess",
    component: () => import("@/pages/AddCartSuccess"),
    meta: { showFooter: true },
  },
  {
    path: "/shopCart",
    name: "ShopCart",
    component: () => import("@/pages/ShopCart"),
    meta: { showFooter: true },
  },
  {
    path: "/trade",
    name: "Trade",
    component: () => import("@/pages/Trade"),
    meta: { showFooter: true },
    // 路由獨享守衛
    beforeEnter: (to, from, next) => {
      if (from.path == "/shopcart") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/pay",
    name: "Pay",
    component: () => import("@/pages/Pay"),
    meta: { showFooter: true },
    beforeEnter: (to, from, next) => {
      if (from.path == "/trade") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/paysuccess",
    name: "PaySuceess",
    component: () => import("@/pages/PaySuccess"),
    meta: { showFooter: true },
  },
  {
    path: "/center",
    name: "Center",
    component: () => import("@/pages/Center"),
    meta: { showFooter: true },
    children: [
      {
        path: "myorder",
        name: "MyOrder",
        component: () => import("@/pages/Center/myOrder"),
      },
      {
        path: "grouporder",
        name: "GroupOrder",
        component: () => import("@/pages/Center/groupOrder"),
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
    component: () => import("@/pages/Search"),
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
