"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialog = Dialog;
var react_aria_components_1 = require("react-aria-components");
var tailwind_merge_1 = require("tailwind-merge");
function Dialog(props) {
    return (<react_aria_components_1.Dialog {...props} className={(0, tailwind_merge_1.twMerge)('relative max-h-[inherit] overflow-auto p-6 outline outline-0 [[data-placement]>&]:p-4', props.className)}/>);
}
