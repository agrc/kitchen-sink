"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.focusRing = void 0;
exports.composeTailwindRenderProps = composeTailwindRenderProps;
var react_aria_components_1 = require("react-aria-components");
var tailwind_merge_1 = require("tailwind-merge");
var tailwind_variants_1 = require("tailwind-variants");
exports.focusRing = (0, tailwind_variants_1.tv)({
    base: 'outline outline-offset-2 outline-primary-900 dark:outline-secondary-600',
    variants: {
        isFocusVisible: {
            false: 'outline-0',
            true: 'outline-2',
        },
    },
});
function composeTailwindRenderProps(className, tw) {
    return (0, react_aria_components_1.composeRenderProps)(className, function (className) { return (0, tailwind_merge_1.twMerge)(tw, className); });
}
