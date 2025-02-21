<script setup lang="ts">
import ListPlanets from '@/components/ListPlanets.vue';
import Skeleton from 'primevue/skeleton';
</script>

<template>
  <Suspense>
    <ListPlanets></ListPlanets>
    <template #fallback>
      <p>quand primevue casse pas les couilles</p>
    </template>
  </Suspense>
</template>

<style scoped></style>
