<template>
  <swiper
    class="swiper-container"
    :navigation="{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }"
    :pagination="{ clickable: true }"
    :autoplay="{ autoplay: true }"
    :slides-per-view="3"
  >
    <swiper-slide v-for="(slide, index) in skuImageList" :key="slide.id">
      <img
        :src="slide.imgUrl"
        :class="{ active: currentIndex == index }"
        @click="changeCurrentIndex(index)"
      />
    </swiper-slide>

    <div class="swiper-pagination"></div>

    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </swiper>
</template>

<script>
import { reactive, computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import bus from "@/bus";

export default {
  name: "ImageList",
  props: ["skuImageList"],
  components: {
    Swiper,
    SwiperSlide,
  },
  setup(props) {
    const data = reactive({
      currentIndex: 0,
    });

    const changeCurrentIndex = (index) => {
      data.currentIndex = index;
      // 通知兄弟組件, 當前的索引值
      bus.emit("getImgIndex", data.currentIndex);
    };

    return {
      skuImageList: props.skuImageList,
      currentIndex: computed(() => data.currentIndex),
      changeCurrentIndex,
    };
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>