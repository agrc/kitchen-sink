"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useViewPointZooming;
var reactiveUtils_1 = require("@arcgis/core/core/reactiveUtils");
var react_1 = require("react");
function useViewPointZooming(view) {
    var _a = (0, react_1.useState)(null), viewPoint = _a[0], setViewPoint = _a[1];
    (0, react_1.useEffect)(function () {
        if (!view || !viewPoint) {
            return;
        }
        (0, reactiveUtils_1.whenOnce)(function () { return view.ready; }).then(function () { return view.goTo(viewPoint).catch(function () { }); });
    }, [viewPoint, view]);
    return { viewPoint: viewPoint, setViewPoint: setViewPoint };
}
