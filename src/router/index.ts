import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PlanetList from '@/views/PlanetList.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/planets-list',
      name: 'planets',
      component: PlanetList,
    },
    {
      path: '/cars',
      children: [
        {
          path: 'add',
          name: 'cars-add',
          component: () => import('../views/CreateCar.vue'),
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
});

export default router;
