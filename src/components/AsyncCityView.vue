<template>
  <div class="flex flex-col flex-1 items-center">
    <div
      v-if="route.query.preview"
      class="text-white p-4 bg-weather-secondary w-full text-center"
    >
      <p>您正在预览该城市,点击加号来关注该城市的天气情况</p>
    </div>
    <!-- 今日天气 -->
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <p class="text-sm mb-12">
        {{ displayTime }}
      </p>
      <p class="text-8xl mb-8">
        {{ Math.round(weatherData.temp.now.temperature) }}°
      </p>
      <p class="text-2xl mb-2">
        {{ weatherData.temp.now.text }}
      </p>
      <img
        class="w-[150px] h-auto"
        :src="`/src/assets/icons/${weatherData.temp.now.code}@2x.png`"
        alt="day weather"
      />
    </div>
    <hr class="border-white border-opacity-10 w-full border-2" />
    <!-- 24小时天气 -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">24小时预报</h2>
        <div class="flex gap-10 overflow-x-scroll">
          <div
            v-for="(hourData, index) in weatherData.hourly"
            :key="hourData.time"
            class="flex flex-col gap-4 items-center"
          >
            <p class="whitespace-nowrap text-sm">{{ hours[index] }}</p>
            <img
              class="w-auto h-[20px] object-cover"
              :src="`/src/assets/icons/${hourData.code}@1x.png`"
              alt="hour weather"
            />
            <p class="text-xl">{{ hourData.temperature }}°</p>
          </div>
        </div>
      </div>
    </div>
    <hr class="border-white border-opacity-10 w-full border-2" />
    <!-- 本周天气 -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">未来七天</h2>
        <div
          v-for="weekData in weatherData.weekly"
          :key="weekData.date"
          class="flex items-center"
        >
          <p class="flex-1">
            {{ weekData.date.slice(5) }}
          </p>
          <img
            class="w-[50px] h-[35px] mb-2"
            :src="`/src/assets/icons/${weekData.code_day}@1x.png`"
            alt="hour weather"
          />
          <div class="flex gap-2 flex-1 justify-end">
            <p>
              H:{{
                weekData.high.length > 2
                  ? weekData.high
                  : weekData.high.padStart(2, "0")
              }}°
            </p>
            <p>
              L:{{
                weekData.low.length > 2
                  ? weekData.low
                  : weekData.low.padStart(2, "0")
              }}°
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const keyAPI = "S__tENa07EK0IwlzG";

const getWeatherData = async () => {
  try {
    const TEMPresult = await axios.get(
      `https://api.seniverse.com/v3/weather/now.json?key=${keyAPI}&location=${route.params.city}`
    );
    const LIFEresult = await axios.get(
      `https://api.seniverse.com/v3/life/suggestion.json?key=${keyAPI}&location=${route.params.city}`
    );
    const HOURresult = await axios.get(
      `https://api.seniverse.com/v3/weather/hourly.json?key=${keyAPI}&location=${route.params.city}&hours=24`
    );
    const WEEKresult = await axios.get(
      `https://api.seniverse.com/v3/weather/daily.json?key=${keyAPI}&location=${route.params.city}&start=1&days=7`
    );
    const nowTime = new Date(TEMPresult.data.results[0].last_update);
    const weatherData = {
      temp: TEMPresult.data.results[0],
      // air: AIRresult.data.results[0],
      life: LIFEresult.data.results[0],
      time: nowTime,
      hourly: HOURresult.data.results[0].hourly,
      weekly: WEEKresult.data.results[0].daily,
    };
    return weatherData;
  } catch (error) {
    console.log(error);
  }
};

const weatherData = await getWeatherData();
// 本日数据
const displayTime = computed(() => {
  const week = ["日", "一", "二", "三", "四", "五", "六"];
  return `${
    weatherData.time.getMonth() + 1
  }月${weatherData.time.getDate()}日 星期${
    week[weatherData.time.getDay()]
  } ${weatherData.time.getHours()}:${weatherData.time.getMinutes()}`;
});
// 24小时
const hours = computed(() => {
  return weatherData.hourly.map((hour) => {
    const date = new Date(hour.time);
    return `${date.getHours()}:${
      date.getMinutes().toString().length < 2
        ? date.getMinutes().toString().padStart(2, "0")
        : date.getMinutes()
    }`;
  });
});
</script>

<style></style>
