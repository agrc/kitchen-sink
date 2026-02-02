/// <reference types="vite/client" />
import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react';
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { firebaseConfig } from '../packages/utah-design-system/tests/firebase';
import './tailwind.css';

declare global {
  interface Window {
    _firebase_auth_emulator?: boolean;
  }
}

initialize({ onUnhandledRequest: 'bypass' });
const app = initializeApp(firebaseConfig);

if (import.meta.env.DEV) {
  const auth = getAuth(app);
  if (typeof window === 'undefined' || window['_firebase_auth_emulator']) {
    try {
      connectAuthEmulator(auth, 'http://localhost:9099', {
        disableWarnings: true,
      });
    } catch (error) {
      console.log('auth emulator already connected', error);
    }
    if (typeof window !== 'undefined') {
      (window as any)['_firebase_auth_emulator'] = true;
    }
  }
}

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
  loaders: [mswLoader],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
