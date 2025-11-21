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
exports.Switch = Switch;
var react_1 = require("react");
var react_aria_components_1 = require("react-aria-components");
var tailwind_variants_1 = require("tailwind-variants");
var utils_1 = require("./utils");
var track = (0, tailwind_variants_1.tv)({
    extend: utils_1.focusRing,
    base: 'flex h-4 w-7 shrink-0 cursor-default items-center rounded-full border border-transparent px-px shadow-inner transition duration-200 ease-in-out',
    variants: {
        isSelected: {
            false: 'bg-gray-400 group-pressed:bg-gray-500 dark:bg-zinc-400 dark:group-pressed:bg-zinc-300',
            true: 'bg-gray-700 group-pressed:bg-gray-800 dark:bg-zinc-300 dark:group-pressed:bg-zinc-200 forced-colors:!bg-[Highlight]',
        },
        isDisabled: {
            true: 'bg-gray-200 dark:bg-zinc-700 forced-colors:border-[GrayText] forced-colors:group-selected:!bg-[GrayText]',
        },
    },
});
var handle = (0, tailwind_variants_1.tv)({
    base: 'size-3 transform rounded-full bg-white shadow outline outline-1 -outline-offset-1 outline-transparent transition duration-200 ease-in-out dark:bg-zinc-900',
    variants: {
        isSelected: {
            false: 'translate-x-0',
            true: 'translate-x-[100%]',
        },
        isDisabled: {
            true: 'forced-colors:outline-[GrayText]',
        },
    },
});
function Switch(_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return (<react_aria_components_1.Switch {...props} className={(0, utils_1.composeTailwindRenderProps)(props.className, 'group flex items-center gap-2 text-sm text-gray-800 transition disabled:text-gray-300 dark:text-zinc-200 dark:disabled:text-zinc-600 forced-colors:disabled:text-[GrayText]')}>
      {function (renderProps) { return (<>
          <div className={track(renderProps)}>
            <span className={handle(renderProps)}/>
          </div>
          {children}
        </>); }}
    </react_aria_components_1.Switch>);
}
