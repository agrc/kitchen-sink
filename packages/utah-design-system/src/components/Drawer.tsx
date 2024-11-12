import type { DOMProps } from '@react-types/shared';
import { ChevronDownIcon, ChevronLeftIcon, FullscreenIcon } from 'lucide-react';
import { useState } from 'react';
import {
  type AriaButtonProps,
  FocusScope,
  useOverlayTrigger,
} from 'react-aria';
import type { OverlayTriggerState } from 'react-stately';
import { twJoin, twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { Button } from './Button';

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
    container: 'shrink-0 duration-500 ease-in-out',
    content: 'bg-white duration-500 ease-in-out dark:bg-zinc-800',
    triggerButton:
      'absolute z-10 flex justify-center overflow-hidden rounded border border-zinc-200 bg-white p-1 hover:border-zinc-300 hover:bg-slate-200 pressed:bg-slate-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-900 dark:pressed:bg-slate-100',
  },
  variants: {
    type: {
      sidebar: {
        container:
          "relative h-full w-80 transition-[width] data-[open='false']:w-0",
        content:
          "h-full w-80 overflow-y-auto data-[open='false']:-translate-x-full data-[open='true']:translate-x-0",
        triggerButton:
          '-right-[25px] top-[calc(50%-24px)] h-10 flex-col rounded-l-none border-l-0 dark:border-zinc-700 dark:bg-zinc-800',
      },
      tray: {
        container:
          'absolute inset-x-0 bottom-0 h-80 transition-[height] data-[open="false"]:h-0 data-[open="true"]:h-80',
        content:
          "overflow-x-auto border-t bg-zinc-50 data-[open='false']:h-0 data-[open='true']:translate-y-0 data-[open='false']:overflow-hidden dark:bg-zinc-700",
        triggerButton:
          '-top-6 bottom-[calc(100%)] left-[calc(50%-24px)] min-h-[25px] w-10 rounded-b-none border-b-0 bg-zinc-50 py-0 dark:border-zinc-800 dark:bg-zinc-700',
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
      size: 'normal',
      class: {
        content: "data-[open='true']:h-80",
      },
    },
    {
      type: 'tray',
      size: 'fullscreen',
      class: {
        container:
          'data-[open="true"]:fixed data-[open="true"]:z-30 data-[open="true"]:h-full',
        content: 'data-[open="true"]:h-full',
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
        buttonClassName={css.triggerButton()}
      />
    </div>
  );
};

export type DefaultDrawerTriggerProps = {
  triggerProps: AriaButtonProps;
  Icon: React.ElementType;
  state: OverlayTriggerState;
  buttonClassName?: string;
};

const DefaultDrawerTrigger = ({
  triggerProps,
  Icon,
  state,
  buttonClassName,
}: DefaultDrawerTriggerProps) => {
  return (
    <Button
      className={buttonClassName}
      {...triggerProps}
      variant="icon"
      onPress={state.toggle}
      aria-label="Close the drawer"
    >
      <Icon
        className={twJoin(
          'w-4 text-zinc-900 transition-transform duration-500 dark:text-white',
          !state.isOpen ? '-rotate-180' : '',
        )}
      />
    </Button>
  );
};
