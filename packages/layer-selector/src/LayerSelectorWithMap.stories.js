import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { LayerSelector, LayerSelectorContainer } from './LayerSelector';
import { ModulesHelper } from '../../../test-helpers/storyHelpers';


export default {
  title: 'LayerSelector/WithMap',
  decorators: [ModulesHelper]
};

const WithMap = ({ modules, scale, zoom, center=[-112, 40] }) => {
  const mapDiv = useRef();
  useEffect(() => {
    const map = new modules.Map();
    const view = new modules.MapView({
      container: mapDiv.current,
      map,
      center,
      zoom,
      scale
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
  }, [modules, mapDiv, center, zoom, scale]);

  return (
    <div ref={mapDiv} style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}></div>
  );
};

export const zoom = (modules) => <WithMap modules={modules} zoom={6} />;
export const scale = (modules) => <WithMap modules={modules} scale={12000} />;
export const noZoomOrScale = (modules) => <WithMap modules={modules} />;
export const zoomAndScale = (modules) => <WithMap modules={modules} zoom={6} scale={12000} />;
