<template>
  <q-dialog ref="dialogRef">
    <q-card class="q-pa-md">
      <q-item-label
        ><span class="text-h5">{{ text.title }}</span></q-item-label
      >
      <q-card-section>
        <div class="alertPop__text">{{ text.desc }}</div>
      </q-card-section>
      <q-form @submit.prevent="onSubmit">
        <q-card-section>
          <q-date
            v-model="startedAt"
            mask="YYYY-MM-DD"
            :label="text.startedAt"
            type="date"
          >
          </q-date>
        </q-card-section>
        <q-card-actions align="center" class="is-mt25 is-mb20">
          <q-btn type="button" @click="onDialogHide">
            {{ text.cancel }}
          </q-btn>
          <q-btn color="primary" type="submit">
            {{ text.submit }}
          </q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent, date } from 'quasar';
import { useI18n } from 'vue-i18n';
import { ref, reactive } from 'vue';
import { useDayOffStore } from 'src/stores/day-off-store';

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
const { t } = useI18n();
const text = reactive({
  title: t('editProjectInfo'),
  desc: t('editProjectInfoDesc'),
  submit: t('submit'),
  cancel: t('cancel'),
  startedAt: t('startedAt'),
});

const store = useDayOffStore();
const dateStr = date.formatDate(store.projectStartedAt, 'YYYY-MM-DD');
const startedAt = ref(dateStr);

function onSubmit() {
  onDialogOK(new Date(startedAt.value));
}
</script>

<style scoped></style>
