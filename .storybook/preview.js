import './tailwind.css';
import { withThemeByClassName } from '@storybook/addon-themes';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../packages/utah-design-system/firebase';

initialize({ onUnhandledRequest: 'bypass' });
const app = initializeApp(firebaseConfig);

if (import.meta.env.DEV) {
  const auth = getAuth(app);
  if (typeof window === 'undefined' || !window['_firebase_auth_emulator']) {
    try {
      connectAuthEmulator(auth, 'http://localhost:9099', {
        disableWarnings: true,
      });
    } catch (error) {
      console.log('auth emulator already connected', error);
    }
    if (typeof window !== 'undefined') {
      window['_firebase_auth_emulator'] = true;
    }
  }
}

export const preview = {
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
    actions: { argTypesRegex: '^on.*' },
  },
  tags: ['autodocs'],
};

export default preview;
