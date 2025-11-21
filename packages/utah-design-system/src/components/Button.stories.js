"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icon = exports.Destructive = exports.Accent = exports.Secondary = exports.Primary = void 0;
var lucide_react_1 = require("lucide-react");
var Button_1 = require("./Button");
var meta = {
    component: Button_1.Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'accent', 'destructive'],
        },
        size: {
            control: 'inline-radio',
            options: ['extraSmall', 'small', 'medium', 'large', 'extraLarge'],
        },
    },
    args: {
        isDisabled: false,
        isPending: false,
        children: 'Button',
    },
};
exports.default = meta;
exports.Primary = {
    args: {
        variant: 'primary',
    },
};
exports.Secondary = {
    args: {
        variant: 'secondary',
    },
};
exports.Accent = {
    args: {
        variant: 'accent',
    },
};
exports.Destructive = {
    args: {
        variant: 'destructive',
    },
};
exports.Icon = {
    args: {
        variant: 'icon',
        children: <lucide_react_1.BotIcon />,
    },
};
