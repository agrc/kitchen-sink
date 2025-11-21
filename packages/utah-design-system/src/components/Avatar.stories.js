"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoGravatar = exports.Anonymous = exports.Example = void 0;
var Avatar_1 = require("./Avatar");
var meta = {
    component: Avatar_1.Avatar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        user: {
            email: 'ugrc-developers@utah.gov',
            displayName: 'UGRC Developers',
        },
    },
};
exports.default = meta;
exports.Example = {};
exports.Anonymous = {
    args: {
        user: undefined,
    },
};
exports.NoGravatar = {
    args: {
        user: { email: 'test@test.com', displayName: 'Test User' },
    },
};
