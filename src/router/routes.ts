import HomeView from '@/views/HomeView.vue';
import PlanetList from '@/views/PlanetList.vue';

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
      },
    ],
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
];

export default routes;
