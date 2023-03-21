import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CityView from "../views/CityView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "主页",
      },
    },
    {
      path: "/weather/:country/:province/:city",
      name: "city",
      component: CityView,
      meta: {
        title: "天气",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | 晴雨时刻`;
  next();
});

export default router;
