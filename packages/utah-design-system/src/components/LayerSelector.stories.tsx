import { watch } from '@arcgis/core/core/reactiveUtils';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import TileInfo from '@arcgis/core/layers/support/TileInfo';
import TileLayer from '@arcgis/core/layers/TileLayer';
import WebTileLayer from '@arcgis/core/layers/WebTileLayer';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import { useEffect, useRef, useState } from 'react';
import { LayerSelector, type LayerSelectorProps } from './LayerSelector';

import '@arcgis/core/assets/esri/themes/light/main.css';
import LOD from '@arcgis/core/layers/support/LOD';
import type {
  BaseLayerConfigOrToken,
  LayerConfigOrToken,
} from './LayerSelector.types';

export default {
  component: LayerSelector,
};

type DefaultProps = {
  center?: number[];
  zoom?: number;
  scale?: number;
  baseLayers?: BaseLayerConfigOrToken[];
  referenceLayers?: LayerConfigOrToken[];
  operationalLayers?: LayerConfigOrToken[];
};

export function Default({
  center,
  zoom = 10,
  scale,
  baseLayers,
  referenceLayers,
  operationalLayers,
}: DefaultProps) {
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

    watch(
      () => view.zoom,
      (zoom) => Number.isInteger(zoom) && console.log('map zoom', zoom),
    );

    setLayerSelectorOptions({
      options: {
        view,
        quadWord: import.meta.env.VITE_QUAD_WORD,
        baseLayers: baseLayers || [
          'Hybrid',
          {
            label: 'Vision Refresh Basemap',
            function: () =>
              new TileLayer({
                url: 'https://gis.wfrc.org/arcgis/rest/services/WC2050Vision/2023_Vision_Refresh_Basemap/MapServer',
              }),
          },
          'Lite',
          'Terrain',
          'Topo',
          'Color IR',
        ],
        referenceLayers: referenceLayers || ['Address Points'],
        operationalLayers: operationalLayers || ['Land Ownership'],
        position: 'top-right',
      },
    });
  }, [zoom, center, scale, baseLayers, referenceLayers, operationalLayers]);

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

export const zoom = () => <Default zoom={6} />;
export const scale = () => <Default scale={12000} />;
export const noZoomOrScale = () => <Default />;
export const zoomAndScale = () => <Default zoom={6} scale={12000} />;
export const customLOD = () => {
  const tileSize = 256;
  const earthCircumference = 40075016.685568;
  const inchesPerMeter = 39.37;
  const initialResolution = earthCircumference / tileSize;

  const lods: LOD[] = [];
  for (let zoom = 0; zoom <= 20; zoom++) {
    const resolution = initialResolution / Math.pow(2, zoom);
    const scale = resolution * 96 * inchesPerMeter;
    lods.push(
      new LOD({
        level: zoom,
        scale: scale,
        resolution: resolution,
      }),
    );
  }

  const baseLayers = [
    {
      label: 'Imagery',
      function: () =>
        new WebTileLayer({
          urlTemplate:
            'http://{subDomain}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          subDomains: ['a', 'b', 'c'],
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
        }),
    },
  ];

  return <Default zoom={6} baseLayers={baseLayers} />;
};

export const defaultSelection = () => {
  const baseLayers: BaseLayerConfigOrToken[] = [
    {
      label: 'Esri Topo',
      function: () =>
        new TileLayer({
          url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer',
        }),
    },
    {
      label: 'Esri Terrain',
      function: () =>
        new TileLayer({
          url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer',
        }),
    },
  ];

  const referenceLayers: LayerConfigOrToken[] = [
    {
      label: 'Cities',
      function: () =>
        new FeatureLayer({
          url: 'https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahMunicipalBoundaries/FeatureServer/0',
        }),
      defaultSelected: true,
    },
    {
      label: 'Counties',
      function: () =>
        new FeatureLayer({
          url: 'https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahCountyBoundaries/FeatureServer/0',
        }),
    },
  ];

  return (
    <Default
      zoom={8}
      baseLayers={baseLayers}
      referenceLayers={referenceLayers}
    />
  );
};
