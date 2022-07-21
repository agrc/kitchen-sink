# @ugrc/default-extent

[![NPM version](https://badgen.net/npm/v/@ugrc/default-extent)](https://www.npmjs.com/package/@ugrc/default-extent)

A React component for zooming to a default extent in a map.

Install with [npm](https://www.npmjs.com/)

```bash
npm install @ugrc/default-extent
```

## Example

```js
import HomeButton from '@ugrc/default-extent';
import Extent from '@arcgis/core/geometry/Extent';

const defaultExtent = new Extent({
  xmax: -12612006,
  xmin: -12246370,
  ymax: 5125456,
  ymin: 4473357,
  spatialReference: 3857,
});

return (
  <HomeButton view={view.current} position="top-left" extent={defaultExtent} />
);
```
