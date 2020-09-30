import React  from 'react';
import LayerSelector from './LayerSelector';
import { ModulesHelper } from '../../../test-helpers/storyHelpers';

export default {
  title: 'LayerSelector',
  decorators: [ModulesHelper]
};
const mapViewMock = {
  map: {},
  when: () => {},
  ui: {
    add: () => {}
  }
};

export const basic = (modules) => (
  <LayerSelector
    baseLayers={['Lite', 'Terrain', 'Topo', 'Color IR']}
    modules={modules}
    view={mapViewMock}
    quadWord='my-fake-quad-word'
  >
  </LayerSelector>
);

export const withoutExpandableContainer = (modules) => (
  <LayerSelector
    baseLayers={['Lite', 'Terrain', 'Topo', 'Color IR']}
    modules={modules}
    view={mapViewMock}
    quadWord='my-fake-quad-word'
    makeExpandable={false}
  >
  </LayerSelector>
);
