"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Basemap_1 = require("@arcgis/core/Basemap");
var Collection_1 = require("@arcgis/core/core/Collection");
var VectorTileLayer_1 = require("@arcgis/core/layers/VectorTileLayer");
var WebTileLayer_1 = require("@arcgis/core/layers/WebTileLayer");
var Map_1 = require("@arcgis/core/Map");
var MapView_1 = require("@arcgis/core/views/MapView");
var vitest_1 = require("vitest");
var LayerSelector_1 = require("./LayerSelector");
// Mock the MapView class
vitest_1.vi.mock('@arcgis/core/views/MapView', function () {
    return {
        default: vitest_1.vi
            .fn()
            .mockImplementation(function (properties) {
            if (properties === void 0) { properties = {}; }
            var mockMapView = {
                map: (properties === null || properties === void 0 ? void 0 : properties.map) || null,
                container: (properties === null || properties === void 0 ? void 0 : properties.container) || null,
                ready: true,
                destroyed: false,
                // Add any other properties your code might access
                extent: null,
                center: null,
                zoom: 10,
                scale: 1000000,
                // Add methods if needed
                when: vitest_1.vi.fn().mockResolvedValue(undefined),
                destroy: vitest_1.vi.fn(),
                goTo: vitest_1.vi.fn().mockResolvedValue(undefined),
            };
            return mockMapView;
        }),
    };
});
(0, vitest_1.describe)('LayerSelector utility functions', function () {
    var mockCollection;
    var mockManagedObjects;
    var mockView;
    var mockMap;
    var mockBasemap;
    (0, vitest_1.beforeEach)(function () {
        // Reset mocks before each test
        mockCollection = new Collection_1.default();
        mockManagedObjects = {};
        // Create mock basemap with baseLayers and referenceLayers
        mockBasemap = new Basemap_1.default({
            baseLayers: new Collection_1.default(),
            referenceLayers: new Collection_1.default(),
        });
        // Create mock map
        mockMap = new Map_1.default({
            basemap: mockBasemap,
        });
        // Create mock view (now using mocked MapView)
        mockView = new MapView_1.default({
            map: mockMap,
        });
        // Mock the load method on basemaps
        vitest_1.vi.spyOn(Basemap_1.default.prototype, 'load').mockResolvedValue(undefined);
    });
    (0, vitest_1.describe)('toggleLayer', function () {
        (0, vitest_1.it)('should add a layer when visible is true and layer does not exist (string token)', function () { return __awaiter(void 0, void 0, void 0, function () {
            var label, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        label = 'Test Layer';
                        token = 'Imagery';
                        return [4 /*yield*/, (0, LayerSelector_1.toggleLayer)(token, label, true, mockCollection, mockManagedObjects, 'testQuadWord')];
                    case 1:
                        _a.sent();
                        (0, vitest_1.expect)(mockCollection.length).toBe(1);
                        (0, vitest_1.expect)(mockManagedObjects[label]).toBeDefined();
                        (0, vitest_1.expect)(mockManagedObjects[label]).toBeInstanceOf(WebTileLayer_1.default);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.it)('should add a layer when visible is true and layer does not exist (config object)', function () { return __awaiter(void 0, void 0, void 0, function () {
            var label, mockLayer, config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        label = 'Custom Layer';
                        mockLayer = new VectorTileLayer_1.default({ id: 'custom-layer' });
                        config = {
                            label: label,
                            function: function () { return mockLayer; },
                        };
                        return [4 /*yield*/, (0, LayerSelector_1.toggleLayer)(config, label, true, mockCollection, mockManagedObjects, 'testQuadWord')];
                    case 1:
                        _a.sent();
                        (0, vitest_1.expect)(mockCollection.length).toBe(1);
                        (0, vitest_1.expect)(mockCollection.getItemAt(0)).toBe(mockLayer);
                        (0, vitest_1.expect)(mockManagedObjects[label]).toBe(mockLayer);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.it)('should reuse existing layer when visible is true and layer already exists', function () { return __awaiter(void 0, void 0, void 0, function () {
            var label, existingLayer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        label = 'Existing Layer';
                        existingLayer = new WebTileLayer_1.default({ id: 'existing' });
                        mockManagedObjects[label] = existingLayer;
                        return [4 /*yield*/, (0, LayerSelector_1.toggleLayer)('Imagery', label, true, mockCollection, mockManagedObjects, 'testQuadWord')];
                    case 1:
                        _a.sent();
                        (0, vitest_1.expect)(mockCollection.length).toBe(1);
                        (0, vitest_1.expect)(mockCollection.getItemAt(0)).toBe(existingLayer);
                        (0, vitest_1.expect)(mockManagedObjects[label]).toBe(existingLayer);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.it)('should remove layer when visible is false and layer exists', function () { return __awaiter(void 0, void 0, void 0, function () {
            var label, layer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        label = 'Layer to Remove';
                        layer = new WebTileLayer_1.default({ id: 'to-remove' });
                        mockManagedObjects[label] = layer;
                        mockCollection.add(layer);
                        return [4 /*yield*/, (0, LayerSelector_1.toggleLayer)('Imagery', label, false, mockCollection, mockManagedObjects, 'testQuadWord')];
                    case 1:
                        _a.sent();
                        (0, vitest_1.expect)(mockCollection.length).toBe(0);
                        (0, vitest_1.expect)(mockManagedObjects[label]).toBe(layer); // Layer still exists in managed objects
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.it)('should do nothing when visible is false and layer does not exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var label;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        label = 'Non-existent Layer';
                        return [4 /*yield*/, (0, LayerSelector_1.toggleLayer)('Imagery', label, false, mockCollection, mockManagedObjects, 'testQuadWord')];
                    case 1:
                        _a.sent();
                        (0, vitest_1.expect)(mockCollection.length).toBe(0);
                        (0, vitest_1.expect)(mockManagedObjects[label]).toBeUndefined();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, vitest_1.describe)('toggleBasemap', function () {
        (0, vitest_1.it)('should add basemap layers when visible is true and basemap does not exist (string token)', function () { return __awaiter(void 0, void 0, void 0, function () {
            var label, token, basemap;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        label = 'Test Basemap';
                        token = 'Imagery';
                        return [4 /*yield*/, (0, LayerSelector_1.toggleBasemap)(token, label, true, mockManagedObjects, mockView, 'testQuadWord')];
                    case 1:
                        _c.sent();
                        (0, vitest_1.expect)(mockManagedObjects[label]).toBeDefined();
                        (0, vitest_1.expect)(mockManagedObjects[label]).toBeInstanceOf(Basemap_1.default);
                        basemap = mockManagedObjects[label];
                        (0, vitest_1.expect)(basemap.baseLayers.length).toBe(1);
                        (0, vitest_1.expect)((_b = (_a = mockView.map) === null || _a === void 0 ? void 0 : _a.basemap) === null || _b === void 0 ? void 0 : _b.baseLayers.length).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.it)('should add basemap layers when visible is true and basemap does not exist (config object)', function () { return __awaiter(void 0, void 0, void 0, function () {
            var label, mockBasemapInstance, config;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        label = 'Custom Basemap';
                        mockBasemapInstance = new Basemap_1.default({
                            id: 'custom-basemap',
                            baseLayers: [
                                new WebTileLayer_1.default({
                                    id: 'custom-base',
                                    urlTemplate: 'https://test.com/{z}/{x}/{y}',
                                }),
                            ],
                            referenceLayers: [
                                new WebTileLayer_1.default({
                                    id: 'custom-ref',
                                    urlTemplate: 'https://test.com/{z}/{x}/{y}',
                                }),
                            ],
                        });
                        config = {
                            label: label,
                            function: function () { return mockBasemapInstance; },
                        };
                        return [4 /*yield*/, (0, LayerSelector_1.toggleBasemap)(config, label, true, mockManagedObjects, mockView, 'testQuadWord')];
                    case 1:
                        _e.sent();
                        (0, vitest_1.expect)(mockManagedObjects[label]).toBe(mockBasemapInstance);
                        (0, vitest_1.expect)((_b = (_a = mockView.map) === null || _a === void 0 ? void 0 : _a.basemap) === null || _b === void 0 ? void 0 : _b.baseLayers.length).toBe(1);
                        (0, vitest_1.expect)((_d = (_c = mockView.map) === null || _c === void 0 ? void 0 : _c.basemap) === null || _d === void 0 ? void 0 : _d.referenceLayers.length).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.it)('should reuse existing basemap when visible is true and basemap already exists', function () { return __awaiter(void 0, void 0, void 0, function () {
            var label, existingBasemap;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        label = 'Existing Basemap';
                        existingBasemap = new Basemap_1.default({
                            id: 'existing',
                            baseLayers: [
                                new WebTileLayer_1.default({
                                    id: 'existing-base',
                                    urlTemplate: 'https://test.com/{z}/{x}/{y}',
                                }),
                            ],
                        });
                        mockManagedObjects[label] = existingBasemap;
                        return [4 /*yield*/, (0, LayerSelector_1.toggleBasemap)('Imagery', label, true, mockManagedObjects, mockView, 'testQuadWord')];
                    case 1:
                        _c.sent();
                        (0, vitest_1.expect)(mockManagedObjects[label]).toBe(existingBasemap);
                        (0, vitest_1.expect)((_b = (_a = mockView.map) === null || _a === void 0 ? void 0 : _a.basemap) === null || _b === void 0 ? void 0 : _b.baseLayers.length).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.it)('should remove basemap layers when visible is false and basemap exists with base layers', function () { return __awaiter(void 0, void 0, void 0, function () {
            var label, baseLayer, basemap;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        label = 'Basemap to Remove';
                        baseLayer = new WebTileLayer_1.default({
                            id: 'base-to-remove',
                            urlTemplate: 'https://test.com/{z}/{x}/{y}',
                        });
                        basemap = new Basemap_1.default({
                            id: 'to-remove',
                            baseLayers: [baseLayer],
                        });
                        mockManagedObjects[label] = basemap;
                        (_b = (_a = mockView.map) === null || _a === void 0 ? void 0 : _a.basemap) === null || _b === void 0 ? void 0 : _b.baseLayers.add(baseLayer);
                        return [4 /*yield*/, (0, LayerSelector_1.toggleBasemap)('Imagery', label, false, mockManagedObjects, mockView, 'testQuadWord')];
                    case 1:
                        _e.sent();
                        (0, vitest_1.expect)((_d = (_c = mockView.map) === null || _c === void 0 ? void 0 : _c.basemap) === null || _d === void 0 ? void 0 : _d.baseLayers.length).toBe(0);
                        (0, vitest_1.expect)(mockManagedObjects[label]).toBe(basemap); // Basemap still exists in managed objects
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.it)('should remove basemap layers when visible is false and basemap exists with reference layers', function () { return __awaiter(void 0, void 0, void 0, function () {
            var label, referenceLayer, basemap;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        label = 'Basemap with Reference';
                        referenceLayer = new WebTileLayer_1.default({
                            id: 'ref-to-remove',
                            urlTemplate: 'https://test.com/{z}/{x}/{y}',
                        });
                        basemap = new Basemap_1.default({
                            id: 'to-remove',
                            referenceLayers: [referenceLayer],
                        });
                        mockManagedObjects[label] = basemap;
                        (_b = (_a = mockView.map) === null || _a === void 0 ? void 0 : _a.basemap) === null || _b === void 0 ? void 0 : _b.referenceLayers.add(referenceLayer);
                        return [4 /*yield*/, (0, LayerSelector_1.toggleBasemap)('Imagery', label, false, mockManagedObjects, mockView, 'testQuadWord')];
                    case 1:
                        _e.sent();
                        (0, vitest_1.expect)((_d = (_c = mockView.map) === null || _c === void 0 ? void 0 : _c.basemap) === null || _d === void 0 ? void 0 : _d.referenceLayers.length).toBe(0);
                        (0, vitest_1.expect)(mockManagedObjects[label]).toBe(basemap);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.it)('should handle basemap with both base and reference layers', function () { return __awaiter(void 0, void 0, void 0, function () {
            var label, baseLayer, referenceLayer, basemap, config;
            var _a, _b, _c, _d, _e, _f, _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        label = 'Complex Basemap';
                        baseLayer = new WebTileLayer_1.default({
                            id: 'complex-base',
                            urlTemplate: 'https://test.com/{z}/{x}/{y}',
                        });
                        referenceLayer = new WebTileLayer_1.default({
                            id: 'complex-ref',
                            urlTemplate: 'https://test.com/{z}/{x}/{y}',
                        });
                        basemap = new Basemap_1.default({
                            id: 'complex',
                            baseLayers: [baseLayer],
                            referenceLayers: [referenceLayer],
                        });
                        config = {
                            label: label,
                            function: function () { return basemap; },
                        };
                        // Test adding
                        return [4 /*yield*/, (0, LayerSelector_1.toggleBasemap)(config, label, true, mockManagedObjects, mockView, 'testQuadWord')];
                    case 1:
                        // Test adding
                        _j.sent();
                        (0, vitest_1.expect)((_b = (_a = mockView.map) === null || _a === void 0 ? void 0 : _a.basemap) === null || _b === void 0 ? void 0 : _b.baseLayers.length).toBe(1);
                        (0, vitest_1.expect)((_d = (_c = mockView.map) === null || _c === void 0 ? void 0 : _c.basemap) === null || _d === void 0 ? void 0 : _d.referenceLayers.length).toBe(1);
                        // Test removing
                        return [4 /*yield*/, (0, LayerSelector_1.toggleBasemap)(config, label, false, mockManagedObjects, mockView, 'testQuadWord')];
                    case 2:
                        // Test removing
                        _j.sent();
                        (0, vitest_1.expect)((_f = (_e = mockView.map) === null || _e === void 0 ? void 0 : _e.basemap) === null || _f === void 0 ? void 0 : _f.baseLayers.length).toBe(0);
                        (0, vitest_1.expect)((_h = (_g = mockView.map) === null || _g === void 0 ? void 0 : _g.basemap) === null || _h === void 0 ? void 0 : _h.referenceLayers.length).toBe(0);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.it)('should do nothing when visible is false and basemap does not exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var label;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        label = 'Non-existent Basemap';
                        return [4 /*yield*/, (0, LayerSelector_1.toggleBasemap)('Imagery', label, false, mockManagedObjects, mockView, 'testQuadWord')];
                    case 1:
                        _e.sent();
                        (0, vitest_1.expect)((_b = (_a = mockView.map) === null || _a === void 0 ? void 0 : _a.basemap) === null || _b === void 0 ? void 0 : _b.baseLayers.length).toBe(0);
                        (0, vitest_1.expect)((_d = (_c = mockView.map) === null || _c === void 0 ? void 0 : _c.basemap) === null || _d === void 0 ? void 0 : _d.referenceLayers.length).toBe(0);
                        (0, vitest_1.expect)(mockManagedObjects[label]).toBeUndefined();
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.it)('should not add duplicate layers to basemap collections', function () { return __awaiter(void 0, void 0, void 0, function () {
            var label, baseLayer, basemap;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        label = 'Duplicate Test';
                        baseLayer = new WebTileLayer_1.default({
                            id: 'duplicate-base',
                            urlTemplate: 'https://test.com/{z}/{x}/{y}',
                        });
                        basemap = new Basemap_1.default({
                            id: 'duplicate-test',
                            baseLayers: [baseLayer],
                        });
                        mockManagedObjects[label] = basemap;
                        // Add the layer manually first
                        (_b = (_a = mockView.map) === null || _a === void 0 ? void 0 : _a.basemap) === null || _b === void 0 ? void 0 : _b.baseLayers.add(baseLayer);
                        return [4 /*yield*/, (0, LayerSelector_1.toggleBasemap)('Imagery', label, true, mockManagedObjects, mockView, 'testQuadWord')];
                    case 1:
                        _e.sent();
                        // Should still only have one layer (no duplicates)
                        (0, vitest_1.expect)((_d = (_c = mockView.map) === null || _c === void 0 ? void 0 : _c.basemap) === null || _d === void 0 ? void 0 : _d.baseLayers.length).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
