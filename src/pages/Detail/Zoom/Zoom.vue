<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref } from "vue";
import bus from "@/bus";

export default {
  name: "Zoom",
  props: ["skuImageList"],
  setup(props) {
    const mask = ref(null);
    const big = ref(null);
    const data = reactive({
      currentIndex: 0,
    });

    // 放大鏡
    const handler = (event) => {
      let maskVal = mask.value;
      let bigVal = big.value;

      let left = event.offsetX - maskVal.offsetWidth / 2;
      let top = event.offsetY - maskVal.offsetHeight / 2;

      // 約束範圍
      if (left <= 0) left = 0;
      if (left >= maskVal.offsetWidth) left = maskVal.offsetWidth;
      if (top <= 0) top = 0;
      if (top >= maskVal.offsetHeight) top = maskVal.offsetHeight;

      // 修改元素的 left | top 屬性值
      maskVal.style.left = left + "px";
      maskVal.style.top = top + "px";
      bigVal.style.left = -2 * left + "px";
      bigVal.style.top = -2 * top + "px";
    };

    onMounted(() => {
      // bus 獲取兄弟組件傳過來的圖片索引值
      bus.on("getImgIndex", (index) => {
        data.currentIndex = index;
      });
    });

    return {
      mask,
      big,
      imgObj: computed(() => props.skuImageList[data.currentIndex] || {}),
      handler,
    };
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>