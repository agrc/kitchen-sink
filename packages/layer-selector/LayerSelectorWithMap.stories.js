import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { LayerSelector, LayerSelectorContainer } from './LayerSelector';
import { ModulesHelper } from '../../test-helpers/storyHelpers';


export default {
  title: 'LayerSelector/WithMap',
  decorators: [ModulesHelper]
};

const WithMap = ({ modules, baseLayers, overlays, scale, zoom, top, right, center=[-112, 40] }) => {
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
      baseLayers: baseLayers || ['Hybrid', 'Lite', 'Terrain', 'Topo', 'Color IR'],
      overlays: overlays || ['Address Points'],
      modules,
      top,
      right
    };

    ReactDOM.render(
      <LayerSelectorContainer>
        <LayerSelector {...layerSelectorOptions}></LayerSelector>
      </LayerSelectorContainer>,
      selectorNode);
  }, [modules, mapDiv, center, zoom, scale, top, right, overlays, baseLayers]);

  return (
    <div ref={mapDiv} style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}></div>
  );
};

export const zoom = (modules) => <WithMap modules={modules} zoom={6} />;
export const scale = (modules) => <WithMap modules={modules} scale={12000} />;
export const noZoomOrScale = (modules) => <WithMap modules={modules} />;
export const zoomAndScale = (modules) => <WithMap modules={modules} zoom={6} scale={12000} />;
export const customLOD = (modules) => {
  const tileSize = 256;
  const earthCircumference = 40075016.685568;
  const halfEarthCircumference = halfEarthCircumference * 0.5;
  const inchesPerMeter = 39.37;
  const initialResolution = earthCircumference / tileSize;

  const lods = [];
  for (let zoom = 0; zoom <= 20; zoom++) {
    let resolution = initialResolution / Math.pow(2, zoom);
    let scale = resolution * 96 * inchesPerMeter;
    lods.push({
      level: zoom,
      scale: scale,
      resolution: resolution
    });
  }

  const baseLayers = [
    {
      Factory: modules.WebTileLayer,
      urlTemplate: 'http://{subDomain}.tile.stamen.com/toner/{level}/{col}/{row}.png',
      id: 'Imagery',
      subDomains: ['a', 'b', 'c', 'd'],
      selected: true,
      tileInfo: new modules.TileInfo({
        dpi: 96,
        rows: 256,
        cols: 256,
        origin: {
          x: -20037508.342787,
          y: 20037508.342787
        },
        spatialReference: {
          wkid: 102100
        },
        lods: lods
      })
    }];

  return (<WithMap modules={modules} zoom={6} baseLayers={baseLayers} />);
};
export const linkedOverlays = (modules) => {
  const baseLayers = [{
    Factory: modules.TileLayer,
    url: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer',
    id: 'Topo',
    linked: ['Cities']
  }, {
    Factory: modules.TileLayer,
    url: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer',
    id: 'Terrain',
    linked: ['Counties']
  }];

  const overlays = [{
    Factory: modules.FeatureLayer,
    url: 'http://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahMunicipalBoundaries/FeatureServer/0',
    id: 'Cities'
  }, {
    Factory: modules.FeatureLayer,
    url: 'http://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahCountyBoundaries/FeatureServer/0',
    id: 'Counties'
  }];

  return (<WithMap modules={modules} zoom={6} baseLayers={baseLayers} overlays={overlays} />);
};
export const customPlacement = (modules) => <WithMap modules={modules} zoom={6} top={false} right={false} />;
