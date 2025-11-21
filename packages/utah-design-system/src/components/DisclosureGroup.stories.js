"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Example = void 0;
var Disclosure_1 = require("./Disclosure");
var meta = {
    component: Disclosure_1.DisclosureGroup,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        defaultExpandedKeys: ['files'],
    },
};
exports.default = meta;
var Example = function (args) { return (<Disclosure_1.DisclosureGroup {...args}>
    <Disclosure_1.Disclosure id="files">
      <Disclosure_1.DisclosureHeader>Files</Disclosure_1.DisclosureHeader>
      <Disclosure_1.DisclosurePanel>Files content</Disclosure_1.DisclosurePanel>
    </Disclosure_1.Disclosure>
    <Disclosure_1.Disclosure id="images" isDisabled={true}>
      <Disclosure_1.DisclosureHeader>Images</Disclosure_1.DisclosureHeader>
      <Disclosure_1.DisclosurePanel>Images content</Disclosure_1.DisclosurePanel>
    </Disclosure_1.Disclosure>
    <Disclosure_1.Disclosure id="documents">
      <Disclosure_1.DisclosureHeader>Documents</Disclosure_1.DisclosureHeader>
      <Disclosure_1.DisclosurePanel>Documents content</Disclosure_1.DisclosurePanel>
    </Disclosure_1.Disclosure>
  </Disclosure_1.DisclosureGroup>); };
exports.Example = Example;
