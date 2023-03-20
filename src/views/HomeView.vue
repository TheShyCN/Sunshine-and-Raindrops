<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const keyAPI = "S__tENa07EK0IwlzG";
const searchQuery = ref("");
const queryTimeout = ref(null);
const searchResult = ref(null);
const searchError = ref(null);

const router = useRouter();

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.seniverse.com/v3/weather/now.json?key=${keyAPI}&location=${searchQuery.value}`
        );
        searchResult.value = result.data.results[0];
      } catch {
        searchError.value = true;
      }
      return;
    }
    searchResult.value = null;
  }, 300);
};
function previewCity(searchResult) {
  const [country, province, city] = searchResult.location.path
    .split(",")
    .reverse();
  router.push({
    name: "city",
    params: { country, city, province },
    query: {
      preview: true,
    },
  });
}
</script>

<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        @input="getSearchResults"
        v-model.trim="searchQuery"
        type="text"
        placeholder="请输入完整的城市名"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0#004E71]"
      />
      <ul
        class="absolute bg-weather-secondary text-white w-full shadow-md py px-1 top-[66px]"
        v-if="searchResult"
        @click="previewCity(searchResult)"
      >
        <li>{{ searchResult.location.name }}</li>
      </ul>
      <p v-if="searchError && searchQuery !== '' && searchResult === null">
        抱歉,出了一些问题,请检查城市名是否正确
      </p>
    </div>
  </main>
</template>
