import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';
import {
  Select as AriaSelect,
  type SelectProps as AriaSelectProps,
  Button,
  ListBox,
  type ListBoxItemProps,
  SelectValue,
  type ValidationResult,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { Description, FieldError, Label } from './Field';
import {
  DropdownItem,
  DropdownSection,
  type DropdownSectionProps,
} from './ListBox';
import { Popover } from './Popover';
import { composeTailwindRenderProps, focusRing } from './utils';

const styles = tv({
  extend: focusRing,
  base: 'relative flex w-full cursor-default items-center gap-4 rounded-md border border-transparent bg-white py-1.5 pl-3 pr-2 text-start text-zinc-800 shadow ring-1 ring-zinc-900/5 transition dark:border-zinc-200/40 dark:bg-zinc-900 dark:text-zinc-200',
  variants: {
    isDisabled: {
      false:
        'text-gray-800 group-invalid:border-rose-600 hover:bg-gray-100 pressed:bg-gray-200 dark:text-zinc-300 dark:hover:bg-zinc-600 dark:pressed:bg-zinc-500 forced-colors:group-invalid:border-[Mark]',
      true: 'border-gray-200 text-gray-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-600',
    },
  },
});

export interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, 'children'> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  children: ReactNode | ((item: T) => ReactNode);
}

export function Select<T extends object>({
  label,
  description,
  errorMessage,
  children,
  items,
  ...props
}: SelectProps<T>) {
  return (
    <AriaSelect
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'group flex flex-col gap-1',
      )}
    >
      {label && <Label>{label}</Label>}
      <Button className={styles}>
        <SelectValue className="min-h-5 flex-1 text-sm placeholder-shown:italic" />
        <ChevronDown
          aria-hidden
          className="h-4 w-4 text-gray-600 group-disabled:text-gray-200 dark:text-zinc-400 dark:group-disabled:text-zinc-600 forced-colors:text-[ButtonText] forced-colors:group-disabled:text-[GrayText]"
        />
      </Button>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="min-w-[--trigger-width]">
        <ListBox
          items={items}
          className="max-h-[inherit] overflow-auto p-1 outline-none [clip-path:inset(0_0_0_0_round_.75rem)]"
        >
          {children}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}

export function SelectItem(props: ListBoxItemProps) {
  return <DropdownItem {...props} />;
}

export function SelectSection<T extends object>(
  props: DropdownSectionProps<T>,
) {
  return <DropdownSection {...props} />;
}
