<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- category -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">x</i>
            </li>
            <!-- keyword -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyword">x</i>
            </li>
            <!-- trademark -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTrademark">x</i>
            </li>
            <!-- attr -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}
              <i @click="removeAttr(index)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a
                    >综合
                    <span
                      v-show="isOne"
                      class="iconfont"
                      :class="{
                        'icon-long-arrow-down': isDesc,
                        'icon-long-arrow-up': isAsc,
                      }"
                    ></span>
                  </a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a
                    >价格
                    <span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{
                        'icon-long-arrow-down': isDesc,
                        'icon-long-arrow-up': isAsc,
                      }"
                    ></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodsList"
                :key="index"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="searchList.total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onBeforeMount, computed, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import bus from "@/bus";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const data = reactive({
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      },
    });

    onBeforeMount(() => {
      // 合併
      Object.assign(data.searchParams, route.query, route.params);
    });

    // 獲取 search 數據 (根據參數不同返回不同數據)
    const getList = () => {
      store.dispatch("getSearchList", data.searchParams);
    };

    onMounted(() => {
      // 在發送請求之前帶給服務氣參數(searchParmas)
      getList();
    });

    // 監聽路由信息是否發生變化, 如果發生變化再次發送請求
    watch(route, (curVal, preVal) => {
      // 清空
      Object.keys(data.searchParams).forEach((key) => {
        if (
          [
            "category1Id",
            "category2Id",
            "category3Id",
            "categoryName",
            "keyword",
          ].includes(key)
        ) {
          data.searchParams[key] = undefined;
        }
      });

      // 合併
      Object.assign(data.searchParams, route.query, route.params);

      // 再次發送請求
      getList();
    });

    // 刪除麵包屑
    const removeCategoryName = () => {
      data.searchParams.categoryName = undefined;
      data.searchParams.category1Id = undefined;
      data.searchParams.category2Id = undefined;
      data.searchParams.category3Id = undefined;

      // 清空路由
      if (Object.keys(route.params).length) {
        router.push({ name: "Search", params: route.params });
      } else {
        router.push({ name: "Search" });
      }
    };

    // 刪除關鍵字
    const removeKeyword = () => {
      data.searchParams.keyword = undefined;
      // 通知 Header 清除關鍵字
      bus.emit("clear");
      // 路由跳轉
      if (Object.keys(route.query).length) {
        router.push({ name: "Search", query: route.query });
      } else {
        router.push({ name: "Search" });
      }
    };

    const trademarkInfo = (trademark) => {
      data.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      // 再次請求
      getList();
    };

    const removeTrademark = () => {
      data.searchParams.trademark = undefined;
      // 再次請求
      getList();
    };

    // 收集平台售賣屬性
    const attrInfo = (attr, attrValue) => {
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;

      // 若無選擇才新增
      if (data.searchParams.props.indexOf(props) == -1) {
        data.searchParams.props.push(props);
      }

      // 再次請求
      getList();
    };

    // 刪除平台售賣屬性
    const removeAttr = (index) => {
      data.searchParams.props.splice(index, 1);
      // 再次請求
      getList();
    };

    // 排序的操作
    const changeOrder = (flag) => {
      //flag: 1: 綜合 2: 價格
      let originOrder = data.searchParams.order;
      let originFlag = originOrder.split(":")[0];
      let originSort = originOrder.split(":")[1];
      let newOrder;
      // 若點擊的是當前的類型則將排序方式相反
      if (flag === originFlag) {
        newOrder = `${originFlag}:${originSort === "desc" ? "asc" : "desc"}`;
      } else {
        // 點擊的類型與當前所選類型不同
        newOrder = `${flag}:desc`;
      }

      // 將新的 order 賦予 searchParams
      data.searchParams.order = newOrder;
      // 再次請求
      getList();
    };

    const getPageNo = (pageNo) => {
      data.searchParams.pageNo = pageNo;
      getList();
    }

    return {
      searchList: computed(() => store.state.search.searchList),
      goodsList: computed(() => store.getters.goodsList),
      trademarkList: computed(() => store.getters.trademarkList),
      attrsList: computed(() => store.getters.attrsList),
      searchParams: computed(() => data.searchParams),
      removeCategoryName,
      removeKeyword,
      trademarkInfo,
      removeTrademark,
      attrInfo,
      removeAttr,
      isOne: computed(() => data.searchParams.order.indexOf("1") !== -1),
      isTwo: computed(() => data.searchParams.order.indexOf("2") !== -1),
      isAsc: computed(() => data.searchParams.order.indexOf("asc") !== -1),
      isDesc: computed(() => data.searchParams.order.indexOf("desc") !== -1),
      changeOrder,
      getPageNo
    };
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>