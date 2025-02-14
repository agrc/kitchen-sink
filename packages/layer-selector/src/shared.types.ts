import type { commonFactories } from './utilities';

type Layer = new (props: object) => __esri.Layer;
export type LayerFactory = {
  copyright?: string;
  Factory: Layer;
  id: string;
  layerType: LayerType;
  linked?: string[];
  selected: boolean;
  tileInfo?: __esri.TileInfo;
  urlTemplate?: string;
};

export type LayerConfig = {
  copyright?: string;
  Factory?: Layer | keyof typeof commonFactories;
  linked?: string[];
  selected?: boolean;
  tileInfo?: __esri.TileInfo;
  urlPattern: string;
} & {
  id: string;
  token?: ApplianceLayerTokens;
} & {
  id?: string;
  token: ApplianceLayerTokens;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const applianceLayerTokens = {
  imagery: 'Imagery',
  topo: 'Topo',
  terrain: 'Terrain',
  lite: 'Lite',
  colorIR: 'Color IR',
  hybrid: 'Hybrid',
  overlay: 'Overlay',
  addressPoints: 'Address Points',
} as const;

export type ApplianceLayerTokens =
  (typeof applianceLayerTokens)[keyof typeof applianceLayerTokens];

export type LayerType = 'base' | 'overlay';
