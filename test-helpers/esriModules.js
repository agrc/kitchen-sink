import { loadModules } from 'esri-loader';


export default async () => {
  const requires = [
    'esri/Basemap',
    'esri/layers/support/LOD',
    'esri/layers/support/TileInfo',
    'esri/layers/WebTileLayer'
  ];

  const [
    Basemap,
    LOD,
    TileInfo,
    WebTileLayer
  ] = await loadModules(requires, {
    version: '4.14',
    css: true
  });

  return {
    Basemap,
    LOD,
    TileInfo,
    WebTileLayer
  };
};
