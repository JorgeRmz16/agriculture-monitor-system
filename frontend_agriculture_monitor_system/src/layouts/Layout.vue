<template>
  <Navbar />
  <div style="padding-top: 80px;">
    <router-view />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
</script>
