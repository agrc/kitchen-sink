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
exports.Error = exports.MultiProvider = exports.FeatureServiceProviderWithKyOptions = exports.FeatureServiceProvider = exports.APIProvider = exports.Clear = exports.Example = void 0;
var test_1 = require("storybook/test");
var Sherlock_1 = require("./Sherlock");
var meta = {
    component: Sherlock_1.Sherlock,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        function (Story) { return (<div className="w-96">
        <Story />
      </div>); },
    ],
    argTypes: {},
    args: {
        onSherlockMatch: (0, test_1.fn)(),
    },
};
exports.default = meta;
var url = 'https://masquerade.ugrc.utah.gov/arcgis/rest/services/UtahLocator/GeocodeServer';
var srid = 26912;
exports.Example = {
    args: {
        label: 'Select a location',
        placeholder: 'Search with masquerade',
        provider: (0, Sherlock_1.masqueradeProvider)(url, srid),
    },
};
exports.Clear = {
    args: {
        label: 'Select a location',
        placeholder: 'Search with masquerade',
        provider: (0, Sherlock_1.masqueradeProvider)(url, srid),
        onSherlockMatch: function (_, context) {
            context.list.setFilterText('');
        },
    },
};
exports.APIProvider = {
    args: {
        label: 'Select a place',
        placeholder: 'Search with the UGRC API',
        provider: (0, Sherlock_1.ugrcApiProvider)('ugrc-storybook', 'location.gnis_place_names', 'name', 'county'),
    },
};
exports.FeatureServiceProvider = {
    args: {
        label: 'Select a road',
        placeholder: 'Search the roads map service',
        provider: (0, Sherlock_1.featureServiceProvider)('https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahRoads/FeatureServer/0', 'FULLNAME', 'COUNTY_L'),
    },
};
exports.FeatureServiceProviderWithKyOptions = {
    args: {
        label: 'Select a road',
        placeholder: 'Search the roads map service',
        provider: (0, Sherlock_1.featureServiceProvider)('https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahRoads/FeatureServer/0', 'FULLNAME', 'COUNTY_L', {
            hooks: {
                beforeRequest: [
                    function (request) { return __awaiter(void 0, void 0, void 0, function () {
                        var _a, _b, _c;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    _b = (_a = request.headers).set;
                                    _c = [
                                        // must use a CORS-safelisted request header or the request will fail
                                        'Accept-Language'];
                                    return [4 /*yield*/, new Promise(function (resolve) {
                                            return setTimeout(function () { return resolve('es'); }, 10);
                                        })];
                                case 1:
                                    _b.apply(_a, _c.concat([_d.sent()]));
                                    return [2 /*return*/];
                            }
                        });
                    }); },
                ],
            },
        }),
    },
};
exports.MultiProvider = {
    args: {
        label: 'Select a location',
        placeholder: 'Search the roads map service and masquerade',
        provider: (0, Sherlock_1.multiProvider)([
            (0, Sherlock_1.featureServiceProvider)('https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahRoads/FeatureServer/0', 'FULLNAME', 'COUNTY_L'),
            (0, Sherlock_1.masqueradeProvider)(url, srid),
        ]),
    },
};
exports.Error = {
    args: {
        label: 'Select a road',
        placeholder: 'Search the roads map service',
        provider: (0, Sherlock_1.featureServiceProvider)('https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahRoads/FeatureServer/0', 'BAD_FIELD'),
    },
};
