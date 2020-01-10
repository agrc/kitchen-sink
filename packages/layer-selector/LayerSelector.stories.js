import React, {useRef, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { LayerSelector, LayerSelectorContainer } from './LayerSelector';
import { ModulesHelper } from '../../test-helpers/storyHelpers';

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

const WithMap = ({ modules }) => {
  const mapDiv = useRef();
  useEffect(() => {
    const map = new modules.Map();
    const view = new modules.MapView({
      container: mapDiv.current,
      map,
      center: [-112, 40],
      scale: 3000000
    });
    const selectorNode = document.createElement('div');
    view.ui.add(selectorNode, 'top-right');

    const layerSelectorOptions = {
      view: view,
      quadWord: process.env.QUAD_WORD,
      baseLayers: ['Hybrid', 'Lite', 'Terrain', 'Topo', 'Color IR'],
      overlays: ['Address Points'],
      modules
    };

    ReactDOM.render(
      <LayerSelectorContainer>
        <LayerSelector {...layerSelectorOptions}></LayerSelector>
      </LayerSelectorContainer>,
      selectorNode);
  }, [modules, mapDiv]);

  return (
    <div ref={mapDiv} style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}></div>
  );
};

export const withMap = (modules) => <WithMap modules={modules} />

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
