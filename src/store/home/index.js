// Home 模塊的倉庫
import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api";

const state = {
  categoryList: [],
  bannerList: [],
  floorList: [],
};

const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  BANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  FLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};

const actions = {
  // 通過 API 裡面的接口函數調用, 向服務器發送請求獲取數據
  async categoryList({ commit }) {
    let results = await reqCategoryList();

    if (results.code === 200) {
      commit("CATEGORYLIST", results.data);
    }
  },
  async getBannerList({ commit }) {
    let results = await reqGetBannerList();

    if (results.code === 200) {
      commit("BANNERLIST", results.data);
    }
  },
  async getFloorList({ commit }) {
    let results = await reqFloorList();

    if (results.code === 200) {
      commit("FLOORLIST", results.data);
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
