// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { boot } from 'quasar/wrappers';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA41FOQ4PLpoFsO9ai9ZBupc7jxpCxEkw0',
  authDomain: 'dayoff-manager.firebaseapp.com',
  projectId: 'dayoff-manager',
  storageBucket: 'dayoff-manager.appspot.com',
  messagingSenderId: '748754722647',
  appId: '1:748754722647:web:1a355f6a4d14ddb1192812',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
console.log('firebase app initialized', app);

export default boot(({ app }) => {
  app.config.globalProperties.$firebase = app;
});
