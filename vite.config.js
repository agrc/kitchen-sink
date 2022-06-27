import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { basename, resolve } from 'path';

const directory = process.cwd();
const packageName = basename(directory);

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(directory, 'src/index.js'),
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
