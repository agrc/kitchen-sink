import Basemap from '@arcgis/core/Basemap';
import TileInfo from '@arcgis/core/layers/support/TileInfo';
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
import {
  layerTokens,
  type BaseLayerConfigOrToken,
  type LayerConfigOrToken,
} from './LayerSelector.types';
import { getLayerFromToken } from './LayerSelector.utilities';

type SelectorOptions = {
  view: MapView;
  /** discover quad word, required if using appliance tokens */
  quadWord?: string;
  /** layers added to map.basemap.baseLayers */
  baseLayers: BaseLayerConfigOrToken[];
  /** layers added to map.operationalLayers */
  operationalLayers?: LayerConfigOrToken[];
  /** layers added to map.basemap.referenceLayers */
  referenceLayers?: LayerConfigOrToken[];
  /** option passed to view.ui.add(), defaults to top-right */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
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

function getLabel(configOrToken: LayerConfigOrToken) {
  return typeof configOrToken === 'string'
    ? configOrToken
    : configOrToken.label;
}

async function toggleLayer(
  configOrToken: LayerConfigOrToken,
  label: string,
  visible: boolean,
  container: __esri.Collection<__esri.Layer>,
  managedLayers: Record<string, __esri.Layer>,
  view: MapView,
  quadWord: string,
) {
  let layer = managedLayers[label];
  if (!layer && visible) {
    if (typeof configOrToken === 'string') {
      layer = getLayerFromToken(configOrToken, quadWord);
    } else {
      layer = configOrToken.function();
    }
    managedLayers[label] = layer;
    container.add(layer);
  } else if (layer) {
    layer.visible = visible;
  }

  if (
    visible &&
    container === view.map.basemap!.baseLayers &&
    'tileInfo' in layer! &&
    layer.tileInfo instanceof TileInfo &&
    view.ready
  ) {
    const newMaxZoomLevel =
      layer.tileInfo.lods[layer.tileInfo.lods.length - 1]!.level;
    if (view.zoom > newMaxZoomLevel) {
      await view.goTo({ zoom: newMaxZoomLevel });
    }

    view.constraints.maxZoom = newMaxZoomLevel;
  }
}

export type LayerSelectorProps = Omit<DialogTriggerProps, 'children'> & {
  options: SelectorOptions;
};

export function LayerSelector({
  options: {
    position = 'top-right',
    referenceLayers = [],
    operationalLayers = [],
    ...options
  },
  ...props
}: LayerSelectorProps) {
  const node = useRef<HTMLDivElement>(null);
  const managedLayers = useRef<Record<string, __esri.Layer>>({});

  // validate options
  useEffect(() => {
    if (options.baseLayers.length < 1) {
      throw new Error('`options.baseLayers` must have at least one layer');
    }

    if (!options.view.map) {
      throw new Error('`options.view` must have a map');
    }

    for (const configOrToken of [
      ...options.baseLayers,
      ...referenceLayers,
      ...operationalLayers,
    ]) {
      if (typeof configOrToken === 'string') {
        if (!Object.values(layerTokens).includes(configOrToken)) {
          throw new Error(
            `layer-selector::The layer token '${configOrToken}' was not found. Please use one of the supported tokens (${Object.values(
              layerTokens,
            ).join(', ')}) or pass in a LayerConfig object.`,
          );
        }
        if (!options.quadWord) {
          throw new Error(
            `layer-selector::You chose to use a layer token '${configOrToken}' without setting your 'quadWord' from Discover. The requests for tiles will fail to authenticate. Pass 'quadWord' into the options parameter.`,
          );
        }
      }
    }
  }, [operationalLayers, options, referenceLayers]);

  const [selectedRadioBtnLabel, setSelectedRadioBtnLabel] = useState<string>(
    getLabel(options.baseLayers[0]!),
  );

  const referenceAndOperationalConfigsOrTokens = [
    ...operationalLayers,
    ...referenceLayers,
  ];
  const [selectedCheckboxLabels, setSelectedCheckboxLabels] = useState<
    string[]
  >(() =>
    referenceAndOperationalConfigsOrTokens
      .filter(
        (configOrToken) =>
          typeof configOrToken === 'object' && configOrToken?.defaultSelected,
      )
      .map(getLabel),
  );

  // set up map
  useEffect(() => {
    const basemapId = 'layer-selector';

    if (!node.current || options.view.map.basemap?.id === basemapId) return;

    options.view.map.basemap = new Basemap({
      id: basemapId,
    });

    options.view.ui.add(node.current, position);
  }, [position, options.view.map, options.view.ui]);

  // toggle layer visibility
  useEffect(() => {
    const map = options.view.map;

    for (const configOrToken of options.baseLayers) {
      const label = getLabel(configOrToken);
      toggleLayer(
        configOrToken,
        label,
        label === selectedRadioBtnLabel,
        map.basemap!.baseLayers,
        managedLayers.current,
        options.view,
        options.quadWord!,
      );
      if (label === 'Hybrid') {
        toggleLayer(
          'Overlay',
          'Overlay',
          label === selectedRadioBtnLabel,
          map.basemap!.referenceLayers,
          managedLayers.current,
          options.view,
          options.quadWord!,
        );
      }
    }

    for (const configOrToken of referenceLayers) {
      // todo: handle layer ordering (I *think* that esri might already make sure that polygons are under line are under points...)
      const label = getLabel(configOrToken);
      toggleLayer(
        configOrToken,
        label,
        selectedCheckboxLabels.includes(label),
        map.basemap!.referenceLayers,
        managedLayers.current,
        options.view,
        options.quadWord!,
      );
    }

    for (const configOrToken of operationalLayers) {
      // todo: handle layer ordering (I *think* that esri might already make sure that polygons are under line are under points...)
      const label = getLabel(configOrToken);
      toggleLayer(
        configOrToken,
        label,
        selectedCheckboxLabels.includes(label),
        map.layers,
        managedLayers.current,
        options.view,
        options.quadWord!,
      );
    }
  }, [
    options.baseLayers,
    operationalLayers,
    options.quadWord,
    referenceLayers,
    options.view,
    options.view.map,
    selectedCheckboxLabels,
    selectedRadioBtnLabel,
  ]);

  return (
    <div ref={node} className="esri-widget">
      <DialogTrigger {...props}>
        <Button
          aria-label="Map layers"
          className="esri-widget--button size-8 text-[#6e6e6e] -outline-offset-2 outline-[#007ac2] focus:bg-[#f3f3f3]"
          variant="icon"
        >
          <LayersIcon className="block size-8 p-1" />
        </Button>
        <Popover>
          <Dialog className="outline-none">
            <Header className="font-bold dark:text-white">Base maps</Header>
            <RadioGroup
              className="mb-2 flex-1"
              value={selectedRadioBtnLabel}
              onChange={setSelectedRadioBtnLabel}
            >
              {options.baseLayers.map((configOrToken) => {
                const value = getLabel(configOrToken);

                return (
                  <Radio className="pl-2" value={value} key={value}>
                    {value}
                  </Radio>
                );
              })}
            </RadioGroup>
            {referenceAndOperationalConfigsOrTokens.length > 0 && (
              <>
                <Header className="font-bold dark:text-white">Overlays</Header>
                <CheckboxGroup
                  className="mb-2 flex-1"
                  value={selectedCheckboxLabels}
                  onChange={setSelectedCheckboxLabels}
                >
                  {referenceAndOperationalConfigsOrTokens.map(
                    (configOrToken) => {
                      const label = getLabel(configOrToken);

                      return (
                        <Checkbox className="pl-2" value={label} key={label}>
                          {label}
                        </Checkbox>
                      );
                    },
                  )}
                </CheckboxGroup>
              </>
            )}
          </Dialog>
        </Popover>
      </DialogTrigger>
    </div>
  );
}
