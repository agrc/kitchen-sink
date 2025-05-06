import { CircleChevronDownIcon } from 'lucide-react';
import React, { useContext } from 'react';
import {
  Disclosure as AriaDisclosure,
  DisclosureGroup as AriaDisclosureGroup,
  type DisclosureGroupProps as AriaDisclosureGroupProps,
  DisclosurePanel as AriaDisclosurePanel,
  type DisclosurePanelProps as AriaDisclosurePanelProps,
  type DisclosureProps as AriaDisclosureProps,
  Button,
  composeRenderProps,
  DisclosureStateContext,
  Heading,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { composeTailwindRenderProps, focusRing } from './utils';

const disclosure = tv({
  base: 'group min-w-64 rounded-lg text-gray-900 dark:text-zinc-100',
});

const disclosureButton = tv({
  extend: focusRing,
  base: 'flex w-full cursor-default items-center justify-between gap-2 rounded-lg bg-primary-900 p-2 text-start text-white aria-expanded:rounded-b-none hover:bg-primary-700 pressed:bg-primary-800',
  variants: {
    isDisabled: {
      true: 'text-gray-300 dark:text-primary-300 forced-colors:text-[GrayText]',
    },
  },
});

const chevron = tv({
  base: 'size-5 transition-transform duration-200 ease-in-out',
  variants: {
    isExpanded: {
      true: 'rotate-180 transform',
    },
    isDisabled: {
      true: 'text-gray-300 dark:text-primary-300 forced-colors:text-[GrayText]',
    },
  },
});

export interface DisclosureProps extends AriaDisclosureProps {
  children: React.ReactNode;
}

export function Disclosure({ children, ...props }: DisclosureProps) {
  return (
    <AriaDisclosure
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        disclosure({ ...renderProps, className }),
      )}
    >
      {children}
    </AriaDisclosure>
  );
}

export interface DisclosureHeaderProps {
  children: React.ReactNode;
}

export function DisclosureHeader({ children }: DisclosureHeaderProps) {
  const { isExpanded } = useContext(DisclosureStateContext)!;

  return (
    <Heading className="text-lg font-semibold">
      <Button
        slot="trigger"
        className={(renderProps) => disclosureButton({ ...renderProps })}
      >
        {({ isDisabled }) => (
          <>
            {children}
            <CircleChevronDownIcon
              aria-hidden
              className={chevron({ isExpanded, isDisabled })}
            />
          </>
        )}
      </Button>
    </Heading>
  );
}

export interface DisclosurePanelProps extends AriaDisclosurePanelProps {
  children: React.ReactNode;
}

export function DisclosurePanel({ children, ...props }: DisclosurePanelProps) {
  return (
    <AriaDisclosurePanel
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'rounded-b-lg bg-gray-100 group-data-[expanded]:px-4 group-data-[expanded]:py-2 dark:bg-black',
      )}
    >
      {children}
    </AriaDisclosurePanel>
  );
}

export interface DisclosureGroupProps extends AriaDisclosureGroupProps {
  children: React.ReactNode;
}

export function DisclosureGroup({ children, ...props }: DisclosureGroupProps) {
  return (
    <AriaDisclosureGroup
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'space-y-2 rounded-lg',
      )}
    >
      {children}
    </AriaDisclosureGroup>
  );
}
