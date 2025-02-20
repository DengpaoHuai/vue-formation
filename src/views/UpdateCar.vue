<script setup lang="ts">
import TextInput from '@/components/ui/inputs/TextInput.vue';
import { carSchema } from '@/schemas/car.schema';
import useCarStore from '@/stores/useCarStore';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const id = route.params.id as string;

const { updateCar, getCarById } = useCarStore();

const form = reactive({
  name: getCarById(id)?.name as string,
  model: getCarById(id)?.model as string,
  cost_in_credits: getCarById(id)?.cost_in_credits as number,
});

const onSubmit = () => {
  const isValid = carSchema.safeParse(form);
  if (!isValid) {
    return;
  }

  updateCar(id, form);
  router.back();
};
</script>

<template>
  <h1>Create a new car</h1>
  <h1>Create a new car</h1>
  <form @submit.prevent="onSubmit()">
    <label for="name">Name</label>
    <TextInput id="name" v-model="form.name" />
    <label for="model">Model</label>
    <TextInput id="model" v-model="form.model" />
    <label for="cost_in_credits">Cost in credits</label>
    <TextInput id="cost_in_credits" type="number" v-model="form.cost_in_credits" />
    <button type="submit">Create</button>
  </form>
</template>
