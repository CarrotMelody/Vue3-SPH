## VUE 項目實戰 - 尚品匯

> 教學影片：
> 
> [https://www.bilibili.com/video/BV1Vf4y1T7bw](https://www.bilibili.com/video/BV1Vf4y1T7bw)

## 項目邏輯

### 遊客

1. 遊客可以進入購物車頁面，但無法點擊結算。
2. 遊客無法訪問交易相關、支付相關、用戶中心，一旦訪問會自動跳轉到登入頁面。

## 待善部分

1. 註冊驗證碼獲取的方式
4. 登入失敗提示
6. 購物車訂單信息收件人姓名點擊同字串 click事件
7. 搜索頁面右上方的[多選]和[更多]沒有做
8. 支付頁面點擊切換網銀/支付方式不會顯示選中效果
9. 支付功能改成台灣的方式
10. 商品參數可以複選, 不合邏輯
11. 註冊頁面的登入連結跳轉路由不對(回首頁了)
12. 登入頁的掃描登入無用(嘗試使用 line, fb 掃描登入, 下排的 qq weibo 那些也換掉)
14. 自動登入
16. 從別的私人路由跳轉至登入頁登入後, 無法返回(beforeEach 重複call)

2. 註冊失敗時文字提示 [x]
3. 註冊登入正規化 [x]
5. 遊客無法進入購物車頁面 => 應跳轉到登入頁 [x]
13. 搜索頁面價格跟符號黏在一起了 [x]
15. 登入密碼隱藏 [x]

## 登入帳密

4894892123182
test

## 部署步驟

1. 在 package.json 中的 scripts 加上 `"postinstall": "npm install express",`

2. 使用 npm run build 指令打包 vue app, 並在 .gitignore 中刪除 dist

3. 新增 server.js

```js
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

app = express();
app.use(serveStatic(__dirname));

var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);
```

4. 使用 `heroku login` 指令登入 heroku

5. 使用指令 `heroku git:remote -a <app-name>` 連上已經建立的 heroku app

6. 設置運行環境 `heroku buildpacks:set heroku/nodejs`

> Error: The buildpack heroku/nodejs is already set on your app.

7. 部署至 heroku

```
git add .
git commit -m "msg"
git subtree push --prefix dist heroku master // 只部署 dist 到 heroku 上
```