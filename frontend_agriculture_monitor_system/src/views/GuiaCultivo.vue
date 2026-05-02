<template>
  <div class="guia-cultivo">
    <h1>Guía de Cultivo</h1>
    <br>    
    <div class="accordion">
      <div 
        class="accordion-item" 
        v-for="categoria in categorias" 
        :key="categoria.id"
      >
        <div 
          class="accordion-header" 
          :class="{ active: categoriaActiva === categoria.id }"
          @click="toggleCategoria(categoria.id)"
        >
          <h2>{{ categoria.nombre }}</h2>
          <span class="icon">{{ categoriaActiva === categoria.id ? '−' : '+' }}</span>
        </div>
        
        <transition name="slide">
          <div class="accordion-content" v-show="categoriaActiva === categoria.id">
            <br>
            <ul class="plantas-list">
              <li v-for="(planta, index) in categoria.plantas" :key="index">
                <router-link :to="`/guia-cultivo/${planta.toLowerCase()}`" class="planta-link">
                  {{ planta }}
                </router-link>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const categorias = ref([
  { 
    id: 'vegetales', 
    nombre: 'Vegetales', 
    descripcion: 'Guía sobre cómo cultivar tus vegetales favoritos.',
    plantas: ['Tomate', 'Lechuga', 'Zanahoria', 'Cebolla']
  },
  { 
    id: 'frutas', 
    nombre: 'Frutas', 
    descripcion: 'Aprende sobre el cultivo de árboles y arbustos frutales.',
    plantas: ['Manzana', 'Limón', 'Fresa', 'Naranja']
  },
  { 
    id: 'arbustos', 
    nombre: 'Arbustos', 
    descripcion: 'Cuidados y mantenimiento para arbustos decorativos y útiles.',
    plantas: ['Romero', 'Lavanda', 'Rosal', 'Hortensia']
  },
  { 
    id: 'hogar', 
    nombre: 'Hogar', 
    descripcion: 'Plantas de interior ideales para decorar tu hogar.',
    plantas: ['Suculenta', 'Cactus', 'Potos', 'Cinta']
  }
]);

const categoriaActiva = ref(null);

const toggleCategoria = (id) => {
  if (categoriaActiva.value === id) {
    categoriaActiva.value = null;
  } else {
    categoriaActiva.value = id;
  }
};
</script>

<style scoped>
@import '../../css/guia-cultivo.css';
</style>
