"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var useLocalStorage_1 = require("./useLocalStorage");
(0, vitest_1.describe)('useLocalStorage', function () {
    (0, vitest_1.beforeEach)(function () {
        vitest_1.vi.mock('react', function () {
            return {
                useState: function (initialValue) { return [initialValue(), function () { }]; },
            };
        });
    });
    (0, vitest_1.afterEach)(function () {
        vitest_1.vi.restoreAllMocks();
    });
    (0, vitest_1.it)('can parse using JSON', function () {
        var localStorageMock = {
            getItem: vitest_1.vi.fn().mockReturnValue('{"a":1}'),
            setItem: vitest_1.vi.fn(),
        };
        vitest_1.vi.stubGlobal('localStorage', localStorageMock);
        var _a = (0, useLocalStorage_1.default)('key', { a: 1 }, true), value = _a[0], setValue = _a[1];
        (0, vitest_1.expect)(localStorageMock.getItem).toHaveBeenCalledWith('key');
        (0, vitest_1.expect)(value).toEqual({ a: 1 });
        setValue({ a: 2 });
        (0, vitest_1.expect)(localStorageMock.setItem).toHaveBeenCalledWith('key', '{"a":2}');
    });
    (0, vitest_1.it)('returns the initial value if none is in storage', function () {
        var localStorageMock = {
            getItem: vitest_1.vi.fn().mockReturnValue(undefined),
            setItem: vitest_1.vi.fn(),
        };
        vitest_1.vi.stubGlobal('localStorage', localStorageMock);
        var initialValue = 'test value';
        var value = (0, useLocalStorage_1.default)('key', initialValue)[0];
        (0, vitest_1.expect)(value).toEqual(initialValue);
    });
    (0, vitest_1.it)('returns the value from storage if it exists', function () {
        var localStorageValue = 'changed value';
        var localStorageMock = {
            getItem: vitest_1.vi.fn().mockReturnValue(localStorageValue),
            setItem: vitest_1.vi.fn(),
        };
        vitest_1.vi.stubGlobal('localStorage', localStorageMock);
        var initialValue = 'test value';
        var value = (0, useLocalStorage_1.default)('key', initialValue)[0];
        (0, vitest_1.expect)(value).toEqual(localStorageValue);
    });
});
