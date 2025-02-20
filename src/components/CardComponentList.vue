<script setup lang="ts">
import type { Planet } from '@/services/planet.service';

defineProps<{
  planets: Planet[];
}>();
</script>

<template>
  <div v-for="planet in planets" :key="planet.url">
    <div class="card-container">
      <div class="header">
        <h2>
          <slot name="title" :message="planet.name"></slot>
        </h2>
      </div>
      <div class="content">
        <p>Population: {{ planet.population }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  gap: 1rem;
  padding: 1rem;
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  color: #333;
  font-family: Arial, sans-serif;
}

.header {
  font-size: 1.5rem;
  font-weight: bold;
}

.content {
  font-size: 1rem;
  background-color: aqua;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
