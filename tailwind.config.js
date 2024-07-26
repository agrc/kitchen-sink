import ugrcTheme from './packages/tailwind-preset/src/index';
import rac from 'tailwindcss-react-aria-components';
import animate from 'tailwindcss-animate';

export default {
  content: ['./packages/**/*.{js,jsx,ts,tsx}'],
  darkMode: ['class'],
  presets: [ugrcTheme],
  plugins: [rac, animate],
};
