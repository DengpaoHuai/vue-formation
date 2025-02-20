<script setup lang="ts">
import useFetch from '@/composables/useFetch';

type Planet = {
  name: string;
  population: string;
  climate: string;
  terrain: string;
  films: string[];
  url: string;
};

type Vehicules = {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

type ApiResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

//généric
const { data, isLoading, error } = useFetch<ApiResponse<Planet>>('https://swapi.dev/api/planets');

const { data: dataVehicules, isLoading: isLoadingVehicules } = useFetch<ApiResponse<Vehicules>>(
  'https://swapi.dev/api/vehicles',
);
</script>

<template>
  <RouterLink :to="{ name: 'cars-list' }">Car list</RouterLink>
  <h1>Star Wars Planets</h1>
  <div v-if="isLoading">Loading...</div>
  <div v-if="error">{{ error }}</div>
  <div v-for="planet in data?.results" :key="planet.url">
    <h2>{{ planet.name }}</h2>
    <p>Population: {{ planet.population }}</p>
    <p>Climate: {{ planet.climate }}</p>
    <p>Terrain: {{ planet.terrain }}</p>
    <p>Films: {{ planet.films }}</p>
  </div>
  <div v-if="isLoadingVehicules">Loading...</div>
  <div v-for="vehicule in dataVehicules?.results" :key="vehicule.url">
    <h2>{{ vehicule.name }}</h2>
    <p>Model: {{ vehicule.model }}</p>
    <p>Manufacturer: {{ vehicule.manufacturer }}</p>
    <p>Cost in credits: {{ vehicule.cost_in_credits }}</p>
    <p>Length: {{ vehicule.length }}</p>
    <p>Max atmosphering speed: {{ vehicule.max_atmosphering_speed }}</p>
    <p>Crew: {{ vehicule.crew }}</p>
    <p>Passengers: {{ vehicule.passengers }}</p>
    <p>Cargo capacity: {{ vehicule.cargo_capacity }}</p>
    <p>Consumables: {{ vehicule.consumables }}</p>
    <p>Vehicle class: {{ vehicule.vehicle_class }}</p>
    <p>Films: {{ vehicule.films }}</p>
  </div>
</template>

<style scoped></style>
