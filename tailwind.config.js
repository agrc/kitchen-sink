import ugrcTheme from './packages/tailwind-preset/src/index';
import rac from 'tailwindcss-react-aria-components';

export default {
  content: ['./packages/**/*.{js,jsx,ts,tsx}'],
  darkMode: ['class'],
  presets: [ugrcTheme],
  plugins: [rac],
};
