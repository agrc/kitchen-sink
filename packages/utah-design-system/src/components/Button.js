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
exports.Button = Button;
var react_aria_components_1 = require("react-aria-components");
var tailwind_variants_1 = require("tailwind-variants");
var Spinner_1 = require("./Spinner");
var utils_1 = require("./utils");
var button = (0, tailwind_variants_1.tv)({
    extend: utils_1.focusRing,
    base: 'flex w-fit cursor-default select-none items-center justify-center border border-black/10 text-center text-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-all duration-200 ease-in-out forced-color-adjust-none dark:border-white/10 dark:shadow-none forced-colors:border-[ButtonBorder]',
    variants: {
        variant: {
            primary: 'rounded-full bg-primary-900 text-white hover:bg-primary-700 pressed:bg-primary-800',
            secondary: 'rounded-full bg-secondary-800 text-white hover:bg-secondary-600 pressed:bg-secondary-700',
            accent: 'rounded-full bg-accent-500 text-zinc-900 hover:bg-accent-300 pressed:bg-accent-400',
            destructive: 'rounded-full bg-rose-700 text-white hover:bg-rose-800 pressed:bg-rose-900',
            icon: 'border-0 p-1 text-zinc-900 hover:bg-black/5 pressed:bg-black/10 disabled:bg-transparent dark:text-zinc-300 dark:hover:bg-white/10 dark:pressed:bg-white/20 [&:has(svg:only-child)]:min-h-0 [&:has(svg:only-child)]:p-0.5',
        },
        size: {
            extraSmall: 'min-h-6 px-2 text-xs',
            small: 'min-h-[1.875rem] px-4 text-sm',
            medium: 'min-h-9 px-8 text-base',
            large: 'min-h-10 px-8 text-lg',
            extraLarge: 'min-h-[3.125rem] px-10 text-xl',
        },
        isDisabled: {
            true: 'border-black/20 bg-zinc-100 text-zinc-500 dark:border-white/20 dark:bg-zinc-500 dark:text-zinc-100 forced-colors:text-[GrayText]',
        },
        isPending: {
            true: 'contrast-75',
        },
    },
    defaultVariants: {
        variant: 'primary',
        size: 'medium',
    },
});
function Button(props) {
    return (<react_aria_components_1.Button {...props} className={(0, react_aria_components_1.composeRenderProps)(props.className, function (className, renderProps) {
            return button(__assign(__assign({}, renderProps), { variant: props.variant, size: props.size, className: className }));
        })}>
      {(0, react_aria_components_1.composeRenderProps)(props.children, function (children) { return (<>
          {children}
          {props.isPending && (<span className="ml-2">
              <Spinner_1.Spinner />
            </span>)}
        </>); })}
    </react_aria_components_1.Button>);
}
