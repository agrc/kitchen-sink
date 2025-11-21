"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckboxGroup = CheckboxGroup;
exports.Checkbox = Checkbox;
var lucide_react_1 = require("lucide-react");
var react_aria_components_1 = require("react-aria-components");
var tailwind_variants_1 = require("tailwind-variants");
var Field_1 = require("./Field");
var utils_1 = require("./utils");
function CheckboxGroup(props) {
    return (<react_aria_components_1.CheckboxGroup {...props} className={(0, utils_1.composeTailwindRenderProps)(props.className, 'flex flex-col gap-2')}>
      <Field_1.Label>{props.label}</Field_1.Label>
      {props.children}
      {props.description && <Field_1.Description>{props.description}</Field_1.Description>}
      <Field_1.FieldError>{props.errorMessage}</Field_1.FieldError>
    </react_aria_components_1.CheckboxGroup>);
}
var checkboxStyles = (0, tailwind_variants_1.tv)({
    base: 'group flex items-center gap-2 text-sm transition pressed:bg-zinc-100 dark:pressed:bg-zinc-800',
    variants: {
        isDisabled: {
            false: 'text-gray-800 dark:text-zinc-200',
            true: 'text-gray-300 dark:text-zinc-600 forced-colors:text-[GrayText]',
        },
    },
});
var boxStyles = (0, tailwind_variants_1.tv)({
    extend: utils_1.focusRing,
    base: 'flex size-5 shrink-0 items-center justify-center rounded border-2 transition',
    variants: {
        isSelected: {
            false: 'border-[--color] bg-white [--color:theme(colors.secondary.800)] group-pressed:[--color:theme(colors.secondary.600)] dark:bg-zinc-900 dark:[--color:theme(colors.secondary.400)] dark:group-pressed:[--color:theme(colors.secondary.600)]',
            true: 'border-[--color] bg-[--color] [--color:theme(colors.secondary.800)] group-pressed:[--color:theme(colors.secondary.700)] dark:[--color:theme(colors.secondary.500)] dark:group-pressed:[--color:theme(colors.secondary.800)]',
        },
        isInvalid: {
            true: '[--color:theme(colors.warning.700)] group-pressed:[--color:theme(colors.warning.800)] dark:[--color:theme(colors.warning.600)] dark:group-pressed:[--color:theme(colors.warning.700)] forced-colors:![--color:Mark]',
        },
        isDisabled: {
            true: '[--color:theme(colors.gray.200)] dark:[--color:theme(colors.zinc.700)] forced-colors:![--color:GrayText]',
        },
    },
});
var iconStyles = 'w-full stroke-[4] h-4 text-white group-disabled:text-gray-400 dark:text-white dark:group-disabled:text-slate-600 forced-colors:text-[HighlightText]';
function Checkbox(props) {
    return (<react_aria_components_1.Checkbox {...props} className={(0, react_aria_components_1.composeRenderProps)(props.className, function (className, renderProps) {
            return checkboxStyles(__assign(__assign({}, renderProps), { className: className }));
        })}>
      {function (_a) {
            var isSelected = _a.isSelected, isIndeterminate = _a.isIndeterminate, renderProps = __rest(_a, ["isSelected", "isIndeterminate"]);
            return (<>
          <div className={boxStyles(__assign({ isSelected: isSelected || isIndeterminate }, renderProps))}>
            {isIndeterminate ? (<lucide_react_1.MinusIcon aria-hidden className={iconStyles}/>) : isSelected ? (<lucide_react_1.CheckIcon aria-hidden className={iconStyles}/>) : null}
          </div>
          {props.children}
        </>);
        }}
    </react_aria_components_1.Checkbox>);
}
