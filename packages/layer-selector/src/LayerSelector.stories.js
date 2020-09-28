import React  from 'react';
import { LayerSelector, LayerSelectorContainer } from './LayerSelector';
import { ModulesHelper } from '../../../test-helpers/storyHelpers';

export default {
  title: 'LayerSelector',
  decorators: [ModulesHelper]
};

export const basic = (modules) => (
  <LayerSelector
    baseLayers={['Lite', 'Terrain', 'Topo', 'Color IR']}
    modules={modules}
    view={{ map: {}, when: () => { } }}
    quadWord='my-fake-quad-word'
  >
  </LayerSelector>
);

export const inContainer = (modules) => (
  <LayerSelector
    baseLayers={['Lite', 'Terrain', 'Topo', 'Color IR']}
    modules={modules}
    view={{ map: {}, when: () => { } }}
    quadWord='my-fake-quad-word'
  >
  </LayerSelector>
);

inContainer.decorators = [(story) => (<LayerSelectorContainer>{story()}</LayerSelectorContainer>)];
