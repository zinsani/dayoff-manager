import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'main', component: () => import('pages/IndexPage.vue') },
      {
        path: 'settings',
        component: () => import('pages/settings/SettingsPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
