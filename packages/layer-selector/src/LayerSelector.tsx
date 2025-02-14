import Basemap from '@arcgis/core/Basemap';
import MapView from '@arcgis/core/views/MapView';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
} from '@ugrc/utah-design-system';
import { LayersIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { DialogTriggerProps, PopoverProps } from 'react-aria-components';
import {
  Dialog,
  DialogTrigger,
  Header,
  Popover as RACPopover,
} from 'react-aria-components';
import type {
  ApplianceLayerTokens,
  LayerConfig,
  LayerFactory,
} from './shared.types';
import { createLayerFactories } from './utilities';

type LayerOption = ApplianceLayerTokens | LayerConfig;
type SelectorOptions = {
  view: MapView;
  quadWord?: string;
  baseLayers: LayerOption[];
  overlays?: LayerOption[];
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
};

const Popover = (props: PopoverProps) => {
  return (
    <RACPopover
      {...props}
      className={({
        isEntering,
        isExiting,
      }: {
        isEntering: boolean;
        isExiting: boolean;
      }) =>
        `group min-w-48 max-w-sm overflow-y-auto rounded-lg bg-white px-3 py-2 ring-1 ring-black/10 drop-shadow-lg dark:bg-zinc-800 dark:ring-white/10 ${
          isEntering
            ? 'duration-500 ease-out animate-in fade-in placement-top:slide-in-from-bottom-1 placement-bottom:slide-in-from-top-1'
            : ''
        } ${
          isExiting
            ? 'duration-150 ease-in animate-out fade-out placement-top:slide-out-to-bottom-1 placement-bottom:slide-out-to-top-1'
            : ''
        } `
      }
    />
  );
};

export type LayerSelectorProps = Omit<DialogTriggerProps, 'children'> & {
  options: SelectorOptions;
};

export function LayerSelector({ options, ...props }: LayerSelectorProps) {
  const node = useRef<HTMLDivElement>(null);
  const linkedLayers = useRef<string[]>([]);
  const managedLayers = useRef<Record<string, __esri.Layer>>({});
  const [layerFactories, setLayerFactories] = useState<{
    baseLayers: LayerFactory[];
    overlays: LayerFactory[];
  }>({
    baseLayers: [],
    overlays: [],
  });

  const map = options.view.map;

  // set up the layers
  useEffect(() => {
    if (!map) {
      throw new Error('`options.view` must have a map');
    }

    if (options.baseLayers.length === 0) {
      throw new Error('`options.baseLayers` must have at least one layer');
    }

    map.basemap = new Basemap({
      id: 'layer-selector',
    });
    const baseLayerFactories = createLayerFactories(
      'base',
      options.baseLayers,
      options.quadWord,
    );

    let defaultSelection: LayerFactory | undefined;
    let hasHybrid = false;
    let linkedLayersBuilder: string[] = [];

    baseLayerFactories.forEach((factory) => {
      if (factory.selected === true) {
        defaultSelection = factory;
      }

      if (factory.id === 'Hybrid') {
        hasHybrid = true;
      }

      if (factory.linked) {
        linkedLayersBuilder = linkedLayersBuilder.concat(factory.linked);
      }
    });

    linkedLayers.current = linkedLayersBuilder;

    // set default basemap to index 0 if not specified by the user
    if (!defaultSelection && baseLayerFactories.length > 0) {
      baseLayerFactories[0]!.selected = true;
      defaultSelection = baseLayerFactories[0];
    }

    // insert overlay to first spot because hybrid
    options.overlays = options.overlays || [];
    if (
      (hasHybrid &&
        typeof options.overlays[0] === 'string' &&
        options.overlays[0] !== 'Overlay') ||
      (typeof options.overlays[0] !== 'string' &&
        options.overlays[0]?.token !== 'Overlay')
    ) {
      options.overlays.splice(0, 0, 'Overlay');
    }

    const overlayFactories =
      options.overlays && options.overlays.length > 0
        ? createLayerFactories('overlay', options.overlays, options.quadWord)
        : [];

    // set visibility of linked layers to match default selection
    if (defaultSelection?.linked && defaultSelection.linked.length > 0) {
      overlayFactories.forEach((layer) => {
        if (layer.id && defaultSelection?.linked?.includes(layer.id)) {
          layer.selected = true;
        }
      });
    }

    setLayerFactories({
      baseLayers: baseLayerFactories,
      overlays: overlayFactories,
    });
  }, [map, options]);

  // add to the map view
  useEffect(() => {
    const cleanupNode = node.current;
    if (node.current) {
      options.view.ui.add(node.current, options.position);
    }

    return () => {
      if (cleanupNode) {
        options.view.ui.remove(cleanupNode);
      }
    };
  }, [options.view, options.position]);

  // toggle layer visibility
  const selectedBaseLayerId = layerFactories.baseLayers.find(
    (factory) => factory.selected,
  )?.id;
  useEffect(() => {
    const selectedOverlayIds = layerFactories.overlays
      .filter((factory) => factory.selected)
      .map((factory) => factory.id);

    for (const factory of layerFactories.baseLayers) {
      let layer = managedLayers.current[factory.id];
      if (factory.id === selectedBaseLayerId) {
        if (!layer) {
          layer = new factory.Factory(factory);
          managedLayers.current[factory.id] = layer;
          map.basemap.baseLayers.add(layer);
        } else {
          layer.visible = true;
        }
      } else if (layer) {
        layer.visible = false;
      }
    }

    for (const factory of layerFactories.overlays) {
      let layer = managedLayers.current[factory.id];
      if (selectedOverlayIds.includes(factory.id)) {
        if (!layer) {
          layer = new factory.Factory(factory);
          managedLayers.current[factory.id] = layer;
          map.basemap.referenceLayers.add(layer);
        } else {
          layer.visible = true;
        }
      } else if (layer) {
        layer.visible = false;
      }
    }

    console.log(
      'baseLayers',
      map.basemap?.baseLayers.length,
      'referenceLayers',
      map.basemap?.referenceLayers.length,
    );
  }, [layerFactories, map, selectedBaseLayerId]);

  const onBaseMapChanged = (newId: string) => {
    const linkedIdsOn: string[] = [];
    const linkedIdsOff: string[] = [];
    const newBaseLayers = layerFactories.baseLayers.map((factory) => {
      factory.selected = factory.id === newId;
      if (factory.linked) {
        if (factory.selected) {
          linkedIdsOn.push(...factory.linked);
        }
        linkedIdsOff.push(...factory.linked);
      }

      return factory;
    });

    const newOverlays = layerFactories.overlays.map((factory) => {
      if (linkedIdsOn.includes(factory.id)) {
        factory.selected = true;
      } else if (linkedIdsOff.includes(factory.id)) {
        factory.selected = false;
      }

      return factory;
    });

    setLayerFactories({
      baseLayers: newBaseLayers,
      overlays: newOverlays,
    });
  };

  const onOverlayChanged = (newIds: string[]) => {
    const newOverlays = layerFactories.overlays.map((factory) => {
      factory.selected = newIds.includes(factory.id);
      return factory;
    });
    setLayerFactories({
      baseLayers: layerFactories.baseLayers,
      overlays: newOverlays,
    });
  };

  return (
    <div ref={node}>
      <DialogTrigger {...props}>
        <div className="inline-flex max-w-fit border border-black bg-white dark:border-zinc-500 dark:bg-zinc-900">
          <Button
            aria-label="Map layers"
            className="px-1.5 outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            variant="icon"
          >
            <LayersIcon className="block size-8 p-1" />
          </Button>
        </div>
        <Popover>
          <Dialog className="outline-none">
            <Header className="font-bold dark:text-white">Base maps</Header>
            <RadioGroup
              className="mb-2 flex-1"
              value={selectedBaseLayerId}
              onChange={onBaseMapChanged}
            >
              {layerFactories.baseLayers.map((factory) => (
                <Radio className="pl-2" value={factory.id} key={factory.id}>
                  {factory.id}
                </Radio>
              ))}
            </RadioGroup>
            <Header className="font-bold dark:text-white">Overlays</Header>
            <CheckboxGroup
              className="mb-2 flex-1"
              value={layerFactories.overlays
                .filter((factory) => factory.selected)
                .map((factory) => factory.id)}
              onChange={onOverlayChanged}
            >
              {layerFactories.overlays.map((factory) => (
                <Checkbox className="pl-2" value={factory.id} key={factory.id}>
                  {factory.id}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </Dialog>
        </Popover>
      </DialogTrigger>
    </div>
  );
}
