import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

// 引入路由
import router from "@/router";
app.use(router);

// 引入倉庫
import { store } from "@/store";
// 註冊倉庫: 組件實例的身上會多一個 $store 屬性
app.use(store);

// 註冊全局組件
import TypeNav from "@/components/TypeNav";
app.component(TypeNav.name, TypeNav);
import Carousel from "@/components/Carousel";
app.component(Carousel.name, Carousel);
import Page from "@/components/Pagination";
app.component(Pagination.name, Page);
// 引入 mock 數據
import "@/mock/mockServer";

// 引入 swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

// 引入 message box CSS
import "element-plus/es/components/message-box/style/css";

app.mount("#app");
