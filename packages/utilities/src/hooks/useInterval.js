"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useInterval;
var react_1 = require("react");
function useInterval(func, delay) {
    var handle = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        handle.current = window.setInterval(func, delay);
        return function () {
            if (handle.current !== null) {
                window.clearInterval(handle.current);
            }
        };
    }, [func, delay]);
}
