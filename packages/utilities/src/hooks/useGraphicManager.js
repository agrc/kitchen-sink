"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reactiveUtils_1 = require("@arcgis/core/core/reactiveUtils");
var react_1 = require("react");
var useGraphicManager = function (view) {
    var _a = (0, react_1.useState)(null), graphic = _a[0], setGraphic = _a[1];
    var previousGraphic = (0, react_1.useRef)(null);
    var removeGraphics = (0, react_1.useCallback)(function (graphics) {
        if (!graphics || !view) {
            return;
        }
        if (Array.isArray(graphics)) {
            graphics.forEach(function (x) { return view.graphics.remove(x); });
        }
        else {
            var count = view.graphics.length;
            view.graphics.remove(graphics);
            if (count === view.graphics.length) {
                console.warn('Graphic not found in map view. Is the graphic auto-casted?');
            }
        }
    }, [view]);
    (0, react_1.useEffect)(function () {
        if (!view) {
            return;
        }
        if (previousGraphic.current) {
            removeGraphics(previousGraphic.current);
        }
        previousGraphic.current = graphic;
        if (Array.isArray(graphic)) {
            if (graphic &&
                graphic[0] &&
                graphic[0].declaredClass !== 'esri.Graphic') {
                console.warn('graphic is not an esri.Graphic and will not be removed from the map. Remove any auto-casting of the graphic.');
            }
            (0, reactiveUtils_1.whenOnce)(function () { return view.ready; }).then(function () { return view.graphics.addMany(graphic); });
        }
        else {
            if (graphic && graphic.declaredClass !== 'esri.Graphic') {
                console.warn('graphic is not an esri.Graphic and will not be removed from the map. Remove any auto-casting of the graphic.');
            }
            (0, reactiveUtils_1.whenOnce)(function () { return view.ready; }).then(function () {
                if (graphic) {
                    view.graphics.add(graphic);
                }
            });
        }
    }, [graphic, removeGraphics, view]);
    return { graphic: graphic, setGraphic: setGraphic };
};
exports.default = useGraphicManager;
