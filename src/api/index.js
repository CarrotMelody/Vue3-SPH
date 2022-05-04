import requests from "./reqeusts";
import mockRequests from "./mockAjax";

// 三級商品分類
export const reqCategoryList = () =>
  requests.get("/product/getBaseCategoryList");

// 獲取 banner
export const reqGetBannerList = () => mockRequests.get("/banner");

// 獲取 floor
export const reqFloorList = () => mockRequests.get("/floor");

// 獲取搜索模塊數據
export const reqGetSearchInfo = (data) => requests.post("/list", data);