// Detail 模塊的倉庫
import { reqGoodsInfo, reqaddOrUpdateShopCar } from "@/api";
import { getUUID } from "@/utils/uuid_token";

const state = {
  goodInfo: {},
  // 遊客臨時身分
  uuid_token: getUUID()
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
  // 將產品添加到購物車中
  async addOrUpdateShopCar({ commit }, { skuId, skuNum }) {
    // 伺服器沒返回數據，因此不需要三連環
    let results = await reqaddOrUpdateShopCar(skuId, skuNum);

    if (results.code === 200) {
      return Promise.resolve("ok");
    } else {
      return Promise.reject(new Error("failed"));
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
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
