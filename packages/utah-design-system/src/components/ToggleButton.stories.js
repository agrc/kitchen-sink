"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icon = exports.Example = void 0;
var lucide_react_1 = require("lucide-react");
var ToggleButton_1 = require("./ToggleButton");
var meta = {
    component: ToggleButton_1.ToggleButton,
    parameters: {
        layout: 'centered',
    },
    argTypes: {},
    args: {},
};
exports.default = meta;
exports.Example = {
    args: {
        children: 'Pin',
    },
};
exports.Icon = {
    args: {
        children: <lucide_react_1.PenLineIcon />,
    },
};
