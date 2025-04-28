export type LayerConfig = {
  /** Label that shows up next to the radio button or checkbox */
  label: string;
  /** Function that creates the layer, not called until the layer is toggled on */
  function: () => __esri.Layer;
  /**
   * Controls whether the layer is initially selected.
   * - For operationalLayers and referenceLayers: this determines if the layer is on by default
   * - For basemaps: the first basemap is always selected by default
   * - If no basemap configs exist, the first baseLayer is selected by default
   */
  defaultSelected?: boolean;
};

export type BasemapConfig = {
  function: () => __esri.Basemap;
} & Omit<LayerConfig, 'function'>;
export type BasemapConfigOrToken = BasemapConfig | BasemapToken;

export type LayerConfigOrToken = LayerConfig | LayerToken;
export type BaseLayerConfigOrToken =
  | Omit<LayerConfig, 'defaultSelected'>
  | LayerToken;

export const basemapTokens = {
  imagery: 'Imagery',
  topo: 'Topo',
  terrain: 'Terrain',
  lite: 'Lite',
  colorIR: 'Color IR',
  hybrid: 'Hybrid',
} as const;

export type BasemapToken = (typeof basemapTokens)[keyof typeof basemapTokens];

export const layerTokens = {
  imagery: 'Imagery',
  topo: 'Topo',
  terrain: 'Terrain',
  lite: 'Lite',
  colorIR: 'Color IR',
  hybrid: 'Hybrid',
  overlay: 'Overlay',
  addressPoints: 'Address Points',
  landOwnership: 'Land Ownership',
} as const;

export type LayerToken = (typeof layerTokens)[keyof typeof layerTokens];
