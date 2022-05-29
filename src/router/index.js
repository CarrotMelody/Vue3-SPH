// 配置路由
import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { store } from "@/store";

const privatePaths = ["/trade", "/center", "/pay"];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 };
  },
});

// 全局守衛: 前置守衛 (在路由跳轉之間進行判斷)
router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;

  if (token == undefined || token == null) {
    token = localStorage.getItem("TOKEN");
  }
  if (name == undefined || name == null) {
    name = localStorage.getItem("NAME");
  }

  // 已登入
  if (token) {
    if (to.name === "Login") {
      next('/home');
    } else {
      if (to.path == "/login" || to.path == "/register") {
        next();
      } else {
        try {
          // 獲取用戶信息在首頁展示
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          // token 失效
          await store.dispatch("userLogout");
          next("/login");
        }
      }
    }
  } else {
    // 未登入
    let toPath = to.path;
    if (privatePaths.some((path) => toPath.indexOf(path) !== -1)) {
      // 用 query 紀錄原來要去的路由
      next("/login?redirect=" + toPath);
    } else {
      next();
    }
  }
});

export default router;
