<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)" />
  </div>
  <p v-if="savedCities.length === 0">
    你还没有收藏任何城市,快去添加你关心的城市吧^.^
  </p>
</template>

<script setup>
import CityCard from "./CityCard.vue";
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const keyAPI = "S__tENa07EK0IwlzG";
const savedCities = ref([]);
const getCities = async () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }

  const requests = [];
  savedCities.value.forEach((city) => {
    requests.push(
      axios.get(
        `https://api.seniverse.com/v3/weather/now.json?key=${keyAPI}&location=${city.city}`
      )
    );
  });
  const weatherData = await Promise.all(requests);
  // 等待一秒展示动画
  await new Promise((res) => setTimeout(res, 1000));

  weatherData.forEach((value, index) => {
    savedCities.value[index].weather = value;
  });
};
await getCities();
const router = useRouter();
const goToCityView = (city) => {
  router.push({
    name: "city",
    params: { country: city.country, province: city.province, city: city.city },
    query: { id: city.id },
  });
};
</script>
