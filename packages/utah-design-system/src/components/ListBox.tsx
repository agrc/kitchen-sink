import { CheckIcon } from 'lucide-react';
import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  type ListBoxProps as AriaListBoxProps,
  Collection,
  Header,
  type ListBoxItemProps,
  Section,
  type SectionProps,
  composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { composeTailwindRenderProps, focusRing } from './utils';

export function ListBox<T extends object>({
  children,
  ...props
}: Omit<AriaListBoxProps<T>, 'layout' | 'orientation'>) {
  return (
    <AriaListBox
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'rounded-lg border border-gray-300 p-1 outline-0 dark:border-zinc-600',
      )}
    >
      {children}
    </AriaListBox>
  );
}

export const itemStyles = tv({
  extend: focusRing,
  base: 'group relative flex cursor-default select-none items-center gap-8 rounded-md px-2.5 py-1.5 text-sm will-change-transform forced-color-adjust-none',
  variants: {
    isSelected: {
      false:
        'text-slate-700 -outline-offset-2 hover:bg-slate-200 dark:text-zinc-300 dark:hover:bg-zinc-700',
      true: 'bg-secondary-600 text-white -outline-offset-4 outline-white dark:outline-white forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:outline-[HighlightText] [&+[data-selected]]:rounded-t-none [&:has(+[data-selected])]:rounded-b-none',
    },
    isDisabled: {
      true: 'text-slate-300 dark:text-zinc-600 forced-colors:text-[GrayText]',
    },
  },
});

export function ListBoxItem(props: ListBoxItemProps) {
  const textValue =
    props.textValue ||
    (typeof props.children === 'string' ? props.children : undefined);
  return (
    <AriaListBoxItem {...props} textValue={textValue} className={itemStyles}>
      {composeRenderProps(props.children, (children) => (
        <>
          {children}
          <div className="absolute bottom-0 left-4 right-4 hidden h-px bg-white/20 forced-colors:bg-[HighlightText] [.group[data-selected]:has(+[data-selected])_&]:block" />
        </>
      ))}
    </AriaListBoxItem>
  );
}

export const dropdownItemStyles = tv({
  base: 'group flex cursor-default select-none items-center gap-4 rounded-lg py-2 pl-3 pr-1 text-sm outline outline-0 forced-color-adjust-none',
  variants: {
    isDisabled: {
      false: 'text-gray-900 dark:text-zinc-100',
      true: 'text-gray-300 dark:text-zinc-600 forced-colors:text-[GrayText]',
    },
    isFocused: {
      true: 'bg-secondary-600 text-white forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]',
    },
  },
  compoundVariants: [
    {
      isFocused: false,
      isOpen: true,
      className: 'bg-gray-100 dark:bg-zinc-700/60',
    },
  ],
});

export function DropdownItem(props: ListBoxItemProps) {
  const textValue =
    props.textValue ||
    (typeof props.children === 'string' ? props.children : undefined);
  return (
    <AriaListBoxItem
      {...props}
      textValue={textValue}
      className={dropdownItemStyles}
    >
      {composeRenderProps(props.children, (children, { isSelected }) => (
        <>
          <span className="flex flex-1 items-center gap-2 truncate font-normal group-selected:font-semibold">
            {children}
          </span>
          <span className="flex w-5 items-center">
            {isSelected && <CheckIcon className="h-full w-4 stroke-[4]" />}
          </span>
        </>
      ))}
    </AriaListBoxItem>
  );
}

export interface DropdownSectionProps<T> extends SectionProps<T> {
  title?: string;
}

export function DropdownSection<T extends object>(
  props: DropdownSectionProps<T>,
) {
  return (
    <Section className="after:block after:h-[5px] after:content-[''] first:-mt-[5px]">
      <Header className="sticky -top-[5px] z-10 -mx-1 -mt-px truncate border-y bg-gray-100/60 px-4 py-1 text-sm font-semibold text-gray-500 backdrop-blur-md supports-[-moz-appearance:none]:bg-gray-100 dark:border-y-zinc-700 dark:bg-zinc-700/60 dark:text-zinc-300 [&+*]:mt-1">
        {props.title}
      </Header>
      <Collection items={props.items}>{props.children}</Collection>
    </Section>
  );
}
