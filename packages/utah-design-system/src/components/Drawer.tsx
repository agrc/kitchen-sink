import { useOverlayTrigger } from 'react-aria';
import { Button } from './Button';
import { ChevronLeftIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { twJoin } from 'tailwind-merge';

/*
Getting Started

`npm install react-aria react-stately`

const drawerState = useOverlayTriggerState({});
const overlayTriggerProps = useOverlayTrigger(
  {
    type: 'dialog',
  },
  drawerState,
);

<Drawer state={drawerState} {...overlayTriggerProps}>
  <div className='p-4'>Drawer Content</div>
</Drawer>

*/
/* default to open
  const state = useOverlayTrigger({ defaultOpen: true });
  <Drawer state={state} />
*/

const sidebarContainer =
  "data-[type='sidebar']:relative data-[type='sidebar']:h-full data-[open='false']:data-[type='sidebar']:w-0 data-[type='sidebar']:w-80 data-[type='sidebar']:transition-[width]";
const sidebarContent =
  "data-[type='sidebar']:h-full data-[type='sidebar']:w-80 data-[type='sidebar']:data-[open='false']:-translate-x-full data-[type='sidebar']:data-[open='true']:translate-x-0 data-[type='sidebar']:overflow-y-auto";
const sidebarTrigger =
  "group-data-[type='sidebar']:-right-8 group-data-[type='sidebar']:top-[calc(50%-24px)] group-data-[type='sidebar']:w-6 group-data-[type='sidebar']:rounded-l-none group-data-[type='sidebar']:border-l-0";
const trayContainer =
  'data-[type="tray"]:absolute data-[type="tray"]:inset-x-0 data-[type="tray"]:bottom-0 data-[type="tray"]:z-20 data-[type="tray"]:h-80 data-[type="tray"]:rounded-t-lg bg-zinc-900 data-[type="tray"]:transition-[height] data-[open="false"]:data-[type="tray"]:h-0 data-[open="true"]:data-[type="tray"]:h-80';
const trayContent =
  "data-[type='tray']:h-80 data-[type='tray']:data-[open='false']:overflow-hidden data-[type='tray']:data-[open='true']:translate-y-0 data-[type='tray']:overflow-x-auto";
const trayTrigger =
  "group-data-[type='tray']:-top-6 group-data-[type='tray']:rounded-b-none group-data-[type='tray']:border-b-0 roup-data-[type='tray']:w-10 roup-data-[type='tray']:h-6 roup-data-[type='tray']:-top-6 group-data-[type='tray']:left-[calc(50%)] bg-white";
export const Drawer = ({
  triggerProps,
  overlayProps,
  state,
  children,
  type = 'sidebar',
  main = false,
}) => {
  if (!triggerProps || !overlayProps) {
    throw new Error('You must provide both triggerProps and overlayProps');
  }

  let {
    triggerProps: internalTriggerProps,
    overlayProps: internalOverlayProps,
  } = useOverlayTrigger({ type: 'dialog' }, state);

  return (
    <div
      data-open={state.isOpen}
      data-type={type}
      className={twJoin(
        'group shrink-0 duration-500 ease-in-out',
        sidebarContainer,
        trayContainer,
      )}
      id={main ? 'main-content' : undefined}
    >
      <aside
        data-type={type}
        data-open={state.isOpen}
        {...(overlayProps || internalOverlayProps)}
        className={twJoin(
          'text-zinc-900 duration-500 ease-in-out dark:text-zinc-100',
          sidebarContent,
          trayContent,
        )}
      >
        {children}
      </aside>
      <DefaultDrawerTrigger
        triggerProps={triggerProps || internalTriggerProps}
        state={state}
        type={type}
      />
    </div>
  );
};

const DefaultDrawerTrigger = ({ triggerProps, type, state }) => (
  <div
    className={twJoin(
      'group absolute z-10 overflow-hidden rounded border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800',
      trayTrigger,
      sidebarTrigger,
    )}
  >
    <Button
      className="flex items-center justify-center rounded-none border-0 bg-transparent p-1 shadow-md group-data-[type='sidebar']:h-10 group-data-[type='tray']:h-6 group-data-[type='sidebar']:w-6 group-data-[type='tray']:w-10 hover:bg-current group-hover:bg-black/10 dark:group-hover:bg-white/10"
      {...triggerProps}
      onPress={state.toggle}
      aria-label="Close the drawer"
    >
      {type === 'sidebar' ? (
        <ChevronLeftIcon
          className={twJoin(
            'h-6 w-full shrink-0 fill-zinc-900 transition-transform duration-500 dark:fill-white',
            !state.isOpen ? '-rotate-180' : '',
          )}
        />
      ) : (
        <ChevronDownIcon
          className={twJoin(
            'h-6 w-full shrink-0 fill-zinc-900 transition-transform duration-500 dark:fill-white',
            !state.isOpen ? '-rotate-180' : '',
          )}
        />
      )}
    </Button>
  </div>
);
