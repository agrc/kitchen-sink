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
exports.Popover = Popover;
var react_aria_components_1 = require("react-aria-components");
var tailwind_variants_1 = require("tailwind-variants");
var styles = (0, tailwind_variants_1.tv)({
    base: 'rounded-xl border border-black/10 bg-white bg-clip-padding text-slate-700 shadow-2xl dark:border-white/[15%] dark:bg-zinc-900/70 dark:text-zinc-300 dark:backdrop-blur-2xl dark:backdrop-saturate-200 forced-colors:bg-[Canvas]',
    variants: {
        isEntering: {
            true: 'duration-200 ease-out animate-in fade-in placement-left:slide-in-from-right-1 placement-right:slide-in-from-left-1 placement-top:slide-in-from-bottom-1 placement-bottom:slide-in-from-top-1',
        },
        isExiting: {
            true: 'duration-150 ease-in animate-out fade-out placement-left:slide-out-to-right-1 placement-right:slide-out-to-left-1 placement-top:slide-out-to-bottom-1 placement-bottom:slide-out-to-top-1',
        },
    },
});
function Popover(_a) {
    var children = _a.children, showArrow = _a.showArrow, className = _a.className, props = __rest(_a, ["children", "showArrow", "className"]);
    var popoverContext = (0, react_aria_components_1.useSlottedContext)(react_aria_components_1.PopoverContext);
    var isSubmenu = (popoverContext === null || popoverContext === void 0 ? void 0 : popoverContext.trigger) === 'SubmenuTrigger';
    var offset = showArrow ? 12 : 8;
    offset = isSubmenu ? offset - 6 : offset;
    return (<react_aria_components_1.Popover offset={offset} {...props} className={(0, react_aria_components_1.composeRenderProps)(className, function (className, renderProps) {
            return styles(__assign(__assign({}, renderProps), { className: className }));
        })}>
      {showArrow && (<react_aria_components_1.OverlayArrow className="group">
          <svg width={12} height={12} viewBox="0 0 12 12" className="block fill-white stroke-black/10 stroke-1 group-placement-left:-rotate-90 group-placement-right:rotate-90 group-placement-bottom:rotate-180 dark:fill-[#1f1f21] dark:stroke-zinc-600 forced-colors:fill-[Canvas] forced-colors:stroke-[ButtonBorder]">
            <path d="M0 0 L6 6 L12 0"/>
          </svg>
        </react_aria_components_1.OverlayArrow>)}
      {children}
    </react_aria_components_1.Popover>);
}
