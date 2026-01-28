import Basemap from '@arcgis/core/Basemap';
import { watch } from '@arcgis/core/core/reactiveUtils';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import LOD from '@arcgis/core/layers/support/LOD';
import TileInfo from '@arcgis/core/layers/support/TileInfo';
import TileLayer from '@arcgis/core/layers/TileLayer';
import WebTileLayer from '@arcgis/core/layers/WebTileLayer';
import '@arcgis/map-components/components/arcgis-home';
import '@arcgis/map-components/components/arcgis-map';
import '@arcgis/map-components/components/arcgis-zoom';
import type { Meta } from '@storybook/react-vite';
import { useRef, useState } from 'react';
import { LayerSelector } from './LayerSelector';
import type {
  BaseLayerConfigOrToken,
  BasemapConfig,
  BasemapToken,
  LayerConfigOrToken,
  LayerToken,
} from './LayerSelector.types';

const meta: Meta<typeof LayerSelector> = {
  component: LayerSelector,
  decorators: [
    (Story) => (
      <div className="min-h-96">
        <Story />
      </div>
    ),
  ],
};

export default meta;

/**
 * Default story demonstrating LayerSelector with zoom level tracking.
 * This story shows how to set up LayerSelector with basemaps, baseLayers,
 * referenceLayers, and operationalLayers, along with displaying current
 * zoom constraints.
 */
export function Default() {
  const mapRef = useRef<HTMLArcgisMapElement>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(10);
  const [maxZoomLevel, setMaxZoomLevel] = useState<number>();
  const [minZoomLevel, setMinZoomLevel] = useState<number>();
  const [isReady, setIsReady] = useState(false);

  const handleViewReady = () => {
    const view = mapRef.current?.view;
    if (!view) return;

    setIsReady(true);

    watch(
      () => view.zoom,
      (zoom) => Number.isInteger(zoom) && setZoomLevel(zoom),
    );

    watch(
      () => view.constraints.effectiveMaxZoom,
      (maxZoom) => Number.isInteger(maxZoom) && setMaxZoomLevel(maxZoom),
    );

    watch(
      () => view.constraints.effectiveMinZoom,
      (minZoom) => Number.isInteger(minZoom) && setMinZoomLevel(minZoom),
    );
  };

  const basemaps: (BasemapConfig | BasemapToken)[] = [
    {
      label: 'Vector Lite',
      function: () =>
        new Basemap({
          portalItem: {
            id: '98104c602b7c44419c0a952f28c65815',
          },
        }),
    },
    'Lite',
  ];

  const baseLayers: BaseLayerConfigOrToken[] = [
    'Hybrid',
    {
      label: 'Vision Refresh Basemap',
      function: () =>
        new TileLayer({
          url: 'https://gis.wfrc.org/arcgis/rest/services/WC2050Vision/2023_Vision_Refresh_Basemap/MapServer',
        }),
    },
    'Terrain',
    'Topo',
    'Color IR',
  ];

  const referenceLayers: LayerConfigOrToken[] = ['Address Points'];
  const operationalLayers: LayerConfigOrToken[] = ['Land Ownership'];

  return (
    <arcgis-map
      ref={mapRef}
      basemap="topo"
      className="absolute inset-0"
      center={[-111.83, 39.71]}
      zoom={10}
      onarcgisViewReadyChange={handleViewReady}
    >
      <div slot="top-left" className="border border-zinc-300 bg-white p-2">
        Zoom Level: <b>{zoomLevel}</b>
        <br />
        Effective Max Zoom: <b>{maxZoomLevel}</b>
        <br />
        Effective Min Zoom: <b>{minZoomLevel}</b>
      </div>
      {isReady ? (
        <LayerSelector
          quadWord={import.meta.env.VITE_QUAD_WORD}
          basemaps={basemaps}
          baseLayers={baseLayers}
          referenceLayers={referenceLayers}
          operationalLayers={operationalLayers}
        />
      ) : null}
    </arcgis-map>
  );
}

export const Zoom = () => (
  <arcgis-map
    basemap="streets"
    className="h-96 w-full border"
    center={[-111.83, 39.71]}
    zoom={6}
  >
    <LayerSelector
      quadWord={import.meta.env.VITE_QUAD_WORD}
      basemaps={['Lite', 'Imagery', 'Topo']}
    />
  </arcgis-map>
);

