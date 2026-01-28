import Basemap from '@arcgis/core/Basemap';
import '@arcgis/map-components/components/arcgis-expand';
import '@esri/calcite-components/components/calcite-checkbox';
import '@esri/calcite-components/components/calcite-label';
import '@esri/calcite-components/components/calcite-radio-button';
import '@esri/calcite-components/components/calcite-radio-button-group';
import { useEffect, useRef, useState } from 'react';
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

type UIPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-leading'
  | 'top-trailing'
  | 'bottom-leading'
  | 'bottom-trailing';

export type LayerSelectorProps = {
  /**
   * Reference to the arcgis-map or arcgis-scene element.
   * Can be the element itself or the id of the element.
   * Only needed when the LayerSelector is placed outside the arcgis-map element.
   */
  referenceElement?: HTMLArcgisMapElement | HTMLArcgisSceneElement | string;
  /** Discover quad word, required if using appliance tokens */
  quadWord?: string;
  /** Layers added to map.operationalLayers */
  operationalLayers?: LayerConfigOrToken[];
  /** Layers added to map.basemap.referenceLayers */
  referenceLayers?: LayerConfigOrToken[];
  /** Basemaps whose layers are mixed into baseLayers & referenceLayers and toggled by a single radio button */
  basemaps?: BasemapConfigOrToken[];
  /** Layers added to map.basemap.baseLayers */
  baseLayers?: BaseLayerConfigOrToken[];
  /** Callback fired when the basemap is changed */
  onBasemapChange?: (label: string) => void;
  /** Icon to display in the expand button */
  icon?: string;
  /** Mode for the expand component: auto, drawer, or floating */
  mode?: 'auto' | 'drawer' | 'floating';
  /** Group for auto-collapse behavior with other Expand components */
  group?: string;
  /** Whether the component is expanded by default */
  expanded?: boolean;
  /**
   * Slot position for the component within arcgis-map.
   * Common values: 'top-left', 'top-right', 'bottom-left', 'bottom-right'
   * Default: 'top-right'
   */
  slot?: UIPosition;
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
  view: __esri.MapView | __esri.SceneView,
  quadWord?: string,
) {
  // Early return if view or map is not available
  if (!view?.map?.basemap) {
    console.warn('toggleBasemap: view.map.basemap is not available');
    return;
  }

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
        if (!view.map.basemap.baseLayers.includes(baseLayer)) {
          view.map.basemap.baseLayers.add(baseLayer);
        }
      }
    }
    if (basemap.referenceLayers.length > 0) {
      for (const referenceLayer of basemap.referenceLayers) {
        if (!view.map.basemap.referenceLayers.includes(referenceLayer)) {
          view.map.basemap.referenceLayers.add(referenceLayer);
        }
      }
    }
  } else {
    // remove layer if it exists
    if (basemap && view.map.basemap) {
      // we need to remove rather than set visible to false so that the map view resets it's max & min scale levels
      if (basemap.baseLayers.length > 0) {
        view.map.basemap.baseLayers.removeMany(basemap.baseLayers.toArray());
      }
      if (basemap.referenceLayers.length > 0) {
        view.map.basemap.referenceLayers.removeMany(
          basemap.referenceLayers.toArray(),
        );
      }
    }
  }
}

