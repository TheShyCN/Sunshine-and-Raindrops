<script setup>
import { RouterView } from "vue-router";
import SiteNavigation from "./components/SiteNavigation.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen bg-weather-primary">
    <SiteNavigation />
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>
<style>
@font-face {
  font-family: "iconfont"; /* Project id 3962471 */
  src: url("//at.alicdn.com/t/c/font_3962471_o2kb85jc0yi.woff2?t=1679374915254")
      format("woff2"),
    url("//at.alicdn.com/t/c/font_3962471_o2kb85jc0yi.woff?t=1679374915254")
      format("woff"),
    url("//at.alicdn.com/t/c/font_3962471_o2kb85jc0yi.ttf?t=1679374915254")
      format("truetype");
}
.iconfont {
  font-family: "iconfont" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

.page-enter-active,
.page-leave-active {
  transition: 600ms ease all;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
