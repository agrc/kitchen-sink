"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useWebMap;
var MapView_js_1 = require("@arcgis/core/views/MapView.js");
var WebMap_js_1 = require("@arcgis/core/WebMap.js");
var react_1 = require("react");
function useWebMap(divRef, id) {
    var mapRef = (0, react_1.useRef)(null);
    var viewRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        if (divRef.current) {
            mapRef.current = new WebMap_js_1.default({
                portalItem: {
                    id: id,
                },
            });
            viewRef.current = new MapView_js_1.default({
                container: divRef.current,
                map: mapRef.current,
            });
        }
        return function () {
            var _a, _b;
            (_a = viewRef.current) === null || _a === void 0 ? void 0 : _a.destroy();
            (_b = mapRef.current) === null || _b === void 0 ? void 0 : _b.destroy();
        };
    }, [divRef, id]);
    return { mapRef: mapRef, viewRef: viewRef };
}
