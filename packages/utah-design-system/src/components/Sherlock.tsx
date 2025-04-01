import Graphic from '@arcgis/core/Graphic.js';
import type {
  IGeocodeResponse,
  ISuggestResponse,
} from '@esri/arcgis-rest-geocoding';
import type { IFeatureSet } from '@esri/arcgis-rest-request';
import {
  type AsyncListData,
  type AsyncListLoadOptions,
  type AsyncListStateUpdate,
} from '@react-stately/data';
import {
  search,
  type ApiErrorResponse,
  type SearchResponse,
} from '@ugrc/utilities';
import ky, { type Input as KyInput, type Options as KyOptions } from 'ky';
import { escapeRegExp } from 'lodash-es';
import { CheckIcon, ChevronsUpDownIcon, SearchIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import {
  Button,
  ComboBox,
  Group,
  Input,
  ListBox,
  ListBoxItem,
  Popover,
} from 'react-aria-components';
import { useAsyncList, type Key } from 'react-stately';
import { tv } from 'tailwind-variants';
import { FieldError, Label, fieldBorderStyles } from './Field';
import { Spinner } from './Spinner';
import { focusRing } from './utils';

const yellow = [255, 255, 0];
const polygon = {
  type: 'simple-fill',
  color: [240, 240, 240, 0.5],
  outline: {
    style: 'solid',
    color: [...yellow, 0.5],
    width: 2.5,
  },
};
const point = {
  type: 'simple-marker',
  style: 'circle',
  color: [...yellow, 0.5],
  size: 10,
};

const defaultSymbols = {
  polygon,
  extent: polygon,
  polyline: {
    type: 'simple-line',
    style: 'solid',
    color: yellow,
    width: 5,
  },
  point,
  multipoint: point,
  mesh: polygon,
};

const inputStyles = tv({
  extend: focusRing,
  base: 'relative flex rounded-md border border-transparent bg-white py-1.5 shadow ring-1 ring-zinc-900/5 dark:bg-zinc-900',
  variants: {
    isFocused: fieldBorderStyles.variants.isFocusWithin,
  },
});

type EsriRestError = {
  error?: __esri.Error;
};
export type AsyncListItem = { name: string; context?: string; key?: string };
type LoaderOptions<T, C> = { maxResults?: number } & AsyncListLoadOptions<T, C>;
type AsyncListLoadFunction<T, C> = (
  state: LoaderOptions<T, C>,
) => AsyncListStateUpdate<T, C> | Promise<AsyncListStateUpdate<T, C>>;
type SherlockProvider = {
  load: AsyncListLoadFunction<AsyncListItem, unknown>;
  getFeature: (key: string) => Promise<{ items: AccessorGraphicProperties[] }>;
};
type AccessorGraphicProperties = __esri.GraphicProperties & {
  geometry?: __esri.GeometryProperties & {
    type: __esri.Geometry['type'];
  };
};

async function safeFetch<T>(url: KyInput, options?: KyOptions) {
  const response = (await ky(url, options).json()) as T & EsriRestError;

  // handle esri response errors which return a 200 status code
  if (response.error) {
    throw new Error(`${url} returned an error: ${response.error.message}`);
  }

  return response;
}

export const ugrcApiProvider = (
  apiKey: string,
  table: string,
  field: string,
  contextField?: string,
  options: { wkid?: number } = {},
): SherlockProvider => {
  return {
    // @ts-expect-error - TODO: Update this to handle types correctly
    load: async ({ signal, filterText, maxResults = 10 }) => {
      if ((filterText?.length ?? 0) < 3) {
        return { items: [] };
      }

      const fields = [field];
      if (contextField) {
        fields.push(contextField);
      }
      const response = await search(
        apiKey,
        table,
        fields,
        {
          predicate: `UPPER(${field}) LIKE UPPER('%${filterText}%')`,
          spatialReference: options?.wkid,
          attributeStyle: 'input',
        },
        signal,
      );

      if ((response as ApiErrorResponse)?.message) {
        return { items: [] };
      }

      const result = response as SearchResponse['result'];

      result.sort((a, b) => {
        // @ts-expect-error - TODO: Update this to handle types correctly
        if (a.attributes[field] < b.attributes[field]) {
          return -1;
          // @ts-expect-error - TODO: Update this to handle types correctly
        } else if (a.attributes[field] > b.attributes[field]) {
          return 1;
        } else if (contextField) {
          // fields are equal, compare contextField
          // @ts-expect-error - TODO: Update this to handle types correctly
          if (a.attributes[contextField] < b.attributes[contextField]) {
            return -1;
            // @ts-expect-error - TODO: Update this to handle types correctly
          } else if (a.attributes[contextField] > b.attributes[contextField]) {
            return 1;
          } else {
            console.warn('duplicate items found', a, b);
            return 0; // both fields and contextFields are equal
          }
        } else {
          console.warn('duplicate items found', a, b);
          return 0; // both fields and contextFields are equal
        }
      });

      const uniqueKeys = new Set();
      const uniqueFeatures = result
        .filter((feature) => {
          let key = `${feature.attributes[field]}`;
          if (contextField) {
            key += `||${feature.attributes[contextField]}`;
          }
          if (!uniqueKeys.has(key)) {
            uniqueKeys.add(key);
            return true;
          }
          return false;
        })
        .map((feature) => {
          let key = `${feature.attributes[field]}`;
          if (contextField) {
            key += `||${feature.attributes[contextField]}`;
          }

          let context = null;
          if (contextField) {
            context = feature.attributes[contextField];
          }

          return {
            name: feature.attributes[field],
            context,
            key,
          };
        });

      return {
        items: uniqueFeatures.slice(0, maxResults),
      };
    },
    getFeature: async (searchValue: string) => {
      const [value, qualifier] = searchValue.split('||');
      const searchOptions = {
        ...options,
        predicate: `UPPER(${field}) = UPPER('${value}')`,
        spatialReference: options?.wkid ?? 26912,
        attributeStyle: 'input',
      };

      if (qualifier) {
        searchOptions.predicate += ` AND UPPER(${contextField}) = UPPER('${qualifier}')`;
      }

      const response = await search(
        apiKey,
        table,
        [field, 'shape@'],
        searchOptions,
      );

      if ((response as ApiErrorResponse)?.message) {
        return { items: [] };
      }

      const result = response as SearchResponse['result'];

      return { items: result };
    },
  };
};

export const masqueradeProvider = (
  url: string,
  wkid: number,
): SherlockProvider => {
  return {
    load: async ({ signal, filterText, maxResults = 10 }) => {
      if ((filterText?.length ?? 0) < 3) {
        return { items: [] };
      }

      const suggestUrl = `${url}/suggest?text=${filterText}&maxSuggestions=${maxResults}`;
      const responseJson = await safeFetch<ISuggestResponse>(suggestUrl, {
        signal,
      });

      const features = responseJson.suggestions.map((suggestion) => {
        return { name: suggestion.text, key: suggestion.magicKey };
      });

      return { items: features.slice(0, maxResults) };
    },
    getFeature: async (magicKey: string) => {
      const getFeatureUrl = `${url}/findAddressCandidates?magicKey=${magicKey}&outSR={"wkid":${wkid}}`;

      const responseJson = await safeFetch<IGeocodeResponse>(getFeatureUrl);

      if (responseJson.candidates.length === 0 || !responseJson.candidates[0]) {
        return { items: [] };
      }

      const candidate = responseJson.candidates[0];

      const graphic = {
        geometry: {
          ...candidate.location,
          type: 'point',
          spatialReference: {
            wkid: wkid,
          },
          attributes: {
            ...candidate.attributes,
            extent: {
              ...candidate.extent,
              spatialReference: {
                wkid: wkid,
              },
            },
          },
        },
      } as AccessorGraphicProperties;

      return { items: [graphic] };
    },
  };
};

export const featureServiceProvider = (
  url: KyInput,
  searchField: string,
  contextField?: string,
  kyOptions: KyOptions = {},
): SherlockProvider => {
  let initialized = false;
  const init = async (signal: AbortSignal) => {
    // validate searchField and contextField
    const serviceJson = await safeFetch<IFeatureSet>(`${url}?f=json`, {
      signal,
      ...kyOptions,
    });

    let searchFieldValidated = false;
    let contextFieldValidated = false;

    if (serviceJson.fields === undefined) {
      throw new Error('No fields found in service');
    }

    for (const field of serviceJson.fields) {
      if (field.name === searchField) {
        if (field.type !== 'esriFieldTypeString') {
          throw new Error(
            `Field: ${searchField} must be of type "esriFieldTypeString"`,
          );
        }
        searchFieldValidated = true;
      }

      if (contextField && field.name === contextField) {
        if (field.type !== 'esriFieldTypeString') {
          throw new Error(
            `Field: ${contextField} must be of type "esriFieldTypeString"`,
          );
        }
        contextFieldValidated = true;
      }
    }

    const fieldsList = serviceJson.fields.map((f) => f.name).join(', ');
    if (!searchFieldValidated) {
      throw new Error(
        `Field: ${searchField} not found in service fields: ${fieldsList}`,
      );
    }

    if (contextField && !contextFieldValidated) {
      throw new Error(
        `Field: ${contextField} not found in service fields: ${fieldsList}`,
      );
    }

    initialized = true;
  };

  return {
    load: async ({ signal, filterText, maxResults = 10 }) => {
      if (!initialized) {
        await init(signal);
      }

      if ((filterText?.length ?? 0) < 3) {
        return { items: [] };
      }

      const searchParams = new URLSearchParams({
        f: 'json',
        where: `UPPER(${searchField}) LIKE UPPER('%${filterText}%')`,
        outFields: [searchField, contextField].join(','), // trailing commas are ignored in feature service queries
        returnGeometry: 'false',
        resultRecordCount: maxResults.toString(),
        returnDistinctValues: 'true',
        orderByFields: searchField,
      });

      const responseJson = await safeFetch<IFeatureSet>(
        `${url}/query?${searchParams.toString()}`,
        {
          signal,
          ...kyOptions,
        },
      );

      const suggestions = responseJson.features.map((feature) => {
        let where = `${searchField} = '${feature.attributes[searchField]}'`;
        if (contextField) {
          where += ` AND ${contextField} = '${feature.attributes[contextField]}'`;
        }

        return {
          name: feature.attributes[searchField],
          context: contextField ? feature.attributes[contextField] : null,
          key: where,
        };
      });

      return { items: suggestions };
    },
    getFeature: async (key: string) => {
      const searchParams = new URLSearchParams({
        f: 'json',
        where: key,
        outFields: '*',
        returnGeometry: 'true',
        resultRecordCount: '1',
      });

      const responseJson = await safeFetch<IFeatureSet>(
        `${url}/query?${searchParams.toString()}`,
        kyOptions,
      );

      if (responseJson.features.length === 0 || !responseJson.features[0]) {
        return { items: [] };
      }

      const feature = {
        ...responseJson.features[0],
        geometry: {
          ...responseJson.features[0].geometry,
          type: {
            esriGeometryPolyline: 'polyline',
            esriGeometryPoint: 'point',
            esriGeometryPolygon: 'polygon',
            esriGeometryMultipoint: 'multipoint',
            esriGeometryEnvelope: 'extent',
            esriGeometryMultiPatch: 'multipatch',
          }[responseJson.geometryType!],
          spatialReference: responseJson.spatialReference,
        },
      } as AccessorGraphicProperties;

      return { items: [feature] };
    },
  };
};

export const multiProvider = (
  providers: SherlockProvider[],
): SherlockProvider => {
  const separator = '||';
  return {
    // @ts-expect-error - TODO: Update this to handle types correctly
    load: async ({
      signal,
      filterText,
      maxResults = 10,
    }: LoaderOptions<AsyncListItem, string>) => {
      const promises = providers.map((provider) =>
        provider.load({
          signal,
          filterText,
          maxResults,
          items: [],
          selectedKeys: new Set(),
          sortDescriptor: { column: 'name', direction: 'ascending' },
        }),
      );
      const results = await Promise.all(promises);

      const items = results.flatMap((result, index) =>
        Array.from(result.items).map(
          // prepend index to key so that we can look up the provider in getFeature
          (item) => {
            item.key = `${index}${separator}${item.key}`;

            return item;
          },
        ),
      );

      return { items: items.slice(0, maxResults) };
    },
    getFeature: async (keyValue: string) => {
      const [providerIndex, key] = keyValue.split(separator);

      const provider = providers[Number(providerIndex)];

      if (!provider) {
        throw new Error(`Provider not found for keyValue: ${keyValue}`);
      }

      if (!key) {
        throw new Error(`Key not found for keyValue: ${keyValue}`);
      }

      const response = await provider.getFeature(key);

      return response;
    },
  };
};

export type SherlockProps = {
  provider: SherlockProvider;
  onSherlockMatch?: (
    match: Graphic[],
    context: { list: AsyncListData<AsyncListItem> },
  ) => void;
  label?: ReactNode;
  placeholder?: string;
};

export const Sherlock = (props: SherlockProps) => {
  const list = useAsyncList({ load: props.provider.load });
  const selectionChanged = async (key: Key | null) => {
    if (key === null) {
      return;
    }

    const response = await props.provider.getFeature(key.toString());

    const results = response.items;

    const graphics = results.map(
      (result) =>
        new Graphic({
          geometry: result.geometry,
          attributes: result.attributes,
          // @ts-expect-error - TODO: Update this to handle types correctly
          symbol: result.geometry && defaultSymbols[result.geometry.type],
        }),
    );

    if (props.onSherlockMatch) {
      props.onSherlockMatch(graphics, { list });
    }
  };

  if (list.error) {
    // send this to the console since we are displaying a generic error message in the UI
    console.error(list.error);
  }

  return (
    <ComboBox
      items={list.items}
      shouldFocusWrap={true}
      inputValue={list.filterText}
      onInputChange={list.setFilterText}
      allowsEmptyCollection={true}
      onSelectionChange={selectionChanged}
      isInvalid={!!list.error}
    >
      {props.label && <Label>{props.label}</Label>}
      <div className="group mt-1 grow-[9999] basis-64 rounded-md transition-shadow ease-in-out">
        <Group className={inputStyles}>
          <SearchIcon
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-2 h-full w-5 text-zinc-400 group-focus-within:text-primary-900 dark:group-focus-within:text-zinc-300"
          />
          <Input
            placeholder={props.placeholder}
            onChange={(event) => list.setFilterText(event.target.value)}
            className="block w-full appearance-none bg-transparent pl-9 pr-3 leading-5 text-zinc-900 caret-primary-800 placeholder:text-zinc-400 focus:outline-none dark:text-white dark:caret-accent-500 dark:ring-zinc-200/20 dark:placeholder:text-zinc-300 dark:focus:ring-accent-700 sm:text-sm"
          />
          {(list.loadingState === 'loading' ||
            list.loadingState === 'filtering') && (
            <span
              aria-hidden
              className="pointer-events-none text-zinc-400 group-focus-within:text-primary-900 dark:group-focus-within:text-zinc-300"
            >
              <Spinner aria-label="searching" />
            </span>
          )}
          <Button className="pr-2">
            <ChevronsUpDownIcon
              aria-hidden
              className="h-full w-5 shrink-0 text-zinc-500 dark:text-zinc-400"
            />
          </Button>
        </Group>
      </div>
      {list.error ? (
        <FieldError>There was an error with the search process</FieldError>
      ) : (
        <Popover className="w-[--trigger-width] py-1">
          <ListBox
            className="group mt-1 grow-[9999] basis-64 overflow-hidden rounded-md border border-transparent bg-white shadow ring-1 ring-zinc-900/5 dark:border-zinc-200/20 dark:bg-zinc-700"
            renderEmptyState={() => {
              if (list.filterText.length >= 3 && list.loadingState === 'idle') {
                return (
                  <div className="bg-warning-100 py-2 text-center dark:bg-warning-700">
                    No items found matching your search
                  </div>
                );
              }
              return (
                <div className="bg-sky-100 py-2 text-center dark:bg-sky-700">
                  Type 2 or more characters to begin searching
                </div>
              );
            }}
          >
            {(item: AsyncListItem) => (
              <ListBoxItem
                textValue={item.name}
                className="relative flex cursor-default select-none items-center justify-between gap-2 rounded px-2 py-1 text-sm outline-none ring-secondary-400 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:bg-zinc-300/50 focus-visible:ring selected:bg-secondary-600 selected:text-white selected:ring-offset-2 dark:text-white dark:ring-offset-zinc-950 dark:hover:bg-zinc-300/20"
              >
                {({ isSelected }) => (
                  <>
                    <span slot="label" className="flex items-center gap-2">
                      {isSelected && <CheckIcon className="h-full w-4" />}
                      <Highlighted
                        className={isSelected ? undefined : 'ml-6'}
                        text={item.name}
                        highlight={list.filterText}
                      />
                    </span>
                    {item.context && (
                      <span slot="description">{item.context}</span>
                    )}
                  </>
                )}
              </ListBoxItem>
            )}
          </ListBox>
        </Popover>
      )}
    </ComboBox>
  );
};

const Highlighted = ({
  text = '',
  highlight = '',
  className,
}: {
  text: string;
  highlight: string;
  className?: string;
}) => {
  if (!highlight.trim()) {
    return <div>{text}</div>;
  }

  const regex = new RegExp(`(${escapeRegExp(highlight)})`, 'gi');
  const parts = text.split(regex);

  return (
    <div className={className}>
      {parts
        .filter((part) => part)
        .map((part, i) =>
          regex.test(part) ? (
            <mark
              className="bg-accent-100 dark:bg-accent-700/60 dark:text-white"
              key={i}
            >
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
    </div>
  );
};
