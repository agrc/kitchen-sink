# Esri Theme Toggle

This package automatically switches between the light and dark [ArcGIS Maps SDK for JavaScript themes](https://developers.arcgis.com/javascript/latest/styling/#styling-the-js-api) based on the user's browser preference as detected by the [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media query. It does this by lazily creating `link` elements for each theme and toggling their `disabled` property.

Note that this package uses the [`assetsPath`](https://developers.arcgis.com/javascript/latest/api-reference/esri-config.html#assetsPath) Esri core config value for the path to the CSS files. Any changes to this config need to be done _before_ calling `initializeTheme()`.

The package now targets `@arcgis/core` v5 and the v5 module-based CDN loading model.

## Usage

```js
import initializeTheme from '@ugrc/esri-theme-toggle';

initializeTheme();
```

Using a non-default path to assets:

```js
import esriConfig from '@arcgis/core/config';
import initializeTheme from '@ugrc/esri-theme-toggle';

esriConfig.assetsPath = '/assets';
initializeTheme();
```

## Development

Run `npm start` and open `http://localhost:3000/tests` to test this package.
