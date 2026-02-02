import {
  Tab as RACTab,
  TabList as RACTabList,
  TabPanel as RACTabPanel,
  Tabs as RACTabs,
  type TabListProps,
  type TabPanelProps,
  type TabProps,
  type TabsProps,
  composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRing } from './utils';

const tabsStyles = tv({
  base: 'group flex gap-4',
  variants: {
    orientation: {
      horizontal: 'flex-col',
      vertical: 'flex-1 flex-row',
    },
  },
});

export function Tabs(props: TabsProps) {
  return (
    <RACTabs
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabsStyles({ ...renderProps, className }),
      )}
    />
  );
}

const tabListStyles = tv({
  base: 'flex gap-1',
  variants: {
    orientation: {
      horizontal: 'flex-row border-b pb-2',
      vertical: 'flex-col items-start border-l pl-2',
    },
  },
});

export function TabList<T extends object>(props: TabListProps<T>) {
  return (
    <RACTabList
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabListStyles({ ...renderProps, className }),
      )}
    />
  );
}

const tabProps = tv({
  extend: focusRing,
  base: 'relative flex cursor-default items-center rounded-full px-4 py-1.5 font-bold transition forced-color-adjust-none hover:bg-zinc-200 hover:text-zinc-700 dark:hover:text-zinc-800',
  variants: {
    isSelected: {
      false:
        'text-zinc-500 after:bottom-1 after:h-px after:bg-slate-400 pressed:bg-zinc-200 pressed:text-zinc-700 dark:text-zinc-300 after:dark:bg-slate-400 dark:hover:text-zinc-800 dark:pressed:bg-zinc-800 dark:pressed:text-zinc-200',
      true: 'text-secondary-500 after:absolute after:block after:rounded-full after:bg-secondary-400 group-data-[orientation="horizontal"]:after:bottom-[-0.8em] group-data-[orientation="horizontal"]:after:left-0 group-data-[orientation=vertical]:after:left-[-0.78em] group-data-[orientation="horizontal"]:after:h-2 group-data-[orientation=vertical]:after:h-full group-data-[orientation="horizontal"]:after:w-full group-data-[orientation=vertical]:after:w-2 dark:text-secondary-300 forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]',
    },
    isDisabled: {
      true: 'hidden',
    },
  },
});

export function Tab(props: TabProps) {
  return (
    <RACTab
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabProps({ ...renderProps, className }),
      )}
    />
  );
}

const tabPanelStyles = tv({
  extend: focusRing,
  base: 'flex-1 p-4 text-sm text-zinc-900 dark:text-zinc-100',
});

export function TabPanel(props: TabPanelProps) {
  return (
    <RACTabPanel
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabPanelStyles({ ...renderProps, className }),
      )}
    />
  );
}
