import type { Meta } from '@storybook/react';
import { useOverlayTrigger } from 'react-aria';
import { LoremIpsum } from 'react-lorem-ipsum';
import { useOverlayTriggerState } from 'react-stately';
import { Button } from './Button';
import { Drawer as Component } from './Drawer';

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export default meta;

export const Bottom = {
  render: () => {
    const state = useOverlayTriggerState({});
    const overlayTriggerProps = useOverlayTrigger(
      {
        type: 'dialog',
      },
      state,
    );

    return (
      <Component type="tray" state={state} {...overlayTriggerProps}>
        <LoremIpsum p={1} />
      </Component>
    );
  },
};

export const AllowFullScreen = {
  render: () => {
    const state = useOverlayTriggerState({});
    const overlayTriggerProps = useOverlayTrigger(
      {
        type: 'dialog',
      },
      state,
    );

    return (
      <Component
        type="tray"
        state={state}
        {...overlayTriggerProps}
        allowFullScreen
      >
        <LoremIpsum p={10} />
      </Component>
    );
  },
};

export const Side = {
  render: () => {
    const state = useOverlayTriggerState({});
    const overlayTriggerProps = useOverlayTrigger(
      {
        type: 'dialog',
      },
      state,
    );

    return (
      <Component state={state} {...overlayTriggerProps}>
        <div className="bg-green-200">
          <LoremIpsum p={1} />
        </div>
      </Component>
    );
  },
};

export const ScrollingBehavior = {
  render: () => {
    const state = useOverlayTriggerState({ defaultOpen: true });
    const overlayTriggerProps = useOverlayTrigger(
      {
        type: 'dialog',
      },
      state,
    );

    return (
      <div className="h-96">
        <Component state={state} {...overlayTriggerProps}>
          <div className="flex flex-col gap-4 p-4">
            <h2 className="text-2xl font-bold">Drawer</h2>
            <LoremIpsum p={4} />
          </div>
        </Component>
      </div>
    );
  },
};

export const WithMultipleTriggers = {
  render: () => {
    const state = useOverlayTriggerState({});
    const overlayTriggerProps = useOverlayTrigger(
      {
        type: 'dialog',
      },
      state,
    );

    return (
      <Component state={state} {...overlayTriggerProps}>
        <LoremIpsum p={2} />
        <Button
          {...overlayTriggerProps.triggerProps}
          onPress={() => {
            console.log('state', state);
            state.toggle();
          }}
          variant="secondary"
        >
          Close
        </Button>
      </Component>
    );
  },
};

export const AtlasFlexing = {
  render: () => {
    const sideBarState = useOverlayTriggerState({ defaultOpen: true });
    const sideBarTriggerProps = useOverlayTrigger(
      {
        type: 'dialog',
      },
      sideBarState,
    );

    const trayState = useOverlayTriggerState({});
    const trayTriggerProps = useOverlayTrigger(
      {
        type: 'dialog',
      },
      trayState,
    );

    return (
      <main className="flex h-[600px] flex-col gap-2">
        <div id="header" className="h-20 bg-gray-400"></div>
        <section className="relative mr-2 flex min-h-0 flex-1 overflow-x-hidden">
          <Component main state={sideBarState} {...sideBarTriggerProps}>
            <LoremIpsum p={10} />
          </Component>
          <div className="relative mb-2 flex flex-1 flex-col overflow-hidden rounded border border-zinc-200 dark:border-0 dark:border-zinc-700">
            <div className="relative flex-1 overflow-hidden dark:rounded">
              <div id="map" className="size-full bg-blue-400"></div>
              <Component
                type="tray"
                className="shadow-inner dark:shadow-white/20"
                allowFullScreen
                state={trayState}
                {...trayTriggerProps}
              >
                <LoremIpsum p={5} />
              </Component>
            </div>
          </div>
        </section>
      </main>
    );
  },
};
