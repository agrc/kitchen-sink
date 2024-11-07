import { AriaButtonProps, FocusScope, useOverlayTrigger } from 'react-aria';
import { DOMProps } from '@react-types/shared';
import { Button } from './Button';
import { ChevronLeftIcon, ChevronDownIcon, FullscreenIcon } from 'lucide-react';
import { twJoin, twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { useState } from 'react';
import { OverlayTriggerState } from 'react-stately';

/*
Getting Started

`npm install react-aria react-stately`

const drawerState = useOverlayTriggerState({});
const drawerTriggerProps = useOverlayTrigger(
  {
    type: 'dialog',
  },
  drawerState,
);

<Drawer state={drawerState} {...drawerTriggerProps}>
  <div className='p-4'>Drawer Content</div>
</Drawer>

*/
/* default to open
  const drawerState = useOverlayTrigger({ defaultOpen: true });
  <Drawer state={drawerState} />
*/

const drawer = tv({
  slots: {
    container: 'shrink-0 bg-white duration-500 ease-in-out dark:bg-zinc-800',
    content: 'duration-500 ease-in-out',
    trigger:
      'group/trigger absolute z-10 overflow-hidden rounded border border-zinc-200 bg-white hover:border-zinc-300 dark:hover:border-zinc-600',
    triggerButton:
      'flex items-center justify-center rounded-none border-0 bg-transparent p-1 shadow-md hover:bg-current group-hover/trigger:bg-black/10 dark:group-hover/trigger:bg-white/10',
  },
  variants: {
    type: {
      sidebar: {
        container:
          "relative h-full w-80 transition-[width] data-[open='false']:w-0",
        content:
          "h-full w-80 overflow-y-auto data-[open='false']:-translate-x-full data-[open='true']:translate-x-0",
        trigger:
          '-right-8 top-[calc(50%-24px)] h-10 w-6 rounded-l-none dark:border-zinc-700 dark:bg-zinc-800',
        triggerButton: 'h-10 w-full',
      },
      tray: {
        container:
          'absolute inset-x-0 bottom-0 h-80 bg-zinc-50 transition-[height] data-[open="false"]:h-0 data-[open="true"]:h-80 dark:bg-zinc-700',
        content:
          "overflow-x-auto data-[open='false']:h-0 data-[open='true']:h-80 data-[open='true']:translate-y-0 data-[open='false']:overflow-hidden",
        trigger:
          '-top-6 -top-[1.4rem] left-[calc(50%-24px)] h-6 w-10 rounded-b-none bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-700',
        triggerButton: 'h-6 w-10',
      },
    },
    size: {
      normal: null,
      fullscreen: null,
    },
  },
  defaultVariants: {
    type: 'sidebar',
    size: 'normal',
  },
  compoundVariants: [
    {
      type: 'tray',
      size: 'fullscreen',
      class: {
        container:
          'data-[open="true"]:fixed data-[open="true"]:z-30 data-[open="true"]:h-full',
      },
    },
    {
      type: 'sidebar',
      size: 'fullscreen',
      class: {
        container: 'data-[open="true"]:w-full',
        content: 'data-[open="true"]:w-full',
      },
    },
  ],
});

export type DrawerProps = {
  allowFullScreen?: boolean; // set to true to show the fullscreen button
  children: React.ReactNode;
  className?: string;
  main?: boolean;
  overlayProps: DOMProps;
  state: OverlayTriggerState;
  triggerProps: AriaButtonProps;
  type?: 'sidebar' | 'tray';
};

export const Drawer = ({
  children,
  className,
  overlayProps,
  state,
  triggerProps,
  allowFullScreen = false,
  main = false,
  type = 'sidebar',
}: DrawerProps) => {
  const [size, setSize] = useState<'normal' | 'fullscreen'>('normal');
  if (!triggerProps || !overlayProps) {
    throw new Error('You must provide both triggerProps and overlayProps');
  }

  let {
    triggerProps: internalTriggerProps,
    overlayProps: internalOverlayProps,
  } = useOverlayTrigger({ type: 'dialog' }, state);

  const css = drawer({ type, size });

  return (
    <div
      data-open={state.isOpen}
      className={twMerge(css.container(), className)}
      id={main ? 'main-content' : undefined}
    >
      <FocusScope contain={size === 'fullscreen'} restoreFocus>
        <aside
          data-open={state.isOpen}
          className={css.content()}
          {...(overlayProps || internalOverlayProps)}
        >
          {allowFullScreen && (
            <Button
              aria-label="Toggle full-screen"
              className="absolute right-0 top-0 p-2"
              variant="icon"
              onPress={() =>
                setSize(size === 'normal' ? 'fullscreen' : 'normal')
              }
            >
              <FullscreenIcon className="h-full w-6 shrink-0 text-zinc-900 dark:text-white" />
            </Button>
          )}
          {children}
        </aside>
      </FocusScope>
      <DefaultDrawerTrigger
        triggerProps={triggerProps || internalTriggerProps}
        state={state}
        Icon={type === 'sidebar' ? ChevronLeftIcon : ChevronDownIcon}
        className={css.trigger()}
        buttonClassName={css.triggerButton()}
      />
    </div>
  );
};

export type DefaultDrawerTriggerProps = {
  triggerProps: AriaButtonProps;
  Icon: React.ElementType;
  state: OverlayTriggerState;
  className?: string;
  buttonClassName?: string;
};

const DefaultDrawerTrigger = ({
  triggerProps,
  Icon,
  state,
  className,
  buttonClassName,
}: DefaultDrawerTriggerProps) => {
  return (
    <div className={className}>
      <Button
        className={buttonClassName}
        {...triggerProps}
        onPress={state.toggle}
        aria-label="Close the drawer"
      >
        <Icon
          className={twJoin(
            'h-full w-4 shrink-0 text-zinc-900 transition-transform duration-500 dark:text-white',
            !state.isOpen ? '-rotate-180' : '',
          )}
        />
      </Button>
    </div>
  );
};
