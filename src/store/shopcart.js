import { reqCartList } from "@/api";

const state = {};
const mutations = {};
const actions = {
  async getCartList({ commit }) {
    let results = await reqCartList();
    console.log(results);
  }
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
