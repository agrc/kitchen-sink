import Collection from '@arcgis/core/core/Collection.js';
import LayerSelector from './';

import './LayerSelector.css';

export default {
  component: LayerSelector,
};
const mapViewMock = {
  map: {
    layers: new Collection(),
    basemap: {
      layers: new Collection(),
    },
  },
  when: () => {},
  ui: {
    add: () => {},
  },
};

export const Basic = {
  render: () => (
    <LayerSelector
      baseLayers={['Lite', 'Terrain', 'Topo', 'Color IR']}
      view={mapViewMock}
      quadWord="my-fake-quad-word"
    ></LayerSelector>
  ),
};

export const WithoutExpandableContainer = {
  render: () => (
    <LayerSelector
      baseLayers={['Lite', 'Terrain', 'Topo', 'Color IR']}
      view={mapViewMock}
      quadWord="my-fake-quad-word"
      makeExpandable={false}
      overlays={['Address Points']}
    ></LayerSelector>
  ),
};

export const DefaultSelection = {
  render: () => (
    <LayerSelector
      baseLayers={[
        'Lite',
        'Terrain',
        {
          token: 'Topo',
          selected: true,
        },
        'Color IR',
      ]}
      view={mapViewMock}
      quadWord="my-fake-quad-word"
      makeExpandable={false}
      overlays={['Address Points']}
    ></LayerSelector>
  ),
};
