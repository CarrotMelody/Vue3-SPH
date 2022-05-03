import { createStore } from "vuex";

import home from "./home";
import search from "./search";

export const store = createStore({
  // 實現 vuex 倉庫模塊化開發存儲數據
  modules: {
    home,
    search,
  },
});
