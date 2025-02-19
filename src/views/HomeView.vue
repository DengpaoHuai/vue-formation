<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue';
</script>

<template>
  <main>
    <a href="/planets">planets</a>
    <RouterLink :to="{ name: 'planets' }">planets</RouterLink>
    <RouterLink to="/about">about</RouterLink>
  </main>
</template>
