import { loadModules } from 'esri-loader';


export default async () => {
  const requires = [
    'esri/Map',
    'esri/views/MapView',
    'esri/Basemap',
    'esri/layers/support/LOD',
    'esri/layers/support/TileInfo',
    'esri/layers/WebTileLayer',
    'esri/tasks/QueryTask',
    'esri/tasks/support/Query',
    'esri/Graphic',
    'esri/core/watchUtils'
  ];

  const [
    Map,
    MapView,
    Basemap,
    LOD,
    TileInfo,
    WebTileLayer,
    QueryTask,
    Query,
    Graphic,
    watchUtils
  ] = await loadModules(requires, { css: true });

  return {
    Map,
    MapView,
    Basemap,
    LOD,
    TileInfo,
    WebTileLayer,
    QueryTask,
    Query,
    Graphic,
    watchUtils
  };
};
