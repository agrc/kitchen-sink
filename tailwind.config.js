import animate from 'tailwindcss-animate';
import rac from 'tailwindcss-react-aria-components';
import ugrcTheme from './packages/tailwind-preset/src/index';

export default {
  content: ['./packages/**/*.{js,jsx,ts,tsx}'],
  darkMode: ['class'],
  presets: [ugrcTheme],
  plugins: [rac, animate],
};
