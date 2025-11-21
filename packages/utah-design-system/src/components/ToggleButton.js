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
exports.ToggleButton = ToggleButton;
var react_aria_components_1 = require("react-aria-components");
var tailwind_variants_1 = require("tailwind-variants");
var utils_1 = require("./utils");
var styles = (0, tailwind_variants_1.tv)({
    extend: utils_1.focusRing,
    base: 'min-h-9 cursor-default rounded-full border border-black/10 px-8 text-center text-base shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition dark:border-white/10 dark:shadow-none [&:has(svg:only-child)]:min-h-0 [&:has(svg:only-child)]:p-0.5',
    variants: {
        isSelected: {
            false: 'bg-gray-100 text-gray-800 hover:bg-gray-200 pressed:bg-gray-300 dark:bg-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-500 dark:pressed:bg-zinc-400 forced-colors:!bg-[ButtonFace] forced-colors:!text-[ButtonText]',
            true: 'bg-gray-700 text-white hover:bg-gray-800 pressed:bg-gray-900 dark:bg-accent-300 dark:text-black dark:hover:bg-accent-200 dark:pressed:bg-accent-100 forced-colors:!bg-[Highlight] forced-colors:!text-[HighlightText]',
        },
        isDisabled: {
            true: 'border-black/5 bg-gray-100 text-gray-300 dark:border-white/5 dark:bg-zinc-800 dark:text-zinc-600 forced-colors:border-[GrayText] forced-colors:!bg-[ButtonFace] forced-colors:!text-[GrayText]',
        },
    },
});
function ToggleButton(props) {
    return (<react_aria_components_1.ToggleButton {...props} className={(0, react_aria_components_1.composeRenderProps)(props.className, function (className, renderProps) {
            return styles(__assign(__assign({}, renderProps), { className: className }));
        })}/>);
}
