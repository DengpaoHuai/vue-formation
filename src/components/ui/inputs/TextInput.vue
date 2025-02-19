<script setup lang="ts">
defineProps<{
  modelValue: string | number;
}>();

const emits = defineEmits<{
  'update:modelValue': [value: string | number];
}>();
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    @input="emits('update:modelValue', ($event.target! as HTMLInputElement).value)"
  />
</template>

<style scoped>
input {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  margin: 8px 0;
}
</style>
