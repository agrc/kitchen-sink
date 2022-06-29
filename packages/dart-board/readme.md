# @ugrc/dart-board

[![NPM version](https://badgen.net/npm/v/@ugrc/dart-board)](https://www.npmjs.com/package/@ugrc/dart-board)

This is a react component for geocoding addresses and route/mileposts using [UGRC's API](https://api.mapserv.utah.gov).

Install with [npm](https://www.npmjs.com/)

```bash
npm install @ugrc/dart-board
```

## Component properties

```js
{
  apiKey: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['single-address', 'route-milepost']),
  pointSymbol: PropTypes.object,
  events: PropTypes.exact({
    success: PropTypes.func.isRequired,
    error: PropTypes.func.isRequired
  }),
  wkid: PropTypes.number,
  address: PropTypes.shape({
    acceptScore: PropTypes.number,
    suggest: PropTypes.number,
    locators: PropTypes.oneOf([null, 'all', 'addressPoints', 'roadCenterlines']),
    poBox: PropTypes.bool,
    scoreDifference: PropTypes.bool
  }),
  milepost: PropTypes.shape({
    side: PropTypes.oneOf([null, 'increasing', 'decreasing']),
    fullRoute: PropTypes.bool
  }),
  format: PropTypes.oneOf([null, 'esrijson', 'geojson']),
  callback: PropTypes.string
};
```

### Defaults

```js
{
  type: 'single-address',
  address: {
    acceptScore: 70,
    suggest: 0,
    locators: 'all',
    poBox: false,
    scoreDifference: false
  },
  milepost: {
    side: 'increasing',
    fullRoute: false
  },
  wkid: 3857,
  callback: null,
  format: null,
  pointSymbol: {
    style: 'diamond',
    color: [255, 0, 0, 0.5]
  },
  events: {
    success: console.log,
    error: console.error
  }
};
```
