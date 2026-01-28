import react from '@vitejs/plugin-react';
import { basename, resolve } from 'path';
import { readPackage } from 'read-pkg';
import { type RollupOptions } from 'rollup';
import { defineConfig } from 'vitest/config';

const directory = process.cwd();
const packageName = basename(directory);
const packageJson = await readPackage({ cwd: directory });

const rollupOptions: RollupOptions = {
  external: [
    ...Object.keys(packageJson?.dependencies ?? {}),
    ...Object.keys(packageJson?.peerDependencies ?? {}),
    /@arcgis\/core\/.*/,
    'react/jsx-runtime',
    /@firebase\/.*/,
    /firebase\/.*/,
  ],
  output: {
    globals: {
      react: 'React',
      tailwindcss: 'tailwindcss',
    },
  },
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
      formats: ['es'],
      name: `@ugrc/${packageName}`,
      fileName: (format) => {
        return `index.${format}.js`;
      },
    },
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions,
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    server: {
      deps: {
        inline: ['@arcgis/map-components', '@esri/calcite-components'],
      },
    },
  },
});

export default config;
