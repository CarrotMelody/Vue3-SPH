<template>
  <div>
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>
<script>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";

export default {
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  setup() {
    const store = useStore();

    onMounted(async () => {
      await store.dispatch("getFloorList");
    });

    return {
      floorList: computed(() => store.state.home.floorList),
    };
  },
};
</script>
<style lang="less">
</style>