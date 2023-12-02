<template>
  <div>
    <div class="row justify-between items-end q-pb-lg">
      <div class="text-h6 text-blue-4">{{ text.title }}</div>
      <div>
        <q-btn dense is-primary icon="add" @click="onAddNew"></q-btn>
      </div>
    </div>
    <div class="row q-mb-sm justify-between">
      <div class="col">
        <div class="text-body1 text-center text-blue-grey">
          {{ text.availableAmount }}
        </div>
        <div class="text-h4 text-center text-primary">
          {{ store.availableAmount }}
        </div>
      </div>
      <div class="col">
        <div class="text-body1 text-center text-blue-grey">
          {{ text.usedAmount }}
        </div>
        <div class="text-h4 text-center text-cyan-6">
          {{ store.usedAmount }}
        </div>
      </div>
      <div class="col">
        <div class="text-body1 text-center text-blue-grey">
          {{ text.totalAmount }}
        </div>
        <div class="text-h4 text-center text-blue-4">
          {{ store.totalAmount }}
        </div>
      </div>
    </div>
    <q-table
      :rows="store.usedItems.rows"
      :columns="columns"
      :pagination="{ rowsPerPage: 3 }"
      :rows-per-page-options="[3, 10]"
      row-key="id"
      table-header-class="bg-blue-5 text-white"
      style="width: 100%"
    />
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { reactive, computed } from 'vue';
import { useDayoffStore } from 'src/stores/dayoff-store';
import { QTableProps, useQuasar, date } from 'quasar';
import AddNewUsageDialog from './AddNewUsageDialog.vue';
import { Dayoff } from 'src/stores/model';
const { t } = useI18n();
const text = reactive({
  title: t('myUsage'),
  availableAmount: t('availableAmount'),
  usedAmount: t('usedAmount'),
  totalAmount: t('totalAmount'),
  day: t('day'),
});

const store = useDayoffStore();
const columns = computed<QTableProps['columns']>(() => [
  {
    name: 'usedAt',
    field: 'usedAt',
    required: true,
    label: t('usedAt'),
    align: 'left',
  },
  {
    name: 'amount',
    field: 'amount',
    required: true,
    label: t('amount'),
    align: 'center',
    format(val) {
      return val + ' ' + text.day;
    },
  },
]);

const $q = useQuasar();
function onAddNew() {
  $q.dialog({
    component: AddNewUsageDialog,
  }).onOk((payload: Dayoff) => {
    store.addUsedItem(payload);
  });
}
</script>
