// 配置路由
import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { store } from "@/store";

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 };
  },
});

// 全局首位: 前置守衛 (在路由跳轉之間進行判斷)
router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token;

  if (token == undefined || token == null) {
    token = localStorage.getItem("TOKEN");
  }

  // 用戶信息
  let name = store.state.user.userInfo.name;

  // 已登入
  if (token) {
    if (to.path == "/login") {
      // 登入後無法再前往登入頁
      next("/home");
    } else {
      if (name) {
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
    next();
  }
});

export default router;
