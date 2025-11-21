"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactHookFormValidation = exports.HtmlValidation = exports.Example = void 0;
var react_hook_form_1 = require("react-hook-form");
var Button_1 = require("./Button");
var TextField_1 = require("./TextField");
var meta = {
    component: TextField_1.TextField,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        label: 'Name',
    },
};
exports.default = meta;
exports.Example = {};
exports.HtmlValidation = {
    render: function (args) { return (<form onSubmit={function (event) {
            event.preventDefault();
        }} className="flex flex-col items-start gap-2">
      <TextField_1.TextField {...args}/>
      <Button_1.Button type="submit" variant="secondary">
        Submit
      </Button_1.Button>
    </form>); },
};
exports.ReactHookFormValidation = {
    render: function (args) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        var _a = (0, react_hook_form_1.useForm)({
            defaultValues: {
                name: '',
            },
        }), control = _a.control, handleSubmit = _a.handleSubmit;
        return (<form className="flex flex-col items-start gap-4" onSubmit={handleSubmit(console.log)}>
        <react_hook_form_1.Controller control={control} name="name" rules={{ required: 'Name is required' }} render={function (_a) {
                var _b;
                var field = _a.field, fieldState = _a.fieldState;
                return (<TextField_1.TextField errorMessage={(_b = fieldState.error) === null || _b === void 0 ? void 0 : _b.message} isInvalid={fieldState.invalid} validationBehavior="aria" {...field} {...args}/>);
            }}/>
        <Button_1.Button type="submit" variant="secondary">
          Submit
        </Button_1.Button>
      </form>);
    },
};
exports.HtmlValidation.args = {
    isRequired: true,
};
