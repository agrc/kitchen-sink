"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Example = void 0;
var react_aria_components_1 = require("react-aria-components");
var AlertDialog_1 = require("./AlertDialog");
var Button_1 = require("./Button");
var Modal_1 = require("./Modal");
var meta = {
    component: AlertDialog_1.AlertDialog,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        function (Story) { return (<react_aria_components_1.DialogTrigger>
        <Button_1.Button variant="destructive">Delete…</Button_1.Button>
        <Modal_1.Modal>
          <Story />
        </Modal_1.Modal>
      </react_aria_components_1.DialogTrigger>); },
    ],
    argTypes: {},
    args: {
        title: 'Delete folder',
        children: 'Are you sure you want to delete "Documents"? All contents will be permanently destroyed.',
        variant: 'destructive',
        actionLabel: 'Delete',
    },
};
exports.default = meta;
exports.Example = {};