export const SmoothZoom = () => (
  <arcgis-map
    basemap="streets"
    className="h-96 w-full border"
    center={[-111.83, 39.71]}
    zoom={6}
    constraints={
      {
        snapToZoom: false,
      } as __esri.View2DConstraints
    }
  >
    <arcgis-zoom slot="top-left"></arcgis-zoom>
    <LayerSelector
      quadWord={import.meta.env.VITE_QUAD_WORD}
      basemaps={['Lite', 'Imagery', 'Topo']}
    />
  </arcgis-map>
);

export const AlternativeSlot = () => (
  <arcgis-map
    basemap="streets"
    className="h-96 w-full border"
    center={[-111.83, 39.71]}
    zoom={6}
  >
    <LayerSelector
      quadWord={import.meta.env.VITE_QUAD_WORD}
      basemaps={['Lite', 'Imagery', 'Topo']}
      slot="top-left"
    />
  </arcgis-map>
);

export const CustomLOD = () => {
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
      label: 'Open Street Map',
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

  return (
    <arcgis-map
      basemap="streets"
      className="h-96 w-full border"
      center={[-111.83, 39.71]}
      zoom={6}
    >
      <LayerSelector
        quadWord={import.meta.env.VITE_QUAD_WORD}
        baseLayers={baseLayers}
      />
    </arcgis-map>
  );
};

export const DefaultSelection = () => {
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
    <arcgis-map
      basemap="streets"
      className="h-96 w-full border"
      center={[-111.83, 39.71]}
      zoom={8}
    >
      <LayerSelector
        quadWord={import.meta.env.VITE_QUAD_WORD}
        baseLayers={baseLayers}
        referenceLayers={referenceLayers}
      />
    </arcgis-map>
  );
};

export const DifferingLODBaseLayers = () => {
  const baseLayers = ['Topo', 'Imagery', 'Lite'] as LayerToken[];

  return (
    <arcgis-map
      basemap="streets"
      className="h-96 w-full border"
      center={[-111.83, 39.71]}
      zoom={17}
    >
      <div slot="top-left" className="border border-zinc-300 bg-white p-2">
        Topo: 0-17
        <br />
        Imagery: 0-20
        <br />
        Lite: 0-19
      </div>
      <LayerSelector
        quadWord={import.meta.env.VITE_QUAD_WORD}
        baseLayers={baseLayers}
      />
    </arcgis-map>
  );
};

export const DifferingLODMix = () => {
  const baseLayers = ['Topo', 'Imagery'] as LayerToken[];

  return (
    <arcgis-map
      basemap="streets"
      className="h-96 w-full border"
      center={[-111.83, 39.71]}
      zoom={19}
    >
      <div slot="top-left" className="border border-zinc-300 bg-white p-2">
        Topo: 0-17
        <br />
        Imagery: 0-20
        <br />
        Lite: 0-19
      </div>
      <LayerSelector
        quadWord={import.meta.env.VITE_QUAD_WORD}
        baseLayers={baseLayers}
        basemaps={['Lite']}
      />
    </arcgis-map>
  );
};

export const DifferingLODBasemaps = () => (
  <arcgis-map
    basemap="streets"
    className="h-96 w-full border"
    center={[-111.83, 39.71]}
    zoom={19}
  >
    <div slot="top-left" className="border border-zinc-300 bg-white p-2">
      Topo: 0-17
      <br />
      Imagery: 0-20
      <br />
      Lite: 0-19
    </div>
    <LayerSelector
      quadWord={import.meta.env.VITE_QUAD_WORD}
      basemaps={['Topo', 'Lite', 'Hybrid', 'Terrain', 'Color IR']}
    />
  </arcgis-map>
);

export const WithReferenceLayers = () => {
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
    <arcgis-map
      basemap="streets"
      className="h-96 w-full border"
      center={[-111.83, 39.71]}
      zoom={10}
    >
      <arcgis-home slot="top-left"></arcgis-home>
      <LayerSelector
        quadWord={import.meta.env.VITE_QUAD_WORD}
        basemaps={['Lite', 'Imagery', 'Topo']}
        referenceLayers={referenceLayers}
        expanded
      />
    </arcgis-map>
  );
};
