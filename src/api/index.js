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
export const reqaddOrUpdateShopCar = (skuId, skuNum) =>
  requests.post(`/cart/addToCart/${skuId}/${skuNum}`);

// 獲取購物車列表數據
export const reqCartList = () => requests.get("/cart/cartList");

// 刪除購物車產品
export const reqDeleteCartById = (skuId) =>
  requests.delete(`/cart/deleteCart/${skuId}`);

// 修改商品的選中狀態
export const reqUpdateCheckedById = (skuId, isChecked) =>
  requests.get(`/cart/checkCart/${skuId}/${isChecked}`);

// 獲取驗證碼
export const reqGetCode = (phone) =>
  requests.get(`/user/passport/sendCode/${phone}`);

// 註冊
export const reqUserRegister = (data) =>
  requests.post("/user/passport/register", data);

// 登入
export const reqUserLogin = (data) =>
  requests.post("/user/passport/login", data);

// 獲取用戶信息
export const reqUserInfo = () =>
  requests.get("/user/passport/auth/getUserInfo");

// 退出登入
export const reqLogout = () => requests.get("/user/passport/logout");

// 獲取用戶地址信息
export const reqAddressInfo = () => mockRequests.get("/address");
  // requests.get("/user/userAddress/auth/findUserAddressList");

// 獲取商品清單
export const reqOrderInfo = () => requests.get("/order/auth/trade");
