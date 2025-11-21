"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToggleButtonGroup = ToggleButtonGroup;
var react_aria_components_1 = require("react-aria-components");
var tailwind_variants_1 = require("tailwind-variants");
var styles = (0, tailwind_variants_1.tv)({
    base: 'flex',
    variants: {
        orientation: {
            horizontal: 'flex-row [&>button:first-child]:rounded-l-md [&>button:last-child]:rounded-r-md [&>button]:rounded-none',
            vertical: 'flex-col [&>button:first-child]:rounded-t-md [&>button:last-child]:rounded-b-md [&>button]:rounded-none',
        },
    },
});
function ToggleButtonGroup(props) {
    return (<react_aria_components_1.ToggleButtonGroup {...props} className={(0, react_aria_components_1.composeRenderProps)(props.className, function (className) {
            return styles({ orientation: props.orientation || 'horizontal', className: className });
        })}/>);
}
