import { useOverlayTrigger } from 'react-aria';
import { Button } from './Button';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
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
      className="relative h-full w-80 shrink-0 transition-[width] duration-500 ease-in-out data-[open='false']:w-0"
      id={main ? 'main-content' : undefined}
    >
      <aside
        data-type={type}
        data-open={state.isOpen}
        {...(overlayProps || internalOverlayProps)}
        className='h-full w-80 overflow-y-auto text-zinc-900 duration-500 ease-in-out data-[type="sidebar"]:data-[open="false"]:-translate-x-full data-[type="sidebar"]:data-[open="true"]:translate-x-0 dark:text-zinc-100'
      >
        {children}
      </aside>
      <DefaultDrawerTrigger
        triggerProps={triggerProps || internalTriggerProps}
        state={state}
      />
    </div>
  );
};

const DefaultDrawerTrigger = ({ triggerProps, state }) => (
  <div className="group absolute -right-8 top-[calc(50%-24px)] z-10 w-6 overflow-hidden rounded rounded-l-none border-l-0 border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
    <Button
      className="flex h-10 w-6 items-center justify-center rounded-none border-0 bg-transparent p-1 shadow-md hover:bg-current group-hover:bg-black/10 dark:group-hover:bg-white/10"
      {...triggerProps}
      onPress={state.toggle}
      aria-label="Close the drawer"
    >
      <ChevronLeftIcon
        className={twJoin(
          'h-6 w-full shrink-0 fill-zinc-900 transition-transform duration-500 dark:fill-white',
          !state.isOpen ? '-rotate-180' : '',
        )}
      />
    </Button>
  </div>
);
