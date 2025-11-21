"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = exports.Default = void 0;
var Button_tsx_1 = require("./Button.tsx");
var Radio_tsx_1 = require("./Radio.tsx");
var meta = {
    component: Radio_tsx_1.RadioGroup,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        label: 'Favorite sport',
        isDisabled: false,
        isRequired: false,
        description: '',
        children: (<>
        <Radio_tsx_1.Radio value="soccer">Soccer</Radio_tsx_1.Radio>
        <Radio_tsx_1.Radio isDisabled value="baseball">
          Baseball
        </Radio_tsx_1.Radio>
        <Radio_tsx_1.Radio value="basketball">Basketball</Radio_tsx_1.Radio>
      </>),
    },
};
exports.default = meta;
exports.Default = {};
exports.Validation = {
    args: {
        isRequired: true,
    },
    render: function (args) { return (<form onSubmit={function (event) {
            event.preventDefault();
        }} className="flex flex-col items-start gap-2">
      <Radio_tsx_1.RadioGroup {...args}/>
      <Button_tsx_1.Button type="submit" variant="secondary">
        Submit
      </Button_tsx_1.Button>
    </form>); },
};
