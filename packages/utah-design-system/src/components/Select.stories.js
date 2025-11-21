"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = exports.Sections = exports.Example = void 0;
var Button_1 = require("./Button");
var Select_1 = require("./Select");
var meta = {
    component: Select_1.Select,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        label: 'Ice cream flavor',
    },
};
exports.default = meta;
exports.Example = {
    render: function (args) { return (<Select_1.Select {...args}>
      <Select_1.SelectItem>Chocolate</Select_1.SelectItem>
      <Select_1.SelectItem isDisabled>Mint</Select_1.SelectItem>
      <Select_1.SelectItem>Strawberry</Select_1.SelectItem>
      <Select_1.SelectItem>Vanilla</Select_1.SelectItem>
    </Select_1.Select>); },
};
exports.Sections = {
    args: {
        label: 'Preferred fruit or vegetable',
    },
    render: function (args) { return (<Select_1.Select {...args}>
      <Select_1.SelectSection title="Fruit">
        <Select_1.SelectItem id="Apple">Apple</Select_1.SelectItem>
        <Select_1.SelectItem id="Banana">Banana</Select_1.SelectItem>
        <Select_1.SelectItem id="Orange">Orange</Select_1.SelectItem>
        <Select_1.SelectItem id="Honeydew">Honeydew</Select_1.SelectItem>
        <Select_1.SelectItem id="Grapes">Grapes</Select_1.SelectItem>
        <Select_1.SelectItem id="Watermelon">Watermelon</Select_1.SelectItem>
        <Select_1.SelectItem id="Cantaloupe">Cantaloupe</Select_1.SelectItem>
        <Select_1.SelectItem id="Pear">Pear</Select_1.SelectItem>
      </Select_1.SelectSection>
      <Select_1.SelectSection title="Vegetable">
        <Select_1.SelectItem id="Cabbage">Cabbage</Select_1.SelectItem>
        <Select_1.SelectItem id="Broccoli">Broccoli</Select_1.SelectItem>
        <Select_1.SelectItem id="Carrots">Carrots</Select_1.SelectItem>
        <Select_1.SelectItem id="Lettuce">Lettuce</Select_1.SelectItem>
        <Select_1.SelectItem id="Spinach">Spinach</Select_1.SelectItem>
        <Select_1.SelectItem id="Bok Choy">Bok Choy</Select_1.SelectItem>
        <Select_1.SelectItem id="Cauliflower">Cauliflower</Select_1.SelectItem>
        <Select_1.SelectItem id="Potatoes">Potatoes</Select_1.SelectItem>
      </Select_1.SelectSection>
    </Select_1.Select>); },
};
exports.Validation = {
    args: {
        isRequired: true,
    },
    render: function (args) { return (<form onSubmit={function (event) {
            event.preventDefault();
        }} className="flex flex-col items-start gap-2">
      <Select_1.Select {...args}>
        <Select_1.SelectItem>Chocolate</Select_1.SelectItem>
        <Select_1.SelectItem isDisabled>Mint</Select_1.SelectItem>
        <Select_1.SelectItem>Strawberry</Select_1.SelectItem>
        <Select_1.SelectItem>Vanilla</Select_1.SelectItem>
      </Select_1.Select>
      <Button_1.Button type="submit" variant="secondary">
        Submit
      </Button_1.Button>
    </form>); },
};
