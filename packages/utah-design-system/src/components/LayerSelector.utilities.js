"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.happyPathConfigs = exports.commonFactories = void 0;
exports.getHappyPathBasemapProperties = getHappyPathBasemapProperties;
exports.getLayerFromToken = getLayerFromToken;
var FeatureLayer_1 = require("@arcgis/core/layers/FeatureLayer");
var LOD_1 = require("@arcgis/core/layers/support/LOD");
var TileInfo_1 = require("@arcgis/core/layers/support/TileInfo");
var TileLayer_1 = require("@arcgis/core/layers/TileLayer");
var VectorTileLayer_1 = require("@arcgis/core/layers/VectorTileLayer");
var WebTileLayer_1 = require("@arcgis/core/layers/WebTileLayer");
var LayerSelector_types_1 = require("./LayerSelector.types");
exports.commonFactories = {
    FeatureLayer: FeatureLayer_1.default,
    WebTileLayer: WebTileLayer_1.default,
    TileLayer: TileLayer_1.default,
};
var quadWordToken = '{quadWord}';
exports.happyPathConfigs = {
    Imagery: {
        urlPattern: "https://discover.agrc.utah.gov/login/path/".concat(quadWordToken, "/tiles/utah/{level}/{col}/{row}"),
        copyright: 'Hexagon',
    },
    Topo: {
        urlPattern: "https://discover.agrc.utah.gov/login/path/".concat(quadWordToken, "/tiles/topo_basemap/{level}/{col}/{row}"),
        copyright: 'UGRC',
    },
    Terrain: {
        urlPattern: "https://discover.agrc.utah.gov/login/path/".concat(quadWordToken, "/tiles/terrain_basemap/{level}/{col}/{row}"),
        copyright: 'UGRC',
    },
    Lite: {
        urlPattern: "https://discover.agrc.utah.gov/login/path/".concat(quadWordToken, "/tiles/lite_basemap/{level}/{col}/{row}"),
        copyright: 'UGRC',
    },
    'Color IR': {
        urlPattern: "https://discover.agrc.utah.gov/login/path/".concat(quadWordToken, "/tiles/naip_2021_nrg/{level}/{col}/{row}"),
        copyright: 'UGRC',
    },
    Hybrid: {
        urlPattern: "https://discover.agrc.utah.gov/login/path/".concat(quadWordToken, "/tiles/utah/{level}/{col}/{row}"),
        copyright: 'Hexagon, UGRC',
    },
    Overlay: {
        urlPattern: "https://discover.agrc.utah.gov/login/path/".concat(quadWordToken, "/tiles/overlay_basemap/{level}/{col}/{row}"),
        // no attribution for overlay layers since it just duplicates the base map attribution
    },
    'Address Points': {
        urlPattern: "https://discover.agrc.utah.gov/login/path/".concat(quadWordToken, "/tiles/address_points_basemap/{level}/{col}/{row}"),
        // no attribution for overlay layers since it just duplicates the base map attribution
    },
    'Land Ownership': {
        url: 'https://gis.trustlands.utah.gov/hosting/rest/services/Hosted/Land_Ownership_WM_VectorTile/VectorTileServer',
        opacity: 0.5,
    },
};
function getHappyPathBasemapProperties(token, quadWord) {
    var checkForQuadWord = function () {
        if (!quadWord) {
            throw new Error("layer-selector::You chose to use a basemaps token ('".concat(token, "') without setting your 'quadWord' from Discover. The requests for tiles will fail to authenticate. Pass 'quadWord' into the options parameter."));
        }
    };
    switch (token) {
        case 'Imagery': {
            checkForQuadWord();
            return {
                baseLayers: [getLayerFromToken('Hybrid', quadWord)],
            };
        }
        case 'Topo': {
            checkForQuadWord();
            return {
                baseLayers: [getLayerFromToken('Topo', quadWord)],
            };
        }
        case 'Terrain': {
            return {
                baseLayers: [getLayerFromToken('Terrain', quadWord)],
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
                baseLayers: [getLayerFromToken('Color IR', quadWord)],
            };
        }
        case 'Hybrid': {
            checkForQuadWord();
            return {
                baseLayers: [
                    new WebTileLayer_1.default({
                        urlTemplate: "https://discover.agrc.utah.gov/login/path/".concat(quadWordToken, "/tiles/utah/{level}/{col}/{row}").replace(quadWordToken, quadWord),
                        copyright: 'Hexagon',
                        tileInfo: getTileInfo('Imagery'),
                    }),
                ],
                referenceLayers: [
                    new WebTileLayer_1.default({
                        urlTemplate: "https://discover.agrc.utah.gov/login/path/".concat(quadWordToken, "/tiles/overlay_basemap/{level}/{col}/{row}").replace(quadWordToken, quadWord),
                        copyright: 'UGRC',
                        tileInfo: getTileInfo('Overlay'),
                    }),
                ],
            };
        }
        default: {
            throw new Error("layer-selector::The basemap token '".concat(token, "' was not found. Please use one of the supported tokens (").concat(Object.values(LayerSelector_types_1.basemapTokens).join(', '), ") or pass in a Basemap object."));
        }
    }
}
var defaultTileInfo = createDefaultTileInfo();
/**
 * Takes layer tokens from `applianceLayers` keys and resolves them to layers
 */
function getLayerFromToken(token, quadWord) {
    if (!token || !Object.values(LayerSelector_types_1.layerTokens).includes(token)) {
        throw new Error("layer-selector::The layer token '".concat(token, "' was not found. Please use one of the supported tokens (").concat(Object.values(LayerSelector_types_1.layerTokens).join(', '), ") or pass in a layer."));
    }
    if (token === 'Land Ownership') {
        return new VectorTileLayer_1.default(__assign({ id: token }, exports.happyPathConfigs[token]));
    }
    else {
        var config = exports.happyPathConfigs[token];
        return new WebTileLayer_1.default({
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
    var tileSize = 256;
    var earthCircumference = 40075016.685568;
    var inchesPerMeter = 39.37;
    var initialResolution = earthCircumference / tileSize;
    var dpi = 96;
    var maxLevel = 20;
    var squared = 2;
    var lods = [];
    for (var level = 0; level <= maxLevel; level++) {
        var resolution = initialResolution / Math.pow(squared, level);
        var scale = resolution * dpi * inchesPerMeter;
        lods.push(new LOD_1.default({
            level: level,
            scale: scale,
            resolution: resolution,
        }));
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
        lods: lods,
    };
}
function getTileInfo(token) {
    switch (token) {
        case 'Imagery': {
            // default lods is 0 to 20
            return defaultTileInfo;
        }
        // max level is 18
        case 'Color IR': {
            return new TileInfo_1.default(__assign(__assign({}, defaultTileInfo), { lods: defaultTileInfo.lods.slice(0, 19) }));
        }
        // max level is 17
        case 'Topo': {
            return new TileInfo_1.default(__assign(__assign({}, defaultTileInfo), { lods: defaultTileInfo.lods.slice(0, 18) }));
        }
        // cached via honeycomb on a regular schedule (max level is 19 but only for a specific extent)
        case 'Hybrid':
        case 'Address Points':
        case 'Terrain':
        case 'Lite':
        case 'Overlay': {
            return new TileInfo_1.default(__assign(__assign({}, defaultTileInfo), { lods: defaultTileInfo.lods.slice(0, 20) }));
        }
        // todo: figure out how to get typescript to make sure that we aren't missing any switch cases
        // default: {
        //   return undefined;
        // }
    }
}
