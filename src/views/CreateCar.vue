<script setup lang="ts">
import TextInput from '@/components/ui/inputs/TextInput.vue';
import { carSchema } from '@/schemas/car.schema';
import { createCarApi } from '@/services/car.service';
import useCarStore from '@/stores/useCarStore';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const carsData = useCarStore();

const errors = ref<string[]>([]);
const form = reactive({
  name: '',
  model: '',
  cost_in_credits: 0,
});

const onSubmit = () => {
  const result = carSchema.safeParse(form);
  console.log(result.error?.errors);
  if (result.success) {
    console.log('Form is valid');
    createCarApi(form)
      .then(() => {
        console.log('Car created');
        router.push({ name: 'cars-list' });
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    errors.value = result.error.errors.map((error) => error.message);
  }
};
</script>

<template>
  <h1>Create a new car</h1>
  <form @submit.prevent="onSubmit">
    <label for="name">Name</label>
    <TextInput id="name" v-model="form.name" />
    <label for="model">Model</label>
    <TextInput id="model" v-model="form.model" />
    <label for="cost_in_credits">Cost in credits</label>
    <TextInput id="cost_in_credits" type="number" v-model="form.cost_in_credits" />
    <button type="submit">Create</button>
    <div v-if="errors.length">
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>
  </form>
</template>
