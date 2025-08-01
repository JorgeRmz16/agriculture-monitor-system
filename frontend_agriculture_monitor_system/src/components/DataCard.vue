<template>
  <div class="card">
    <div class="icon-wrapper">
      <i :class="icon"></i>
    </div>
    <div class="data-wrapper">
      <h2>{{ title }}</h2>
      <p class="value">
        {{ value }} <span class="unit">{{ unit }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  value: { type: [String, Number], required: true },
  unit: { type: String, required: true }
});
</script>
