import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jsend.dayoff_manager',
  appName: 'Dayoff Manager',
  webDir: 'dist/spa',
  server: {
    androidScheme: 'https',
  },
};

export default config;
