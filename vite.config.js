import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { basename, resolve } from 'path';
import { readPackage } from 'read-pkg';

const directory = process.cwd();
const packageName = basename(directory);
const packageJson = await readPackage({ cwd: directory });

const rollupOptions = {
  external: [
    ...Object.keys(packageJson?.dependencies ?? {}),
    ...Object.keys(packageJson?.peerDependencies ?? {}),
    /@arcgis\/core\/.*/,
    'react/jsx-runtime',
  ],
};

if (packageName === 'utilities') {
  rollupOptions.input = {
    main: resolve(directory, 'src/index.js'),
    hooks: resolve(directory, 'src/hooks/index.js'),
  };
}

const config = defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(directory, 'src/index.js'),
      formats: ['esm'],
      name: `@ugrc/${packageName}`,
      fileName: (format) => {
        return `index.${format}.js`;
      },
    },
    sourcemap: true,
    rollupOptions,
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
});

export default config;
