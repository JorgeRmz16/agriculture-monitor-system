import { createRouter, createWebHistory } from 'vue-router';

import Layout from './layouts/Layout.vue';
import Home from './views/Home.vue';
import Historico from './views/Historico.vue';
import MisPlantas from './views/MisPlantas.vue';
import GuiaCultivo from './views/GuiaCultivo.vue';
import PlantaDetalle from './views/PlantaDetalle.vue';

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', component: Home },
      { path: 'historico', component: Historico },
      { path: 'mis-plantas', component: MisPlantas },
      { path: 'guia-cultivo', component: GuiaCultivo },
      { path: 'guia-cultivo/:planta', component: PlantaDetalle }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
