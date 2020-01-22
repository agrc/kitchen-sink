import { loadModules } from 'esri-loader';


export default async () => {
  const requires = [
    'esri/Map',
    'esri/views/MapView',
    'esri/Basemap',
    'esri/layers/support/LOD',
    'esri/layers/support/TileInfo',
    'esri/layers/WebTileLayer',
    'esri/layers/FeatureLayer',
    'esri/layers/TileLayer'
  ];

  const [
    Map,
    MapView,
    Basemap,
    LOD,
    TileInfo,
    WebTileLayer,
    FeatureLayer,
    TileLayer
  ] = await loadModules(requires, {
    version: '4.14',
    css: true
  });

  return {
    Map,
    MapView,
    Basemap,
    LOD,
    TileInfo,
    WebTileLayer,
    FeatureLayer,
    TileLayer
  };
};
