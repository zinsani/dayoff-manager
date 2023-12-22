<template>
  <q-list>
    <q-item-label header class="text-h4"> {{ text.title }} </q-item-label>
    <q-item>
      <q-item-section avatar>
        <q-avatar v-if="avatarImg">
          <img :src="avatarImg" alt="avatar" />
        </q-avatar>
        <q-avatar v-else icon="account_circle" />
      </q-item-section>
      <q-item-section>
        <div class="row items-center">
          <span class="col">
            {{ user?.displayName }}
          </span>
          <q-btn
            class="col-auto q-px-sm"
            color="primary"
            dense
            outline
            @click="onLogout"
            >{{ text.signOut }}</q-btn
          >
        </div>
      </q-item-section>
    </q-item>

    <EssentialLink
      v-for="link in essentialLinks"
      :key="link.title"
      v-bind="link"
    />
  </q-list>
</template>

<script lang="ts" setup>
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';
import { computed, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/stores/auth-store';
import { useQuasar } from 'quasar';

const store = useAuthStore();
const { user } = storeToRefs(store);
const { t } = useI18n();
const text = reactive({
  title: t('dayOffManager'),
  signOut: t('signOut'),
  signOutConfirmText: t('signOutConfirmText'),
  ok: t('ok'),
  cancel: t('cancel'),
  settingsTitle: t('settings'),
  settingsCaption: t('changeSettings'),
});
const avatarImg = computed(() => user.value?.photoURL);

const essentialLinks: EssentialLinkProps[] = reactive([
  {
    title: text.settingsTitle,
    caption: text.settingsCaption,
    icon: 'settings',
    link: '/settings',
  },
]);

const $q = useQuasar();
function onLogout() {
  $q.dialog({
    message: text.signOutConfirmText,
    ok: text.ok,
    cancel: text.cancel,
  }).onOk(() => {
    store.signOut();
  });
}
</script>

<style lang="scss" scoped></style>
