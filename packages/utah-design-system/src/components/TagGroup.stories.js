"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Example = void 0;
var TagGroup_1 = require("./TagGroup");
var meta = {
    component: TagGroup_1.TagGroup,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        label: 'Ice cream flavor',
        selectionMode: 'single',
    },
};
exports.default = meta;
exports.Example = {
    render: function (args) { return (<TagGroup_1.TagGroup {...args}>
      <TagGroup_1.Tag isDisabled>Chocolate</TagGroup_1.Tag>
      <TagGroup_1.Tag id="mint">Mint</TagGroup_1.Tag>
      <TagGroup_1.Tag>Strawberry</TagGroup_1.Tag>
      <TagGroup_1.Tag>Vanilla</TagGroup_1.Tag>
    </TagGroup_1.TagGroup>); },
};
