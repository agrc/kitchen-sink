"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useViewLoading;
var reactiveUtils_1 = require("@arcgis/core/core/reactiveUtils");
var react_1 = require("react");
function useViewLoading(view, debounceDuration) {
    if (debounceDuration === void 0) { debounceDuration = 500; }
    var _a = (0, react_1.useState)(false), isLoading = _a[0], setIsLoading = _a[1];
    var timeoutId = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        if (!view) {
            return;
        }
        (0, reactiveUtils_1.whenOnce)(function () { return view.ready; }).then(function () {
            (0, reactiveUtils_1.watch)(function () { return view.updating; }, function (updating) {
                if (updating && timeoutId.current) {
                    return;
                }
                if (!updating) {
                    if (timeoutId.current) {
                        clearTimeout(timeoutId.current);
                        timeoutId.current = null;
                    }
                    setIsLoading(false);
                }
                else {
                    timeoutId.current = setTimeout(function () {
                        setIsLoading(true);
                        timeoutId.current = null;
                    }, debounceDuration);
                }
            });
        });
    }, [debounceDuration, view]);
    return isLoading;
}
