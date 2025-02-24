import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import LOD from '@arcgis/core/layers/support/LOD';
import TileInfo from '@arcgis/core/layers/support/TileInfo';
import TileLayer from '@arcgis/core/layers/TileLayer';
import VectorTileLayer from '@arcgis/core/layers/VectorTileLayer';
import WebTileLayer from '@arcgis/core/layers/WebTileLayer';
import { layerTokens, type LayerToken } from './LayerSelector.types';

export const commonFactories = {
  FeatureLayer,
  WebTileLayer,
  TileLayer,
} as const;

type ApplianceLayerConfig = {
  urlPattern: string;
  copyright?: string;
};
export const happyPathConfigs: Record<
  LayerToken,
  __esri.VectorTileLayerProperties | ApplianceLayerConfig
> = {
  Imagery: {
    urlPattern: `https://discover.agrc.utah.gov/login/path/{quadWord}/tiles/utah/{level}/{col}/{row}`,
    copyright: 'Hexagon',
  },
  Topo: {
    urlPattern: `https://discover.agrc.utah.gov/login/path/{quadWord}/tiles/topo_basemap/{level}/{col}/{row}`,
    copyright: 'UGRC',
  },
  Terrain: {
    urlPattern: `https://discover.agrc.utah.gov/login/path/{quadWord}/tiles/terrain_basemap/{level}/{col}/{row}`,
    copyright: 'UGRC',
  },
  Lite: {
    urlPattern: `https://discover.agrc.utah.gov/login/path/{quadWord}/tiles/lite_basemap/{level}/{col}/{row}`,
    copyright: 'UGRC',
  },
  'Color IR': {
    urlPattern: `https://discover.agrc.utah.gov/login/path/{quadWord}/tiles/naip_2021_nrg/{level}/{col}/{row}`,
    copyright: 'UGRC',
  },
  Hybrid: {
    urlPattern: `https://discover.agrc.utah.gov/login/path/{quadWord}/tiles/utah/{level}/{col}/{row}`,
    copyright: 'Hexagon, UGRC',
  },
  Overlay: {
    urlPattern: `https://discover.agrc.utah.gov/login/path/{quadWord}/tiles/overlay_basemap/{level}/{col}/{row}`,
    // no attribution for overlay layers since it just duplicates the base map attribution
  },
  'Address Points': {
    urlPattern: `https://discover.agrc.utah.gov/login/path/{quadWord}/tiles/address_points_basemap/{level}/{col}/{row}`,
    // no attribution for overlay layers since it just duplicates the base map attribution
  },
  'Land Ownership': {
    url: 'https://gis.trustlands.utah.gov/hosting/rest/services/Hosted/Land_Ownership_WM_VectorTile/VectorTileServer',
    opacity: 0.5,
  },
};

const defaultTileInfo = createDefaultTileInfo();

/**
 * Takes layer tokens from `applianceLayers` keys and resolves them to layers
 */
export function getLayerFromToken(token: LayerToken, quadWord: string) {
  if (!token || !Object.values(layerTokens).includes(token)) {
    throw new Error(
      `layer-selector::The layer token '${token}' was not found. Please use one of the supported tokens (${Object.values(
        layerTokens,
      ).join(', ')}) or pass in a layer.`,
    );
  }

  if (token === 'Land Ownership') {
    return new VectorTileLayer({
      id: token,
      ...(happyPathConfigs[token] as __esri.VectorTileLayerProperties),
    });
  } else {
    const config = happyPathConfigs[token] as ApplianceLayerConfig;
    return new WebTileLayer({
      id: token,
      urlTemplate: config.urlPattern.replace('{quadWord}', quadWord),
      copyright: config.copyright,
      tileInfo: getTileInfo(token),
    });
  }
}

/**
 * Creates the default TileInfo constructor object for appliance layers.
 */
function createDefaultTileInfo() {
  const tileSize = 256;
  const earthCircumference = 40075016.685568;
  const inchesPerMeter = 39.37;
  const initialResolution = earthCircumference / tileSize;

  const dpi = 96;
  const maxLevel = 20;
  const squared = 2;
  const lods = [];

  for (let level = 0; level <= maxLevel; level++) {
    const resolution = initialResolution / Math.pow(squared, level);
    const scale = resolution * dpi * inchesPerMeter;

    lods.push(
      new LOD({
        level: level,
        scale: scale,
        resolution: resolution,
      }),
    );
  }

  return {
    dpi: dpi,
    size: [tileSize, tileSize],
    origin: {
      x: -20037508.342787,
      y: 20037508.342787,
    },
    spatialReference: {
      wkid: 3857,
    },
    lods,
  };
}

function getTileInfo(token: Omit<LayerToken, 'Land Ownership'>) {
  const lods = defaultTileInfo.lods;
  const fiveToNineteen = lods.slice(0, 20);
  const fiveToSeventeen = lods.slice(0, 18);
  const zeroToEighteen = lods.slice(0, 19);

  switch (token) {
    case 'Address Points':
    case 'Imagery':
    case 'Hybrid': {
      return defaultTileInfo;
    }

    case 'Color IR': {
      return new TileInfo({
        ...defaultTileInfo,
        lods: zeroToEighteen,
      });
    }

    case 'Topo': {
      return new TileInfo({
        ...defaultTileInfo,
        lods: fiveToSeventeen,
      });
    }

    case 'Terrain':
    case 'Lite':
    case 'Overlay': {
      return new TileInfo({
        ...defaultTileInfo,
        lods: fiveToNineteen,
      });
    }

    // todo: figure out how to get typescript to make sure that we aren't missing any switch cases
    // default: {
    //   return undefined;
    // }
  }
}
