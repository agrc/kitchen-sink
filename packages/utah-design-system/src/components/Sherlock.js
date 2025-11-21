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
exports.Sherlock = exports.multiProvider = exports.featureServiceProvider = exports.masqueradeProvider = exports.ugrcApiProvider = void 0;
var Graphic_js_1 = require("@arcgis/core/Graphic.js");
var utilities_1 = require("@ugrc/utilities");
var ky_1 = require("ky");
var lodash_es_1 = require("lodash-es");
var lucide_react_1 = require("lucide-react");
var react_aria_components_1 = require("react-aria-components");
var react_stately_1 = require("react-stately");
var tailwind_variants_1 = require("tailwind-variants");
var Field_1 = require("./Field");
var Spinner_1 = require("./Spinner");
var utils_1 = require("./utils");
var yellow = [255, 255, 0];
var polygon = {
    type: 'simple-fill',
    color: [240, 240, 240, 0.5],
    outline: {
        style: 'solid',
        color: __spreadArray(__spreadArray([], yellow, true), [0.5], false),
        width: 2.5,
    },
};
var point = {
    type: 'simple-marker',
    style: 'circle',
    color: __spreadArray(__spreadArray([], yellow, true), [0.5], false),
    size: 10,
};
var defaultSymbols = {
    polygon: polygon,
    extent: polygon,
    polyline: {
        type: 'simple-line',
        style: 'solid',
        color: yellow,
        width: 5,
    },
    point: point,
    multipoint: point,
    mesh: polygon,
};
var inputStyles = (0, tailwind_variants_1.tv)({
    extend: utils_1.focusRing,
    base: 'relative flex rounded-md border border-transparent bg-white py-1.5 shadow ring-1 ring-zinc-900/5 dark:bg-zinc-900',
    variants: {
        isFocused: Field_1.fieldBorderStyles.variants.isFocusWithin,
    },
});
function safeFetch(url, options) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, ky_1.default)(url, options).json()];
                case 1:
                    response = (_a.sent());
                    // handle esri response errors which return a 200 status code
                    if (response.error) {
                        throw new Error("".concat(url, " returned an error: ").concat(response.error.message));
                    }
                    return [2 /*return*/, response];
            }
        });
    });
}
var ugrcApiProvider = function (apiKey, table, field, contextField, options) {
    if (options === void 0) { options = {}; }
    return {
        // @ts-expect-error - TODO: Update this to handle types correctly
        load: function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
            var fields, response, result, uniqueKeys, uniqueFeatures;
            var _c;
            var signal = _b.signal, filterText = _b.filterText, _d = _b.maxResults, maxResults = _d === void 0 ? 10 : _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (((_c = filterText === null || filterText === void 0 ? void 0 : filterText.length) !== null && _c !== void 0 ? _c : 0) < 3) {
                            return [2 /*return*/, { items: [] }];
                        }
                        fields = [field];
                        if (contextField) {
                            fields.push(contextField);
                        }
                        return [4 /*yield*/, (0, utilities_1.search)(apiKey, table, fields, {
                                predicate: "UPPER(".concat(field, ") LIKE UPPER('%").concat(filterText, "%')"),
                                spatialReference: options === null || options === void 0 ? void 0 : options.wkid,
                                attributeStyle: 'input',
                            }, signal)];
                    case 1:
                        response = _e.sent();
                        if (response === null || response === void 0 ? void 0 : response.message) {
                            return [2 /*return*/, { items: [] }];
                        }
                        result = response;
                        result.sort(function (a, b) {
                            // @ts-expect-error - TODO: Update this to handle types correctly
                            if (a.attributes[field] < b.attributes[field]) {
                                return -1;
                                // @ts-expect-error - TODO: Update this to handle types correctly
                            }
                            else if (a.attributes[field] > b.attributes[field]) {
                                return 1;
                            }
                            else if (contextField) {
                                // fields are equal, compare contextField
                                // @ts-expect-error - TODO: Update this to handle types correctly
                                if (a.attributes[contextField] < b.attributes[contextField]) {
                                    return -1;
                                    // @ts-expect-error - TODO: Update this to handle types correctly
                                }
                                else if (a.attributes[contextField] > b.attributes[contextField]) {
                                    return 1;
                                }
                                else {
                                    console.warn('duplicate items found', a, b);
                                    return 0; // both fields and contextFields are equal
                                }
                            }
                            else {
                                console.warn('duplicate items found', a, b);
                                return 0; // both fields and contextFields are equal
                            }
                        });
                        uniqueKeys = new Set();
                        uniqueFeatures = result
                            .filter(function (feature) {
                            var key = "".concat(feature.attributes[field]);
                            if (contextField) {
                                key += "||".concat(feature.attributes[contextField]);
                            }
                            if (!uniqueKeys.has(key)) {
                                uniqueKeys.add(key);
                                return true;
                            }
                            return false;
                        })
                            .map(function (feature) {
                            var key = "".concat(feature.attributes[field]);
                            if (contextField) {
                                key += "||".concat(feature.attributes[contextField]);
                            }
                            var context = null;
                            if (contextField) {
                                context = feature.attributes[contextField];
                            }
                            return {
                                name: feature.attributes[field],
                                context: context,
                                key: key,
                            };
                        });
                        return [2 /*return*/, {
                                items: uniqueFeatures.slice(0, maxResults),
                            }];
                }
            });
        }); },
        getFeature: function (searchValue) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, value, qualifier, searchOptions, response, result;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = searchValue.split('||'), value = _a[0], qualifier = _a[1];
                        searchOptions = __assign(__assign({}, options), { predicate: "UPPER(".concat(field, ") = UPPER('").concat(value, "')"), spatialReference: (_b = options === null || options === void 0 ? void 0 : options.wkid) !== null && _b !== void 0 ? _b : 26912, attributeStyle: 'input' });
                        if (qualifier) {
                            searchOptions.predicate += " AND UPPER(".concat(contextField, ") = UPPER('").concat(qualifier, "')");
                        }
                        return [4 /*yield*/, (0, utilities_1.search)(apiKey, table, [field, 'shape@'], searchOptions)];
                    case 1:
                        response = _c.sent();
                        if (response === null || response === void 0 ? void 0 : response.message) {
                            return [2 /*return*/, { items: [] }];
                        }
                        result = response;
                        return [2 /*return*/, { items: result }];
                }
            });
        }); },
    };
};
exports.ugrcApiProvider = ugrcApiProvider;
var masqueradeProvider = function (url, wkid) {
    return {
        load: function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
            var suggestUrl, responseJson, features;
            var _c;
            var signal = _b.signal, filterText = _b.filterText, _d = _b.maxResults, maxResults = _d === void 0 ? 10 : _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (((_c = filterText === null || filterText === void 0 ? void 0 : filterText.length) !== null && _c !== void 0 ? _c : 0) < 3) {
                            return [2 /*return*/, { items: [] }];
                        }
                        suggestUrl = "".concat(url, "/suggest?text=").concat(filterText, "&maxSuggestions=").concat(maxResults);
                        return [4 /*yield*/, safeFetch(suggestUrl, {
                                signal: signal,
                            })];
                    case 1:
                        responseJson = _e.sent();
                        features = responseJson.suggestions.map(function (suggestion) {
                            return { name: suggestion.text, key: suggestion.magicKey };
                        });
                        return [2 /*return*/, { items: features.slice(0, maxResults) }];
                }
            });
        }); },
        getFeature: function (magicKey) { return __awaiter(void 0, void 0, void 0, function () {
            var getFeatureUrl, responseJson, candidate, graphic;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        getFeatureUrl = "".concat(url, "/findAddressCandidates?magicKey=").concat(magicKey, "&outSR={\"wkid\":").concat(wkid, "}");
                        return [4 /*yield*/, safeFetch(getFeatureUrl)];
                    case 1:
                        responseJson = _a.sent();
                        if (responseJson.candidates.length === 0 || !responseJson.candidates[0]) {
                            return [2 /*return*/, { items: [] }];
                        }
                        candidate = responseJson.candidates[0];
                        graphic = {
                            geometry: __assign(__assign({}, candidate.location), { type: 'point', spatialReference: {
                                    wkid: wkid,
                                }, attributes: __assign(__assign({}, candidate.attributes), { extent: __assign(__assign({}, candidate.extent), { spatialReference: {
                                            wkid: wkid,
                                        } }) }) }),
                        };
                        return [2 /*return*/, { items: [graphic] }];
                }
            });
        }); },
    };
};
exports.masqueradeProvider = masqueradeProvider;
var featureServiceProvider = function (url, searchField, contextField, kyOptions) {
    if (kyOptions === void 0) { kyOptions = {}; }
    var initialized = false;
    var init = function (signal) { return __awaiter(void 0, void 0, void 0, function () {
        var serviceJson, searchFieldValidated, contextFieldValidated, _i, _a, field, fieldsList;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, safeFetch("".concat(url, "?f=json"), __assign({ signal: signal }, kyOptions))];
                case 1:
                    serviceJson = _b.sent();
                    searchFieldValidated = false;
                    contextFieldValidated = false;
                    if (serviceJson.fields === undefined) {
                        throw new Error('No fields found in service');
                    }
                    for (_i = 0, _a = serviceJson.fields; _i < _a.length; _i++) {
                        field = _a[_i];
                        if (field.name === searchField) {
                            if (field.type !== 'esriFieldTypeString') {
                                throw new Error("Field: ".concat(searchField, " must be of type \"esriFieldTypeString\""));
                            }
                            searchFieldValidated = true;
                        }
                        if (contextField && field.name === contextField) {
                            if (field.type !== 'esriFieldTypeString') {
                                throw new Error("Field: ".concat(contextField, " must be of type \"esriFieldTypeString\""));
                            }
                            contextFieldValidated = true;
                        }
                    }
                    fieldsList = serviceJson.fields.map(function (f) { return f.name; }).join(', ');
                    if (!searchFieldValidated) {
                        throw new Error("Field: ".concat(searchField, " not found in service fields: ").concat(fieldsList));
                    }
                    if (contextField && !contextFieldValidated) {
                        throw new Error("Field: ".concat(contextField, " not found in service fields: ").concat(fieldsList));
                    }
                    initialized = true;
                    return [2 /*return*/];
            }
        });
    }); };
    return {
        load: function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
            var searchParams, responseJson, suggestions;
            var _c;
            var signal = _b.signal, filterText = _b.filterText, _d = _b.maxResults, maxResults = _d === void 0 ? 10 : _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!!initialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, init(signal)];
                    case 1:
                        _e.sent();
                        _e.label = 2;
                    case 2:
                        if (((_c = filterText === null || filterText === void 0 ? void 0 : filterText.length) !== null && _c !== void 0 ? _c : 0) < 3) {
                            return [2 /*return*/, { items: [] }];
                        }
                        searchParams = new URLSearchParams({
                            f: 'json',
                            where: "UPPER(".concat(searchField, ") LIKE UPPER('%").concat(filterText, "%')"),
                            outFields: [searchField, contextField].join(','), // trailing commas are ignored in feature service queries
                            returnGeometry: 'false',
                            resultRecordCount: maxResults.toString(),
                            returnDistinctValues: 'true',
                            orderByFields: searchField,
                        });
                        return [4 /*yield*/, safeFetch("".concat(url, "/query?").concat(searchParams.toString()), __assign({ signal: signal }, kyOptions))];
                    case 3:
                        responseJson = _e.sent();
                        suggestions = responseJson.features.map(function (feature) {
                            var where = "".concat(searchField, " = '").concat(feature.attributes[searchField], "'");
                            if (contextField) {
                                where += " AND ".concat(contextField, " = '").concat(feature.attributes[contextField], "'");
                            }
                            return {
                                name: feature.attributes[searchField],
                                context: contextField ? feature.attributes[contextField] : null,
                                key: where,
                            };
                        });
                        return [2 /*return*/, { items: suggestions }];
                }
            });
        }); },
        getFeature: function (key) { return __awaiter(void 0, void 0, void 0, function () {
            var searchParams, responseJson, feature;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        searchParams = new URLSearchParams({
                            f: 'json',
                            where: key,
                            outFields: '*',
                            returnGeometry: 'true',
                            resultRecordCount: '1',
                        });
                        return [4 /*yield*/, safeFetch("".concat(url, "/query?").concat(searchParams.toString()), kyOptions)];
                    case 1:
                        responseJson = _a.sent();
                        if (responseJson.features.length === 0 || !responseJson.features[0]) {
                            return [2 /*return*/, { items: [] }];
                        }
                        feature = __assign(__assign({}, responseJson.features[0]), { geometry: __assign(__assign({}, responseJson.features[0].geometry), { type: {
                                    esriGeometryPolyline: 'polyline',
                                    esriGeometryPoint: 'point',
                                    esriGeometryPolygon: 'polygon',
                                    esriGeometryMultipoint: 'multipoint',
                                    esriGeometryEnvelope: 'extent',
                                    esriGeometryMultiPatch: 'multipatch',
                                }[responseJson.geometryType], spatialReference: responseJson.spatialReference }) });
                        return [2 /*return*/, { items: [feature] }];
                }
            });
        }); },
    };
};
exports.featureServiceProvider = featureServiceProvider;
var multiProvider = function (providers) {
    var separator = '||';
    return {
        // @ts-expect-error - TODO: Update this to handle types correctly
        load: function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
            var promises, results, items;
            var signal = _b.signal, filterText = _b.filterText, _c = _b.maxResults, maxResults = _c === void 0 ? 10 : _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        promises = providers.map(function (provider) {
                            return provider.load({
                                signal: signal,
                                filterText: filterText,
                                maxResults: maxResults,
                                items: [],
                                selectedKeys: new Set(),
                                sortDescriptor: { column: 'name', direction: 'ascending' },
                            });
                        });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        results = _d.sent();
                        items = results.flatMap(function (result, index) {
                            return Array.from(result.items).map(
                            // prepend index to key so that we can look up the provider in getFeature
                            function (item) {
                                item.key = "".concat(index).concat(separator).concat(item.key);
                                return item;
                            });
                        });
                        return [2 /*return*/, { items: items.slice(0, maxResults) }];
                }
            });
        }); },
        getFeature: function (keyValue) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, providerIndex, key, provider, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = keyValue.split(separator), providerIndex = _a[0], key = _a[1];
                        provider = providers[Number(providerIndex)];
                        if (!provider) {
                            throw new Error("Provider not found for keyValue: ".concat(keyValue));
                        }
                        if (!key) {
                            throw new Error("Key not found for keyValue: ".concat(keyValue));
                        }
                        return [4 /*yield*/, provider.getFeature(key)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, response];
                }
            });
        }); },
    };
};
exports.multiProvider = multiProvider;
var Sherlock = function (props) {
    var list = (0, react_stately_1.useAsyncList)({ load: props.provider.load });
    var selectionChanged = function (key) { return __awaiter(void 0, void 0, void 0, function () {
        var response, results, graphics;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (key === null) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, props.provider.getFeature(key.toString())];
                case 1:
                    response = _a.sent();
                    results = response.items;
                    graphics = results.map(function (result) {
                        return new Graphic_js_1.default({
                            geometry: result.geometry,
                            attributes: result.attributes,
                            // @ts-expect-error - TODO: Update this to handle types correctly
                            symbol: result.geometry && defaultSymbols[result.geometry.type],
                        });
                    });
                    if (props.onSherlockMatch) {
                        props.onSherlockMatch(graphics, { list: list });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    if (list.error) {
        // send this to the console since we are displaying a generic error message in the UI
        console.error(list.error);
    }
    return (<react_aria_components_1.ComboBox items={list.items} shouldFocusWrap={true} inputValue={list.filterText} onInputChange={list.setFilterText} allowsEmptyCollection={true} onSelectionChange={selectionChanged} isInvalid={!!list.error}>
      {props.label && <Field_1.Label>{props.label}</Field_1.Label>}
      <div className="group mt-1 grow-[9999] basis-64 rounded-md transition-shadow ease-in-out">
        <react_aria_components_1.Group className={inputStyles}>
          <lucide_react_1.SearchIcon aria-hidden className="pointer-events-none absolute inset-y-0 left-2 h-full w-5 text-zinc-400 group-focus-within:text-primary-900 dark:group-focus-within:text-zinc-300"/>
          <react_aria_components_1.Input placeholder={props.placeholder} onChange={function (event) { return list.setFilterText(event.target.value); }} className="block w-full appearance-none bg-transparent pl-9 pr-3 leading-5 text-zinc-900 caret-primary-800 placeholder:text-zinc-400 focus:outline-none dark:text-white dark:caret-accent-500 dark:ring-zinc-200/20 dark:placeholder:text-zinc-300 dark:focus:ring-accent-700 sm:text-sm"/>
          {(list.loadingState === 'loading' ||
            list.loadingState === 'filtering') && (<span aria-hidden className="pointer-events-none text-zinc-400 group-focus-within:text-primary-900 dark:group-focus-within:text-zinc-300">
              <Spinner_1.Spinner aria-label="searching"/>
            </span>)}
          <react_aria_components_1.Button className="pr-2">
            <lucide_react_1.ChevronsUpDownIcon aria-hidden className="h-full w-5 shrink-0 text-zinc-500 dark:text-zinc-400"/>
          </react_aria_components_1.Button>
        </react_aria_components_1.Group>
      </div>
      {list.error ? (<Field_1.FieldError>There was an error with the search process</Field_1.FieldError>) : (<react_aria_components_1.Popover className="w-[--trigger-width] py-1">
          <react_aria_components_1.ListBox className="group mt-1 grow-[9999] basis-64 overflow-hidden rounded-md border border-transparent bg-white shadow ring-1 ring-zinc-900/5 dark:border-zinc-200/20 dark:bg-zinc-700" renderEmptyState={function () {
                if (list.filterText.length >= 3 && list.loadingState === 'idle') {
                    return (<div className="bg-warning-100 py-2 text-center dark:bg-warning-700">
                    No items found matching your search
                  </div>);
                }
                return (<div className="bg-sky-100 py-2 text-center dark:bg-sky-700">
                  Type 2 or more characters to begin searching
                </div>);
            }}>
            {function (item) { return (<react_aria_components_1.ListBoxItem textValue={item.name} className="relative flex cursor-default select-none items-center justify-between gap-2 rounded px-2 py-1 text-sm outline-none ring-secondary-400 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:bg-zinc-300/50 focus-visible:ring selected:bg-secondary-600 selected:text-white selected:ring-offset-2 dark:text-white dark:ring-offset-zinc-950 dark:hover:bg-zinc-300/20">
                {function (_a) {
                    var isSelected = _a.isSelected;
                    return (<>
                    <span slot="label" className="flex items-center gap-2">
                      {isSelected && <lucide_react_1.CheckIcon className="h-full w-4"/>}
                      <Highlighted className={isSelected ? undefined : 'ml-6'} text={item.name} highlight={list.filterText}/>
                    </span>
                    {item.context && (<span slot="description">{item.context}</span>)}
                  </>);
                }}
              </react_aria_components_1.ListBoxItem>); }}
          </react_aria_components_1.ListBox>
        </react_aria_components_1.Popover>)}
    </react_aria_components_1.ComboBox>);
};
exports.Sherlock = Sherlock;
var Highlighted = function (_a) {
    var _b = _a.text, text = _b === void 0 ? '' : _b, _c = _a.highlight, highlight = _c === void 0 ? '' : _c, className = _a.className;
    if (!highlight.trim()) {
        return <div>{text}</div>;
    }
    var regex = new RegExp("(".concat((0, lodash_es_1.escapeRegExp)(highlight), ")"), 'gi');
    var parts = text.split(regex);
    return (<div className={className}>
      {parts
            .filter(function (part) { return part; })
            .map(function (part, i) {
            return regex.test(part) ? (<mark className="bg-accent-100 dark:bg-accent-700/60 dark:text-white" key={i}>
              {part}
            </mark>) : (<span key={i}>{part}</span>);
        })}
    </div>);
};
