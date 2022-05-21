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

// 獲取產品詳情信息
export const reqGoodsInfo = (skuid) => requests.get(`/item/${skuid}`);

// 將產品添加到購物車中(或者更新某個產品的個數)
export const reqaddOrUpdateShopCar = (skuId, skuNum) => requests.post(`/cart/addToCart/${skuId}/${skuNum}`);

// 獲取購物車列表數據
export const reqCartList = () => requests.get("/cart/cartList");