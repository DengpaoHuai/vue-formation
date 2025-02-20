<script setup lang="ts">
import { type Car } from '@/schemas/car.schema';
import { deletecar, getcars } from '@/services/car.service';
import useCarStore from '@/stores/useCarStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';

const queryClient = useQueryClient();

const { data } = useQuery<Car[]>({
  queryKey: ['cars'],
  queryFn: getcars,
});

const mutation = useMutation({
  mutationFn: (id: string) => deletecar(id),
  onMutate: async (id: string) => {
    const previousCars = queryClient.getQueryData<Car[]>(['cars']);
    queryClient.setQueryData<Car[]>(['cars'], (oldCars) =>
      oldCars?.filter((car) => car._id !== id),
    );
    return { previousCars };
  },
  onSettled: () => {
    queryClient.invalidateQueries({
      queryKey: ['cars'],
    });
  },
});
</script>

<template>
  <RouterLink :to="{ name: 'cars-add' }">Create a new car</RouterLink>
  <div v-for="car in data" :key="car._id">
    <h2>{{ car.name }}</h2>
    <p>Model: {{ car.model }}</p>
    <p>Cost in credits: {{ car.cost_in_credits }}</p>
    <button @click="mutation.mutate(car._id)">delete</button>
    <RouterLink :to="{ name: 'cars-edit', params: { id: `${car._id}` } }">Update</RouterLink>
  </div>
</template>
