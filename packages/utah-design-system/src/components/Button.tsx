import {
  composeRenderProps,
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRing } from './utils';

export interface ButtonProps extends RACButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'destructive' | 'icon';
  size?: 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';
}

let button = tv({
  extend: focusRing,
  base: 'cursor-default border border-black/10 text-center text-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition dark:border-white/10 dark:shadow-none',
  variants: {
    variant: {
      primary:
        'rounded-full bg-primary-900 text-white hover:bg-primary-700 pressed:bg-primary-800',
      secondary:
        'rounded-full bg-secondary-800 text-white hover:bg-secondary-600 pressed:bg-secondary-700',
      accent:
        'rounded-full bg-accent-500 text-zinc-900 hover:bg-accent-300 pressed:bg-accent-400',
      destructive:
        'rounded-full bg-rose-700 text-white hover:bg-rose-800 pressed:bg-rose-900',
      icon: 'flex items-center justify-center border-0 p-1 text-zinc-900 hover:bg-black/5 pressed:bg-black/10 disabled:bg-transparent dark:text-zinc-300 dark:hover:bg-white/10 dark:pressed:bg-white/20',
    },
    size: {
      extraSmall: 'min-h-6 px-2 text-xs',
      small: 'min-h-[1.875rem] px-4 text-sm',
      medium: 'min-h-9 px-8 text-base',
      large: 'min-h-10 px-8 text-lg',
      extraLarge: 'min-h-[3.125rem] px-10 text-xl',
    },
    isDisabled: {
      true: 'hover:none border-black/20 bg-zinc-100 text-zinc-500 dark:border-white/20 dark:bg-zinc-500 dark:text-zinc-100',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
});

export function Button(props: ButtonProps) {
  return (
    <RACButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        button({
          ...renderProps,
          variant: props.variant,
          size: props.size,
          className,
        }),
      )}
    />
  );
}
