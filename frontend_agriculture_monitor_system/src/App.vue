<template>
  <div id="app" class="plant-monitor-container">
    <header class="app-header">
      <h1>Monitor de Plantas</h1>
      <p>Última actualización: {{ lastUpdated }}</p>
    </header>

    <main class="data-cards">
      <DataCard
        icon="fas fa-water"
        title="Humedad del Suelo"
        :value="humedadSuelo"
        unit="%"
      />
      <DataCard
        icon="fas fa-thermometer-half"
        title="Temperatura del Aire"
        :value="temperatura"
        unit="°C"
      />
      <DataCard
        icon="fas fa-cloud"
        title="Humedad del Aire"
        :value="humedadAire"
        unit="%"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DataCard from './components/DataCard.vue';

const channelID = '3023872'; 
const readApiKey = '6VI2SEVBWJFE2SOZ';

const humedadSuelo = ref('Cargando...');
const temperatura = ref('Cargando...');
const humedadAire = ref('Cargando...');
const lastUpdated = ref('Cargando...');

const fetchData = async () => {
  try {
    const response = await fetch(`https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${readApiKey}&results=1`);
    const data = await response.json();
    
    if (data && data.feeds && data.feeds.length > 0) {
      const lastEntry = data.feeds[0];
      
      humedadSuelo.value = parseFloat(lastEntry.field1).toFixed(1);
      temperatura.value = parseFloat(lastEntry.field2).toFixed(1);
      
      humedadAire.value = parseFloat(lastEntry.field3).toFixed(1);

      const date = new Date(lastEntry.created_at);
      lastUpdated.value = date.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });
    } else {
      console.log('No se encontraron datos en ThingSpeak.');
      humedadSuelo.value = 'N/A';
      temperatura.value = 'N/A';
      humedadAire.value = 'N/A';
    }

  } catch (error) {
    console.error("Error al obtener los datos de ThingSpeak:", error);
    humedadSuelo.value = 'Error';
    temperatura.value = 'Error';
    humedadAire.value = 'Error';
  }
};

onMounted(() => {
  fetchData();
  setInterval(fetchData, 20000); 
});
</script>
