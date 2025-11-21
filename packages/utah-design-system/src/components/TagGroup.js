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
exports.TagGroup = TagGroup;
exports.Tag = Tag;
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var react_aria_components_1 = require("react-aria-components");
var tailwind_merge_1 = require("tailwind-merge");
var tailwind_variants_1 = require("tailwind-variants");
var Field_1 = require("./Field");
var utils_1 = require("./utils");
var colors = {
    gray: 'bg-gray-100 text-gray-600 border-gray-200 hover:border-gray-300 dark:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-600 dark:hover:border-zinc-500',
    primary: 'bg-primary-100 text-primary-700 border-primary-200 hover:border-primary-300 dark:bg-primary-300/20 dark:text-primary-400 dark:border-primary-300/10 dark:hover:border-primary-300/20',
    secondary: 'bg-secondary-100 text-secondary-700 border-secondary-200 hover:border-secondary-300 dark:bg-secondary-300/20 dark:text-secondary-400 dark:border-secondary-300/10 dark:hover:border-secondary-300/20',
    accent: 'bg-accent-100 text-accent-700 border-accent-200 hover:border-accent-300 dark:bg-accent-400/20 dark:text-accent-300 dark:border-accent-400/10 dark:hover:border-accent-400/20',
};
var ColorContext = (0, react_1.createContext)('gray');
var tagStyles = (0, tailwind_variants_1.tv)({
    extend: utils_1.focusRing,
    base: 'flex max-w-fit cursor-default items-center gap-1 rounded-md border px-3 py-0.5 text-xs transition',
    variants: {
        color: {
            gray: '',
            primary: '',
            secondary: '',
            accent: '',
        },
        allowsRemoving: {
            true: 'pr-1',
        },
        isSelected: {
            true: 'border-transparent bg-primary-800 text-white forced-color-adjust-none forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]',
        },
        isDisabled: {
            true: 'bg-gray-100 text-gray-400 dark:border-white/20 dark:bg-transparent dark:text-zinc-400 forced-colors:text-[GrayText]',
        },
    },
    compoundVariants: Object.keys(colors).map(function (color) { return ({
        isSelected: false,
        isDisabled: false,
        color: color,
        class: colors[color],
    }); }),
});
function TagGroup(_a) {
    var label = _a.label, description = _a.description, errorMessage = _a.errorMessage, items = _a.items, children = _a.children, renderEmptyState = _a.renderEmptyState, props = __rest(_a, ["label", "description", "errorMessage", "items", "children", "renderEmptyState"]);
    return (<react_aria_components_1.TagGroup {...props} className={(0, tailwind_merge_1.twMerge)('flex flex-col gap-1', props.className)}>
      <Field_1.Label>{label}</Field_1.Label>
      <ColorContext.Provider value={props.color || 'gray'}>
        <react_aria_components_1.TagList items={items} renderEmptyState={renderEmptyState} className="flex flex-wrap gap-1">
          {children}
        </react_aria_components_1.TagList>
      </ColorContext.Provider>
      {description && <Field_1.Description>{description}</Field_1.Description>}
      {errorMessage && (<react_aria_components_1.Text slot="errorMessage" className="text-sm text-warning-600">
          {errorMessage}
        </react_aria_components_1.Text>)}
    </react_aria_components_1.TagGroup>);
}
var removeButtonStyles = (0, tailwind_variants_1.tv)({
    extend: utils_1.focusRing,
    base: 'flex cursor-default items-center justify-center rounded-full p-0.5 transition-[background-color] hover:bg-black/10 pressed:bg-black/20 dark:hover:bg-white/10 dark:pressed:bg-white/20',
});
function Tag(_a) {
    var children = _a.children, color = _a.color, props = __rest(_a, ["children", "color"]);
    var textValue = typeof children === 'string' ? children : undefined;
    var groupColor = (0, react_1.useContext)(ColorContext);
    return (<react_aria_components_1.Tag textValue={textValue} {...props} className={(0, react_aria_components_1.composeRenderProps)(props.className, function (className, renderProps) {
            return tagStyles(__assign(__assign({}, renderProps), { className: className, color: color || groupColor }));
        })}>
      {function (_a) {
            var allowsRemoving = _a.allowsRemoving;
            return (<>
          {children}
          {allowsRemoving && (<react_aria_components_1.Button slot="remove" className={removeButtonStyles}>
              <lucide_react_1.XIcon aria-hidden className="h-auto w-3"/>
            </react_aria_components_1.Button>)}
        </>);
        }}
    </react_aria_components_1.Tag>);
}
