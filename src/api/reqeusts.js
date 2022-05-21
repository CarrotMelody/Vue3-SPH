import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

// 在當前模塊中引入 store
import { store } from "@/store";

const requests = axios.create({
  baseURL: "http://gmall-h5-api.atguigu.cn/api", // 路徑都帶有 /api
  timeout: 5000, // 5秒內沒響應即失敗
});

// 請求攔截器
requests.interceptors.request.use((config) => {
  // config: 配置物件, 物件裡面有 header 請求頭
  const { uuid_token } = store.state.detail;
  if (uuid_token) {
    // 給請求頭添加一個字段(userTempId), 後端給定的
    config.headers.userTempId = uuid_token;
  }
  // 進度條開始動
  nprogress.start();

  return config;
});

// 響應攔截器
requests.interceptors.response.use(
  (res) => {
    // 進度條結束
    nprogress.done();

    return res.data;
  },
  (err) => {
    // 服務器響應失敗的回調函數
    return Promise.reject(new Error("Failed"));
  }
);

export default requests;
