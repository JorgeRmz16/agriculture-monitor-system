
<template>
  <div class="historico-container">
    <h2>Datos Históricos</h2>
    <div class="filtros-historico" style="margin: 1rem 0;">
      <label for="horas">Mostrar últimas </label>
      <select id="horas" v-model="horasSeleccionadas">
        <option v-for="h in 24" :key="h" :value="h">{{ h }} hora{{ h > 1 ? 's' : '' }}</option>
      </select>
    </div>
    <div class="charts-grid">
      <div class="chart-item">
        <Line v-if="chartData" :data="chartData" :options="chartOptions" />
      </div>
      <div class="chart-item">
        <Line v-if="chartTemp" :data="chartTemp" :options="chartOptionsTemp" />
      </div>
      <div class="chart-item">
        <Line v-if="chartAir" :data="chartAir" :options="chartOptionsAir" />
      </div>
    </div>
    <p v-if="!chartData || !chartTemp || !chartAir">Cargando datos...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Line } from 'vue-chartjs';
import Chart from 'chart.js/auto';


const chartData = ref(null);
const chartTemp = ref(null);
const chartAir = ref(null);
const horasSeleccionadas = ref(4);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: true, text: 'Humedad del Suelo (%)' }
  },
  scales: {
    x: { title: { display: true, text: 'Hora' } },
    y: { title: { display: true, text: '%' }, min: 30, max: 70 }
  }
};

const chartOptionsTemp = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: true, text: 'Temperatura del Aire (°C)' }
  },
  scales: {
    x: { title: { display: true, text: 'Hora' } },
    y: { title: { display: true, text: '°C' }, min: 10, max: 40 }
  }
};

const chartOptionsAir = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: true, text: 'Humedad del Aire (%)' }
  },
  scales: {
    x: { title: { display: true, text: 'Hora' } },
    y: { title: { display: true, text: '%' }, min: 30, max: 70 }
  }
};

const channelID = import.meta.env.VITE_CHANNEL_ID;
const readApiKey = import.meta.env.VITE_READ_API_KEY;

function groupByInterval(feeds, field, intervalMinutes = 5) {
  const grouped = [];
  let current = null;
  let sum = 0;
  let count = 0;
  feeds.forEach(f => {
    const date = new Date(f.created_at);
    const minutes = date.getMinutes();
    const interval = date.getHours() + ':' + String(Math.floor(minutes / intervalMinutes) * intervalMinutes).padStart(2, '0');
    if (!current || current.interval !== interval) {
      if (current) {
        current.value = count > 0 ? sum / count : null;
        grouped.push(current);
      }
      current = { interval, value: 0, label: interval };
      sum = 0;
      count = 0;
    }
    const v = parseFloat(f[field]);
    if (!isNaN(v)) {
      sum += v;
      count++;
    }
  });
  if (current) {
    current.value = count > 0 ? sum / count : null;
    grouped.push(current);
  }
  return grouped;
}

const fetchHistory = async () => {
  try {
    const resultados = Math.max(500, horasSeleccionadas.value * 12 * 2); // 2x para asegurar margen
    const response = await fetch(`https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${readApiKey}&results=${Math.round(resultados)}`);
    const data = await response.json();
    if (data && data.feeds) {
      const ahora = new Date();
      const limite = new Date(ahora.getTime() - horasSeleccionadas.value * 60 * 60 * 1000);
      const feedsFiltrados = data.feeds.filter(f => new Date(f.created_at) >= limite);
      const groupedSoil = groupByInterval(feedsFiltrados, 'field1', 5);
      const groupedTemp = groupByInterval(feedsFiltrados, 'field2', 5);
      const groupedAir = groupByInterval(feedsFiltrados, 'field3', 5);
      const labels = groupedSoil.map(g => g.label);
      // Suelo
      chartData.value = {
        labels,
        datasets: [
          {
            label: 'Humedad del Suelo',
            data: groupedSoil.map(g => g.value),
            borderColor: '#007bff',
            backgroundColor: 'rgba(0,123,255,0.2)',
            tension: 0.3
          }
        ]
      };
      // Temperatura
      chartTemp.value = {
        labels,
        datasets: [
          {
            label: 'Temperatura del Aire',
            data: groupedTemp.map(g => g.value),
            borderColor: '#ff5733',
            backgroundColor: 'rgba(255,87,51,0.2)',
            tension: 0.3
          }
        ]
      };
      // Humedad aire
      chartAir.value = {
        labels,
        datasets: [
          {
            label: 'Humedad del Aire',
            data: groupedAir.map(g => g.value),
            borderColor: '#00bfae',
            backgroundColor: 'rgba(0,191,174,0.2)',
            tension: 0.3
          }
        ]
      };
    }
  } catch (e) {
    chartData.value = null;
    chartTemp.value = null;
    chartAir.value = null;
  }
};

onMounted(fetchHistory);
watch(horasSeleccionadas, fetchHistory);
</script>

<style scoped>
.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
}
.chart-item {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 1.5rem 1rem 1rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media (max-width: 900px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
}
</style>

.filtros-historico {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}


