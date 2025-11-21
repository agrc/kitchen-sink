"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Range = exports.Example = void 0;
var Slider_tsx_1 = require("./Slider.tsx");
var meta = {
    component: Slider_tsx_1.Slider,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
};
exports.default = meta;
exports.Example = {
    args: {
        className: 'orientation-horizontal:w-64 orientation-vertical:h-64',
        label: 'Opacity',
        defaultValue: [60],
        thumbLabels: ['value'],
    },
};
exports.Range = {
    args: {
        className: 'orientation-horizontal:w-64 orientation-vertical:h-64',
        label: 'Range',
        defaultValue: [30, 60],
        thumbLabels: ['start', 'end'],
    },
};
