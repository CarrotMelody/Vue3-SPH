// Search 模塊的倉庫
import { reqGetSearchInfo } from "@/api";

const state = {
  searchList: [],
};

const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};

const actions = {
  async getSearchList({ commit }, params = {}) {
    // params: 當用戶派發 action 時, 第二個參數傳遞過來, 至少是一個空物件
    let results = await reqGetSearchInfo(params);
    if (results.code === 200) {
      commit("GETSEARCHLIST", results.data);
    }
  },
};

const getters = {
  // state: 當前倉庫的 state, 而非大倉庫 state
  goodsList(state) {
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList || [];
  },
  attrsList(state) {
    return state.searchList.attrsList || [];
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
};