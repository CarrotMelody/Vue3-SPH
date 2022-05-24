import Mock from "mockjs";
// webpack 默認對外暴露的資源: 圖片, JSON數據格式
import banner from './banners.json';
import floor from './floors.json';
import address from "./address.json";

// mock 數據
// 第一個參數: 請求地址, 第二個參數: 請求數據
Mock.mock("/mock/banner", { code: 200, data: banner });
Mock.mock("/mock/floor", { code: 200, data: floor });
Mock.mock("/mock/address", { code: 200, data: address });