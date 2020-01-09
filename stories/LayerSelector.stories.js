import React from 'react';
import {LayerSelectorContainer, LayerSelector} from '.';

export default {
  title: 'LayerSelector',
};

export const testOne = () => {
  const selectorNode = document.createElement('div');
  this.view.ui.add(selectorNode, 'top-right');

  const layerSelectorOptions = {
    view: this.view,
    quadWord: 'test-quad-word-key',
    baseLayers: ['Hybrid', 'Lite', 'Terrain', 'Topo', 'Color IR'],
    overlays: ['Address Points'],
    modules: [LOD, TileInfo, WebTileLayer, Basemap]
  }

  ReactDOM.render(
    <LayerSelectorContainer>
      <LayerSelector {...layerSelectorOptions}></LayerSelector>
    </LayerSelectorContainer>,
    selectorNode);
};
