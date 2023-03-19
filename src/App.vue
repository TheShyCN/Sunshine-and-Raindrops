<script setup>
import { RouterView } from "vue-router";
import SiteNavigation from "./components/SiteNavigation.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen bg-weather-primary">
    <SiteNavigation />
    <RouterView />
  </div>
</template>
<style>
@font-face {
  font-family: "iconfont"; /* Project id 3962471 */
  src: url("//at.alicdn.com/t/c/font_3962471_vtmijygj9e.woff2?t=1679225855670")
      format("woff2"),
    url("//at.alicdn.com/t/c/font_3962471_vtmijygj9e.woff?t=1679225855670")
      format("woff"),
    url("//at.alicdn.com/t/c/font_3962471_vtmijygj9e.ttf?t=1679225855670")
      format("truetype");
}
.iconfont {
  font-family: "iconfont" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>
