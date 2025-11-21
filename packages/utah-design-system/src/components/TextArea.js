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
exports.TextArea = void 0;
var react_1 = require("react");
var react_aria_components_1 = require("react-aria-components");
var tailwind_variants_1 = require("tailwind-variants");
var Field_1 = require("./Field");
var utils_1 = require("./utils");
var inputStyles = (0, tailwind_variants_1.tv)({
    extend: utils_1.focusRing,
    base: 'rounded-md border',
    variants: __assign({ isFocused: Field_1.fieldBorderStyles.variants.isFocusWithin }, Field_1.fieldBorderStyles.variants),
});
exports.TextArea = (0, react_1.forwardRef)(function TextField(_a, ref) {
    var label = _a.label, description = _a.description, errorMessage = _a.errorMessage, inputProps = _a.inputProps, props = __rest(_a, ["label", "description", "errorMessage", "inputProps"]);
    return (<react_aria_components_1.TextField {...props} className={(0, utils_1.composeTailwindRenderProps)(props.className, 'flex flex-col gap-1')}>
      {label && <Field_1.Label>{label}</Field_1.Label>}
      <Field_1.TextAreaInput ref={ref} {...inputProps} className={inputStyles}/>
      {description && <Field_1.Description>{description}</Field_1.Description>}
      <Field_1.FieldError>{errorMessage}</Field_1.FieldError>
    </react_aria_components_1.TextField>);
});
