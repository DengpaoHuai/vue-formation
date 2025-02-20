<script setup lang="ts">
import useCustomStore from '@/composables/useCustomStore';
import Page2 from './Page2.vue';

const { setStore } = useCustomStore();
</script>

<template>
  <div class="about">
    <h1>This is pag 1</h1>
    <Page2></Page2>
    <button @click="setStore('demo1', 'value')">Go to page 2</button>
  </div>
</template>
