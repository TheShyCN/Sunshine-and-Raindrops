<template>
  <div>
    <Suspense>
      <AscyncCityView />
      <template #fallback> Loading... </template>
    </Suspense>
  </div>
</template>

<script setup>
import AscyncCityView from "../components/AsyncCityView.vue";
</script>

<style></style>
