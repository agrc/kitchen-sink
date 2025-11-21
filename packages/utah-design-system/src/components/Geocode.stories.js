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
exports.NoMatchFound = exports.InvalidApiKey = exports.SuccessfulRequest = exports.Milepost = exports.Example = void 0;
var msw_1 = require("msw");
var test_1 = require("storybook/test");
var Geocode_js_1 = require("./Geocode.js");
var meta = {
    component: Geocode_js_1.Geocode,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        format: {
            control: {
                type: 'select',
                options: ['', 'geojson', 'esrijson'],
            },
        },
        type: {
            control: {
                type: 'select',
                options: ['single-address', 'route-milepost'],
            },
        },
    },
    args: {
        apiKey: 'ugrc-storybook',
        events: {
            success: (0, test_1.fn)(),
            error: (0, test_1.fn)(),
        },
        wkid: 26912,
    },
};
exports.default = meta;
exports.Example = {};
exports.Milepost = {
    args: { type: 'route-milepost' },
};
var geocode = function (canvas, step) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, step('Enter address', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, test_1.userEvent.type(canvas.getByLabelText('Street address'), '480 N STATE ST')];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, test_1.userEvent.type(canvas.getByLabelText('City or Zip code'), 'slc')];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })];
            case 1:
                _a.sent();
                return [4 /*yield*/, step('Geocode address', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, test_1.userEvent.click(canvas.getByRole('button'))];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.SuccessfulRequest = {
    parameters: {
        msw: {
            handlers: [
                msw_1.http.get('https://api.mapserv.utah.gov/api/v1/geocode/*', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, new msw_1.HttpResponse(JSON.stringify({
                                result: {
                                    location: {
                                        x: -12455321.74755778,
                                        y: 4979830.905009897,
                                    },
                                    score: 100,
                                    locator: 'Centerlines.StatewideRoads',
                                    matchAddress: '480 N STATE ST, SALT LAKE CITY',
                                    inputAddress: '480 N STATE ST, slc',
                                    standardizedAddress: '480 north state street',
                                    addressGrid: 'SALT LAKE CITY',
                                },
                                status: 200,
                            }), {
                                status: 200,
                            })];
                    });
                }); }),
            ],
        },
    },
    play: function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var canvas, button;
        var canvasElement = _b.canvasElement, step = _b.step;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    canvas = (0, test_1.within)(canvasElement);
                    return [4 /*yield*/, geocode(canvas, step)];
                case 1:
                    _c.sent();
                    button = canvas.getByRole('button');
                    return [4 /*yield*/, (0, test_1.waitFor)(function () {
                            if (button.disabled) {
                                throw new Error('Button is still disabled');
                            }
                        }, { timeout: 5000 })];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, (0, test_1.expect)(canvas.getByText('Match found', {})).toBeInTheDocument()];
                case 3:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    }); },
};
exports.InvalidApiKey = {
    parameters: {
        msw: {
            handlers: [
                msw_1.http.get('https://api.mapserv.utah.gov/api/v1/geocode/*', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, new msw_1.HttpResponse(JSON.stringify({
                                status: 400,
                                message: 'Your API key does match the pattern created in the self service website.',
                            }), {
                                status: 400,
                            })];
                    });
                }); }),
            ],
        },
    },
    play: function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var canvas, button;
        var canvasElement = _b.canvasElement, step = _b.step;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    canvas = (0, test_1.within)(canvasElement);
                    return [4 /*yield*/, geocode(canvas, step)];
                case 1:
                    _c.sent();
                    button = canvas.getByRole('button');
                    return [4 /*yield*/, (0, test_1.waitFor)(function () {
                            if (button.disabled) {
                                throw new Error('Button is still disabled');
                            }
                        }, { timeout: 5000 })];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, (0, test_1.expect)(canvas.getByText('Error', {})).toBeInTheDocument()];
                case 3:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    }); },
};
exports.NoMatchFound = {
    parameters: {
        msw: {
            handlers: [
                msw_1.http.get('https://api.mapserv.utah.gov/api/v1/geocode/*', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, new msw_1.HttpResponse(JSON.stringify({
                                status: 404,
                                message: 'No address candidates found with a score of 70 or better.',
                            }), {
                                status: 404,
                            })];
                    });
                }); }),
            ],
        },
    },
    play: function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var canvas, button;
        var canvasElement = _b.canvasElement, step = _b.step;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    canvas = (0, test_1.within)(canvasElement);
                    return [4 /*yield*/, geocode(canvas, step)];
                case 1:
                    _c.sent();
                    button = canvas.getByRole('button');
                    return [4 /*yield*/, (0, test_1.waitFor)(function () {
                            if (button.disabled) {
                                throw new Error('Button is still disabled');
                            }
                        }, { timeout: 5000 })];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, (0, test_1.expect)(canvas.getByText('No match', {})).toBeInTheDocument()];
                case 3:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    }); },
};
