<script setup lang="ts">
import { useAppConfig } from '#app';

defineProps<{
  message: string;
}>();

const { myLayer } = useAppConfig();
</script>

<template>
  <div>
    <h1>Hello World!</h1>
    <pre>{{ message }}</pre>
  </div>
</template>
