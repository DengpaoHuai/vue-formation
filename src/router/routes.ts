import useCarStore from '@/stores/useCarStore';
import HomeView from '@/views/HomeView.vue';
import PlanetList from '@/views/PlanetList.vue';
import type { RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router';

const routes = [
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
      {
        path: 'list',
        name: 'cars-list',
        component: () => import('../views/ListCar.vue'),
      },
      {
        path: 'edit/:id',
        name: 'cars-edit',
        component: () => import('../views/UpdateCar.vue'),
        beforeEnter: async (to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded) => {
          await useCarStore().getCars();
          const currentCar = useCarStore().getCarById(to.params.id as string);
          if (!currentCar) {
            return false;
          }
          return true;
        },
      },
    ],
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/page',
    name: 'page',
    component: () => import('../views/Page1.vue'),
  },
  {
    path: '/planets',
    name: 'planetspaginated',
    component: () => import('../views/PlanetListPaginated.vue'),
  },
];

export default routes;
