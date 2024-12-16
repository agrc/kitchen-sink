import {
  Slider as AriaSlider,
  type SliderProps as AriaSliderProps,
  SliderOutput,
  SliderThumb,
  SliderTrack,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { Label } from './Field';
import { composeTailwindRenderProps, focusRing } from './utils';

const trackStyles = tv({
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

const thumbStyles = tv({
  extend: focusRing,
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

export interface SliderProps<T> extends AriaSliderProps<T> {
  label?: string;
  thumbLabels?: string[];
}

function getTrackStyle(range: number, orientation?: string) {
  if (orientation === 'vertical') {
    return {
      top: `${(1 - range) * 100}%`,
    };
  }

  return {
    width: `${range * 100}%`,
  };
}

export function Slider<T extends number | number[]>({
  label,
  thumbLabels,
  ...props
}: SliderProps<T>) {
  return (
    <AriaSlider
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'grid-cols-[1fr_auto] flex-col items-center gap-2 orientation-horizontal:grid orientation-vertical:flex',
      )}
    >
      <Label>{label}</Label>
      <SliderOutput className="text-sm font-medium text-gray-500 orientation-vertical:hidden dark:text-zinc-400">
        {({ state }) =>
          state.values.map((_, i) => state.getThumbValueLabel(i)).join(' – ')
        }
      </SliderOutput>
      <SliderTrack className="group/track col-span-2 flex items-center orientation-horizontal:h-6 orientation-horizontal:w-full orientation-vertical:h-full orientation-vertical:w-6">
        {({ state, ...renderProps }) => (
          <>
            <div className={trackStyles(renderProps)} />
            {props.defaultValue &&
              (typeof props.defaultValue === 'number' ||
                (Array.isArray(props.defaultValue) &&
                  props.defaultValue.length === 1)) && (
                <div
                  className="absolute rounded-full bg-secondary-400 group-orientation-horizontal/track:top-[50%] group-orientation-horizontal/track:h-1 group-orientation-horizontal/track:translate-y-[-50%] group-orientation-vertical/track:bottom-0 group-orientation-vertical/track:left-[50%] group-orientation-vertical/track:w-1 group-orientation-vertical/track:-translate-x-[50%] dark:bg-secondary-600"
                  style={getTrackStyle(
                    state.getThumbPercent(0),
                    props.orientation,
                  )}
                />
              )}
            {state.values.map((_, i) => (
              <SliderThumb
                key={i}
                index={i}
                aria-label={thumbLabels?.[i]}
                className={thumbStyles}
              />
            ))}
          </>
        )}
      </SliderTrack>
    </AriaSlider>
  );
}
