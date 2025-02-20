<script setup lang="ts">
import TextInput from '@/components/ui/inputs/TextInput.vue';
import { carSchema } from '@/schemas/car.schema';
import useCarStore from '@/stores/useCarStore';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const id = route.params.id as string;

const carsData = useCarStore();
</script>

<template>
  <h1>Create a new car</h1>
  {{ id }}
</template>
