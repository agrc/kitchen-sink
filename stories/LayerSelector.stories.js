import React from 'react';
import { LayerSelector } from '../packages/layer-selector/LayerSelector.js'
import { loadModules } from 'esri-loader';

export default {
  title: 'LayerSelector',
  excludeStores: ['Basemap', 'LOD', 'TileInfo', 'WebTileLayer', 'FeatureLayer']
};


const Basemap = function () {
  return {
    baseLayers: {
      getItemAt: () => { },
      indexOf: () => { },
      includes: () => { },
      add: () => { },
      remove: () => {},
    }
  }
};
const LOD = function () { };
const TileInfo = function () { };
const WebTileLayer = function () { };
const FeatureLayer = function () { };

export const basic = () => {

  return (<LayerSelector
    baseLayers={[{ name: 'Lite', selected: true, linked: false}, 'Terrain', 'Topo', 'Color IR']}
    modules={{ LOD, TileInfo, WebTileLayer, Basemap, FeatureLayer }}
    view={{ map: { basemap: { }, layers: { layerList: { getItemAt: () => { } } } }, when: () => { } }}
    quadWord='test-fake-quad-word'
  >
  </LayerSelector>
  );
};
