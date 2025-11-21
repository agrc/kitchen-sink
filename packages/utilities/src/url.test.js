"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var url_1 = require("./url");
(0, vitest_1.describe)('toQueryString', function () {
    (0, vitest_1.it)('should not include null and undefined values in the query string', function () {
        var params = {
            name: 'John',
            age: null,
            city: undefined,
            country: 'USA',
        };
        var queryString = (0, url_1.toQueryString)(params);
        (0, vitest_1.expect)(queryString).toBe('name=John&country=USA');
    });
});
/**
 * Tests for UrlParameters module
 *
 * This module manages URL search parameters for the application.
 * - Supports string, number, boolean, and number array parameter types
 * - Uses underscore (_) as separator for number arrays
 * - Supports decimal numbers and negative numbers in arrays
 */
// Mock window.location and window.history
var mockReplaceState = vitest_1.vi.fn();
var mockLocation = {
    href: 'https://example.com/',
};
Object.defineProperty(window, 'location', {
    value: mockLocation,
    writable: true,
});
Object.defineProperty(window, 'history', {
    value: {
        replaceState: mockReplaceState,
    },
    writable: true,
});
(0, vitest_1.describe)('UrlParameters', function () {
    (0, vitest_1.beforeEach)(function () {
        // Reset mocks before each test
        vitest_1.vi.clearAllMocks();
        mockLocation.href = 'https://example.com/';
    });
    (0, vitest_1.describe)('setUrlParameter', function () {
        (0, vitest_1.it)('should set a string parameter', function () {
            (0, url_1.setUrlParameter)('basemap', 'satellite');
            (0, vitest_1.expect)(mockReplaceState).toHaveBeenCalledWith({}, '', 'https://example.com/?basemap=satellite');
        });
        (0, vitest_1.it)('should set a number parameter', function () {
            (0, url_1.setUrlParameter)('scale', 1000);
            (0, vitest_1.expect)(mockReplaceState).toHaveBeenCalledWith({}, '', 'https://example.com/?scale=1000');
        });
        (0, vitest_1.it)('should set a boolean parameter', function () {
            (0, url_1.setUrlParameter)('center', true);
            (0, vitest_1.expect)(mockReplaceState).toHaveBeenCalledWith({}, '', 'https://example.com/?center=true');
        });
        (0, vitest_1.it)('should set an array parameter with underscore separator', function () {
            (0, url_1.setUrlParameter)('center', [40, -111]);
            (0, vitest_1.expect)(mockReplaceState).toHaveBeenCalledWith({}, '', 'https://example.com/?center=40_-111');
        });
        (0, vitest_1.it)('should replace existing parameter', function () {
            mockLocation.href = 'https://example.com/?basemap=streets';
            (0, url_1.setUrlParameter)('basemap', 'satellite');
            (0, vitest_1.expect)(mockReplaceState).toHaveBeenCalledWith({}, '', 'https://example.com/?basemap=satellite');
        });
        (0, vitest_1.it)('should preserve existing parameters when adding new ones', function () {
            mockLocation.href = 'https://example.com/?existing=value';
            (0, url_1.setUrlParameter)('basemap', 'satellite');
            (0, vitest_1.expect)(mockReplaceState).toHaveBeenCalledWith({}, '', 'https://example.com/?existing=value&basemap=satellite');
        });
        (0, vitest_1.it)('should handle empty array parameter', function () {
            (0, url_1.setUrlParameter)('center', []);
            (0, vitest_1.expect)(mockReplaceState).toHaveBeenCalledWith({}, '', 'https://example.com/');
        });
        (0, vitest_1.it)('should remove parameter when set to null', function () {
            mockLocation.href = 'https://example.com/?basemap=satellite';
            (0, url_1.setUrlParameter)('basemap', null);
            (0, vitest_1.expect)(mockReplaceState).toHaveBeenCalledWith({}, '', 'https://example.com/');
        });
    });
    (0, vitest_1.describe)('getUrlParameter', function () {
        (0, vitest_1.describe)('string parameters', function () {
            (0, vitest_1.it)('should get a string parameter', function () {
                mockLocation.href = 'https://example.com/?basemap=satellite';
                var result = (0, url_1.getUrlParameter)('basemap', 'string');
                (0, vitest_1.expect)(result).toBe('satellite');
            });
            (0, vitest_1.it)('should return null for missing string parameter', function () {
                mockLocation.href = 'https://example.com/';
                var result = (0, url_1.getUrlParameter)('basemap', 'string');
                (0, vitest_1.expect)(result).toBeNull();
            });
            (0, vitest_1.it)('should return default value for missing string parameter', function () {
                mockLocation.href = 'https://example.com/';
                var result = (0, url_1.getUrlParameter)('basemap', 'string', 'streets');
                (0, vitest_1.expect)(result).toBe('streets');
            });
        });
        (0, vitest_1.describe)('boolean parameters', function () {
            (0, vitest_1.it)('should get true boolean parameter', function () {
                mockLocation.href = 'https://example.com/?center=true';
                var result = (0, url_1.getUrlParameter)('center', 'boolean');
                (0, vitest_1.expect)(result).toBe(true);
            });
            (0, vitest_1.it)('should get false boolean parameter', function () {
                mockLocation.href = 'https://example.com/?center=false';
                var result = (0, url_1.getUrlParameter)('center', 'boolean');
                (0, vitest_1.expect)(result).toBe(false);
            });
            (0, vitest_1.it)('should return false for non-true string', function () {
                mockLocation.href = 'https://example.com/?center=maybe';
                var result = (0, url_1.getUrlParameter)('center', 'boolean');
                (0, vitest_1.expect)(result).toBe(false);
            });
            (0, vitest_1.it)('should return null for missing boolean parameter', function () {
                mockLocation.href = 'https://example.com/';
                var result = (0, url_1.getUrlParameter)('center', 'boolean');
                (0, vitest_1.expect)(result).toBeNull();
            });
            (0, vitest_1.it)('should return default value for missing boolean parameter', function () {
                mockLocation.href = 'https://example.com/';
                var result = (0, url_1.getUrlParameter)('center', 'boolean', true);
                (0, vitest_1.expect)(result).toBe(true);
            });
        });
        (0, vitest_1.describe)('number parameters', function () {
            (0, vitest_1.it)('should get a number parameter', function () {
                mockLocation.href = 'https://example.com/?scale=1000';
                var result = (0, url_1.getUrlParameter)('scale', 'number');
                (0, vitest_1.expect)(result).toBe(1000);
            });
            (0, vitest_1.it)('should get a decimal number parameter', function () {
                mockLocation.href = 'https://example.com/?scale=1000.5';
                var result = (0, url_1.getUrlParameter)('scale', 'number');
                (0, vitest_1.expect)(result).toBe(1000.5);
            });
            (0, vitest_1.it)('should return null for missing number parameter', function () {
                mockLocation.href = 'https://example.com/';
                var result = (0, url_1.getUrlParameter)('scale', 'number');
                (0, vitest_1.expect)(result).toBeNull();
            });
            (0, vitest_1.it)('should return default value for missing number parameter', function () {
                mockLocation.href = 'https://example.com/';
                var result = (0, url_1.getUrlParameter)('scale', 'number', 5000);
                (0, vitest_1.expect)(result).toBe(5000);
            });
            (0, vitest_1.it)('should handle NaN for invalid number string', function () {
                mockLocation.href = 'https://example.com/?scale=invalid';
                var result = (0, url_1.getUrlParameter)('scale', 'number');
                (0, vitest_1.expect)(result).toBeNaN();
            });
        });
        (0, vitest_1.describe)('number array parameters', function () {
            (0, vitest_1.it)('should get a number array parameter', function () {
                mockLocation.href = 'https://example.com/?center=40_-111';
                var result = (0, url_1.getUrlParameter)('center', 'number[]');
                (0, vitest_1.expect)(result).toEqual([40, -111]);
            });
            (0, vitest_1.it)('should get a single number array parameter', function () {
                mockLocation.href = 'https://example.com/?center=1000';
                var result = (0, url_1.getUrlParameter)('center', 'number[]');
                (0, vitest_1.expect)(result).toEqual([1000]);
            });
            (0, vitest_1.it)('should return null for missing number array parameter', function () {
                mockLocation.href = 'https://example.com/';
                var result = (0, url_1.getUrlParameter)('center', 'number[]');
                (0, vitest_1.expect)(result).toBeNull();
            });
            (0, vitest_1.it)('should return default value for missing number array parameter', function () {
                mockLocation.href = 'https://example.com/';
                var result = (0, url_1.getUrlParameter)('center', 'number[]', [0, 0]);
                (0, vitest_1.expect)(result).toEqual([0, 0]);
            });
            (0, vitest_1.it)('should handle empty string as null', function () {
                mockLocation.href = 'https://example.com/?center=';
                var result = (0, url_1.getUrlParameter)('center', 'number[]');
                (0, vitest_1.expect)(result).toBeNull();
            });
            (0, vitest_1.it)('should handle mixed valid and invalid numbers', function () {
                mockLocation.href = 'https://example.com/?center=40_invalid_-111';
                var result = (0, url_1.getUrlParameter)('center', 'number[]');
                (0, vitest_1.expect)(result).toEqual([40, NaN, -111]);
            });
            (0, vitest_1.it)('should handle three or more numbers', function () {
                mockLocation.href = 'https://example.com/?center=1_2_3_4_5';
                var result = (0, url_1.getUrlParameter)('center', 'number[]');
                (0, vitest_1.expect)(result).toEqual([1, 2, 3, 4, 5]);
            });
            (0, vitest_1.it)('should support decimal numbers and negative numbers in arrays', function () {
                // Underscores work great for both decimal and negative numbers
                mockLocation.href = 'https://example.com/?center=40.5_-111.2';
                var result = (0, url_1.getUrlParameter)('center', 'number[]');
                (0, vitest_1.expect)(result).toEqual([40.5, -111.2]);
            });
        });
        (0, vitest_1.describe)('edge cases', function () {
            (0, vitest_1.it)('should handle URL with fragment', function () {
                mockLocation.href = 'https://example.com/?basemap=satellite#section';
                var result = (0, url_1.getUrlParameter)('basemap', 'string');
                (0, vitest_1.expect)(result).toBe('satellite');
            });
            (0, vitest_1.it)('should handle URL with multiple parameters', function () {
                mockLocation.href =
                    'https://example.com/?basemap=satellite&scale=1000&center=40_-111';
                (0, vitest_1.expect)((0, url_1.getUrlParameter)('basemap', 'string')).toBe('satellite');
                (0, vitest_1.expect)((0, url_1.getUrlParameter)('scale', 'number')).toBe(1000);
                (0, vitest_1.expect)((0, url_1.getUrlParameter)('center', 'number[]')).toEqual([40, -111]);
            });
            (0, vitest_1.it)('should handle encoded URL parameters', function () {
                mockLocation.href = 'https://example.com/?basemap=my%20map';
                var result = (0, url_1.getUrlParameter)('basemap', 'string');
                (0, vitest_1.expect)(result).toBe('my map');
            });
            (0, vitest_1.it)('should handle parameter with no value', function () {
                mockLocation.href = 'https://example.com/?basemap';
                var result = (0, url_1.getUrlParameter)('basemap', 'string');
                (0, vitest_1.expect)(result).toBeNull();
            });
            (0, vitest_1.it)('should handle null without default value', function () {
                mockLocation.href = 'https://example.com';
                var result = (0, url_1.getUrlParameter)('basemap', 'string');
                (0, vitest_1.expect)(result).toBeNull();
            });
            (0, vitest_1.it)('should throw error for unsupported type', function () {
                mockLocation.href = 'https://example.com/?basemap=123';
                // cast to any so TypeScript allows an unsupported literal for runtime error testing
                (0, vitest_1.expect)(function () {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    return (0, url_1.getUrlParameter)('basemap', 'unsupported');
                }).toThrowError('Unsupported type: unsupported');
            });
        });
    });
    (0, vitest_1.describe)('integration scenarios', function () {
        (0, vitest_1.it)('should work with set then get string parameter', function () {
            (0, url_1.setUrlParameter)('basemap', 'satellite');
            // Mock the URL that would result from setUrlParameter
            mockLocation.href = 'https://example.com/?basemap=satellite';
            var result = (0, url_1.getUrlParameter)('basemap', 'string');
            (0, vitest_1.expect)(result).toBe('satellite');
        });
        (0, vitest_1.it)('should work with set then get number array parameter', function () {
            var coordinates = [40, -111];
            (0, url_1.setUrlParameter)('center', coordinates);
            // Mock the URL that would result from setUrlParameter
            mockLocation.href = 'https://example.com/?center=40_-111';
            var result = (0, url_1.getUrlParameter)('center', 'number[]');
            (0, vitest_1.expect)(result).toEqual(coordinates);
        });
        (0, vitest_1.it)('should work with set then get boolean parameter', function () {
            (0, url_1.setUrlParameter)('center', true);
            // Mock the URL that would result from setUrlParameter
            mockLocation.href = 'https://example.com/?center=true';
            var result = (0, url_1.getUrlParameter)('center', 'boolean');
            (0, vitest_1.expect)(result).toBe(true);
        });
        (0, vitest_1.it)('should work with set then get number parameter', function () {
            (0, url_1.setUrlParameter)('scale', 1000);
            // Mock the URL that would result from setUrlParameter
            mockLocation.href = 'https://example.com/?scale=1000';
            var result = (0, url_1.getUrlParameter)('scale', 'number');
            (0, vitest_1.expect)(result).toBe(1000);
        });
    });
});
