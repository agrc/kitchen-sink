import { CheckIcon, MinusIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import {
  Checkbox as AriaCheckbox,
  CheckboxGroup as AriaCheckboxGroup,
  type CheckboxGroupProps as AriaCheckboxGroupProps,
  type CheckboxProps,
  type ValidationResult,
  composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { Description, FieldError, Label } from './Field';
import { composeTailwindRenderProps, focusRing } from './utils';

export interface CheckboxGroupProps
  extends Omit<AriaCheckboxGroupProps, 'children'> {
  label?: string;
  children?: ReactNode;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function CheckboxGroup(props: CheckboxGroupProps) {
  return (
    <AriaCheckboxGroup
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'flex flex-col gap-2',
      )}
    >
      <Label>{props.label}</Label>
      {props.children}
      {props.description && <Description>{props.description}</Description>}
      <FieldError>{props.errorMessage}</FieldError>
    </AriaCheckboxGroup>
  );
}

const checkboxStyles = tv({
  base: 'group flex items-center gap-2 text-sm transition pressed:bg-zinc-100 dark:pressed:bg-zinc-800',
  variants: {
    isDisabled: {
      false: 'text-gray-800 dark:text-zinc-200',
      true: 'text-gray-300 dark:text-zinc-600 forced-colors:text-[GrayText]',
    },
  },
});

const boxStyles = tv({
  extend: focusRing,
  base: 'flex size-5 shrink-0 items-center justify-center rounded border-2 transition',
  variants: {
    isSelected: {
      false:
        'border-[--color] bg-white [--color:theme(colors.secondary.800)] group-pressed:[--color:theme(colors.secondary.600)] dark:bg-zinc-900 dark:[--color:theme(colors.secondary.400)] dark:group-pressed:[--color:theme(colors.secondary.600)]',
      true: 'border-[--color] bg-[--color] [--color:theme(colors.secondary.800)] group-pressed:[--color:theme(colors.secondary.700)] dark:[--color:theme(colors.secondary.500)] dark:group-pressed:[--color:theme(colors.secondary.800)]',
    },
    isInvalid: {
      true: '[--color:theme(colors.warning.700)] group-pressed:[--color:theme(colors.warning.800)] dark:[--color:theme(colors.warning.600)] dark:group-pressed:[--color:theme(colors.warning.700)] forced-colors:![--color:Mark]',
    },
    isDisabled: {
      true: '[--color:theme(colors.gray.200)] dark:[--color:theme(colors.zinc.700)] forced-colors:![--color:GrayText]',
    },
  },
});

const iconStyles =
  'w-full stroke-[4] h-4 text-white group-disabled:text-gray-400 dark:text-white dark:group-disabled:text-slate-600 forced-colors:text-[HighlightText]';

export function Checkbox(props: CheckboxProps) {
  return (
    <AriaCheckbox
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        checkboxStyles({ ...renderProps, className }),
      )}
    >
      {({ isSelected, isIndeterminate, ...renderProps }) => (
        <>
          <div
            className={boxStyles({
              isSelected: isSelected || isIndeterminate,
              ...renderProps,
            })}
          >
            {isIndeterminate ? (
              <MinusIcon aria-hidden className={iconStyles} />
            ) : isSelected ? (
              <CheckIcon aria-hidden className={iconStyles} />
            ) : null}
          </div>
          {props.children as ReactNode}
        </>
      )}
    </AriaCheckbox>
  );
}
