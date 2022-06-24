import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const path = require('path');

const directory = process.cwd();
const packageName = path.basename(process.cwd());

module.exports = defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(directory, 'src/index.js'),
      formats: ['esm'],
      name: `@ugrc/${packageName}`,
      fileName: (format) => `${packageName}.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled into your library
      external: ['react', 'prop-types', /@arcgis\/core\/.*/],
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
