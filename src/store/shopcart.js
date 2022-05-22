import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";

const state = {
  cartList: [],
};
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  },
};
const actions = {
  // 獲取購物車列表
  async getCartList({ commit }) {
    let results = await reqCartList();

    if (results.code === 200) {
      commit("GETCARTLIST", results.data);
    }
  },
  // 刪除購物車商品
  async deleteCartListBySkuId({ commit }, skuId) {
    let results = await reqDeleteCartById(skuId);
    if (results.code === 200) {
      return Promise.resolve("ok");
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  // 修改購物車某商品選中狀態
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let results = await reqUpdateCheckedById(skuId, isChecked);
    if (results.code === 200) {
      return Promise.resolve("ok");
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  // 刪除購物車中選中的商品
  async deleteAllCheckedCart({ dispatch, getters }) {
    /* context: 小倉庫,
     * commit[提交 mutations 修改 state],
     * getters [計算屬性],
     * dispatch[派發action],
     * state[當前倉庫數據]
     */
    let arr = [];

    getters.cartList.cartInfoList.forEach((item) => {
      // 刪除選中的商品
      let promise =
        item.isChecked == 1
          ? dispatch("deleteCartListBySkuId", item.skuId)
          : "";
      // 將每次返回的 promise 添加到陣列中
      arr.push(promise);
    });

    return Promise.all(arr);
  },
  // 修改全部產品的狀態
  async updateAllCartIsChecked({ dispatch, satte }, isChecked) {
    console.log(state, isChecked);
    let arr = [];
    await state.cartList[0]?.cartInfoList.forEach((item) => {
      let promise = dispatch("updateCheckedById", {
        skuId: item.skuId,
        isChecked,
      });
      arr.push(promise);
    });
    return Promise.all(arr);
  },
};
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
