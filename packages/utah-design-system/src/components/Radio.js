"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioGroup = RadioGroup;
exports.Radio = Radio;
var react_aria_components_1 = require("react-aria-components");
var tailwind_variants_1 = require("tailwind-variants");
var Field_1 = require("./Field");
var utils_1 = require("./utils");
function RadioGroup(props) {
    return (<react_aria_components_1.RadioGroup {...props} className={(0, utils_1.composeTailwindRenderProps)(props.className, 'group flex flex-col gap-2')}>
      <Field_1.Label>{props.label}</Field_1.Label>
      <div className="flex gap-2 group-orientation-horizontal:gap-4 group-orientation-vertical:flex-col">
        {props.children}
      </div>
      {props.description && <Field_1.Description>{props.description}</Field_1.Description>}
      <Field_1.FieldError>{props.errorMessage}</Field_1.FieldError>
    </react_aria_components_1.RadioGroup>);
}
var styles = (0, tailwind_variants_1.tv)({
    extend: utils_1.focusRing,
    base: 'size-5 rounded-full border-2 bg-white transition-all dark:bg-zinc-900',
    variants: {
        isSelected: {
            false: 'border-[--color] [--color:theme(colors.secondary.800)] group-pressed:[--color:theme(colors.secondary.600)] dark:[--color:theme(colors.secondary.400)] dark:group-pressed:[--color:theme(colors.secondary.600)]',
            true: 'border-[7px] border-[--color] [--color:theme(colors.secondary.800)] group-pressed:[--color:theme(colors.secondary.700)] dark:[--color:theme(colors.secondary.500)] dark:group-pressed:[--color:theme(colors.secondary.800)]',
        },
        isInvalid: {
            true: 'border-red-700 group-pressed:border-red-800 dark:border-red-600 dark:group-pressed:border-red-700 forced-colors:!border-[Mark]',
        },
        isDisabled: {
            true: 'border-gray-200 dark:border-zinc-700 forced-colors:!border-[GrayText]',
        },
    },
});
function Radio(props) {
    return (<react_aria_components_1.Radio {...props} className={(0, utils_1.composeTailwindRenderProps)(props.className, 'group flex items-center gap-2 text-sm text-gray-800 transition disabled:text-gray-300 dark:text-zinc-200 dark:disabled:text-zinc-600 forced-colors:disabled:text-[GrayText]')}>
      {function (renderProps) { return (<>
          <div className={styles(renderProps)}/>
          {props.children}
        </>); }}
    </react_aria_components_1.Radio>);
}
