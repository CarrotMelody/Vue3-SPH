// User 模塊的倉庫
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api";
import { setToken, getToken, removeToken, setName, removeName } from "@/utils/token";

const state = {
  code: "",
  token: getToken(),
  userInfo: []
};

const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state, token) {
    state.token = token;
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  CLEAR(state) {
    state.token = "";
    state.userInfo = {};
    removeToken();
    removeName();
  }
};

const actions = {
  // 獲取驗證碼
  async getCode({ commit }, phone) {
    let results = await reqGetCode(phone);
    if (results.code === 200) {
      commit("GETCODE", results.data);
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  // 用戶註冊
  async userRegister({ commit }, user) {
    let results = await reqUserRegister(user);
    if (results.code === 200) {
      return Promise.resolve("ok");
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  // 用戶登入
  async userLogin({ commit }, user) {
    let results = await reqUserLogin(user);
    if (results.code === 200) {
      commit("USERLOGIN", results.data.token);

      // 持久化存儲 token
      setToken(results.data.token);
      setName(results.data.name);
      return Promise.resolve("ok");
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  // 獲取用戶信息
  async getUserInfo({ commit }) {
    let results = await reqUserInfo();
    if (results.code === 200) {
      commit("GETUSERINFO", results.data);
      return Promise.resolve("ok")
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  // 退出登入
  async userLogout({ commit }, user) {
    let results = await reqLogout(user);
    if (results.code === 200) {
      commit("CLEAR");
      return Promise.resolve("ok");
    } else {
      return Promise.reject(new Error("failed"));
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
