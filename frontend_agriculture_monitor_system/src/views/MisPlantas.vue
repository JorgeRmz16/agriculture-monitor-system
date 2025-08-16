<template>
  <section class="mis-plantas">
    <header class="mp-header">
      <h2>Mis Plantas</h2>
      <button class="add-btn" @click="toggleDrawer(true)">Agregar +</button>
    </header>

    <div v-if="plants.length === 0" class="empty-state">
      <p>Aún no has agregado plantas.</p>
    </div>

    <ul v-else class="plant-grid">
      <li v-for="p in plants" :key="p.id" class="plant-card">
        <div class="plant-card__header">
          <h3>{{ p.tipo }}</h3>
          <span class="fase" :title="`Fase: ${p.fase}`">{{ p.fase }}</span>
        </div>
        <div class="plant-card__meta">
          <div><strong>Maceta:</strong> #{{ p.maceta }}</div>
          <div v-if="p.variedad"><strong>Variedad:</strong> {{ p.variedad }}</div>
          <div v-if="p.fechaSiembra"><strong>Siembra:</strong> {{ formatDate(p.fechaSiembra) }}</div>
          <div v-if="p.ubicacion"><strong>Ubicación:</strong> {{ p.ubicacion }}</div>
          <div v-if="p.notas" class="notas"><strong>Notas:</strong> {{ p.notas }}</div>
        </div>
        <div class="plant-card__actions">
          <button class="secondary" @click="editPlant(p)">Editar</button>
          <button class="danger" @click="removePlant(p.id)">Eliminar</button>
        </div>
      </li>
    </ul>

    <!-- Drawer -->
    <div class="drawer" :class="{ open: drawerOpen }" @click.self="toggleDrawer(false)">
      <div class="drawer-panel" @keydown.esc="toggleDrawer(false)" role="dialog" aria-modal="true">
        <header class="drawer-header">
          <h3>{{ editing ? 'Editar planta' : 'Agregar planta' }}</h3>
          <button class="icon" aria-label="Cerrar" @click="toggleDrawer(false)">✕</button>
        </header>
        <form class="plant-form" @submit.prevent="savePlant">
          <div class="form-row">
            <label>Tipo de planta *</label>
            <input v-model.trim="form.tipo" required placeholder="Ej. Tomate, Albahaca" />
          </div>
          <div class="form-row">
            <label>Fase *</label>
            <select v-model="form.fase" required>
              <option disabled value="">Selecciona fase</option>
              <option v-for="f in fases" :key="f" :value="f">{{ f }}</option>
            </select>
          </div>
          <div class="form-row">
            <label>Número de maceta *</label>
            <input v-model.number="form.maceta" type="number" min="1" step="1" required />
          </div>
          <div class="form-row">
            <label>Variedad</label>
            <input v-model.trim="form.variedad" placeholder="Opcional" />
          </div>
          <div class="form-row">
            <label>Fecha de siembra</label>
            <input v-model="form.fechaSiembra" type="date" />
          </div>
          <div class="form-row">
            <label>Ubicación</label>
            <input v-model.trim="form.ubicacion" placeholder="Invernadero, balcón, etc." />
          </div>
          <div class="form-row">
            <label>Notas</label>
            <textarea v-model.trim="form.notas" rows="3" placeholder="Riego, fertilización, observaciones…"></textarea>
          </div>

          <footer class="form-actions">
            <button type="button" class="secondary" @click="toggleDrawer(false)">Cancelar</button>
            <button type="submit">{{ editing ? 'Guardar cambios' : 'Agregar' }}</button>
          </footer>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

const STORAGE_KEY = 'mis_plantas_v1';
const fases = [
  'Germinación',
  'Plántula',
  'Crecimiento vegetativo',
  'Prefloración',
  'Floración',
  'Fructificación',
  'Cosecha',
  'Reposo'
];

const plants = ref([]);
const drawerOpen = ref(false);
const editing = ref(false);
const editingId = ref(null);
const form = reactive({
  tipo: '',
  fase: '',
  maceta: null,
  variedad: '',
  fechaSiembra: '',
  ubicacion: '',
  notas: ''
});

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    plants.value = raw ? JSON.parse(raw) : [];
  } catch (e) {
    plants.value = [];
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plants.value));
}

function resetForm() {
  form.tipo = '';
  form.fase = '';
  form.maceta = null;
  form.variedad = '';
  form.fechaSiembra = '';
  form.ubicacion = '';
  form.notas = '';
  editing.value = false;
  editingId.value = null;
}

function toggleDrawer(state) {
  drawerOpen.value = state;
  if (state === true) {
  } else {
    resetForm();
  }
}

function savePlant() {
  if (!form.tipo || !form.fase || !form.maceta) return;
  if (editing.value && editingId.value) {
    const idx = plants.value.findIndex(p => p.id === editingId.value);
    if (idx !== -1) {
      plants.value[idx] = { ...plants.value[idx], ...form };
    }
  } else {
    const newPlant = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      ...form
    };
    plants.value.push(newPlant);
  }
  persist();
  toggleDrawer(false);
}

function removePlant(id) {
  if (!confirm('¿Eliminar esta planta?')) return;
  plants.value = plants.value.filter(p => p.id !== id);
  persist();
}

function editPlant(p) {
  form.tipo = p.tipo;
  form.fase = p.fase;
  form.maceta = p.maceta;
  form.variedad = p.variedad || '';
  form.fechaSiembra = p.fechaSiembra || '';
  form.ubicacion = p.ubicacion || '';
  form.notas = p.notas || '';
  editing.value = true;
  editingId.value = p.id;
  toggleDrawer(true);
}

function formatDate(v) {
  if (!v) return '';
  try {
    const d = new Date(v);
    if (Number.isNaN(d.getTime())) return v;
    return d.toLocaleDateString('es-ES');
  } catch {
    return v;
  }
}

onMounted(load);
</script>

<style>
</style>
