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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGeocoding = exports.Geocode = void 0;
var utilities_1 = require("@ugrc/utilities");
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var react_aria_components_1 = require("react-aria-components");
var Button_1 = require("./Button");
var Spinner_1 = require("./Spinner");
var TextField_1 = require("./TextField");
var ADDRESS_TYPE = 'single-address';
var defaultProps = {
    type: ADDRESS_TYPE,
    address: {
        acceptScore: 70,
        suggest: 0,
        locators: 'all',
        poBox: false,
        scoreDifference: false,
    },
    milepost: {
        side: 'increasing',
        fullRoute: false,
    },
    wkid: 3857,
    callback: undefined,
    format: undefined,
    pointSymbol: {
        style: 'diamond',
        color: [255, 0, 0, 0.5],
    },
    events: {
        success: console.log,
        error: console.error,
    },
};
var sanitize = function (attributes) {
    if (attributes === void 0) { attributes = {}; }
    var customProps = ['beforeClick', 'beforeKeyUp'];
    return Object.keys(attributes)
        .filter(function (key) { return customProps.indexOf(key) === -1; })
        .reduce(function (result, key) { return ((result[key] = attributes[key]),
        result); }, {});
};
var Geocode = function (props) {
    var _a = useGeocoding(props), getFirstFieldProps = _a.getFirstFieldProps, getSecondFieldProps = _a.getSecondFieldProps, getButtonProps = _a.getButtonProps, found = _a.found, status = _a.status;
    return (<react_aria_components_1.Group className="grid gap-4" aria-label="Geocoding component">
      <TextField_1.TextField {...getFirstFieldProps()}/>
      <TextField_1.TextField {...getSecondFieldProps()}/>
      <div>
        <Button_1.Button {...getButtonProps()}>
          {(function () {
            if (status === 'idle') {
                return 'Find';
            }
            else if (status === 'pending') {
                return (<span className="flex items-center gap-2">
                  <span className="size-4">
                    <Spinner_1.Spinner />
                  </span>
                  <span>Geocoding</span>
                </span>);
            }
            else if (status === 'error') {
                return (<span className="flex items-center gap-2">
                  <lucide_react_1.TriangleAlertIcon className="h-full w-4"/>
                  <span>Error</span>
                </span>);
            }
            else if (status === 'success' && !found) {
                return <span>No match</span>;
            }
            else {
                return (<span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="18" height="18">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                  </svg>
                  <span>Match found</span>
                </span>);
            }
        })()}
        </Button_1.Button>
      </div>
    </react_aria_components_1.Group>);
};
exports.Geocode = Geocode;
var useGeocoding = function (userProps) {
    var props = __assign(__assign({}, defaultProps), userProps);
    var _a = (0, react_1.useState)(''), firstInput = _a[0], setFirstInput = _a[1];
    var _b = (0, react_1.useState)(''), secondInput = _b[0], setSecondInput = _b[1];
    var _c = (0, react_1.useState)(true), firstIsValid = _c[0], setFirstIsValid = _c[1];
    var _d = (0, react_1.useState)(true), secondIsValid = _d[0], setSecondIsValid = _d[1];
    var _e = (0, react_1.useState)('idle'), status = _e[0], setStatus = _e[1];
    var _f = (0, react_1.useState)(undefined), found = _f[0], setFound = _f[1];
    var baseUrl = 'https://api.mapserv.utah.gov/api/v1/geocode';
    if (props.type !== ADDRESS_TYPE) {
        baseUrl += '/milepost';
    }
    var getFirstFieldProps = function (inputProps) { return (__assign({ label: props.type === ADDRESS_TYPE ? 'Street address' : 'Route', errorMessage: props.type === ADDRESS_TYPE
            ? 'A street address is required'
            : 'A highway route number is required', isRequired: true, isInvalid: !firstIsValid, onChange: function (data) {
            setStatus('idle');
            setFirstInput(data);
        }, name: props.type === ADDRESS_TYPE
            ? 'dartboard_street_input'
            : 'dartboard_milepost_input', onKeyUp: function (e) {
            inputProps === null || inputProps === void 0 ? void 0 : inputProps.beforeKeyUp(e);
            handleKeyUp(e);
        }, autoComplete: 'off' }, sanitize(inputProps))); };
    var getSecondFieldProps = function (inputProps) { return (__assign({ label: props.type === ADDRESS_TYPE ? 'City or Zip code' : 'Milepost', errorMessage: props.type === ADDRESS_TYPE
            ? 'A city or zip code is required'
            : 'A milepost number is required', isRequired: true, isInvalid: !secondIsValid, onChange: function (data) {
            setStatus('idle');
            setSecondInput(data);
        }, name: props.type === ADDRESS_TYPE
            ? 'dartboard_zone_input'
            : 'dartboard_route_input', onKeyUp: function (e) {
            inputProps === null || inputProps === void 0 ? void 0 : inputProps.beforeKeyUp(e);
            handleKeyUp(e);
        }, autoComplete: 'off' }, sanitize(inputProps))); };
    var getButtonProps = function (buttonProps) { return (__assign({ onPress: function (e) {
            buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.beforeClick(e);
            find();
        }, type: 'button', variant: 'secondary', isDisabled: status === 'pending' }, sanitize(buttonProps))); };
    var validate = (0, react_1.useCallback)(function () {
        var _a, _b;
        var firstValidity = ((_a = firstInput === null || firstInput === void 0 ? void 0 : firstInput.trim()) !== null && _a !== void 0 ? _a : '').length > 0;
        var secondValidity = ((_b = secondInput === null || secondInput === void 0 ? void 0 : secondInput.trim()) !== null && _b !== void 0 ? _b : '').length > 0;
        setFirstIsValid(firstValidity);
        setSecondIsValid(secondValidity);
        // reset not found message
        setFound(undefined);
        setStatus('idle');
        return firstValidity && secondValidity;
    }, [firstInput, secondInput]);
    var get = (0, react_1.useCallback)(function (options) { return __awaiter(void 0, void 0, void 0, function () {
        var url, query, querystring;
        return __generator(this, function (_a) {
            url = "".concat(baseUrl, "/").concat(options.firstInput, "/").concat(options.secondInput, "?");
            query = {
                apiKey: props.apiKey,
                spatialReference: props.wkid,
                format: props.format,
                callback: props.callback,
            };
            if (props.type === ADDRESS_TYPE) {
                query = __assign(__assign({}, props.address), query);
            }
            else {
                query = __assign(__assign({}, props.milepost), query);
            }
            querystring = (0, utilities_1.toQueryString)(query);
            return [2 /*return*/, Spinner_1.Spinner.minDelay(fetch(url + querystring, {
                    method: 'GET',
                    mode: 'cors',
                }), 500)];
        });
    }); }, [
        props.apiKey,
        props.wkid,
        props.address,
        props.milepost,
        props.type,
        props.format,
        props.callback,
        baseUrl,
    ]);
    var outputTransform = (0, react_1.useCallback)(function (result, point) {
        var attributes = {
            address: result.inputAddress,
            addressSystem: result.addressGrid,
            locator: result.locator === 'AddressPoints.AddressGrid'
                ? 'address point'
                : 'road centerline',
            score: result.score,
            matchAddress: result.matchAddress,
        };
        var popupTemplate = {
            title: 'UGRC API geocoding match',
            content: 'The input address <strong>{address}</strong> matched against <strong>{matchAddress}</strong> using {locator} data.<br><br>The confidence score is {score}.<br><br>This address belongs to the {addressSystem} address system.',
            overwriteActions: true,
        };
        if (props.type !== ADDRESS_TYPE) {
            attributes = {
                matchRoute: result.matchRoute,
            };
            popupTemplate = {
                title: '{matchRoute}',
            };
        }
        return {
            geometry: point,
            symbol: props.pointSymbol,
            attributes: attributes,
            popupTemplate: popupTemplate,
        };
    }, [props.pointSymbol, props.type]);
    var extractResponse = (0, react_1.useCallback)(function (response) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, result, point;
        var _d, _e, _f, _g, _h, _j, _k, _l;
        return __generator(this, function (_m) {
            switch (_m.label) {
                case 0:
                    if (!!response.ok) return [3 /*break*/, 4];
                    setFound(false);
                    if (response.status !== 404) {
                        setStatus('error');
                    }
                    else {
                        setStatus('success');
                    }
                    if (!((_d = props.events) === null || _d === void 0)) return [3 /*break*/, 1];
                    _a = void 0;
                    return [3 /*break*/, 3];
                case 1:
                    _c = (_b = _d).error;
                    return [4 /*yield*/, response.json()];
                case 2:
                    _a = _c.apply(_b, [_m.sent()]);
                    _m.label = 3;
                case 3: return [2 /*return*/, _a];
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    result = _m.sent();
                    if (result.status !== 200) {
                        setFound(false);
                        return [2 /*return*/, (_e = props.events) === null || _e === void 0 ? void 0 : _e.error(result)];
                    }
                    setFound(true);
                    result = result.result;
                    if (((_f = props.format) === null || _f === void 0 ? void 0 : _f.toLowerCase()) === 'geojson') {
                        return [2 /*return*/, result];
                    }
                    point = {
                        type: 'point',
                        x: (_g = result === null || result === void 0 ? void 0 : result.location) === null || _g === void 0 ? void 0 : _g.x,
                        y: (_h = result === null || result === void 0 ? void 0 : result.location) === null || _h === void 0 ? void 0 : _h.y,
                        spatialReference: {
                            wkid: props.wkid,
                        },
                    };
                    if (((_j = props.format) === null || _j === void 0 ? void 0 : _j.toLowerCase()) === 'esrijson') {
                        point.x = (_k = result === null || result === void 0 ? void 0 : result.geometry) === null || _k === void 0 ? void 0 : _k.x;
                        point.y = (_l = result === null || result === void 0 ? void 0 : result.geometry) === null || _l === void 0 ? void 0 : _l.y;
                    }
                    return [2 /*return*/, outputTransform(result, point)];
            }
        });
    }); }, [outputTransform, props.wkid, props.format, props.events]);
    var find = (0, react_1.useCallback)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, err_1, location;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!validate()) {
                        return [2 /*return*/, false];
                    }
                    setStatus('pending');
                    setFound(undefined);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, get({
                            firstInput: firstInput,
                            secondInput: secondInput,
                        })];
                case 2:
                    response = _c.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _c.sent();
                    setStatus('error');
                    setFound(false);
                    return [2 /*return*/, (_a = props.events) === null || _a === void 0 ? void 0 : _a.error((response === null || response === void 0 ? void 0 : response.text()) || {
                            message: err_1 === null || err_1 === void 0 ? void 0 : err_1.message,
                            status: 400,
                        })];
                case 4: return [4 /*yield*/, extractResponse(response)];
                case 5:
                    location = _c.sent();
                    if (location) {
                        setStatus('success');
                        return [2 /*return*/, (_b = props.events) === null || _b === void 0 ? void 0 : _b.success(location)];
                    }
                    return [2 /*return*/];
            }
        });
    }); }, [firstInput, secondInput, validate, props.events, get, extractResponse]);
    var handleKeyUp = (0, react_1.useCallback)(function (event) {
        if (event.key !== 'Enter') {
            return;
        }
        find();
    }, [find]);
    return {
        // prop getters
        getFirstFieldProps: getFirstFieldProps,
        getSecondFieldProps: getSecondFieldProps,
        getButtonProps: getButtonProps,
        // actions
        setFirstIsValid: setFirstIsValid,
        setSecondIsValid: setSecondIsValid,
        setFound: setFound,
        // state
        isSecondInputValid: secondIsValid,
        isFirstInputValid: firstIsValid,
        found: found,
        firstInput: firstInput,
        secondInput: secondInput,
        status: status,
    };
};
exports.useGeocoding = useGeocoding;
