"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_react_1 = require("@vitejs/plugin-react");
var path_1 = require("path");
var read_pkg_1 = require("read-pkg");
var config_1 = require("vitest/config");
var directory = process.cwd();
var packageName = (0, path_1.basename)(directory);
var packageJson = await (0, read_pkg_1.readPackage)({ cwd: directory });
var rollupOptions = {
    external: __spreadArray(__spreadArray(__spreadArray([], Object.keys((_a = packageJson === null || packageJson === void 0 ? void 0 : packageJson.dependencies) !== null && _a !== void 0 ? _a : {}), true), Object.keys((_b = packageJson === null || packageJson === void 0 ? void 0 : packageJson.peerDependencies) !== null && _b !== void 0 ? _b : {}), true), [
        /@arcgis\/core\/.*/,
        'react/jsx-runtime',
        /@firebase\/.*/,
        /firebase\/.*/,
    ], false),
    output: {
        globals: {
            react: 'React',
            tailwindcss: 'tailwindcss',
        },
    },
};
if (packageName === 'utilities') {
    rollupOptions.input = {
        main: (0, path_1.resolve)(directory, 'src/index.js'),
        hooks: (0, path_1.resolve)(directory, 'src/hooks/index.js'),
    };
}
var config = (0, config_1.defineConfig)({
    plugins: [(0, plugin_react_1.default)()],
    build: {
        lib: {
            entry: (0, path_1.resolve)(directory, 'src/index.js'),
            formats: ['es'],
            name: "@ugrc/".concat(packageName),
            fileName: function (format) {
                return "index.".concat(format, ".js");
            },
        },
        sourcemap: true,
        emptyOutDir: true,
        rollupOptions: rollupOptions,
    },
    test: {
        environment: 'happy-dom',
        globals: true,
    },
});
exports.default = config;
