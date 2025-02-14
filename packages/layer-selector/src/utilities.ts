import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import LOD from '@arcgis/core/layers/support/LOD';
import TileInfo from '@arcgis/core/layers/support/TileInfo';
import TileLayer from '@arcgis/core/layers/TileLayer';
import WebTileLayer from '@arcgis/core/layers/WebTileLayer';
import type {
  ApplianceLayerTokens,
  LayerConfig,
  LayerFactory,
  LayerType,
} from './shared.types';

export const commonFactories = {
  FeatureLayer,
  WebTileLayer,
  TileLayer,
} as const;

export const applianceLayerConfigs: Record<
  ApplianceLayerTokens,
  Omit<LayerConfig, 'id' | 'token'>
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
    linked: ['Overlay'],
    copyright: 'Hexagon, UGRC',
  },
  Overlay: {
    urlPattern: `https://discover.agrc.utah.gov/login/path/{quadWord}/tiles/overlay_basemap/{level}/{col}/{row}`,
    // no attribution for overlay layers since it just duplicates the base map attribution
  },
  'Address Points': {
    urlPattern: `https://discover.agrc.utah.gov/login/path/{quadWord}/tiles/address_points_basemap/{level}/{col}/{row}`,
  },
};

const defaultTileInfo = createDefaultTileInfo();

/**
 * Takes layer tokens from `applianceLayers` keys and resolves them to `LayerFactory` objects with `esri/layer/WebTileLayer` factories.
 */
export function createLayerFactories(
  layerType: LayerType,
  layerConfigs: (ApplianceLayerTokens | LayerConfig)[],
  quadWord?: string,
) {
  const applianceLayers = setTileInfosForApplianceLayerConfigs();
  const resolvedInfos: LayerFactory[] = [];
  layerConfigs.forEach((config) => {
    if (
      typeof config === 'string' ||
      (config.token && typeof config.token === 'string')
    ) {
      const token = typeof config === 'string' ? config : config.token;

      if (!quadWord) {
        console.warn(
          `layer-selector::You chose to use a layer token '${token}' without setting your 'quadWord' from Discover. The requests for tiles will fail to authenticate. Pass 'quadWord' into the constructor of this widget.`,
        );

        return false;
      }

      if (!token || !(token in applianceLayers)) {
        console.warn(
          `layer-selector::The layer token '${token}' was not found. Please use one of the supported tokens (${Object.keys(
            applianceLayers,
          ).join(
            ', ',
          )}) or pass in the information on how to create your custom layer ('{Factory, url, id}').`,
        );

        return false;
      }

      const layer = applianceLayers[token] as LayerConfig;
      const linked = [
        layer.linked,
        typeof config === 'string' ? null : config.linked,
      ].reduce((acc: string[], value) => {
        if (value) {
          acc = acc.concat(value);
        }

        return acc;
      }, []);

      resolvedInfos.push({
        ...layer,
        Factory: WebTileLayer,
        id: token,
        layerType,
        linked: linked.length > 0 ? linked : undefined,
        selected: typeof config === 'string' ? false : !!config.selected,
        urlTemplate: layer.urlPattern.replace('{quadWord}', quadWord),
      });
    } else {
      let Factory = config.Factory;
      if (typeof Factory === 'string') {
        if (Factory in commonFactories) {
          Factory = commonFactories[Factory];
        } else {
          throw new Error(`Unknown layer factory: ${config.Factory}`);
        }
      }

      if (!config.id) {
        throw new Error('The layer config must have an id');
      }

      resolvedInfos.push({
        ...config,
        selected: !!config.selected,
        Factory: Factory as new () => __esri.Layer,
        layerType,
      });
    }
  });

  return resolvedInfos;
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

/** Sets the TileInfo for each of Discover layers since they all use different levels.
 */
function setTileInfosForApplianceLayerConfigs() {
  const lods = defaultTileInfo.lods;
  const fiveToNineteen = lods.slice(0, 20);
  const fiveToSeventeen = lods.slice(0, 18);
  const zeroToEighteen = lods.slice(0, 19);

  applianceLayerConfigs.Imagery.tileInfo = new TileInfo(defaultTileInfo);
  applianceLayerConfigs.Hybrid.tileInfo = new TileInfo(defaultTileInfo);

  let tileInfo = Object.assign({}, defaultTileInfo);
  tileInfo.lods = zeroToEighteen;

  applianceLayerConfigs['Color IR'].tileInfo = new TileInfo(tileInfo);

  tileInfo = Object.assign({}, defaultTileInfo);
  tileInfo.lods = fiveToSeventeen;

  applianceLayerConfigs.Topo.tileInfo = new TileInfo(tileInfo);

  tileInfo = Object.assign({}, defaultTileInfo);
  tileInfo.lods = fiveToNineteen;

  applianceLayerConfigs.Lite.tileInfo = new TileInfo(tileInfo);
  applianceLayerConfigs.Overlay.tileInfo = new TileInfo(tileInfo);

  return applianceLayerConfigs;
}
