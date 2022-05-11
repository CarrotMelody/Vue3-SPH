<template>
  <div class="fr page">
    <div class="sui-pagination clearfix">
      <ul>
        <li class="prev disabled">
          <a :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
            «上一页
          </a>
        </li>
        <li :class="{ active: pageNo == 1 }" v-if="startNumAndEndNum.start > 1">
          <a @click="$emit('getPageNo', 1)">1</a>
        </li>
        <li class="dotted" v-if="startNumAndEndNum.start > 2">
          <span>...</span>
        </li>
        <li
          v-for="(page, index) in startNumAndEndNum.end"
          :key="index"
          v-show="page >= startNumAndEndNum.start"
          :class="{ active: pageNo == page }"
        >
          <a @click="$emit('getPageNo', page)">
            {{ page }}
          </a>
        </li>
        <li class="dotted" v-if="startNumAndEndNum.end < totalPage - 1">
          <span>...</span>
        </li>
        <li
          v-if="startNumAndEndNum.end < totalPage"
          :class="{ active: pageNo == totalPage }"
        >
          <a @click="$emit('getPageNo', totalPage)">{{ totalPage }}</a>
        </li>
        <li class="next">
          <a
            :disabled="pageNo == totalPage"
            @click="$emit('getPageNo', pageNo + 1)"
          >
            下一页»
          </a>
        </li>
      </ul>
      <div>
        <span>共 {{ total }} 條&nbsp;</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    startNumAndEndNum() {
      let start = 0,
        end = 0;
      // 如果不足 5 頁
      if (this.continues > this.totalPage) {
        start = 1;
        end = this.totalPage;
      } else {
        // 連續頁碼 5, 總頁數大於 5
        start = this.pageNo - parseInt(this.continues / 2);
        end = this.pageNo + parseInt(this.continues / 2);
        // start 數字為 0 或負數時糾正
        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        // end 數字大於總頁碼
        if (end > this.totalPage) {
          end = this.totalPage;
          start = this.totalPage - this.continues + 1;
        }
      }
      return { start, end };
    },
  },
  // setup(props) {
  //   const { total, pageSize, pageNo, continues } = props;
  //   const totalPage = computed(() => Math.ceil(total / pageSize));

  //   return {
  //     pageNo,
  //     totalPage: totalPage.value,
  //     // 計算出連續的頁碼起始數字和結束數字(連續頁碼數至少 5 頁)
  //     startNumAndEndNum: computed(() => {
  //       let start = 0,
  //         end = 0;
  //       // 如果不足 5 頁
  //       if (continues > totalPage) {
  //         start = 1;
  //         end = totalPage;
  //       } else {
  //         // 連續頁碼 5, 總頁數大於 5
  //         start = pageNo - parseInt(continues / 2);
  //         end = pageNo + parseInt(continues / 2);
  //         // start 數字為 0 或負數時糾正
  //         if (start < 1) {
  //           start = 1;
  //           end = continues;
  //         }
  //         // end 數字大於總頁碼
  //         if (end > totalPage) {
  //           end = totalPage;
  //           start = totalPage - continues + 1;
  //         }
  //       }
  //       return { start, end };
  //     }),
  //   };
  // },
};
</script>
<style lang="less">
.page {
  width: 80%;
  height: 66px;
  overflow: hidden;
  float: right;

  .sui-pagination {
    margin: 18px 0;

    ul {
      margin-left: 0;
      margin-bottom: 0;
      vertical-align: middle;
      // width: 90vw;
      float: left;

      li {
        line-height: 18px;
        display: inline-block;

        a {
          position: relative;
          float: left;
          line-height: 18px;
          text-decoration: none;
          background-color: #fff;
          border: 1px solid #e0e9ee;
          margin-left: -1px;
          font-size: 14px;
          padding: 9px 18px;
          color: #333;
          cursor: pointer;
        }

        &.active {
          a {
            background-color: #fff;
            color: #e1251b;
            border-color: 1px solid #e0e9ee;
            cursor: pointer;
          }
        }

        &.prev {
          a {
            background-color: #fafafa;
            border-left: 2px solid #e0e9ee;
            cursor: pointer;
          }
        }

        &.disabled {
          a {
            color: #999;
            cursor: not-allowed;
          }
        }

        &.dotted {
          span {
            margin-left: -1px;
            position: relative;
            float: left;
            line-height: 18px;
            text-decoration: none;
            background-color: #fff;
            font-size: 14px;
            border: 0;
            padding: 9px 18px;
            color: #333;
            border-left: 1px solid #e0e9ee;
          }
        }

        &.next {
          a {
            background-color: #fafafa;
            cursor: pointer;
          }
        }
      }
    }

    div {
      color: #333;
      font-size: 14px;
      // float: right;
      // width: 33%;
      padding-top: 9px;

      span {
        padding-left: 10px;
      }
    }
  }
}
</style>