export function LayerSelector({
  referenceElement,
  quadWord,
  operationalLayers = [],
  referenceLayers = [],
  basemaps = [],
  baseLayers = [],
  onBasemapChange = () => {},
  icon = 'layers',
  mode = 'floating',
  group,
  expanded = false,
  slot = 'top-right',
}: LayerSelectorProps) {
  const [view, setView] = useState<__esri.MapView | __esri.SceneView | null>(
    null,
  );
  const managedLayers = useRef<Record<string, __esri.Layer | __esri.Basemap>>(
    {},
  );

  // validate props
  useEffect(() => {
    if (basemaps.length < 1 && baseLayers.length < 1) {
      throw new Error(
        '`basemaps` or `baseLayers` must have at least one config or token',
      );
    }

    const hasBasemapToken = basemaps.some(
      (configOrToken) => typeof configOrToken === 'string',
    );
    const hasLayerToken = [
      ...baseLayers,
      ...referenceLayers,
      ...operationalLayers,
    ].some((configOrToken) => typeof configOrToken === 'string');

    if ((hasBasemapToken || hasLayerToken) && !quadWord) {
      throw new Error(
        "layer-selector::You chose to use a token without setting your 'quadWord' from Discover. The requests for tiles will fail to authenticate. Pass 'quadWord' prop.",
      );
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
      }
    }
  }, [baseLayers, basemaps, operationalLayers, quadWord, referenceLayers]);

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

  const basemapId = 'layer-selector';

  // toggle layer visibility
  useEffect(() => {
    function updateAllLayerVisibility() {
      for (const configOrToken of baseLayers) {
        const label = getLabel(configOrToken);
        toggleLayer(
          configOrToken,
          label,
          label === selectedRadioBtnLabel,
          map!.basemap!.baseLayers,
          managedLayers.current,
          quadWord!,
        );
        if (label === 'Hybrid') {
          toggleLayer(
            'Overlay',
            'Overlay',
            label === selectedRadioBtnLabel,
            map!.basemap!.referenceLayers,
            managedLayers.current,
            quadWord!,
          );
        }
      }

      for (const configOrToken of basemaps) {
        const label = getLabel(configOrToken);
        if (view) {
          // Only toggle the selected basemap to visible, skip others
          // This avoids race conditions with async loading
          if (label === selectedRadioBtnLabel) {
            toggleBasemap(
              configOrToken,
              label,
              true,
              managedLayers.current,
              view,
              quadWord,
            );
          } else {
            // For non-selected basemaps, only remove if they were previously added
            const basemap = managedLayers.current[label] as
              | __esri.Basemap
              | undefined;
            if (basemap) {
              toggleBasemap(
                configOrToken,
                label,
                false,
                managedLayers.current,
                view,
                quadWord,
              );
            }
          }
        }
      }

      for (const configOrToken of referenceLayers) {
        const label = getLabel(configOrToken);
        toggleLayer(
          configOrToken,
          label,
          selectedCheckboxLabels.includes(label),
          map!.basemap!.referenceLayers,
          managedLayers.current,
          quadWord!,
        );
      }

      for (const configOrToken of operationalLayers) {
        // todo: handle layer ordering (I *think* that esri might already make sure that polygons are under line are under points...)
        const label = getLabel(configOrToken);
        toggleLayer(
          configOrToken,
          label,
          selectedCheckboxLabels.includes(label),
          map!.layers,
          managedLayers.current,
          quadWord!,
        );
      }
    }

    const map = view?.map;
    if (!map) {
      return;
    }

    if (map?.basemap?.id !== basemapId) {
      // If the map doesn't have a basemap yet, create one
      // Otherwise, clear its layers so we can manage them
      if (!map.basemap) {
        map.basemap = new Basemap({
          id: basemapId,
        });
        map.basemap.when(updateAllLayerVisibility);
      } else {
        // Clear existing layers so LayerSelector can take over
        view.when(() => {
          map.basemap!.baseLayers.removeAll();
          map.basemap!.referenceLayers.removeAll();
          map.basemap!.id = basemapId;

          updateAllLayerVisibility();
        });
      }

      return;
    } else {
      updateAllLayerVisibility();
    }
  }, [
    baseLayers,
    operationalLayers,
    quadWord,
    referenceLayers,
    view,
    selectedCheckboxLabels,
    selectedRadioBtnLabel,
    basemaps,
  ]);

  const handleExpandReady = (event: Event) => {
    const expand = event.target as HTMLArcgisExpandElement;
    if (expand.view) {
      setView(expand.view);
    } else {
      console.error('LayerSelector: view is not available on expand component');
    }
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      const layers = managedLayers.current;
      for (const layer of Object.values(layers)) {
        if (
          layer &&
          typeof (layer as { destroy?: () => void }).destroy === 'function'
        ) {
          try {
            (layer as { destroy: () => void }).destroy();
          } catch {
            // ignore errors during cleanup
          }
        }
      }
      managedLayers.current = {};
    };
  }, []);

  return (
    <arcgis-expand
      slot={slot}
      referenceElement={referenceElement}
      expandIcon={icon}
      mode={mode}
      group={group}
      expanded={expanded}
      label="Map layers"
      onarcgisReady={handleExpandReady}
    >
      <div style={{ padding: 'var(--calcite-spacing-lg)', minWidth: '150px' }}>
        <h3>Base maps</h3>
        <calcite-radio-button-group
          name="basemap-selector"
          layout="vertical"
          oncalciteRadioButtonGroupChange={(
            e: CustomEvent<void> & {
              target: HTMLCalciteRadioButtonGroupElement;
            },
          ) => {
            const selectedItem = e.target.selectedItem;
            if (selectedItem) {
              const label = selectedItem.value ?? '';
              setSelectedRadioBtnLabel(label);
              onBasemapChange(label);
            }
          }}
        >
          {basemaps.map((configOrToken) => {
            const value = getLabel(configOrToken);

            return (
              <calcite-label key={value} layout="inline">
                <calcite-radio-button
                  value={value}
                  checked={value === selectedRadioBtnLabel}
                />
                {value}
              </calcite-label>
            );
          })}
          {baseLayers.map((configOrToken) => {
            const value = getLabel(configOrToken);

            return (
              <calcite-label key={value} layout="inline">
                <calcite-radio-button
                  value={value}
                  checked={value === selectedRadioBtnLabel}
                />
                {value}
              </calcite-label>
            );
          })}
        </calcite-radio-button-group>
        {referenceAndOperationalConfigsOrTokens.length > 0 && (
          <>
            <h3>Overlays</h3>
            <div>
              {referenceAndOperationalConfigsOrTokens.map((configOrToken) => {
                const label = getLabel(configOrToken);

                return (
                  <calcite-label key={label} layout="inline">
                    <calcite-checkbox
                      checked={selectedCheckboxLabels.includes(label)}
                      oncalciteCheckboxChange={(
                        e: CustomEvent<void> & {
                          target: HTMLCalciteCheckboxElement;
                        },
                      ) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          setSelectedCheckboxLabels([
                            ...selectedCheckboxLabels,
                            label,
                          ]);
                        } else {
                          setSelectedCheckboxLabels(
                            selectedCheckboxLabels.filter((l) => l !== label),
                          );
                        }
                      }}
                    />
                    {label}
                  </calcite-label>
                );
              })}
            </div>
          </>
        )}
      </div>
    </arcgis-expand>
  );
}
