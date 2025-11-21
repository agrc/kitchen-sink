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
exports.Disclosure = Disclosure;
exports.DisclosureHeader = DisclosureHeader;
exports.DisclosurePanel = DisclosurePanel;
exports.DisclosureGroup = DisclosureGroup;
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var react_aria_components_1 = require("react-aria-components");
var tailwind_variants_1 = require("tailwind-variants");
var utils_1 = require("./utils");
var disclosure = (0, tailwind_variants_1.tv)({
    base: 'group min-w-64 rounded-lg text-gray-900 dark:text-zinc-100',
});
var disclosureButton = (0, tailwind_variants_1.tv)({
    extend: utils_1.focusRing,
    base: 'flex w-full cursor-default items-center justify-between gap-2 rounded-lg bg-primary-900 p-2 text-start text-white aria-expanded:rounded-b-none hover:bg-primary-700 pressed:bg-primary-800',
    variants: {
        isDisabled: {
            true: 'text-gray-300 dark:text-primary-300 forced-colors:text-[GrayText]',
        },
    },
});
var chevron = (0, tailwind_variants_1.tv)({
    base: 'size-5 transition-transform duration-200 ease-in-out',
    variants: {
        isExpanded: {
            true: 'rotate-180 transform',
        },
        isDisabled: {
            true: 'text-gray-300 dark:text-primary-300 forced-colors:text-[GrayText]',
        },
    },
});
function Disclosure(_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return (<react_aria_components_1.Disclosure {...props} className={(0, react_aria_components_1.composeRenderProps)(props.className, function (className, renderProps) {
            return disclosure(__assign(__assign({}, renderProps), { className: className }));
        })}>
      {children}
    </react_aria_components_1.Disclosure>);
}
function DisclosureHeader(_a) {
    var children = _a.children;
    var isExpanded = (0, react_1.useContext)(react_aria_components_1.DisclosureStateContext).isExpanded;
    return (<react_aria_components_1.Heading className="text-lg font-semibold">
      <react_aria_components_1.Button slot="trigger" className={function (renderProps) { return disclosureButton(__assign({}, renderProps)); }}>
        {function (_a) {
            var isDisabled = _a.isDisabled;
            return (<>
            {children}
            <lucide_react_1.CircleChevronDownIcon aria-hidden className={chevron({ isExpanded: isExpanded, isDisabled: isDisabled })}/>
          </>);
        }}
      </react_aria_components_1.Button>
    </react_aria_components_1.Heading>);
}
function DisclosurePanel(_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return (<react_aria_components_1.DisclosurePanel {...props} className={(0, utils_1.composeTailwindRenderProps)(props.className, 'rounded-b-lg bg-gray-100 group-data-[expanded]:px-4 group-data-[expanded]:py-2 dark:bg-black')}>
      {children}
    </react_aria_components_1.DisclosurePanel>);
}
function DisclosureGroup(_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return (<react_aria_components_1.DisclosureGroup {...props} className={(0, utils_1.composeTailwindRenderProps)(props.className, 'space-y-2 rounded-lg')}>
      {children}
    </react_aria_components_1.DisclosureGroup>);
}
