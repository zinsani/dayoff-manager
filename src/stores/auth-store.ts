import { defineStore } from 'pinia';
import { useDayOffStore } from 'src/stores/day-off-store';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  signOut,
} from 'firebase/auth';
import { Cookies } from 'quasar';
import { useRouter } from 'vue-router';

type State = {
  user: User | undefined;
};

export type ProviderType = 'google';

const providers = new Map([['google', new GoogleAuthProvider()]]);

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    user: undefined,
  }),
  actions: {
    signIn(by: ProviderType) {
      const auth = getAuth();
      const provider = providers.get(by);
      if (!provider) return;
      if (provider instanceof GoogleAuthProvider)
        return signInWithPopup(auth, provider)
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
            this.user = user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
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
    },
    signOut() {
      const auth = getAuth();
      return signOut(auth);
    },
    setUser(user: User | undefined) {
      this.user = user;
    },
  },
});
