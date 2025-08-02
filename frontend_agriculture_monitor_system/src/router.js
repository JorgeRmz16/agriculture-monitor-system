import { createRouter, createWebHistory } from 'vue-router';

import Layout from './layouts/Layout.vue';
import Home from './views/Home.vue';
import Historico from './views/Historico.vue';

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', component: Home },
      { path: 'historico', component: Historico }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
