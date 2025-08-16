import { createApp } from 'vue';
import '../css/styles.css';
import '../css/navbar.css';
import '../css/historico.css';
import '../css/mis-plantas.css';
import router from './router';
import Layout from './layouts/Layout.vue';

const app = createApp(Layout);
app.use(router);
app.mount('#app');
