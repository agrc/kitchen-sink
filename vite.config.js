const path = require('path');
const { defineConfig } = require('vite');

const directory = process.cwd();
const packageName = path.basename(process.cwd());
module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(directory, 'src/index.js'),
      name: `@ugrc/${packageName}`,
      fileName: (format) => `${packageName}.${format}.js`,
    },
    rollupOptions: {
      // // make sure to externalize deps that shouldn't be bundled into your library
      // external: ['react'],
      // output: {
      //   // Provide global variables to use in the UMD build for externalized deps
      //   globals: {
      //     react: 'React',
      //   },
      // },
    },
  },
});
