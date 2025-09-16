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
import {
  layerTokens,
  type BaseLayerConfigOrToken,
  type BasemapConfigOrToken,
  type LayerConfigOrToken,
} from './LayerSelector.types';
import {
  getHappyPathBasemapProperties,
  getLayerFromToken,
} from './LayerSelector.utilities';

type BaseOptions = {
  view: MapView;
  /** discover quad word, required if using appliance tokens */
  quadWord?: string;
  /** layers added to map.operationalLayers */
  operationalLayers?: LayerConfigOrToken[];
  /** layers added to map.basemap.referenceLayers */
  referenceLayers?: LayerConfigOrToken[];
  /** option passed to view.ui.add(), defaults to top-right */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /** callback fired when the basemap is changed */
  onBasemapChange?: (label: string) => void;
};

type WithBasemaps = BaseOptions & {
  /** basemaps whose layers are mixed into baseLayers & referenceLayers and toggles by a single radio button */
  basemaps: BasemapConfigOrToken[];
  /** layers added to map.basemap.baseLayers */
  baseLayers?: BaseLayerConfigOrToken[];
};

type WithBaseLayers = BaseOptions & {
  /** basemaps whose layers are mixed into baseLayers & referenceLayers and toggles by a single radio button */
  basemaps?: BasemapConfigOrToken[];
  /** layers added to map.basemap.baseLayers */
  baseLayers: BaseLayerConfigOrToken[];
};

type SelectorOptions = WithBasemaps | WithBaseLayers;

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

function getLabel(configOrToken: LayerConfigOrToken | BasemapConfigOrToken) {
  return typeof configOrToken === 'string'
    ? configOrToken
    : configOrToken.label;
}

export async function toggleLayer(
  configOrToken: LayerConfigOrToken,
  label: string,
  visible: boolean,
  container: __esri.Collection<__esri.Layer>,
  managedObjects: Record<string, __esri.Layer | __esri.Basemap>,
  quadWord: string,
) {
  let layer = managedObjects[label] as __esri.Layer | undefined;
  if (visible) {
    // add layer
    if (!layer) {
      if (typeof configOrToken === 'string') {
        layer = getLayerFromToken(configOrToken, quadWord);
      } else {
        layer = configOrToken.function();
      }
      managedObjects[label] = layer;
    }

    if (!container.includes(layer)) {
      container.add(layer);
    }
  } else {
    // remove layer if it exists
    if (layer) {
      // we need to remove rather than set visible to false so that the map view resets it's max & min scale levels
      container.remove(layer);
    }
  }
}

export async function toggleBasemap(
  configOrToken: BasemapConfigOrToken,
  label: string,
  visible: boolean,
  managedLayers: Record<string, __esri.Basemap | __esri.Layer>,
  view: MapView,
  quadWord?: string,
) {
  let basemap = managedLayers[label] as __esri.Basemap | undefined;
  if (visible) {
    if (!basemap) {
      if (typeof configOrToken === 'string') {
        basemap = new Basemap(
          getHappyPathBasemapProperties(configOrToken, quadWord),
        );
      } else {
        basemap = configOrToken.function();
      }

      // this line needs to be before the await load call below so that if this is called twice, it doesn't try to add the same layers twice
      managedLayers[label] = basemap;
      await basemap.load();
    }

    if (basemap.baseLayers.length > 0) {
      for (const baseLayer of basemap.baseLayers) {
        if (!view.map?.basemap?.baseLayers.includes(baseLayer)) {
          view.map?.basemap!.baseLayers.add(baseLayer);
        }
      }
    }
    if (basemap.referenceLayers.length > 0) {
      for (const referenceLayer of basemap.referenceLayers) {
        if (!view.map?.basemap?.referenceLayers.includes(referenceLayer)) {
          view.map?.basemap!.referenceLayers.add(referenceLayer);
        }
      }
    }
  } else {
    // remove layer if it exists
    if (basemap) {
      // we need to remove rather than set visible to false so that the map view resets it's max & min scale levels
      if (basemap.baseLayers.length > 0) {
        view.map?.basemap!.baseLayers.removeMany(basemap.baseLayers);
      }
      if (basemap.referenceLayers.length > 0) {
        view.map?.basemap!.referenceLayers.removeMany(basemap.referenceLayers);
      }
    }
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
    basemaps = [],
    baseLayers = [],
    onBasemapChange = () => {},
    ...options
  },
  ...props
}: LayerSelectorProps) {
  const node = useRef<HTMLDivElement>(null);
  const managedLayers = useRef<Record<string, __esri.Layer | __esri.Basemap>>(
    {},
  );

  // validate options
  useEffect(() => {
    if (basemaps.length < 1 && baseLayers.length < 1) {
      throw new Error(
        '`options.basemaps` or `options.baseLayers` must have at least one config or token',
      );
    }

    if (!options.view.map) {
      throw new Error('`options.view` must have a map');
    }

    // basemaps prop tokens are validated in the getHappyPathBasemapProperties function

    for (const configOrToken of [
      ...baseLayers,
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
  }, [
    baseLayers,
    basemaps.length,
    operationalLayers,
    options.quadWord,
    options.view.map,
    referenceLayers,
  ]);

  const [selectedRadioBtnLabel, setSelectedRadioBtnLabel] = useState<string>(
    getLabel(basemaps.length ? basemaps[0]! : baseLayers[0]!),
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

    if (!node.current || options.view.map?.basemap?.id === basemapId) return;

    options.view.map!.basemap = new Basemap({
      id: basemapId,
    });

    options.view.ui.add(node.current, position);
  }, [position, options.view.map, options.view.ui]);

  // toggle layer visibility
  useEffect(() => {
    const map = options.view.map;
    if (!map || !map.basemap) {
      return;
    }

    for (const configOrToken of baseLayers) {
      const label = getLabel(configOrToken);
      toggleLayer(
        configOrToken,
        label,
        label === selectedRadioBtnLabel,
        map.basemap!.baseLayers,
        managedLayers.current,
        options.quadWord!,
      );
      if (label === 'Hybrid') {
        toggleLayer(
          'Overlay',
          'Overlay',
          label === selectedRadioBtnLabel,
          map.basemap!.referenceLayers,
          managedLayers.current,
          options.quadWord!,
        );
      }
    }

    for (const configOrToken of basemaps) {
      const label = getLabel(configOrToken);
      toggleBasemap(
        configOrToken,
        label,
        label === selectedRadioBtnLabel,
        managedLayers.current,
        options.view,
        options.quadWord,
      );
    }

    for (const configOrToken of referenceLayers) {
      const label = getLabel(configOrToken);
      toggleLayer(
        configOrToken,
        label,
        selectedCheckboxLabels.includes(label),
        map.basemap!.referenceLayers,
        managedLayers.current,
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
        options.quadWord!,
      );
    }
  }, [
    baseLayers,
    operationalLayers,
    options.quadWord,
    referenceLayers,
    options.view,
    options.view.map,
    selectedCheckboxLabels,
    selectedRadioBtnLabel,
    basemaps,
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
              onChange={(label) => {
                setSelectedRadioBtnLabel(label);
                onBasemapChange(label);
              }}
            >
              {basemaps.map((configOrToken) => {
                const value = getLabel(configOrToken);

                return (
                  <Radio className="pl-2" value={value} key={value}>
                    {value}
                  </Radio>
                );
              })}
              {baseLayers.map((configOrToken) => {
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
