import LayerSelector from './';
import './LayerSelector.css';

export default {
  title: 'LayerSelector',
  component: LayerSelector,
};
const mapViewMock = {
  map: {
    layers: [],
    basemap: {
      layers: [],
    },
  },
  when: () => {},
  ui: {
    add: () => {},
  },
};

export const basic = () => (
  <LayerSelector
    baseLayers={['Lite', 'Terrain', 'Topo', 'Color IR']}
    view={mapViewMock}
    quadWord="my-fake-quad-word"
  ></LayerSelector>
);

export const withoutExpandableContainer = () => (
  <LayerSelector
    baseLayers={['Lite', 'Terrain', 'Topo', 'Color IR']}
    view={mapViewMock}
    quadWord="my-fake-quad-word"
    makeExpandable={false}
    overlays={['Address Points']}
  ></LayerSelector>
);
