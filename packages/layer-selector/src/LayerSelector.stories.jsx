import LayerSelector from './';
import './LayerSelector.css';
import Collection from '@arcgis/core/core/Collection';

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

export const basic = {
  render: () => (
    <LayerSelector
      baseLayers={['Lite', 'Terrain', 'Topo', 'Color IR']}
      view={mapViewMock}
      quadWord="my-fake-quad-word"
    ></LayerSelector>
  ),
};

export const withoutExpandableContainer = {
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

export const defaultSelection = {
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
