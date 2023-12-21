<template>
  <q-page padding>
    <div class="column">
      <div class="col"><h3>Dayoff Manager</h3></div>
      <div id="firebaseui-auth-container">
        <button @click="onSignin('google')">Signin with Google</button>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { useDayoffStore } from 'src/stores/dayoff-store';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Cookies } from 'quasar';
import { useRouter } from 'vue-router';

const providers = new Map([['google', new GoogleAuthProvider()]]);
// providers
//   .get('google')?
//   .addScope('https://www.googleapis.com/auth/contacts.readonly');

const auth = getAuth();
const store = useDayoffStore();
const router = useRouter();

function onSignin(by: string) {
  const provider = providers.get(by);
  if (!provider) return;
  if (provider instanceof GoogleAuthProvider)
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (!credential) throw new Error('credential is not valid');

        const token = credential.accessToken;
        if (!token) throw new Error('token is not valid');

        Cookies.set('auth_token', token);
        // The signed-in user info.
        const user = result.user;
        console.log('Signin Success', user);
        store.user = user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        router.push('/');
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
}
</script>
