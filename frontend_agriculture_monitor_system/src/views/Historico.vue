
<template>
  <div class="historico-container">
    <h2>Datos Históricos</h2>
    <div style="margin-bottom: 2.5rem;">
      <p>Gráfica de humedad del suelo (últimos 50 registros)</p>
      <Line v-if="chartData" :data="chartData" :options="chartOptions" />
    </div>
    <div style="margin-bottom: 2.5rem;">
      <p>Gráfica de temperatura del aire (últimos 50 registros)</p>
      <Line v-if="chartTemp" :data="chartTemp" :options="chartOptionsTemp" />
    </div>
    <div>
      <p>Gráfica de humedad del aire (últimos 50 registros)</p>
      <Line v-if="chartAir" :data="chartAir" :options="chartOptionsAir" />
    </div>
    <p v-if="!chartData || !chartTemp || !chartAir">Cargando datos...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Line } from 'vue-chartjs';
import Chart from 'chart.js/auto';


const chartData = ref(null);
const chartTemp = ref(null);
const chartAir = ref(null);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: true, text: 'Humedad del Suelo (%)' }
  },
  scales: {
    x: { title: { display: true, text: 'Hora' } },
    y: { title: { display: true, text: '%' }, min: 0, max: 100 }
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
    y: { title: { display: true, text: '°C' }, min: 0, max: 50 }
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
    y: { title: { display: true, text: '%' }, min: 0, max: 100 }
  }
};

const channelID = import.meta.env.VITE_CHANNEL_ID;
const readApiKey = import.meta.env.VITE_READ_API_KEY;


// Agrupa los datos en intervalos de 5 minutos y calcula el promedio
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
    // 2 horas = 3600/20*2 = 360 puntos aprox
    const response = await fetch(`https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${readApiKey}&results=360`);
    const data = await response.json();
    if (data && data.feeds) {
      // Agrupar por intervalos de 5 minutos
      const groupedSoil = groupByInterval(data.feeds, 'field1', 5);
      const groupedTemp = groupByInterval(data.feeds, 'field2', 5);
      const groupedAir = groupByInterval(data.feeds, 'field3', 5);
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
</script>


