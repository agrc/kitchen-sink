"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useMapReady;
var reactiveUtils_1 = require("@arcgis/core/core/reactiveUtils");
var react_1 = require("react");
function useMapReady(view) {
    var _a = (0, react_1.useState)(false), ready = _a[0], setReady = _a[1];
    if (!view) {
        return;
    }
    (0, reactiveUtils_1.whenOnce)(function () { return view.ready; }).then(function () { return setReady(true); });
    return ready;
}
