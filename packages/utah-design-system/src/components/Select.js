"use strict";
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
exports.Select = Select;
exports.SelectItem = SelectItem;
exports.SelectSection = SelectSection;
var lucide_react_1 = require("lucide-react");
var react_aria_components_1 = require("react-aria-components");
var tailwind_variants_1 = require("tailwind-variants");
var Field_1 = require("./Field");
var ListBox_1 = require("./ListBox");
var Popover_1 = require("./Popover");
var utils_1 = require("./utils");
var styles = (0, tailwind_variants_1.tv)({
    extend: utils_1.focusRing,
    base: 'relative flex w-full cursor-default items-center gap-4 rounded-md border border-transparent bg-white py-1.5 pl-3 pr-2 text-start text-zinc-800 shadow ring-1 ring-zinc-900/5 transition dark:border-zinc-200/40 dark:bg-zinc-900 dark:text-zinc-200',
    variants: {
        isDisabled: {
            false: 'text-gray-800 group-invalid:border-warning-600 hover:bg-gray-100 pressed:bg-gray-200 dark:text-zinc-300 dark:hover:bg-zinc-600 dark:pressed:bg-zinc-500 forced-colors:group-invalid:border-[Mark]',
            true: 'border-gray-200 text-gray-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-600',
        },
    },
});
function Select(_a) {
    var label = _a.label, description = _a.description, errorMessage = _a.errorMessage, children = _a.children, items = _a.items, props = __rest(_a, ["label", "description", "errorMessage", "children", "items"]);
    return (<react_aria_components_1.Select {...props} className={(0, utils_1.composeTailwindRenderProps)(props.className, 'group flex flex-col gap-1')}>
      {label && <Field_1.Label>{label}</Field_1.Label>}
      <react_aria_components_1.Button className={styles}>
        <react_aria_components_1.SelectValue className="min-h-5 flex-1 text-sm placeholder-shown:italic"/>
        <lucide_react_1.ChevronDown aria-hidden className="size-4 text-gray-600 group-disabled:text-gray-200 dark:text-zinc-400 dark:group-disabled:text-zinc-600 forced-colors:text-[ButtonText] forced-colors:group-disabled:text-[GrayText]"/>
      </react_aria_components_1.Button>
      {description && <Field_1.Description>{description}</Field_1.Description>}
      <Field_1.FieldError>{errorMessage}</Field_1.FieldError>
      <Popover_1.Popover className="min-w-[--trigger-width]">
        <react_aria_components_1.ListBox items={items} className="max-h-[inherit] overflow-auto p-1 outline-none [clip-path:inset(0_0_0_0_round_.75rem)]">
          {children}
        </react_aria_components_1.ListBox>
      </Popover_1.Popover>
    </react_aria_components_1.Select>);
}
function SelectItem(props) {
    return <ListBox_1.DropdownItem {...props}/>;
}
function SelectSection(props) {
    return <ListBox_1.DropdownSection {...props}/>;
}
