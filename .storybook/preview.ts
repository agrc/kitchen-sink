/// <reference types="vite/client" />
import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react-vite';
import { mswLoader } from 'msw-storybook-addon/csf3';
import { setupWorker } from 'msw/browser';
import './tailwind.css';

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
  loaders: [
    mswLoader(async () => {
      const worker = setupWorker();
      await worker.start({ onUnhandledRequest: 'bypass' });
      return worker;
    }),
  ],
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
