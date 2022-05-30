<template>
  <div class="paysuccess">

    <div class="success">
      <h3>
        <img src="./images/right.png" width="48" height="48">
        恭喜您，支付成功啦！
      </h3>
      <div class="paydetail">
        <p class="button">
          <router-link class="btn-look" to="/center">查看订单</router-link>
          <router-link class="btn-goshop" to="/">继续购物</router-link>
        </p>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'PaySuccess',
    // 組件內守衛
    beforeRouteEnter (to, from, next) {
      // 在渲染該組建的對應路由被 confirm 前調用
      // 不能獲取組件實例 this
      // 因為當守衛執行前, 組件實例還沒被創建
      if (from.path == "/pay") {
        next();
      } else {
        next(false);
      }
    },
    // beforeRouteUpdate(to, from, next) {
    //   // 在當前路由改變, 但組件被覆用時調用
    //   // 舉例來說, 對於一個帶有動態參數的路徑 /foo/:id, 在 /foo/1 和 /foo/2  之間跳轉的時候
    //   // 由於會渲染同樣的 foo 組件, 因此組件實例會被覆用. 而這個 hook 就會在這種情況下被調用
    //   // 可以訪問組件實例 this
    //   console.log('1');
    // },
    // beforeRouteLeave(to, from, next) {
    //   // 導航離開該組建的對應路由時調用
    //   // 可以訪問組件實例 this
    //   console.log('2');
    // },
  }
</script>

<style lang="less" scoped>
  .paysuccess {
    margin: 20px auto;
    padding: 25px;
    border: 1px solid rgb(211, 211, 211);
    width: 1200px;
    width: 1148px;

    .success {
      width: 500px;
      margin: 0 auto;

      h3 {
        margin: 20px 0;
        font-weight: 700;
        font-size: 20px;
        line-height: 30px;

        img {
          max-width: 100%;
          vertical-align: middle;
          border: 0;
          margin-right: 14px;
        }
      }

      .paydetail {
        margin-left: 66px;
        font-size: 15px;

        .button {
          margin: 30px 0;
          line-height: 26px;

          a {
            display: inline-block;
            box-sizing: border-box;
            text-align: center;
            vertical-align: middle;
            cursor: pointer;
            border-radius: 2px;
            user-select: none;
            font-size: 18px;
            padding: 4px 20px;
            line-height: 22px;
            text-decoration: none;

            &.btn-look {
              margin-right: 13px;
              color: #fff;
              background-color: #e1251b;
              border: 1px solid #e1251b;
            }

            &.btn-goshop {
              color: #666;
              background-color: #eee;
              border: 1px solid #e1e1e1;
            }
          }
        }
      }
    }
  }
</style>