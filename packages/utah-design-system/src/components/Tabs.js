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
exports.Tabs = Tabs;
exports.TabList = TabList;
exports.Tab = Tab;
exports.TabPanel = TabPanel;
var react_aria_components_1 = require("react-aria-components");
var tailwind_variants_1 = require("tailwind-variants");
var utils_1 = require("./utils");
var tabsStyles = (0, tailwind_variants_1.tv)({
    base: 'group flex gap-4',
    variants: {
        orientation: {
            horizontal: 'flex-col',
            vertical: 'flex-1 flex-row',
        },
    },
});
function Tabs(props) {
    return (<react_aria_components_1.Tabs {...props} className={(0, react_aria_components_1.composeRenderProps)(props.className, function (className, renderProps) {
            return tabsStyles(__assign(__assign({}, renderProps), { className: className }));
        })}/>);
}
var tabListStyles = (0, tailwind_variants_1.tv)({
    base: 'flex gap-1',
    variants: {
        orientation: {
            horizontal: 'flex-row border-b pb-2',
            vertical: 'flex-col items-start border-l pl-2',
        },
    },
});
function TabList(props) {
    return (<react_aria_components_1.TabList {...props} className={(0, react_aria_components_1.composeRenderProps)(props.className, function (className, renderProps) {
            return tabListStyles(__assign(__assign({}, renderProps), { className: className }));
        })}/>);
}
var tabProps = (0, tailwind_variants_1.tv)({
    extend: utils_1.focusRing,
    base: 'relative flex cursor-default items-center rounded-full px-4 py-1.5 font-bold transition forced-color-adjust-none hover:bg-zinc-200 hover:text-zinc-700',
    variants: {
        isSelected: {
            false: 'text-zinc-500 after:bottom-1 after:h-px after:bg-slate-400 pressed:bg-zinc-200 pressed:text-zinc-700 dark:text-secondary-400 dark:text-slate-200 dark:text-zinc-300 after:dark:bg-secondary-400 after:dark:bg-slate-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 dark:pressed:bg-zinc-800 dark:pressed:text-zinc-200',
            true: 'text-secondary-500 after:absolute after:block after:rounded-full after:bg-secondary-400 group-data-[orientation="horizontal"]:after:bottom-[-0.8em] group-data-[orientation="horizontal"]:after:left-0 group-data-[orientation=vertical]:after:left-[-0.78em] group-data-[orientation="horizontal"]:after:h-2 group-data-[orientation=vertical]:after:h-full group-data-[orientation="horizontal"]:after:w-full group-data-[orientation=vertical]:after:w-2 forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]',
        },
        isDisabled: {
            true: 'text-zinc-200 selected:bg-zinc-200 selected:text-zinc-300 dark:text-zinc-600 dark:selected:bg-zinc-600 dark:selected:text-zinc-500 forced-colors:text-[GrayText] forced-colors:selected:bg-[GrayText] forced-colors:selected:text-[HighlightText]',
        },
    },
});
function Tab(props) {
    return (<react_aria_components_1.Tab {...props} className={(0, react_aria_components_1.composeRenderProps)(props.className, function (className, renderProps) {
            return tabProps(__assign(__assign({}, renderProps), { className: className }));
        })}/>);
}
var tabPanelStyles = (0, tailwind_variants_1.tv)({
    extend: utils_1.focusRing,
    base: 'flex-1 p-4 text-sm text-zinc-900 dark:text-zinc-100',
});
function TabPanel(props) {
    return (<react_aria_components_1.TabPanel {...props} className={(0, react_aria_components_1.composeRenderProps)(props.className, function (className, renderProps) {
            return tabPanelStyles(__assign(__assign({}, renderProps), { className: className }));
        })}/>);
}
