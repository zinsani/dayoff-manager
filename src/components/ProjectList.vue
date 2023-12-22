<template>
  <div>
    <div class="row justify-between items-end">
      <div class="text-h6 text-blue-4">{{ text.title }}</div>
      <div>
        <q-btn dense is-primary icon="edit" @click="onEdit"></q-btn>
      </div>
    </div>
    <q-item>
      <q-item-section>
        <q-item-label>{{ text.startedAt }}</q-item-label>
      </q-item-section>
      <q-item-section>{{ store.projectStartedAt }}</q-item-section>
    </q-item>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { reactive } from 'vue';
import { useQuasar } from 'quasar';
import { useDayOffStore } from 'src/stores/day-off-store';
import EditProjectDialog from './EditProjectDialog.vue';
const { t } = useI18n();
const text = reactive({
  title: t('projects'),
  startedAt: t('startedAt'),
});

const store = useDayOffStore();
const $q = useQuasar();
function onEdit() {
  $q.dialog({
    component: EditProjectDialog,
  }).onOk((projectStartedAt: Date) => {
    store.updateMonthlyTotal(projectStartedAt);
  });
}
</script>
