"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DifferingLODBasemaps = exports.DifferingLODMix = exports.DifferingLODBaseLayers = exports.DefaultSelection = exports.CustomLOD = exports.ZoomAndScale = exports.NoZoomOrScale = exports.Scale = exports.Zoom = void 0;
exports.Default = Default;
var Basemap_1 = require("@arcgis/core/Basemap");
var reactiveUtils_1 = require("@arcgis/core/core/reactiveUtils");
var FeatureLayer_1 = require("@arcgis/core/layers/FeatureLayer");
var LOD_1 = require("@arcgis/core/layers/support/LOD");
var TileInfo_1 = require("@arcgis/core/layers/support/TileInfo");
var TileLayer_1 = require("@arcgis/core/layers/TileLayer");
var WebTileLayer_1 = require("@arcgis/core/layers/WebTileLayer");
var Map_1 = require("@arcgis/core/Map");
var MapView_1 = require("@arcgis/core/views/MapView");
var Fullscreen_1 = require("@arcgis/core/widgets/Fullscreen");
var Home_1 = require("@arcgis/core/widgets/Home");
var react_1 = require("react");
var LayerSelector_1 = require("./LayerSelector");
var meta = {
    component: LayerSelector_1.LayerSelector,
    decorators: [
        function (Story) { return (<div className="min-h-96">
        <Story />
      </div>); },
    ],
};
exports.default = meta;
function Default(_a) {
    var center = _a.center, _b = _a.zoom, zoom = _b === void 0 ? 10 : _b, scale = _a.scale, baseLayers = _a.baseLayers, basemaps = _a.basemaps, referenceLayers = _a.referenceLayers, operationalLayers = _a.operationalLayers, note = _a.note;
    var mapDiv = (0, react_1.useRef)(null);
    var _c = (0, react_1.useState)(), layerSelectorOptions = _c[0], setLayerSelectorOptions = _c[1];
    var _d = (0, react_1.useState)(zoom), zoomLevel = _d[0], setZoomLevel = _d[1];
    var _e = (0, react_1.useState)(), maxZoomLevel = _e[0], setMaxZoomLevel = _e[1];
    var _f = (0, react_1.useState)(), minZoomLevel = _f[0], setMinZoomLevel = _f[1];
    var zoomDiv = (0, react_1.useRef)(null);
    var noteDiv = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        if (!mapDiv.current) {
            return;
        }
        console.log('init map');
        var map = new Map_1.default();
        var view = new MapView_1.default({
            container: mapDiv.current,
            map: map,
            center: center ? center : [-111.83, 39.71],
            zoom: zoom,
            scale: scale,
        });
        (0, reactiveUtils_1.watch)(function () { return view.zoom; }, function (zoom) { return Number.isInteger(zoom) && setZoomLevel(zoom); });
        (0, reactiveUtils_1.watch)(function () { return view.constraints.effectiveMaxZoom; }, function (maxZoom) { return Number.isInteger(maxZoom) && setMaxZoomLevel(maxZoom); });
        (0, reactiveUtils_1.watch)(function () { return view.constraints.effectiveMinZoom; }, function (minZoom) { return Number.isInteger(minZoom) && setMinZoomLevel(minZoom); });
        view.ui.add(new Home_1.default({ view: view }), 'top-right');
        view.ui.add(new Fullscreen_1.default({ view: view }), 'top-right');
        view.ui.add(zoomDiv.current, 'top-left');
        if (note) {
            view.ui.add(noteDiv.current, 'top-left');
        }
        setLayerSelectorOptions({
            options: {
                view: view,
                quadWord: import.meta.env.VITE_QUAD_WORD,
                basemaps: basemaps || [
                    {
                        label: 'Vector Lite',
                        function: function () {
                            return new Basemap_1.default({
                                portalItem: {
                                    id: '98104c602b7c44419c0a952f28c65815',
                                },
                            });
                        },
                    },
                    'Lite', // this is for testing the happy path tokens
                ],
                baseLayers: baseLayers || [
                    'Hybrid',
                    {
                        label: 'Vision Refresh Basemap',
                        function: function () {
                            return new TileLayer_1.default({
                                url: 'https://gis.wfrc.org/arcgis/rest/services/WC2050Vision/2023_Vision_Refresh_Basemap/MapServer',
                            });
                        },
                    },
                    'Terrain',
                    'Topo',
                    'Color IR',
                ],
                referenceLayers: referenceLayers || ['Address Points'],
                operationalLayers: operationalLayers || ['Land Ownership'],
            },
        });
    }, [
        zoom,
        center,
        scale,
        baseLayers,
        referenceLayers,
        operationalLayers,
        basemaps,
        note,
    ]);
    return (<>
      {note ? (<div className="border border-zinc-300 bg-white p-2" ref={noteDiv}>
          {note}
        </div>) : null}
      <div className="border border-zinc-300 bg-white p-2" ref={zoomDiv}>
        Zoom Level: <b>{zoomLevel}</b>
        <br />
        Effective Max Zoom: <b>{maxZoomLevel}</b>
        <br />
        Effective Min Zoom: <b>{minZoomLevel}</b>
      </div>
      <div ref={mapDiv} style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}>
        {layerSelectorOptions ? (<LayerSelector_1.LayerSelector {...layerSelectorOptions}></LayerSelector_1.LayerSelector>) : null}
      </div>
    </>);
}
var Zoom = function () { return <Default zoom={6}/>; };
exports.Zoom = Zoom;
var Scale = function () { return <Default scale={12000}/>; };
exports.Scale = Scale;
var NoZoomOrScale = function () { return <Default />; };
exports.NoZoomOrScale = NoZoomOrScale;
var ZoomAndScale = function () { return <Default zoom={6} scale={12000}/>; };
exports.ZoomAndScale = ZoomAndScale;
var CustomLOD = function () {
    var tileSize = 256;
    var earthCircumference = 40075016.685568;
    var inchesPerMeter = 39.37;
    var initialResolution = earthCircumference / tileSize;
    var lods = [];
    for (var zoom = 0; zoom <= 20; zoom++) {
        var resolution = initialResolution / Math.pow(2, zoom);
        var scale = resolution * 96 * inchesPerMeter;
        lods.push(new LOD_1.default({
            level: zoom,
            scale: scale,
            resolution: resolution,
        }));
    }
    var baseLayers = [
        {
            label: 'Imagery',
            function: function () {
                return new WebTileLayer_1.default({
                    urlTemplate: 'http://{subDomain}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    subDomains: ['a', 'b', 'c'],
                    tileInfo: new TileInfo_1.default({
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
                });
            },
        },
    ];
    return <Default zoom={6} baseLayers={baseLayers}/>;
};
exports.CustomLOD = CustomLOD;
var DefaultSelection = function () {
    var baseLayers = [
        {
            label: 'Esri Topo',
            function: function () {
                return new TileLayer_1.default({
                    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer',
                });
            },
        },
        {
            label: 'Esri Terrain',
            function: function () {
                return new TileLayer_1.default({
                    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer',
                });
            },
        },
    ];
    var referenceLayers = [
        {
            label: 'Cities',
            function: function () {
                return new FeatureLayer_1.default({
                    url: 'https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahMunicipalBoundaries/FeatureServer/0',
                });
            },
            defaultSelected: true,
        },
        {
            label: 'Counties',
            function: function () {
                return new FeatureLayer_1.default({
                    url: 'https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahCountyBoundaries/FeatureServer/0',
                });
            },
        },
    ];
    return (<Default zoom={8} baseLayers={baseLayers} referenceLayers={referenceLayers}/>);
};
exports.DefaultSelection = DefaultSelection;
var DifferingLODBaseLayers = function () {
    var baseLayers = ['Topo', 'Imagery', 'Lite'];
    var note = "\nTopo:\n  0-17\nImagery:\n  0-20\nLite:\n  0-19\n  ";
    return (<Default zoom={17} baseLayers={baseLayers} basemaps={[]} note={note}/>);
};
exports.DifferingLODBaseLayers = DifferingLODBaseLayers;
var DifferingLODMix = function () {
    // Topo 0-17
    // Lite 0-19
    // Imagery 0-20
    var baseLayers = ['Topo', 'Imagery'];
    var note = "\nTopo:\n  0-17\nImagery:\n  0-20\nLite:\n  0-19\n  ";
    return (<Default zoom={19} baseLayers={baseLayers} basemaps={['Lite']} note={note}/>);
};
exports.DifferingLODMix = DifferingLODMix;
var DifferingLODBasemaps = function () {
    // Topo 0-17
    // Lite 0-19
    // Imagery 0-20
    var note = "\nTopo:\n  0-17\nImagery:\n  0-20\nLite:\n  0-19\n  ";
    return (<Default zoom={19} baseLayers={[]} basemaps={['Topo', 'Lite', 'Hybrid', 'Terrain', 'Color IR']} note={note}/>);
};
exports.DifferingLODBasemaps = DifferingLODBasemaps;
