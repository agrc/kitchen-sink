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
exports.ExternalLink = void 0;
exports.Link = Link;
var lucide_react_1 = require("lucide-react");
var react_aria_components_1 = require("react-aria-components");
var tailwind_variants_1 = require("tailwind-variants");
var utils_1 = require("./utils");
var styles = (0, tailwind_variants_1.tv)({
    extend: utils_1.focusRing,
    base: 'rounded underline transition disabled:cursor-default disabled:no-underline',
    variants: {
        variant: {
            primary: 'text-secondary-800 decoration-secondary-800/60 hover:decoration-secondary-800 dark:text-accent-500 dark:decoration-accent-500/60 dark:hover:decoration-accent-500',
            secondary: 'text-primary-900 decoration-primary-900/50 hover:decoration-primary-900 dark:text-primary-500 dark:decoration-primary-500/60 dark:hover:decoration-primary-500',
        },
        quiet: {
            true: '',
        },
    },
    defaultVariants: {
        variant: 'primary',
        quiet: false,
    },
    compoundVariants: [
        {
            variant: ['primary', 'secondary'],
            quiet: true,
            className: 'text-zinc-100 decoration-zinc-100/50 hover:decoration-zinc-100 dark:text-zinc-100 dark:decoration-zinc-100/50',
        },
    ],
});
function Link(props) {
    return (<react_aria_components_1.Link {...props} className={(0, react_aria_components_1.composeRenderProps)(props.className, function (className, renderProps) {
            return styles(__assign(__assign({}, renderProps), { className: className, variant: props.variant, quiet: props.quiet }));
        })}/>);
}
var ExternalLink = function (props) { return (<Link {...props} target="_blank" rel="noopener noreferrer nofollow" className="m-0 inline-flex cursor-pointer flex-wrap items-center gap-x-0.5">
    {props.children}
    <span aria-hidden="true">
      <lucide_react_1.SquareArrowOutUpRightIcon className="h-full w-4"/>
    </span>
    <span className="sr-only">opens in a new window</span>
  </Link>); };
exports.ExternalLink = ExternalLink;
