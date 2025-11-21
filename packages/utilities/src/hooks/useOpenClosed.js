"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useOpenClosed;
var react_1 = require("react");
function useOpenClosed(initial) {
    if (initial === void 0) { initial = false; }
    var _a = (0, react_1.useState)(initial), state = _a[0], setState = _a[1];
    var handlers = (0, react_1.useMemo)(function () { return ({
        open: function () {
            setState(true);
        },
        close: function () {
            setState(false);
        },
        toggle: function () {
            setState(function (s) { return !s; });
        },
    }); }, []);
    return [state, handlers];
}
