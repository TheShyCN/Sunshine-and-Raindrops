<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="iconfont text-3xl">&#xe600;</i>
          <p class="text-2xl text-font">本地天气</p>
        </div>
      </RouterLink>
      <div class="flex gap-3 flex-1 justify-end">
        <i
          @click="toggleModal"
          class="iconfont text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          >&#xe625;
        </i>
        <i
          class="iconfont text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="addCity"
          v-if="route.query.preview"
          >&#xe64d;
        </i>
      </div>
      <BaseModal :modal-active="modalActive" @close-modal="toggleModal">
        <div class="text-black">
          <h1 class="text-2xl mb-1">About:</h1>
          <p class="mb-4">当地允许您跟踪您选择的城市的当前和未来的天气。</p>
          <h2 class="text-2xl">How it works:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>通过在搜索栏中输入名称来搜索您所在的城市。</li>
            <li>在结果中选择一个城市，这将带您到当前的天气为您选择。</li>
            <li>
              通过点击右上角的“
              +”图标来跟踪城市。这将保存该城市，以便稍后在主页上查看。
            </li>
          </ol>

          <h2 class="text-2xl">Removing a city</h2>
          <p>
            如果您不再希望跟踪某个城市，只需在主页中选择该城市即可。在页面的底部，将有一个选项，以删除该城市。
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import BaseModal from "./BaseModal.vue";
import { uid } from "uid";

const route = useRoute();
const router = useRouter();
const savedCities = ref([]);
const addCity = () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value.push(JSON.parse(localStorage.getItem("savedCities")));
  }
  const locationObj = {
    id: uid(),
    city: route.params.city,
    province: route.params.province,
    country: route.params.country,
  };
  savedCities.value.push(locationObj);
  localStorage.setItem("savedCities", JSON.stringify(savedCities.value));

  let query = Object.assign({}, route.query);
  delete query.preview;
  router.replace({ query });
};

const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>
