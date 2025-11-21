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
exports.Tooltip = Tooltip;
var react_1 = require("react");
var react_aria_components_1 = require("react-aria-components");
var tailwind_variants_1 = require("tailwind-variants");
var styles = (0, tailwind_variants_1.tv)({
    base: 'group rounded-lg border border-slate-800 bg-slate-700 px-3 py-1 text-sm text-white shadow-[inset_0_1px_0_0_theme(colors.gray.600)] drop-shadow-lg will-change-transform dark:border-white/10 dark:bg-slate-600 dark:shadow-none',
    variants: {
        isEntering: {
            true: 'duration-200 ease-out animate-in fade-in placement-left:slide-in-from-right-0.5 placement-right:slide-in-from-left-0.5 placement-top:slide-in-from-bottom-0.5 placement-bottom:slide-in-from-top-0.5',
        },
        isExiting: {
            true: 'duration-150 ease-in animate-out fade-out placement-left:slide-out-to-right-0.5 placement-right:slide-out-to-left-0.5 placement-top:slide-out-to-bottom-0.5 placement-bottom:slide-out-to-top-0.5',
        },
    },
});
function Tooltip(_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return (<react_aria_components_1.Tooltip {...props} offset={10} className={(0, react_aria_components_1.composeRenderProps)(props.className, function (className, renderProps) {
            return styles(__assign(__assign({}, renderProps), { className: className }));
        })}>
      <react_aria_components_1.OverlayArrow>
        <svg width={8} height={8} viewBox="0 0 8 8" className="fill-slate-700 stroke-gray-800 group-placement-left:-rotate-90 group-placement-right:rotate-90 group-placement-bottom:rotate-180 dark:fill-slate-600 dark:stroke-white/10 forced-colors:fill-[Canvas] forced-colors:stroke-[ButtonBorder]">
          <path d="M0 0 L4 4 L8 0"/>
        </svg>
      </react_aria_components_1.OverlayArrow>
      {children}
    </react_aria_components_1.Tooltip>);
}
