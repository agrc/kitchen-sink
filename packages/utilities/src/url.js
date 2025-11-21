"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toQueryString = void 0;
exports.setUrlParameter = setUrlParameter;
exports.getUrlParameter = getUrlParameter;
var toQueryString = function (obj) {
    return Object.keys(obj)
        .filter(function (key) { return obj[key] !== null && obj[key] !== undefined; })
        .map(function (key) {
        return encodeURIComponent(key) +
            '=' +
            encodeURIComponent(obj[key]);
    })
        .join('&')
        .replace(/%20/g, '+');
};
exports.toQueryString = toQueryString;
var LIST_SEPARATOR = '_';
function setUrlParameter(name, value) {
    var url = new URL(window.location.href);
    if (Array.isArray(value)) {
        if (value.length === 0) {
            url.searchParams.delete(name);
        }
        else {
            url.searchParams.set(name, value.join(LIST_SEPARATOR));
        }
    }
    else {
        if (value === null) {
            url.searchParams.delete(name);
        }
        else {
            url.searchParams.set(name, value.toString());
        }
    }
    window.history.replaceState({}, '', url.toString());
}
function getUrlParameter(name, type, defaultValue) {
    var url = new URL(window.location.href);
    var value = url.searchParams.get(name);
    if (value === null || value.trim() === '') {
        if (defaultValue !== undefined) {
            return defaultValue;
        }
        return null;
    }
    if (type === 'boolean') {
        return (value === 'true');
    }
    if (type === 'number[]') {
        return value.split(LIST_SEPARATOR).map(Number);
    }
    if (type === 'number') {
        return Number(value);
    }
    if (type === 'string') {
        return value;
    }
    throw new Error("Unsupported type: ".concat(type));
}
