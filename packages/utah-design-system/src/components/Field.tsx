import { forwardRef, type ForwardedRef } from 'react';
import {
  composeRenderProps,
  Group,
  FieldError as RACFieldError,
  Input as RACInput,
  Label as RACLabel,
  TextArea as RACTextArea,
  Text,
  type FieldErrorProps,
  type GroupProps,
  type InputProps,
  type LabelProps,
  type TextAreaProps,
  type TextProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { composeTailwindRenderProps, focusRing } from './utils';

export function Label(props: LabelProps) {
  return (
    <RACLabel
      {...props}
      className={twMerge(
        'w-fit cursor-default text-sm font-medium text-zinc-700 dark:text-zinc-300',
        props.className,
      )}
    />
  );
}

export function Description(props: TextProps) {
  return (
    <Text
      {...props}
      slot="description"
      className={twMerge('text-sm text-gray-600', props.className)}
    />
  );
}

export function FieldError(props: FieldErrorProps) {
  return (
    <RACFieldError
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'text-sm text-warning-600 forced-colors:text-[Mark]',
      )}
    />
  );
}

export const fieldBorderStyles = tv({
  variants: {
    isFocusWithin: {
      false:
        'border-transparent dark:border-zinc-500 forced-colors:border-[ButtonBorder]',
      true: 'border-primary-900 dark:border-zinc-500 forced-colors:border-[Highlight]',
    },
    isInvalid: {
      true: 'border-warning-600 dark:border-warning-600 forced-colors:border-[Mark]',
    },
    isDisabled: {
      true: 'border-gray-200 dark:border-zinc-700 forced-colors:border-[GrayText]',
    },
  },
});

export const fieldGroupStyles = tv({
  extend: focusRing,
  base: 'group flex h-9 items-center overflow-hidden rounded-lg border-2 bg-white dark:bg-zinc-900 forced-colors:bg-[Field]',
  variants: fieldBorderStyles.variants,
});

export function FieldGroup(props: GroupProps) {
  return (
    <Group
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        fieldGroupStyles({ ...renderProps, className }),
      )}
    />
  );
}

export const Input = forwardRef(function Input(
  props: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <RACInput
      {...props}
      ref={ref}
      className={composeTailwindRenderProps(
        props.className,
        'min-w-0 flex-1 bg-white px-2 py-1.5 text-sm text-zinc-800 shadow ring-1 ring-zinc-900/5 disabled:text-gray-200 dark:border-zinc-200/40 dark:bg-zinc-900 dark:text-zinc-200 dark:disabled:text-zinc-600',
      )}
    />
  );
});

export const TextAreaInput = forwardRef(function TextAreaInput(
  props: TextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>,
) {
  return (
    <RACTextArea
      {...props}
      ref={ref}
      className={composeTailwindRenderProps(
        props.className,
        'min-w-0 flex-1 bg-white px-2 py-1.5 text-sm text-zinc-800 shadow ring-1 ring-zinc-900/5 disabled:text-gray-200 dark:border-zinc-200/40 dark:bg-zinc-900 dark:text-zinc-200 dark:disabled:text-zinc-600',
      )}
    />
  );
});
