<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show == true">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseover="changeIndex(index)">
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">
                    {{ c1.categoryName }}
                  </a>
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">
                          {{ c2.categoryName }}
                        </a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">
                            {{ c3.categoryName }}
                          </a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "TypeNav",
  data() {
    return {
      // 存儲用戶鼠標移上哪一個分類
      currentIndex: -1,
      // 節流
      throttleTimer: false,
      // 商品分類是否展開
      show: true,
    };
  },
  mounted() {
    // 當組件掛載完畢, 讓 show 屬性變為 false
    // 如果不是 Home 路由組件則將 typeNav 進行隱藏
    if (this.$route.path != '/home') {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      // 當使用這個計算屬性的時候, 函數會立即執行一次
      // 參數 state 就是大倉庫中的數據
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    // 節流
    throttle(callback, time) {
      if (this.throttleTimer) return;
      this.throttleTimer = true;

      setTimeout(() => {
        callback();
        this.throttleTimer = false;
      }, time);
    },
    // 獲取當前 hover 的分類 index
    changeIndex(index) {
      this.throttle(() => {
        this.currentIndex = index;
      }, 25);
    },
    // 菜單路由跳轉
    goSearch(event) {
      let element = event.target;
      let { categoryname, category1id, category2id, category3id } = element.dataset;

      // 若有 categoryName 標籤即為 a 標籤
      if (categoryname) {
        let location = { name: 'Search' };
        let query = { categoryName: categoryname };

        // 若有 category1id 即為一級菜單, 依此類推
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }

        // 判斷: 如果路由跳轉時, 帶有 params / query 參數需要傳地過去        
        if (Object.keys(this.$route.params).length) {
          location.params = this.$route.params;
        }
        // 整理参数
        location.query = query;
        // 路由跳轉
        this.$router.push(location);
      }
    },
    // 當鼠標移入的時候展開商品分類菜單
    enterShow() {
      this.show = true;
    },
    leaveShow() {
      this.currentIndex = -1;
      if (this.$route.path !== '/home') {
        this.show = false;
      }
    }
  },
};
</script>
<style lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      a {
        cursor: pointer;
      }

      a:hover {
        color: darkcyan;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }

    // 過渡動畫的樣式
    .sort-enter-from { // 過渡動畫開始狀態(進入)
      height: 0px;
    }
    .sort-enter-to { // 過渡動畫結束狀態(進入)
      height: 461px;
    }
    .sort-enter-active { // 定義動畫時間, 速率
      transition: all 0.1s linear;
    }
  }
}
</style>