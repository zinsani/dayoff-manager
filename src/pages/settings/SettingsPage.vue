<template>
  <q-page padding>
    <!-- content -->
    <div>
      <p>{{ text.title }}</p>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { reactive } from 'vue';
const { t } = useI18n();
const text = reactive({
  title: t('settings'),
});
</script>
