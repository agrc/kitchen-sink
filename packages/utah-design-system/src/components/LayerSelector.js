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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleLayer = toggleLayer;
exports.toggleBasemap = toggleBasemap;
exports.LayerSelector = LayerSelector;
var Basemap_1 = require("@arcgis/core/Basemap");
var utah_design_system_1 = require("@ugrc/utah-design-system");
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var react_aria_components_1 = require("react-aria-components");
var LayerSelector_types_1 = require("./LayerSelector.types");
var LayerSelector_utilities_1 = require("./LayerSelector.utilities");
var Popover = function (props) {
    return (<react_aria_components_1.Popover {...props} className={function (_a) {
            var isEntering = _a.isEntering, isExiting = _a.isExiting;
            return "group min-w-48 max-w-sm overflow-y-auto rounded-lg bg-white px-3 py-2 ring-1 ring-black/10 drop-shadow-lg dark:bg-zinc-800 dark:ring-white/10 ".concat(isEntering
                ? 'duration-500 ease-out animate-in fade-in placement-top:slide-in-from-bottom-1 placement-bottom:slide-in-from-top-1'
                : '', " ").concat(isExiting
                ? 'duration-150 ease-in animate-out fade-out placement-top:slide-out-to-bottom-1 placement-bottom:slide-out-to-top-1'
                : '', " ");
        }}/>);
};
function getLabel(configOrToken) {
    return typeof configOrToken === 'string'
        ? configOrToken
        : configOrToken.label;
}
function toggleLayer(configOrToken, label, visible, container, managedObjects, quadWord) {
    return __awaiter(this, void 0, void 0, function () {
        var layer;
        return __generator(this, function (_a) {
            layer = managedObjects[label];
            if (visible) {
                // add layer
                if (!layer) {
                    if (typeof configOrToken === 'string') {
                        layer = (0, LayerSelector_utilities_1.getLayerFromToken)(configOrToken, quadWord);
                    }
                    else {
                        layer = configOrToken.function();
                    }
                    managedObjects[label] = layer;
                }
                if (!container.includes(layer)) {
                    container.add(layer);
                }
            }
            else {
                // remove layer if it exists
                if (layer) {
                    // we need to remove rather than set visible to false so that the map view resets it's max & min scale levels
                    container.remove(layer);
                }
            }
            return [2 /*return*/];
        });
    });
}
function toggleBasemap(configOrToken, label, visible, managedLayers, view, quadWord) {
    return __awaiter(this, void 0, void 0, function () {
        var basemap, _i, _a, baseLayer, _b, _c, referenceLayer;
        var _d, _e, _f, _g, _h, _j, _k, _l;
        return __generator(this, function (_m) {
            switch (_m.label) {
                case 0:
                    basemap = managedLayers[label];
                    if (!visible) return [3 /*break*/, 3];
                    if (!!basemap) return [3 /*break*/, 2];
                    if (typeof configOrToken === 'string') {
                        basemap = new Basemap_1.default((0, LayerSelector_utilities_1.getHappyPathBasemapProperties)(configOrToken, quadWord));
                    }
                    else {
                        basemap = configOrToken.function();
                    }
                    // this line needs to be before the await load call below so that if this is called twice, it doesn't try to add the same layers twice
                    managedLayers[label] = basemap;
                    return [4 /*yield*/, basemap.load()];
                case 1:
                    _m.sent();
                    _m.label = 2;
                case 2:
                    if (basemap.baseLayers.length > 0) {
                        for (_i = 0, _a = basemap.baseLayers; _i < _a.length; _i++) {
                            baseLayer = _a[_i];
                            if (!((_e = (_d = view.map) === null || _d === void 0 ? void 0 : _d.basemap) === null || _e === void 0 ? void 0 : _e.baseLayers.includes(baseLayer))) {
                                (_f = view.map) === null || _f === void 0 ? void 0 : _f.basemap.baseLayers.add(baseLayer);
                            }
                        }
                    }
                    if (basemap.referenceLayers.length > 0) {
                        for (_b = 0, _c = basemap.referenceLayers; _b < _c.length; _b++) {
                            referenceLayer = _c[_b];
                            if (!((_h = (_g = view.map) === null || _g === void 0 ? void 0 : _g.basemap) === null || _h === void 0 ? void 0 : _h.referenceLayers.includes(referenceLayer))) {
                                (_j = view.map) === null || _j === void 0 ? void 0 : _j.basemap.referenceLayers.add(referenceLayer);
                            }
                        }
                    }
                    return [3 /*break*/, 4];
                case 3:
                    // remove layer if it exists
                    if (basemap) {
                        // we need to remove rather than set visible to false so that the map view resets it's max & min scale levels
                        if (basemap.baseLayers.length > 0) {
                            (_k = view.map) === null || _k === void 0 ? void 0 : _k.basemap.baseLayers.removeMany(basemap.baseLayers);
                        }
                        if (basemap.referenceLayers.length > 0) {
                            (_l = view.map) === null || _l === void 0 ? void 0 : _l.basemap.referenceLayers.removeMany(basemap.referenceLayers);
                        }
                    }
                    _m.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function LayerSelector(_a) {
    var _b = _a.options, _c = _b.position, position = _c === void 0 ? 'top-right' : _c, _d = _b.referenceLayers, referenceLayers = _d === void 0 ? [] : _d, _e = _b.operationalLayers, operationalLayers = _e === void 0 ? [] : _e, _f = _b.basemaps, basemaps = _f === void 0 ? [] : _f, _g = _b.baseLayers, baseLayers = _g === void 0 ? [] : _g, _h = _b.onBasemapChange, onBasemapChange = _h === void 0 ? function () { } : _h, options = __rest(_b, ["position", "referenceLayers", "operationalLayers", "basemaps", "baseLayers", "onBasemapChange"]), props = __rest(_a, ["options"]);
    var node = (0, react_1.useRef)(null);
    var managedLayers = (0, react_1.useRef)({});
    // validate options
    (0, react_1.useEffect)(function () {
        if (basemaps.length < 1 && baseLayers.length < 1) {
            throw new Error('`options.basemaps` or `options.baseLayers` must have at least one config or token');
        }
        if (!options.view.map) {
            throw new Error('`options.view` must have a map');
        }
        // basemaps prop tokens are validated in the getHappyPathBasemapProperties function
        for (var _i = 0, _a = __spreadArray(__spreadArray(__spreadArray([], baseLayers, true), referenceLayers, true), operationalLayers, true); _i < _a.length; _i++) {
            var configOrToken = _a[_i];
            if (typeof configOrToken === 'string') {
                if (!Object.values(LayerSelector_types_1.layerTokens).includes(configOrToken)) {
                    throw new Error("layer-selector::The layer token '".concat(configOrToken, "' was not found. Please use one of the supported tokens (").concat(Object.values(LayerSelector_types_1.layerTokens).join(', '), ") or pass in a LayerConfig object."));
                }
                if (!options.quadWord) {
                    throw new Error("layer-selector::You chose to use a layer token '".concat(configOrToken, "' without setting your 'quadWord' from Discover. The requests for tiles will fail to authenticate. Pass 'quadWord' into the options parameter."));
                }
            }
        }
    }, [
        baseLayers,
        basemaps.length,
        operationalLayers,
        options.quadWord,
        options.view.map,
        referenceLayers,
    ]);
    var _j = (0, react_1.useState)(getLabel(basemaps.length ? basemaps[0] : baseLayers[0])), selectedRadioBtnLabel = _j[0], setSelectedRadioBtnLabel = _j[1];
    var referenceAndOperationalConfigsOrTokens = __spreadArray(__spreadArray([], operationalLayers, true), referenceLayers, true);
    var _k = (0, react_1.useState)(function () {
        return referenceAndOperationalConfigsOrTokens
            .filter(function (configOrToken) {
            return typeof configOrToken === 'object' && (configOrToken === null || configOrToken === void 0 ? void 0 : configOrToken.defaultSelected);
        })
            .map(getLabel);
    }), selectedCheckboxLabels = _k[0], setSelectedCheckboxLabels = _k[1];
    // set up map
    (0, react_1.useEffect)(function () {
        var _a, _b;
        var basemapId = 'layer-selector';
        if (!node.current || ((_b = (_a = options.view.map) === null || _a === void 0 ? void 0 : _a.basemap) === null || _b === void 0 ? void 0 : _b.id) === basemapId)
            return;
        options.view.map.basemap = new Basemap_1.default({
            id: basemapId,
        });
        options.view.ui.add(node.current, position);
    }, [position, options.view.map, options.view.ui]);
    // toggle layer visibility
    (0, react_1.useEffect)(function () {
        var map = options.view.map;
        if (!map || !map.basemap) {
            return;
        }
        for (var _i = 0, baseLayers_1 = baseLayers; _i < baseLayers_1.length; _i++) {
            var configOrToken = baseLayers_1[_i];
            var label = getLabel(configOrToken);
            toggleLayer(configOrToken, label, label === selectedRadioBtnLabel, map.basemap.baseLayers, managedLayers.current, options.quadWord);
            if (label === 'Hybrid') {
                toggleLayer('Overlay', 'Overlay', label === selectedRadioBtnLabel, map.basemap.referenceLayers, managedLayers.current, options.quadWord);
            }
        }
        for (var _a = 0, basemaps_1 = basemaps; _a < basemaps_1.length; _a++) {
            var configOrToken = basemaps_1[_a];
            var label = getLabel(configOrToken);
            toggleBasemap(configOrToken, label, label === selectedRadioBtnLabel, managedLayers.current, options.view, options.quadWord);
        }
        for (var _b = 0, referenceLayers_1 = referenceLayers; _b < referenceLayers_1.length; _b++) {
            var configOrToken = referenceLayers_1[_b];
            var label = getLabel(configOrToken);
            toggleLayer(configOrToken, label, selectedCheckboxLabels.includes(label), map.basemap.referenceLayers, managedLayers.current, options.quadWord);
        }
        for (var _c = 0, operationalLayers_1 = operationalLayers; _c < operationalLayers_1.length; _c++) {
            var configOrToken = operationalLayers_1[_c];
            // todo: handle layer ordering (I *think* that esri might already make sure that polygons are under line are under points...)
            var label = getLabel(configOrToken);
            toggleLayer(configOrToken, label, selectedCheckboxLabels.includes(label), map.layers, managedLayers.current, options.quadWord);
        }
    }, [
        baseLayers,
        operationalLayers,
        options.quadWord,
        referenceLayers,
        options.view,
        options.view.map,
        selectedCheckboxLabels,
        selectedRadioBtnLabel,
        basemaps,
    ]);
    return (<div ref={node} className="esri-widget">
      <react_aria_components_1.DialogTrigger {...props}>
        <utah_design_system_1.Button aria-label="Map layers" className="esri-widget--button size-8 text-[#6e6e6e] -outline-offset-2 outline-[#007ac2] focus:bg-[#f3f3f3]" variant="icon">
          <lucide_react_1.LayersIcon className="block size-8 p-1"/>
        </utah_design_system_1.Button>
        <Popover>
          <react_aria_components_1.Dialog className="outline-none">
            <react_aria_components_1.Header className="font-bold dark:text-white">Base maps</react_aria_components_1.Header>
            <utah_design_system_1.RadioGroup className="mb-2 flex-1" value={selectedRadioBtnLabel} onChange={function (label) {
            setSelectedRadioBtnLabel(label);
            onBasemapChange(label);
        }}>
              {basemaps.map(function (configOrToken) {
            var value = getLabel(configOrToken);
            return (<utah_design_system_1.Radio className="pl-2" value={value} key={value}>
                    {value}
                  </utah_design_system_1.Radio>);
        })}
              {baseLayers.map(function (configOrToken) {
            var value = getLabel(configOrToken);
            return (<utah_design_system_1.Radio className="pl-2" value={value} key={value}>
                    {value}
                  </utah_design_system_1.Radio>);
        })}
            </utah_design_system_1.RadioGroup>
            {referenceAndOperationalConfigsOrTokens.length > 0 && (<>
                <react_aria_components_1.Header className="font-bold dark:text-white">Overlays</react_aria_components_1.Header>
                <utah_design_system_1.CheckboxGroup className="mb-2 flex-1" value={selectedCheckboxLabels} onChange={setSelectedCheckboxLabels}>
                  {referenceAndOperationalConfigsOrTokens.map(function (configOrToken) {
                var label = getLabel(configOrToken);
                return (<utah_design_system_1.Checkbox className="pl-2" value={label} key={label}>
                          {label}
                        </utah_design_system_1.Checkbox>);
            })}
                </utah_design_system_1.CheckboxGroup>
              </>)}
          </react_aria_components_1.Dialog>
        </Popover>
      </react_aria_components_1.DialogTrigger>
    </div>);
}
