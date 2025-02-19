<script setup lang="ts">
import type { Car } from '@/schemas/car.schema';
import { getcars } from '@/services/car.service';
import { onMounted, ref } from 'vue';

const cars = ref<Car[]>([]);

onMounted(() => {
  getcars().then((data) => {
    cars.value = data.data;
  });
});
</script>

<template>
  <div v-for="car in cars" :key="car._id">
    <h2>{{ car.name }}</h2>
    <p>Model: {{ car.model }}</p>
    <p>Cost in credits: {{ car.cost_in_credits }}</p>
  </div>
</template>
