import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

const requests = axios.create({
  baseURL: "/mock",
  timeout: 5000, // 5秒內沒響應即失敗
});

// 請求攔截器
requests.interceptors.request.use((config) => {
  // config: 配置物件, 物件裡面有 header 請求頭

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