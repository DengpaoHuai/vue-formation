import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Nora from '@primevue/themes/nora';

import App from './App.vue';
import router from './router';
import { VueQueryPlugin } from '@tanstack/vue-query';
import myPlugin from './plugins/ma-super-lib/ma-super-lib';
import PrimeVue from 'primevue/config';
import PublicLayout from './components/layouts/PublicLayout.vue';
import PrivateLayout from './components/layouts/PrivateLayout.vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);
app.use(myPlugin);
app.use(PrimeVue, {
  theme: {
    preset: Nora,
  },
});

app.component('PublicLayout', PublicLayout);
app.component('PrivateLayout', PrivateLayout);

app.mount('#app');
