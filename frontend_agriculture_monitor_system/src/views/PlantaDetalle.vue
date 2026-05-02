<template>
  <div class="planta-detalle">
    <button @click="$router.back()" class="btn-back">← Volver a la guía</button>
    <h1>{{ plantaCapitalizada }}</h1>
    
    <div class="info-card">
      <p>Aquí se agregará la información específica para <strong>{{ plantaCapitalizada }}</strong>.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const planta = route.params.planta;

const plantaCapitalizada = computed(() => {
  if (!planta) return '';
  return planta.charAt(0).toUpperCase() + planta.slice(1);
});
</script>

<style scoped>
.planta-detalle {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin: 1.5rem 0;
}

.btn-back {
  background: transparent;
  border: none;
  color: #27ae60;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
}

.btn-back:hover {
  text-decoration: underline;
}

.info-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #555;
}
</style>
