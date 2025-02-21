<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { inject, ref } from 'vue';
import { useRoute } from 'vue-router';
const search = ref('');

const mydata = inject('myPlugin');

const route = useRoute();
</script>

<template>
  <component :is="route.meta.layout ?? 'PublicLayout'">
    <RouterView></RouterView>
  </component>
  <VueQueryDevtools />
</template>

<style scoped></style>
