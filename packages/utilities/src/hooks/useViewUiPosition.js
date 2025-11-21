"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useViewUiPosition;
var reactiveUtils_1 = require("@arcgis/core/core/reactiveUtils");
var react_1 = require("react");
function useViewUiPosition(view, position) {
    var me = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        if (!me.current || !view) {
            return;
        }
        (0, reactiveUtils_1.whenOnce)(function () { return view.ready; }).then(function () { return view.ui.add(me.current, position); });
    }, [position, view, me]);
    return me;
}
