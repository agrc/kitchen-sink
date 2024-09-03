import './tailwind.css';
import { withThemeByClassName } from '@storybook/addon-themes';
import { initialize, mswLoader } from 'msw-storybook-addon';

initialize({ onUnhandledRequest: 'bypass' });

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
  },
  tags: ['autodocs'],
};

export default preview;
