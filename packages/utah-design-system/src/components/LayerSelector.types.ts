export type LayerConfig = {
  /** label that shows up next to the radio button or checkbox */
  label: string;
  /** function that creates the layer, not called until the layer is toggled on */
  function: () => __esri.Layer;
  /** whether the layer is selected by default on load, only relevant for operationalLayers and referenceLayers, the first baseLayer is always selected by default */
  defaultSelected?: boolean;
};
export type LayerConfigOrToken = LayerConfig | LayerToken;
export type BaseLayerConfigOrToken =
  | Omit<LayerConfig, 'defaultSelected'>
  | LayerToken;

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
