# @ugrc/layer-selector

[![NPM version](https://badgen.net/npm/v/@ugrc/layer-selector)](https://www.npmjs.com/package/@ugrc/layer-selector)

This is a react component for adding a quick base map selector with a happy path for using [UGRC's Discover Service](https://gis.utah.gov/discover).

Install with [npm](https://www.npmjs.com/)

```bash
npm install @ugrc/layer-selector
```

![layer-selector](https://user-images.githubusercontent.com/325813/176509201-cbb2623d-0431-492d-a2b8-0bce309bc428.gif)

## Component properties

```js
{
  view: PropTypes.object.isRequired,
  quadWord: PropTypes.string,
  baseLayers: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.oneOf([
        'Hybrid',
        'Lite',
        'Terrain',
        'Topo',
        'Color IR',
        'Address Points',
        'Overlay',
        'Imagery',
      ]),
      PropTypes.shape({
        Factory: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
          .isRequired,
        urlTemplate: PropTypes.string,
        url: PropTypes.string,
        id: PropTypes.string.isRequired,
        tileInfo: PropTypes.object,
        linked: PropTypes.arrayOf(PropTypes.string),
      }),
      PropTypes.shape({
        token: PropTypes.oneOf([
          'Hybrid',
          'Lite',
          'Terrain',
          'Topo',
          'Color IR',
          'Address Points',
          'Overlay',
        ]).isRequired,
        selected: PropTypes.bool,
        linked: PropTypes.arrayOf(PropTypes.string),
      }),
    ])
  ).isRequired,
  overlays: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.oneOf(['Address Points', 'Overlay']),
      PropTypes.shape({
        Factory: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
          .isRequired,
        urlTemplate: PropTypes.string,
        url: PropTypes.string,
        id: PropTypes.string.isRequired,
        tileInfo: PropTypes.object,
        linked: PropTypes.arrayOf(PropTypes.string),
      }),
    ])
  ),
  position: PropTypes.oneOf([
    'bottom-leading',
    'bottom-left',
    'bottom-right',
    'bottom-trailing',
    'top-leading',
    'top-left',
    'top-right',
    'top-trailing',
  ]),
  makeExpandable: PropTypes.bool,
  layerType: PropTypes.string,
  id: PropTypes.string,
}
```

### Defaults

```js
{
  makeExpandable: true,
  position: 'top-right',
}
```
