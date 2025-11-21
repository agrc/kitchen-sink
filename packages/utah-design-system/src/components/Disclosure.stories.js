"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Example = void 0;
var Disclosure_1 = require("./Disclosure");
var meta = {
    component: Disclosure_1.Disclosure,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};
exports.default = meta;
var Example = function (args) { return (<Disclosure_1.Disclosure {...args}>
    <Disclosure_1.DisclosureHeader>Files</Disclosure_1.DisclosureHeader>
    <Disclosure_1.DisclosurePanel>Files content</Disclosure_1.DisclosurePanel>
  </Disclosure_1.Disclosure>); };
exports.Example = Example;
