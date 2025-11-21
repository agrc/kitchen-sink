"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDefaultExtent = exports.utahMercatorExtent = void 0;
var reactiveUtils_1 = require("@arcgis/core/core/reactiveUtils");
var Extent_1 = require("@arcgis/core/geometry/Extent");
var react_1 = require("react");
exports.utahMercatorExtent = new Extent_1.default({
    xmax: -12612006,
    xmin: -12246370,
    ymax: 5125456,
    ymin: 4473357,
    spatialReference: { wkid: 3857 },
});
var useDefaultExtent = function (view, initialExtent) {
    if (initialExtent === void 0) { initialExtent = exports.utahMercatorExtent; }
    var defaultExtent = (0, react_1.useState)(initialExtent)[0];
    var goHome = function (extent) {
        if (extent === void 0) { extent = defaultExtent; }
        if (!view) {
            return;
        }
        (0, reactiveUtils_1.whenOnce)(function () { return view.ready; })
            .then(function () { return view.goTo(extent); })
            .catch(function (error) {
            console.error('Failed to navigate to the extent:', error);
        });
    };
    return goHome;
};
exports.useDefaultExtent = useDefaultExtent;
