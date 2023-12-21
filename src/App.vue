<template>
  <router-view />
</template>

<script setup lang="ts">
import { Cookies } from 'quasar';
import { useRouter } from 'vue-router';
import { useDayoffStore } from './stores/dayoff-store';
const store = useDayoffStore();
function hasLoggedIn() {
  return Cookies.has('auth_token') && !store.user;
}
const router = useRouter();
router.beforeEach((to, from, next) => {
  console.log('beforeEach', to, from);
  if (to.meta.authRequired) {
    if (!hasLoggedIn()) {
      next('/auth');
      return;
    }
  }
  if (to.path === '/auth/signin') {
    if (hasLoggedIn()) next('/');
  }
  next();
});
</script>
