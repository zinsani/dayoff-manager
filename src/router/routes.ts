import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    redirect: '/auth/signin',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: 'signin',
        component: () => import('pages/AuthPage.vue'),
      },
    ],
  },
  {
    path: '/',
    redirect: '/main',
    meta: {
      authRequired: true,
    },
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
