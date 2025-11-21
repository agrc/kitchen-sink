"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Example = void 0;
var lucide_react_1 = require("lucide-react");
var react_aria_components_1 = require("react-aria-components");
var Button_1 = require("./Button");
var Dialog_1 = require("./Dialog");
var Popover_1 = require("./Popover");
var meta = {
    component: Popover_1.Popover,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        function (Story) { return (<react_aria_components_1.DialogTrigger>
        <Button_1.Button variant="icon" aria-label="Help">
          <lucide_react_1.HelpCircle className="h-4 w-4"/>
        </Button_1.Button>
        <Story />
      </react_aria_components_1.DialogTrigger>); },
    ],
    argTypes: {},
    args: {
        showArrow: true,
    },
};
exports.default = meta;
exports.Example = {
    args: {
        className: 'max-w-[250px]',
        children: (<Dialog_1.Dialog>
        <react_aria_components_1.Heading slot="title" className="mb-2 text-lg font-semibold">
          Help
        </react_aria_components_1.Heading>
        <p className="text-sm">
          For help accessing your account, please contact support.
        </p>
      </Dialog_1.Dialog>),
    },
};
