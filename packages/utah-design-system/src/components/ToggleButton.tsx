import {
  ToggleButton as RACToggleButton,
  type ToggleButtonProps,
  composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRing } from './utils';

let styles = tv({
  extend: focusRing,
  base: 'min-h-9 cursor-default rounded-full border border-black/10 px-8 text-center text-base shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition dark:border-white/10 dark:shadow-none [&:has(svg:only-child)]:min-h-0 [&:has(svg:only-child)]:p-0.5',
  variants: {
    isSelected: {
      false:
        'bg-gray-100 text-gray-800 hover:bg-gray-200 pressed:bg-gray-300 dark:bg-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-500 dark:pressed:bg-zinc-400 forced-colors:!bg-[ButtonFace] forced-colors:!text-[ButtonText]',
      true: 'bg-gray-700 text-white hover:bg-gray-800 pressed:bg-gray-900 dark:bg-accent-300 dark:text-black dark:hover:bg-accent-200 dark:pressed:bg-accent-100 forced-colors:!bg-[Highlight] forced-colors:!text-[HighlightText]',
    },
    isDisabled: {
      true: 'border-black/5 bg-gray-100 text-gray-300 dark:border-white/5 dark:bg-zinc-800 dark:text-zinc-600 forced-colors:border-[GrayText] forced-colors:!bg-[ButtonFace] forced-colors:!text-[GrayText]',
    },
  },
});

export function ToggleButton(props: ToggleButtonProps) {
  return (
    <RACToggleButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        styles({ ...renderProps, className }),
      )}
    />
  );
}
