"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useLocalStorage;
var react_1 = require("react");
function useLocalStorage(key, initialValue, parseWithJSON) {
    if (parseWithJSON === void 0) { parseWithJSON = false; }
    var getValueFromLocalStorage = function () {
        var value = localStorage.getItem(key);
        return parseWithJSON ? JSON.parse(value || 'null') : value;
    };
    var _a = (0, react_1.useState)(function () { var _a; return (_a = getValueFromLocalStorage()) !== null && _a !== void 0 ? _a : initialValue; }), value = _a[0], setValue = _a[1];
    var setNewValue = function (newValue) {
        setValue(newValue);
        localStorage.setItem(key, parseWithJSON
            ? JSON.stringify(newValue)
            : newValue);
    };
    return [value, setNewValue];
}
