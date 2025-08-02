<template>
  <Navbar />
  <div style="padding-top: 30px;">
    <router-view />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
</script>
