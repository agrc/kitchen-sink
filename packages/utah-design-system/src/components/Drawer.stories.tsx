import { useOverlayTrigger } from 'react-aria';
import { LoremIpsum } from 'react-lorem-ipsum';
import { useOverlayTriggerState } from 'react-stately';
import { Button } from './Button';
import { Drawer } from './Drawer';

export default {
  component: Drawer,
};

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
      <Drawer type="tray" state={state} {...overlayTriggerProps}>
        <LoremIpsum p={1} />
      </Drawer>
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
      <Drawer
        type="tray"
        state={state}
        {...overlayTriggerProps}
        allowFullScreen
      >
        <LoremIpsum p={10} />
      </Drawer>
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
      <Drawer state={state} {...overlayTriggerProps}>
        <div className="bg-green-200">
          <LoremIpsum p={1} />
        </div>
      </Drawer>
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
        <Drawer state={state} {...overlayTriggerProps}>
          <div className="flex flex-col gap-4 p-4">
            <h2 className="text-2xl font-bold">Drawer</h2>
            <LoremIpsum p={4} />
          </div>
        </Drawer>
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
      <Drawer state={state} {...overlayTriggerProps}>
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
      </Drawer>
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
          <Drawer main state={sideBarState} {...sideBarTriggerProps}>
            <LoremIpsum p={10} />
          </Drawer>
          <div className="mb-2 relative flex flex-1 flex-col overflow-hidden rounded border border-zinc-200 dark:border-0 dark:border-zinc-700">
            <div className="relative flex-1 overflow-hidden dark:rounded">
              <div id="map" className="bg-blue-400 size-full"></div>
              <Drawer
                type="tray"
                className="shadow-inner dark:shadow-white/20"
                allowFullScreen
                state={trayState}
                {...trayTriggerProps}
              >
                <LoremIpsum p={5} />
              </Drawer>
            </div>
          </div>
        </section>
      </main>
    );
  },
};
