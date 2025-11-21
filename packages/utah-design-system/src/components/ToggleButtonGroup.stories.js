"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Example = void 0;
var lucide_react_1 = require("lucide-react");
var ToggleButton_1 = require("./ToggleButton");
var ToggleButtonGroup_1 = require("./ToggleButtonGroup");
var meta = {
    component: ToggleButtonGroup_1.ToggleButtonGroup,
    parameters: {
        layout: 'centered',
    },
    argTypes: {},
    args: {},
};
exports.default = meta;
var Example = function (args) { return (<ToggleButtonGroup_1.ToggleButtonGroup {...args}>
    <ToggleButton_1.ToggleButton id="bold" aria-label="Bold">
      <lucide_react_1.Bold className="h-4 w-4"/>
    </ToggleButton_1.ToggleButton>
    <ToggleButton_1.ToggleButton id="italic" aria-label="Italic">
      <lucide_react_1.Italic className="h-4 w-4"/>
    </ToggleButton_1.ToggleButton>
    <ToggleButton_1.ToggleButton id="underline" aria-label="Underline">
      <lucide_react_1.Underline className="h-4 w-4"/>
    </ToggleButton_1.ToggleButton>
  </ToggleButtonGroup_1.ToggleButtonGroup>); };
exports.Example = Example;
exports.Example.args = {
    selectionMode: 'multiple',
};
