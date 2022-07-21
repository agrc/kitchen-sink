import { useRef, useEffect, useState } from 'react';
import LayerSelector from './';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import TileInfo from '@arcgis/core/layers/support/TileInfo';
import WebTileLayer from '@arcgis/core/layers/WebTileLayer';
import TileLayer from '@arcgis/core/layers/TileLayer';
import '@arcgis/core/assets/esri/themes/light/main.css';
import './LayerSelector.css';

export default {
  title: 'LayerSelector/WithMap',
  component: LayerSelector,
};

const WithMap = ({ center, zoom, scale, baseLayers, overlays }) => {
  const mapDiv = useRef();
  const [layerSelectorOptions, setLayerSelectorOptions] = useState();

  useEffect(() => {
    const initMap = () => {
      console.log('init');
      const map = new Map();
      const view = new MapView({
        container: mapDiv.current,
        map,
        center: center ? center : [-112, 40],
        zoom,
        scale,
      });

      setLayerSelectorOptions({
        view: view,
        quadWord: import.meta.env.VITE_QUAD_WORD,
        baseLayers: baseLayers
          ? baseLayers
          : ['Hybrid', 'Lite', 'Terrain', 'Topo', 'Color IR'],
        overlays: overlays ? overlays : ['Address Points'],
        position: 'top-right',
      });
    };

    initMap();
  }, [zoom, center, scale, baseLayers, overlays]);

  return (
    <div
      ref={mapDiv}
      style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
    >
      {layerSelectorOptions ? (
        <LayerSelector {...layerSelectorOptions}></LayerSelector>
      ) : null}
    </div>
  );
};

export const zoom = () => <WithMap zoom={6} />;
export const scale = () => <WithMap scale={12000} />;
export const noZoomOrScale = () => <WithMap />;
export const zoomAndScale = () => <WithMap zoom={6} scale={12000} />;
export const customLOD = () => {
  const tileSize = 256;
  const earthCircumference = 40075016.685568;
  const inchesPerMeter = 39.37;
  const initialResolution = earthCircumference / tileSize;

  const lods = [];
  for (let zoom = 0; zoom <= 20; zoom++) {
    let resolution = initialResolution / Math.pow(2, zoom);
    let scale = resolution * 96 * inchesPerMeter;
    lods.push({
      level: zoom,
      scale: scale,
      resolution: resolution,
    });
  }

  const baseLayers = [
    {
      Factory: WebTileLayer,
      urlTemplate:
        'http://{subDomain}.tile.stamen.com/toner/{level}/{col}/{row}.png',
      id: 'Imagery',
      subDomains: ['a', 'b', 'c', 'd'],
      selected: true,
      tileInfo: new TileInfo({
        dpi: 96,
        rows: 256,
        cols: 256,
        origin: {
          x: -20037508.342787,
          y: 20037508.342787,
        },
        spatialReference: {
          wkid: 102100,
        },
        lods: lods,
      }),
    },
  ];

  return <WithMap zoom={6} baseLayers={baseLayers} />;
};
export const linkedOverlays = () => {
  const baseLayers = [
    {
      Factory: TileLayer,
      url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer',
      id: 'Topo',
      linked: ['Cities'],
    },
    {
      Factory: TileLayer,
      url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer',
      id: 'Terrain',
      linked: ['Counties'],
    },
  ];

  const overlays = [
    {
      Factory: FeatureLayer,
      url: 'https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahMunicipalBoundaries/FeatureServer/0',
      id: 'Cities',
    },
    {
      Factory: FeatureLayer,
      url: 'https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahCountyBoundaries/FeatureServer/0',
      id: 'Counties',
    },
  ];

  return <WithMap zoom={6} baseLayers={baseLayers} overlays={overlays} />;
};

export const landOwnership = () => {
  const landOwnershipOptions = {
    overlays: [
      'Address Points',
      {
        Factory: FeatureLayer,
        url: 'https://gis.trustlands.utah.gov/server/rest/services/Ownership/UT_SITLA_Ownership_LandOwnership_WM/FeatureServer/0',
        id: 'Land Ownership',
        opacity: 0.3,
      },
    ],
    zoom: 10,
  };

  return <WithMap {...landOwnershipOptions} />;
};
