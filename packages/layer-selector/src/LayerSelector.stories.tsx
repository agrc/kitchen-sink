import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import TileInfo from '@arcgis/core/layers/support/TileInfo';
import TileLayer from '@arcgis/core/layers/TileLayer';
import VectorTileLayer from '@arcgis/core/layers/VectorTileLayer';
import WebTileLayer from '@arcgis/core/layers/WebTileLayer';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import { useEffect, useRef, useState } from 'react';
import { LayerSelector } from './LayerSelector';

import '@arcgis/core/assets/esri/themes/light/main.css';
import type { LayerSelectorProps } from './LayerSelector';
import type { LayerConfig } from './shared.types';

export default {
  component: LayerSelector,
};

type WithMapProps = {
  center?: number[];
  zoom?: number;
  scale?: number;
  baseLayers?: LayerConfig[];
  overlays?: LayerConfig[];
  showOpacitySlider?: boolean;
};

export function WithMap({
  center,
  zoom,
  scale,
  baseLayers,
  overlays,
  showOpacitySlider,
}: WithMapProps) {
  const mapDiv = useRef<HTMLDivElement>(null);
  const [layerSelectorOptions, setLayerSelectorOptions] =
    useState<LayerSelectorProps>();

  useEffect(() => {
    if (!mapDiv.current) {
      return;
    }

    console.log('init map');
    const map = new Map();
    const view = new MapView({
      container: mapDiv.current,
      map,
      center: center ? center : [-112, 40],
      zoom,
      scale,
    });

    setLayerSelectorOptions({
      options: {
        view,
        quadWord: import.meta.env.VITE_QUAD_WORD,
        baseLayers: baseLayers || [
          'Hybrid',
          {
            id: 'Vision Refresh Basemap',
            Factory: TileLayer,
            url: 'https://gis.wfrc.org/arcgis/rest/services/WC2050Vision/2023_Vision_Refresh_Basemap/MapServer',
            // url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer',
            opacity: 0.25,
          },
          'Lite',
          'Terrain',
          'Topo',
          'Color IR',
        ],
        overlays: overlays || ['Address Points'],
        position: 'top-right',
        showOpacitySlider,
      },
    });
  }, [zoom, center, scale, baseLayers, overlays, showOpacitySlider]);

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
}

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
    const resolution = initialResolution / Math.pow(2, zoom);
    const scale = resolution * 96 * inchesPerMeter;
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
        size: [256, 256],
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

export const defaultSelection = () => {
  const baseLayers = [
    {
      Factory: TileLayer,
      url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer',
      id: 'Topo',
    },
    {
      Factory: TileLayer,
      url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer',
      id: 'Terrain',
      selected: true,
    },
  ];

  const overlays = [
    {
      Factory: FeatureLayer,
      url: 'https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahMunicipalBoundaries/FeatureServer/0',
      id: 'Cities',
      selected: true,
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
        Factory: VectorTileLayer,
        url: 'https://gis.trustlands.utah.gov/hosting/rest/services/Hosted/Land_Ownership_WM_VectorTile/VectorTileServer',
        id: 'Land Ownership',
        opacity: 0.3,
      },
    ],
    zoom: 10,
  };

  return <WithMap {...landOwnershipOptions} />;
};

export const opacitySlider = () => <WithMap showOpacitySlider zoom={6} />;
