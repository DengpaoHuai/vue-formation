<script setup lang="ts">
import useCarStore from '@/stores/useCarStore';

const carsData = useCarStore();
</script>

<template>
  <RouterLink :to="{ name: 'cars-add' }">Create a new car</RouterLink>
  <div v-for="car in carsData.cars" :key="car._id">
    <h2>{{ car.name }}</h2>
    <p>Model: {{ car.model }}</p>
    <p>Cost in credits: {{ car.cost_in_credits }}</p>
    <button @click="carsData.deleteCar(car._id)">delete</button>
    <RouterLink :to="{ name: 'cars-edit', params: { id: car._id } }">Update</RouterLink>
  </div>
</template>
