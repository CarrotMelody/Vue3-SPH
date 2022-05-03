<template>
  <swiper
    class="swiper-container"
    :navigation="{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }"
    :pagination="{ clickable: true }"
    :autoplay="{ autoplay: true }"
    loop
  >
    <swiper-slide v-for="carousel in list" :key="carousel.id">
      <img :src="carousel.imgUrl" />
    </swiper-slide>

    <div class="swiper-pagination"></div>

    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
export default {
  name: "Carousel",
  props: ["list"],
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>
<style lang="">
</style>