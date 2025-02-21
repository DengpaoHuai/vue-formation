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

const { data, isLoading, error } = useQuery<ApiResponse<Planet>>({
  queryKey: ['planets', page],
  queryFn: () => getPlanets(page.value),
  retry: 5,
  staleTime: 10000,
  refetchOnWindowFocus: true,
});
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-if="error">Error: {{ error.message }}</div>
  <button @click="page--" :disabled="!data?.previous">Previous</button>
  <button @click="page++" :disabled="!data?.next">Next</button>
  <RouterLink :to="{ name: 'cars-list' }">Car list</RouterLink>
  <h1>Star Wars Planets</h1>
  <CardComponentList :planets="data?.results!">
    <template #title="{ message, toto }"> {{ message }} - {{ toto }} </template>

    <template #nomquetuveux>
      <p>toto</p>
    </template>
  </CardComponentList>
</template>

<style scoped lang="sass"></style>
