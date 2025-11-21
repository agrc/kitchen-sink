"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Example = void 0;
var FormErrors_tsx_1 = require("./FormErrors.tsx");
var meta = {
    component: FormErrors_tsx_1.FormErrors,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        errors: {
            email: new Error('Email is required'),
            password: new Error('Password is required'),
        },
    },
};
exports.default = meta;
exports.Example = {};
