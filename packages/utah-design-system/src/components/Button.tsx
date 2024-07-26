import React from 'react';
import {
  composeRenderProps,
  Button as RACButton,
  ButtonProps as RACButtonProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRing } from './utils';

export interface ButtonProps extends RACButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'destructive' | 'icon';
}

let button = tv({
  extend: focusRing,
  base: 'px-5 py-2 text-sm text-center transition border border-black/10 dark:border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] dark:shadow-none cursor-default',
  variants: {
    variant: {
      primary:
        'rounded-full bg-primary-900 hover:bg-primary-700 pressed:bg-primary-800 text-white',
      secondary:
        'rounded-full bg-secondary-800 hover:bg-secondary-600 pressed:bg-secondary-700 text-white',
      accent:
        'rounded-full bg-accent-500 hover:bg-accent-300 pressed:bg-accent-400 text-zinc-900',
      destructive:
        'rounded-full bg-rose-700 hover:bg-rose-800 pressed:bg-rose-900 text-white',
      icon: 'border-0 p-1 flex items-center justify-center text-zinc-900 hover:bg-black/5 pressed:bg-black/10 dark:text-zinc-300 dark:hover:bg-white/10 dark:pressed:bg-white/20 disabled:bg-transparent',
    },
    isDisabled: {
      true: 'bg-zinc-100 dark:bg-zinc-500 text-zinc-500 dark:text-zinc-100 border-black/20 dark:border-white/20',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export function Button(props: ButtonProps) {
  return (
    <RACButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        button({ ...renderProps, variant: props.variant, className }),
      )}
    />
  );
}
