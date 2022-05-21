import { v4 as uuidv4 } from "uuid";
// 生成一個隨機字串，且每次執行不能發生變化，遊客身分持久存儲
export const getUUID = () => {
    // 先從本地存儲獲取 uuid
    let uuid_token = localStorage.getItem("UUIDTOKEN");
    // 若本地沒有就生成一個新的
    if (!uuid_token) {
        uuid_token = uuidv4();
        localStorage.setItem("UUIDTOKEN", uuid_token);
    }

    return uuid_token;
};