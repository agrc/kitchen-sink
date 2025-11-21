"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Example = void 0;
var ListBox_1 = require("./ListBox");
var meta = {
    component: ListBox_1.ListBox,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        onAction: undefined,
        selectionMode: 'multiple',
    },
};
exports.default = meta;
exports.Example = {
    render: function (args) { return (<ListBox_1.ListBox aria-label="Ice cream flavor" {...args}>
      <ListBox_1.ListBoxItem id="chocolate">Chocolate</ListBox_1.ListBoxItem>
      <ListBox_1.ListBoxItem id="mint">Mint</ListBox_1.ListBoxItem>
      <ListBox_1.ListBoxItem id="strawberry">Strawberry</ListBox_1.ListBoxItem>
      <ListBox_1.ListBoxItem id="vanilla">Vanilla</ListBox_1.ListBoxItem>
    </ListBox_1.ListBox>); },
};
