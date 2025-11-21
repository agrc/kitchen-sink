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
exports.Slider = Slider;
var react_aria_components_1 = require("react-aria-components");
var tailwind_variants_1 = require("tailwind-variants");
var Field_1 = require("./Field");
var utils_1 = require("./utils");
var trackStyles = (0, tailwind_variants_1.tv)({
    base: 'rounded-full',
    variants: {
        orientation: {
            horizontal: 'h-1 w-full',
            vertical: 'ml-[50%] h-full w-1 -translate-x-[50%]',
        },
        isDisabled: {
            false: 'bg-gray-400 dark:bg-zinc-500 forced-colors:bg-[ButtonBorder]',
            true: 'bg-gray-100 dark:bg-zinc-800 forced-colors:bg-[GrayText]',
        },
    },
});
var thumbStyles = (0, tailwind_variants_1.tv)({
    extend: utils_1.focusRing,
    base: 'size-6 rounded-full border-[3px] border-secondary-800 bg-white group-orientation-horizontal/track:mt-6 group-orientation-vertical/track:ml-3 hover:bg-secondary-100 dark:border-secondary-400 dark:bg-zinc-900 hover:dark:bg-zinc-800',
    variants: {
        isDragging: {
            true: 'dragging:bg-secondary-50 dragging:dark:bg-secondary-950 forced-colors:bg-[ButtonBorder]',
        },
        isDisabled: {
            true: 'border-gray-200 dark:border-zinc-700 forced-colors:border-[GrayText]',
        },
    },
});
function getTrackStyle(range, orientation) {
    if (orientation === 'vertical') {
        return {
            top: "".concat((1 - range) * 100, "%"),
        };
    }
    return {
        width: "".concat(range * 100, "%"),
    };
}
function Slider(_a) {
    var label = _a.label, thumbLabels = _a.thumbLabels, props = __rest(_a, ["label", "thumbLabels"]);
    return (<react_aria_components_1.Slider {...props} className={(0, utils_1.composeTailwindRenderProps)(props.className, 'grid-cols-[1fr_auto] flex-col items-center gap-2 orientation-horizontal:grid orientation-vertical:flex')}>
      <Field_1.Label>{label}</Field_1.Label>
      <react_aria_components_1.SliderOutput className="text-sm font-medium text-gray-500 orientation-vertical:hidden dark:text-zinc-400">
        {function (_a) {
            var state = _a.state;
            return state.values.map(function (_, i) { return state.getThumbValueLabel(i); }).join(' – ');
        }}
      </react_aria_components_1.SliderOutput>
      <react_aria_components_1.SliderTrack className="group/track col-span-2 flex items-center orientation-horizontal:h-6 orientation-horizontal:w-full orientation-vertical:h-full orientation-vertical:w-6">
        {function (_a) {
            var state = _a.state, renderProps = __rest(_a, ["state"]);
            return (<>
            <div className={trackStyles(renderProps)}/>
            {props.defaultValue &&
                    (typeof props.defaultValue === 'number' ||
                        (Array.isArray(props.defaultValue) &&
                            props.defaultValue.length === 1)) && (<div className="absolute rounded-full bg-secondary-400 group-orientation-horizontal/track:top-[50%] group-orientation-horizontal/track:h-1 group-orientation-horizontal/track:translate-y-[-50%] group-orientation-vertical/track:bottom-0 group-orientation-vertical/track:left-[50%] group-orientation-vertical/track:w-1 group-orientation-vertical/track:-translate-x-[50%] dark:bg-secondary-600" style={getTrackStyle(state.getThumbPercent(0), props.orientation)}/>)}
            {state.values.map(function (_, i) { return (<react_aria_components_1.SliderThumb key={i} index={i} aria-label={thumbLabels === null || thumbLabels === void 0 ? void 0 : thumbLabels[i]} className={thumbStyles}/>); })}
          </>);
        }}
      </react_aria_components_1.SliderTrack>
    </react_aria_components_1.Slider>);
}
