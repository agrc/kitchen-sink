import React from 'react';
import { LayerSelector, LayerSelectorContainer } from '../packages/layer-selector/LayerSelector.js'
import getModules from './storyHelpers';

export default {
  title: 'LayerSelector',
  decorators: [getModules]
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

inContainer.story = {
  decorators: [(story) => (<LayerSelectorContainer>{story()}</LayerSelectorContainer>)]
}
