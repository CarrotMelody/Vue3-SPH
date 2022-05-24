import { createStore } from "vuex";

import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
import user from "./user";
import trade from "./trade";

export const store = createStore({
  // 實現 vuex 倉庫模塊化開發存儲數據
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade
  },
});
