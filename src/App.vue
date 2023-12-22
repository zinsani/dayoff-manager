<template>
  <div
    class="row justify-center items-center"
    v-if="isLoadingAuthState"
    style="min-height: 5rem"
  >
    <q-spinner></q-spinner>
  </div>
  <router-view v-else />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth-store';

const store = useAuthStore();
function hasLoggedIn() {
  return store.$state.user !== undefined;
}

const router = useRouter();
router.beforeEach((to, from, next) => {
  console.log('beforeEach', to, from);
  if (to.meta.authRequired && !hasLoggedIn()) {
    next('/auth');
    return;
  }
  if (to.path === '/auth/signin' && hasLoggedIn()) {
    next('/');
    return;
  }
  next();
});

onMounted(() => {
  const auth = getAuth();
  const isLoadingAuthState = ref(true);
  onAuthStateChanged(auth, (user) => {
    console.log('onAuthStateChanged', user);
    isLoadingAuthState.value = false;

    if (user) {
      if (hasLoggedIn()) return;
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      store.setUser(user);
      router.push('/');
    } else {
      if (!hasLoggedIn()) return;
      // User is signed out
      // ...
      store.setUser(undefined);
      router.push('/auth');
    }
  });
});
</script>
