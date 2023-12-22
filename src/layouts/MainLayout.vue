<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="event" aria-label="Event" to="/" />
        <q-toolbar-title>
          {{ text.title }}
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered side="right">
      <main-drawer />
    </q-drawer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDayOffStore } from 'src/stores/day-off-store';
import MainDrawer from 'src/components/MainDrawer.vue';

const { t } = useI18n();
const text = reactive({ title: t('dayOffManager') });
const leftDrawerOpen = ref(false);
const store = useDayOffStore();

onMounted(() => {
  store.updateMonthlyTotal(store.projectStartedAt);
});

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
