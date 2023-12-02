<template>
  <div>
    <div class="row justify-between items-end">
      <div class="text-h6 text-blue-4">{{ text.title }}</div>
      <div>
        <q-btn dense is-primary icon="add"></q-btn>
      </div>
    </div>
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label>Item label</q-item-label>
        </q-item-section>
        <q-item-section>content here</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { reactive } from 'vue';
const { t } = useI18n();
const text = reactive({
  title: t('extraWork'),
});
</script>
