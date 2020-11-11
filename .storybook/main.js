const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  stories: ['../packages/**/*.stories.js'],
  addons: [{
    name: '@storybook/addon-essentials',
    options: {
      backgrounds: false,
    }
  }],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../')
    });

    config.plugins.push(new CopyPlugin({
      patterns: [
        {
          context: 'node_modules',
          from: `@arcgis/core/assets`,
          to: 'assets'
        }
      ]
    }));

    return config;
  }
}
