<script setup lang="ts">
import getPlanets from '@/services/planet.service';

const planets = await getPlanets(1);
</script>

<template>
  <RouterLink :to="{ name: 'cars-list' }">Car list</RouterLink>
  <h1>Star Wars Planets</h1>

  <div v-for="planet in planets?.results" :key="planet.url">
    <h2>{{ planet.name }}</h2>
    <p>Population: {{ planet.population }}</p>
    <p>Climate: {{ planet.climate }}</p>
    <p>Terrain: {{ planet.terrain }}</p>
    <p>Films: {{ planet.films }}</p>
  </div>
</template>

<style scoped></style>
