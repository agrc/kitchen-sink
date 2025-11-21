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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextAreaInput = exports.Input = exports.fieldGroupStyles = exports.fieldBorderStyles = void 0;
exports.Label = Label;
exports.Description = Description;
exports.FieldError = FieldError;
exports.FieldGroup = FieldGroup;
var react_1 = require("react");
var react_aria_components_1 = require("react-aria-components");
var tailwind_merge_1 = require("tailwind-merge");
var tailwind_variants_1 = require("tailwind-variants");
var utils_1 = require("./utils");
function Label(props) {
    return (<react_aria_components_1.Label {...props} className={(0, tailwind_merge_1.twMerge)('w-fit cursor-default text-sm font-medium text-zinc-700 dark:text-zinc-300', props.className)}/>);
}
function Description(props) {
    return (<react_aria_components_1.Text {...props} slot="description" className={(0, tailwind_merge_1.twMerge)('text-sm text-gray-600', props.className)}/>);
}
function FieldError(props) {
    return (<react_aria_components_1.FieldError {...props} className={(0, utils_1.composeTailwindRenderProps)(props.className, 'text-sm text-warning-600 forced-colors:text-[Mark]')}/>);
}
exports.fieldBorderStyles = (0, tailwind_variants_1.tv)({
    variants: {
        isFocusWithin: {
            false: 'border-transparent dark:border-zinc-500 forced-colors:border-[ButtonBorder]',
            true: 'border-primary-900 dark:border-zinc-500 forced-colors:border-[Highlight]',
        },
        isInvalid: {
            true: 'border-warning-600 dark:border-warning-600 forced-colors:border-[Mark]',
        },
        isDisabled: {
            true: 'border-gray-200 dark:border-zinc-700 forced-colors:border-[GrayText]',
        },
    },
});
exports.fieldGroupStyles = (0, tailwind_variants_1.tv)({
    extend: utils_1.focusRing,
    base: 'group flex h-9 items-center overflow-hidden rounded-lg border-2 bg-white dark:bg-zinc-900 forced-colors:bg-[Field]',
    variants: exports.fieldBorderStyles.variants,
});
function FieldGroup(props) {
    return (<react_aria_components_1.Group {...props} className={(0, react_aria_components_1.composeRenderProps)(props.className, function (className, renderProps) {
            return (0, exports.fieldGroupStyles)(__assign(__assign({}, renderProps), { className: className }));
        })}/>);
}
exports.Input = (0, react_1.forwardRef)(function Input(props, ref) {
    return (<react_aria_components_1.Input {...props} ref={ref} className={(0, utils_1.composeTailwindRenderProps)(props.className, 'min-w-0 flex-1 bg-white px-2 py-1.5 text-sm text-zinc-800 shadow ring-1 ring-zinc-900/5 disabled:text-gray-200 dark:border-zinc-200/40 dark:bg-zinc-900 dark:text-zinc-200 dark:disabled:text-zinc-600')}/>);
});
exports.TextAreaInput = (0, react_1.forwardRef)(function TextAreaInput(props, ref) {
    return (<react_aria_components_1.TextArea {...props} ref={ref} className={(0, utils_1.composeTailwindRenderProps)(props.className, 'min-w-0 flex-1 bg-white px-2 py-1.5 text-sm text-zinc-800 shadow ring-1 ring-zinc-900/5 disabled:text-gray-200 dark:border-zinc-200/40 dark:bg-zinc-900 dark:text-zinc-200 dark:disabled:text-zinc-600')}/>);
});
