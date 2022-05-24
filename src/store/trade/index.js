// Trade 模塊的倉庫
import { reqAddressInfo, reqOrderInfo } from "@/api";

const state = {
  address: [],
  orderInfo: {},
};

const mutations = {
  GETUSERADDRESS(state, address) {
    state.address = address;
  },
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo;
  },
};

const actions = {
  // 獲取用戶地址信息
  async getUserAddress({ commit }) {
    let results = await reqAddressInfo();

    if (results.code === 200) {
      commit("GETUSERADDRESS", results.data.data);
    }
  },
  // 獲取商品清單數據
  async getOrderInfo({ commit }) {
    let results = await reqOrderInfo();

    if (results.code === 200) {
      commit("GETORDERINFO", results.data);
    }
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
