"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarExample = exports.Example = void 0;
var Spinner_tsx_1 = require("./Spinner.tsx");
var meta = {
    component: Spinner_tsx_1.Spinner,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
};
exports.default = meta;
exports.Example = {};
exports.BarExample = {
    render: function (args) { return (<div className="relative isolate min-w-96">
      <Spinner_tsx_1.BusyBar {...args}/>
    </div>); },
    args: {
        busy: true,
    },
};
