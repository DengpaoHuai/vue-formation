<script setup lang="ts">
import useCustomStore from '@/composables/useCustomStore';

const { store } = useCustomStore();
</script>

<template>
  <div class="about">
    <h1>This is pag 1</h1>
    {{ store }}
    <button @click="console.log(store)">check</button>
  </div>
</template>
