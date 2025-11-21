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
exports.dropdownItemStyles = exports.itemStyles = void 0;
exports.ListBox = ListBox;
exports.ListBoxItem = ListBoxItem;
exports.DropdownItem = DropdownItem;
exports.DropdownSection = DropdownSection;
var lucide_react_1 = require("lucide-react");
var react_aria_components_1 = require("react-aria-components");
var tailwind_variants_1 = require("tailwind-variants");
var utils_1 = require("./utils");
function ListBox(_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return (<react_aria_components_1.ListBox {...props} className={(0, utils_1.composeTailwindRenderProps)(props.className, 'rounded-lg border border-gray-300 p-1 outline-0 dark:border-zinc-600')}>
      {children}
    </react_aria_components_1.ListBox>);
}
exports.itemStyles = (0, tailwind_variants_1.tv)({
    extend: utils_1.focusRing,
    base: 'group relative flex cursor-default select-none items-center gap-8 rounded-md px-2.5 py-1.5 text-sm will-change-transform forced-color-adjust-none',
    variants: {
        isSelected: {
            false: 'text-slate-700 -outline-offset-2 hover:bg-slate-200 dark:text-zinc-300 dark:hover:bg-zinc-700',
            true: 'bg-secondary-600 text-white -outline-offset-4 outline-white dark:outline-white forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:outline-[HighlightText] [&+[data-selected]]:rounded-t-none [&:has(+[data-selected])]:rounded-b-none',
        },
        isDisabled: {
            true: 'text-slate-300 dark:text-zinc-600 forced-colors:text-[GrayText]',
        },
    },
});
function ListBoxItem(props) {
    var textValue = props.textValue ||
        (typeof props.children === 'string' ? props.children : undefined);
    return (<react_aria_components_1.ListBoxItem {...props} textValue={textValue} className={exports.itemStyles}>
      {(0, react_aria_components_1.composeRenderProps)(props.children, function (children) { return (<>
          {children}
          <div className="absolute bottom-0 left-4 right-4 hidden h-px bg-white/20 forced-colors:bg-[HighlightText] [.group[data-selected]:has(+[data-selected])_&]:block"/>
        </>); })}
    </react_aria_components_1.ListBoxItem>);
}
exports.dropdownItemStyles = (0, tailwind_variants_1.tv)({
    base: 'group flex cursor-default select-none items-center gap-4 rounded-lg py-2 pl-3 pr-1 text-sm outline outline-0 forced-color-adjust-none',
    variants: {
        isDisabled: {
            false: 'text-gray-900 dark:text-zinc-100',
            true: 'text-gray-300 dark:text-zinc-600 forced-colors:text-[GrayText]',
        },
        isFocused: {
            true: 'bg-secondary-600 text-white forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]',
        },
    },
    compoundVariants: [
        {
            isFocused: false,
            isOpen: true,
            className: 'bg-gray-100 dark:bg-zinc-700/60',
        },
    ],
});
function DropdownItem(props) {
    var textValue = props.textValue ||
        (typeof props.children === 'string' ? props.children : undefined);
    return (<react_aria_components_1.ListBoxItem {...props} textValue={textValue} className={exports.dropdownItemStyles}>
      {(0, react_aria_components_1.composeRenderProps)(props.children, function (children, _a) {
            var isSelected = _a.isSelected;
            return (<>
          <span className="flex flex-1 items-center gap-2 truncate font-normal group-selected:font-semibold">
            {children}
          </span>
          <span className="flex w-5 items-center">
            {isSelected && <lucide_react_1.CheckIcon className="h-full w-4 stroke-[4]"/>}
          </span>
        </>);
        })}
    </react_aria_components_1.ListBoxItem>);
}
function DropdownSection(props) {
    return (<react_aria_components_1.Section className="after:block after:h-[5px] after:content-[''] first:-mt-[5px]">
      <react_aria_components_1.Header className="sticky -top-[5px] z-10 -mx-1 -mt-px truncate border-y bg-gray-100/60 px-4 py-1 text-sm font-semibold text-gray-500 backdrop-blur-md supports-[-moz-appearance:none]:bg-gray-100 dark:border-y-zinc-700 dark:bg-zinc-700/60 dark:text-zinc-300 [&+*]:mt-1">
        {props.title}
      </react_aria_components_1.Header>
      <react_aria_components_1.Collection items={props.items}>{props.children}</react_aria_components_1.Collection>
    </react_aria_components_1.Section>);
}
