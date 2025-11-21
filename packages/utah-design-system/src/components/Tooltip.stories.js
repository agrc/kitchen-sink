"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Example = void 0;
var lucide_react_1 = require("lucide-react");
var react_aria_components_1 = require("react-aria-components");
var Button_1 = require("./Button");
var Tooltip_1 = require("./Tooltip");
var meta = {
    component: Tooltip_1.Tooltip,
    parameters: {
        layout: 'centered',
    },
    argTypes: {},
    args: {},
};
exports.default = meta;
var Example = function (args) { return (<div className="flex gap-2">
    <react_aria_components_1.TooltipTrigger>
      <Button_1.Button variant="secondary" className="px-2">
        <lucide_react_1.SaveIcon className="h-5 w-5"/>
      </Button_1.Button>
      <Tooltip_1.Tooltip {...args}>Save</Tooltip_1.Tooltip>
    </react_aria_components_1.TooltipTrigger>
    <react_aria_components_1.TooltipTrigger>
      <Button_1.Button variant="secondary" className="px-2">
        <lucide_react_1.PrinterIcon className="h-5 w-5"/>
      </Button_1.Button>
      <Tooltip_1.Tooltip {...args}>Print</Tooltip_1.Tooltip>
    </react_aria_components_1.TooltipTrigger>
  </div>); };
exports.Example = Example;
