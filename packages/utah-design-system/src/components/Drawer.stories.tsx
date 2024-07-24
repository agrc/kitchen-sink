import { Button } from './Button';
import { Drawer, DrawerGriddy } from './Drawer';
import { useOverlayTriggerState } from 'react-stately';
import { useOverlayTrigger } from 'react-aria';
import { LoremIpsum } from 'react-lorem-ipsum';

export default {
  component: Drawer,
};

export const Bottom = {};

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
        <LoremIpsum p={1} />
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
    const state = useOverlayTriggerState({ defaultOpen: true });
    const overlayTriggerProps = useOverlayTrigger(
      {
        type: 'dialog',
      },
      state,
    );

    return (
      <main className="flex h-[600px] w-[900px] flex-col border border-red-800 bg-violet-100">
        <header className="h-32 border border-black bg-zinc-200"></header>
        <section className="relative flex min-h-0 flex-1 overflow-x-hidden">
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
          <div className="flex-1 bg-blue-200"></div>
        </section>
      </main>
    );
  },
};
