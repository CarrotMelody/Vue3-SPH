// Detail 模塊的倉庫
import { reqGoodsInfo } from "@/api";

const state = {
  goodInfo: {},
};

const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  },
};

const actions = {
  async getGoodInfo({ commit }, skuid) {
    let results = await reqGoodsInfo(skuid);
    if (results.code === 200) {
      commit("GETGOODINFO", results.data);
    }
  },
};

const getters = {
  categoryView(state) {
    return state.goodInfo.categoryView || {};
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || [];
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
};
