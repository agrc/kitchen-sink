import LayerSelector from './LayerSelector.jsx';

export default {
  title: 'LayerSelector',
  module: LayerSelector,
};
const mapViewMock = {
  map: {},
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
  ></LayerSelector>
);