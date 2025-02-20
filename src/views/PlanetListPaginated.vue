<script setup lang="ts">
import CardComponentList from '@/components/CardComponentList.vue';
import CardComponent from '@/components/CardComponentList.vue';
import useFetch from '@/composables/useFetch';
import getPlanets from '@/services/planet.service';
import { useQuery } from '@tanstack/vue-query';
import { ref } from 'vue';

type Planet = {
  name: string;
  population: string;
  climate: string;
  terrain: string;
  films: string[];
  url: string;
};

type ApiResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

const page = ref(1);

const { data } = useQuery<ApiResponse<Planet>>({
  queryKey: ['planets', page],
  queryFn: () => getPlanets(page.value),
  retry: 5,
  refetchOnWindowFocus: true,
});
</script>

<template>
  <button @click="page--" :disabled="!data?.previous">Previous</button>
  <button @click="page++" :disabled="!data?.next">Next</button>
  <RouterLink :to="{ name: 'cars-list' }">Car list</RouterLink>
  <h1>Star Wars Planets</h1>
  <CardComponentList :planets="data?.results!">
    <template #title="{ message }"> {{ message }} - Planète </template>
  </CardComponentList>
</template>

<style scoped></style>
