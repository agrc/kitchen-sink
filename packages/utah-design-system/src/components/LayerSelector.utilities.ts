import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import LOD from '@arcgis/core/layers/support/LOD';
import TileInfo from '@arcgis/core/layers/support/TileInfo';
import TileLayer from '@arcgis/core/layers/TileLayer';
import VectorTileLayer from '@arcgis/core/layers/VectorTileLayer';
import WebTileLayer from '@arcgis/core/layers/WebTileLayer';
import {
  basemapTokens,
  layerTokens,
  type BasemapToken,
  type LayerToken,
} from './LayerSelector.types';

export const commonFactories = {
  FeatureLayer,
  WebTileLayer,
  TileLayer,
} as const;

type ApplianceLayerConfig = {
  urlPattern: string;
  copyright?: string;
};

const quadWordToken = '{quadWord}';
export const happyPathConfigs: Record<
  LayerToken,
  __esri.VectorTileLayerProperties | ApplianceLayerConfig
> = {
  Imagery: {
    urlPattern: `https://discover.agrc.utah.gov/login/path/${quadWordToken}/tiles/utah/{level}/{col}/{row}`,
    copyright: 'Hexagon',
  },
  Topo: {
    urlPattern: `https://discover.agrc.utah.gov/login/path/${quadWordToken}/tiles/topo_basemap/{level}/{col}/{row}`,
    copyright: 'UGRC',
  },
  Terrain: {
    urlPattern: `https://discover.agrc.utah.gov/login/path/${quadWordToken}/tiles/terrain_basemap/{level}/{col}/{row}`,
    copyright: 'UGRC',
  },
  Lite: {
    urlPattern: `https://discover.agrc.utah.gov/login/path/${quadWordToken}/tiles/lite_basemap/{level}/{col}/{row}`,
    copyright: 'UGRC',
  },
  'Color IR': {
    urlPattern: `https://discover.agrc.utah.gov/login/path/${quadWordToken}/tiles/naip_2021_nrg/{level}/{col}/{row}`,
    copyright: 'UGRC',
  },
  Hybrid: {
    urlPattern: `https://discover.agrc.utah.gov/login/path/${quadWordToken}/tiles/utah/{level}/{col}/{row}`,
    copyright: 'Hexagon, UGRC',
  },
  Overlay: {
    urlPattern: `https://discover.agrc.utah.gov/login/path/${quadWordToken}/tiles/overlay_basemap/{level}/{col}/{row}`,
    // no attribution for overlay layers since it just duplicates the base map attribution
  },
  'Address Points': {
    urlPattern: `https://discover.agrc.utah.gov/login/path/${quadWordToken}/tiles/address_points_basemap/{level}/{col}/{row}`,
    // no attribution for overlay layers since it just duplicates the base map attribution
  },
  'Land Ownership': {
    url: 'https://gis.trustlands.utah.gov/hosting/rest/services/Hosted/Land_Ownership_WM_VectorTile/VectorTileServer',
    opacity: 0.5,
  },
};

export function getHappyPathBasemapProperties(
  token: BasemapToken,
  quadWord?: string,
): __esri.BasemapProperties {
  const checkForQuadWord = () => {
    if (!quadWord) {
      throw new Error(
        `layer-selector::You chose to use a basemaps token ('${token}') without setting your 'quadWord' from Discover. The requests for tiles will fail to authenticate. Pass 'quadWord' into the options parameter.`,
      );
    }
  };

  switch (token) {
    case 'Imagery': {
      checkForQuadWord();

      return {
        baseLayers: [
          new WebTileLayer({
            urlTemplate:
              `https://discover.agrc.utah.gov/login/path/${quadWordToken}/tiles/utah/{level}/{col}/{row}`.replace(
                quadWordToken,
                quadWord!,
              ),
            copyright: 'Hexagon',
            tileInfo: getTileInfo(token),
          }),
        ],
      };
    }
    case 'Topo': {
      checkForQuadWord();

      return {
        baseLayers: [
          new WebTileLayer({
            urlTemplate:
              `https://discover.agrc.utah.gov/login/path/${quadWordToken}/tiles/topo_basemap/{level}/{col}/{row}`.replace(
                quadWordToken,
                quadWord!,
              ),
            copyright: 'Hexagon',
            tileInfo: getTileInfo(token),
          }),
        ],
      };
    }
    case 'Terrain': {
      return {
        portalItem: {
          id: '38a765a1306e4ba3804c0faaeede95e0',
        },
      };
    }
    case 'Lite': {
      return {
        portalItem: {
          id: '98104c602b7c44419c0a952f28c65815',
        },
      };
    }
    case 'Color IR': {
      checkForQuadWord();

      return {
        baseLayers: [
          new WebTileLayer({
            urlTemplate:
              `https://discover.agrc.utah.gov/login/path/${quadWordToken}/tiles/naip_2021_nrg/{level}/{col}/{row}`.replace(
                quadWordToken,
                quadWord!,
              ),
            copyright: 'UGRC',
            tileInfo: getTileInfo(token),
          }),
        ],
      };
    }
    case 'Hybrid': {
      checkForQuadWord();

      return {
        baseLayers: [
          new WebTileLayer({
            urlTemplate:
              `https://discover.agrc.utah.gov/login/path/${quadWordToken}/tiles/utah/{level}/{col}/{row}`.replace(
                quadWordToken,
                quadWord!,
              ),
            copyright: 'Hexagon',
            tileInfo: getTileInfo('Imagery'),
          }),
        ],
        referenceLayers: [
          new WebTileLayer({
            urlTemplate:
              `https://discover.agrc.utah.gov/login/path/${quadWordToken}/tiles/overlay_basemap/{level}/{col}/{row}`.replace(
                quadWordToken,
                quadWord!,
              ),
            copyright: 'UGRC',
            tileInfo: getTileInfo('Overlay'),
          }),
        ],
      };
    }
    default: {
      throw new Error(
        `layer-selector::The basemap token '${token}' was not found. Please use one of the supported tokens (${Object.values(basemapTokens).join(', ')}) or pass in a Basemap object.`,
      );
    }
  }
}

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

function getTileInfo(token: Exclude<LayerToken, 'Land Ownership'>) {
  switch (token) {
    case 'Imagery': {
      // default lods is 0 to 20
      return defaultTileInfo;
    }

    // max level is 18
    case 'Color IR': {
      return new TileInfo({
        ...defaultTileInfo,
        lods: defaultTileInfo.lods.slice(0, 19),
      });
    }

    // max level is 17
    case 'Topo': {
      return new TileInfo({
        ...defaultTileInfo,
        lods: defaultTileInfo.lods.slice(0, 18),
      });
    }

    // cached via honeycomb on a regular schedule (max level is 19 but only for a specific extent)
    case 'Hybrid':
    case 'Address Points':
    case 'Terrain':
    case 'Lite':
    case 'Overlay': {
      return new TileInfo({
        ...defaultTileInfo,
        lods: defaultTileInfo.lods.slice(0, 20),
      });
    }

    // todo: figure out how to get typescript to make sure that we aren't missing any switch cases
    // default: {
    //   return undefined;
    // }
  }
}
