<template>
  <q-page padding>
    <div class="column justify-center items-center" style="min-height: 30rem">
      <div class="col">
        <h3 class="text-h3">{{ text.title }}</h3>
      </div>
      <div class="col" id="firebaseui-auth-container">
        <q-btn color="primary" size="xl" @click="onSignin('google')"
          >Signin with Google</q-btn
        >
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ProviderType, useAuthStore } from 'src/stores/auth-store';
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const text = reactive({
  title: t('dayOffManager'),
});
function onSignin(by: ProviderType) {
  useAuthStore().signIn(by);
}
</script>
