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
            v-model="data.usedAt"
            mask="YYYY-MM-DD"
            :label="text.usedAt"
            type="date"
          >
          </q-date>
          <q-select
            v-model="data.amount"
            :options="dayAmountOptions"
            :label="text.usedAmount"
            type="number"
          >
            <template v-slot:prepend>
              <q-icon name="event_available" />
            </template>
          </q-select>
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
import { reactive } from 'vue';
import { dayAmountOptions, Dayoff } from 'src/stores/model';

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
const { t } = useI18n();
const text = reactive({
  title: t('useNewDayoff'),
  desc: t('useNewDayoffDesc'),
  submit: t('submit'),
  cancel: t('cancel'),
  usedAt: t('usedAt'),
  usedAmount: t('usedAmount'),
});

const today = new Date();
const todayStr = date.formatDate(today, 'YYYY-MM-DD');
const data = reactive<Dayoff>({
  usedAt: todayStr,
  amount: 1,
});

function onSubmit() {
  onDialogOK(data);
}
</script>

<style scoped></style>
