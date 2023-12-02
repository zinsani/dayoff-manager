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
      <q-list>
        <q-item-label header> Settings </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';
import { useDayoffStore } from 'src/stores/dayoff-store';

const { t } = useI18n();
const text = reactive({ title: t('dayOffManager') });
const essentialLinks: EssentialLinkProps[] = reactive([
  {
    title: t('settings'),
    caption: t('changeSettings'),
    icon: 'settings',
    link: '/settings',
  },
]);

const leftDrawerOpen = ref(false);
const store = useDayoffStore();

onMounted(() => {
  store.updateMonthlyTotal(store.projectStartedAt);
});

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
