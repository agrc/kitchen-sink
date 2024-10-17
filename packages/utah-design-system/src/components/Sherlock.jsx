import Graphic from '@arcgis/core/Graphic';
import { escapeRegExp } from 'lodash-es';
import { SearchIcon, ChevronsUpDownIcon, CheckIcon } from 'lucide-react';
import { Spinner } from './Spinner.jsx';
import {
  Input,
  ListBox,
  ListBoxItem,
  Popover,
  ComboBox,
  Button,
  Group,
  Form,
} from 'react-aria-components';
import { useAsyncList } from 'react-stately';
import { search } from '@ugrc/utilities';
import { tv } from 'tailwind-variants';
import { focusRing } from './utils.ts';
import { FieldError, Label, fieldBorderStyles } from './Field.tsx';
import ky from 'ky';

const defaultSymbols = {
  polygon: {
    type: 'simple-fill',
    color: [240, 240, 240, 0.5],
    outline: {
      style: 'solid',
      color: [255, 255, 0, 0.5],
      width: 2.5,
    },
  },
  polyline: {
    type: 'simple-line',
    style: 'solid',
    color: [255, 255, 0],
    width: 5,
  },
  point: {
    type: 'simple-marker',
    style: 'circle',
    color: [255, 255, 0, 0.5],
    size: 10,
  },
};

const inputStyles = tv({
  extend: focusRing,
  base: 'relative flex rounded-md border border-transparent bg-white py-1.5 shadow ring-1 ring-zinc-900/5 dark:bg-zinc-900',
  variants: {
    isFocused: fieldBorderStyles.variants.isFocusWithin,
  },
});

async function safeFetch(url, options) {
  const response = await ky(url, options).json();

  // handle esri response errors which return a 200 status code
  if (response.error) {
    throw new Error(`${url} returned an error: ${response.error.message}`);
  }

  return response;
}

export const ugrcApiProvider = (
  apiKey,
  table,
  field,
  contextField,
  options,
) => {
  return {
    load: async ({ signal, filterText, maxResults = 10 }) => {
      if ((filterText?.length ?? 0) < 3) {
        return { items: [] };
      }

      const response = await search(
        apiKey,
        table,
        [field, contextField],
        {
          predicate: `UPPER(${field}) LIKE UPPER('%${filterText}%')`,
          spatialReference: options?.wkid,
          attributeStyle: 'input',
        },
        signal,
      );

      response.sort((a, b) => {
        if (a.attributes[field] < b.attributes[field]) {
          return -1;
        } else if (a.attributes[field] > b.attributes[field]) {
          return 1;
        } else if (contextField) {
          // fields are equal, compare contextField
          if (a.attributes[contextField] < b.attributes[contextField]) {
            return -1;
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
      const uniqueFeatures = response
        .filter((feature) => {
          const key = `${feature.attributes[field]}||${feature.attributes[contextField]}`;
          if (!uniqueKeys.has(key)) {
            uniqueKeys.add(key);
            return true;
          }
          return false;
        })
        .map((feature) => {
          return {
            name: feature.attributes[field],
            context: feature.attributes[contextField],
            key: `${feature.attributes[field]}||${feature.attributes[contextField]}`,
          };
        });

      return {
        items: uniqueFeatures.slice(0, maxResults),
      };
    },
    getFeature: async (searchValue) => {
      console.log('getFeature', searchValue);
      const [value, qualifier] = searchValue.split('||');
      const searchOptions = {
        ...options,
        predicate: `UPPER(${field}) LIKE UPPER('%${value}%')`,
        spatialReference: options?.wkid ?? 26912,
        attributeStyle: 'input',
      };

      if (qualifier) {
        searchOptions.predicate += ` AND UPPER(${contextField}) LIKE UPPER('%${qualifier}%')`;
      }

      const response = await search(
        apiKey,
        table,
        [field, 'shape@'],
        searchOptions,
      );

      const features = response.map((feature) => {
        return {
          ...feature.attributes,
          key: feature.attributes[field],
          geometry: feature?.geometry,
        };
      });

      return { items: features };
    },
  };
};

export const masqueradeProvider = (url, wkid) => {
  return {
    load: async ({ signal, filterText, maxResults = 10 }) => {
      if ((filterText?.length ?? 0) < 3) {
        return { items: [] };
      }

      const suggestUrl = `${url}/suggest?text=${filterText}&maxSuggestions=${maxResults}`;
      const responseJson = await safeFetch(suggestUrl, { signal });

      const features = responseJson.suggestions.map((suggestion) => {
        return { name: suggestion.text, key: suggestion.magicKey };
      });

      return { items: features.slice(0, maxResults) };
    },
    getFeature: async (magicKey) => {
      const getFeatureUrl = `${url}/findAddressCandidates?magicKey=${magicKey}&outSR={"wkid":${wkid}}`;

      const responseJson = await safeFetch(getFeatureUrl);

      const candidate = responseJson.candidates[0];
      candidate.geometry = {
        ...candidate.location,
        type: 'point',
        spatialReference: {
          wkid: wkid,
        },
      };
      // used to zoom to result
      candidate.attributes.extent = {
        ...candidate.extent,
        spatialReference: {
          wkid: wkid,
        },
      };

      return { items: [candidate] };
    },
  };
};

export const featureServiceProvider = (
  url,
  searchField,
  contextField = null,
  kyOptions = {},
) => {
  let initialized = false;
  const init = async (signal) => {
    // validate searchField and contextField
    const serviceJson = await safeFetch(`${url}?f=json`, {
      signal,
      ...kyOptions,
    });

    let searchFieldValidated = false;
    let contextFieldValidated = false;
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
        outFields: [searchField, contextField].join(','),
        returnGeometry: false,
        resultRecordCount: maxResults,
        returnDistinctValues: true,
        orderByFields: searchField,
      });

      const responseJson = await safeFetch(
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
    getFeature: async (key) => {
      const searchParams = new URLSearchParams({
        f: 'json',
        where: key,
        outFields: '*',
        returnGeometry: true,
        resultRecordCount: 1,
      });

      const responseJson = await safeFetch(
        `${url}/query?${searchParams.toString()}`,
        kyOptions,
      );

      const feature = {
        ...responseJson.features[0],
        geometry: {
          ...responseJson.features[0].geometry,
          type: {
            esriGeometryPolyline: 'polyline',
            esriGeometryPoint: 'point',
            esriGeometryPolygon: 'polygon',
          }[responseJson.geometryType],
        },
        spatialReference: responseJson.spatialReference,
      };

      return { items: [feature] };
    },
  };
};

export const multiProvider = (providers) => {
  const separator = '||';
  return {
    load: async ({ signal, filterText, maxResults = 10 }) => {
      const promises = providers.map((provider) =>
        provider.load({ signal, filterText, maxResults }),
      );
      const results = await Promise.all(promises);

      const items = results.flatMap((result, index) =>
        result.items.map(
          // prepend index to key so that we can look up the provider in getFeature
          (item) => {
            item.key = `${index}${separator}${item.key}`;

            return item;
          },
        ),
      );

      return { items: items.slice(0, maxResults) };
    },
    getFeature: async (keyValue) => {
      const [providerIndex, key] = keyValue.split(separator);

      const provider = providers[providerIndex];

      const response = await provider.getFeature(key);

      return response;
    },
  };
};

export const Sherlock = (props) => {
  let list = useAsyncList({ ...props.provider });
  const selectionChanged = async (key) => {
    if (typeof props?.onSherlockMatch !== 'function') {
      return;
    }

    const response = await props.provider.getFeature(key);

    const results = response.items;

    const graphics = results.map(
      (result) =>
        new Graphic({
          geometry: result.geometry,
          attributes: result.attributes,
          symbol: defaultSymbols[result.geometry.type],
        }),
    );

    props.onSherlockMatch(graphics);
  };

  if (list.error) {
    // send this to the console since we are displaying a generic error message in the UI
    console.error(list.error);
  }

  return (
    <Form>
      <ComboBox
        items={list.items}
        inputValue={list.inputValue}
        isLoading={list.isLoading}
        shouldFocusWrap={true}
        allowsEmptyCollection={true}
        onSelectionChange={selectionChanged}
        isInvalid={!!list.error}
      >
        {props.label && <Label>{props.label}</Label>}
        <div className="group mt-1 grow-[9999] basis-64 rounded-md transition-shadow ease-in-out">
          <Group aria-hidden className={inputStyles}>
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
                <Spinner ariaLabel="searching" />
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
              renderEmptyState={(event) => {
                if (
                  event.state.inputValue.length >= 3 &&
                  list.loadingState === 'idle'
                ) {
                  return (
                    <div className="bg-rose-100 py-2 text-center dark:bg-rose-700">
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
              {(item) => (
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
    </Form>
  );
};

/**
 * @param {Object} props
 * @param {string} [props.text]
 * @param {string} [props.highlight]
 * @param {string} [props.className]
 * @returns {JSX.Element}
 */
const Highlighted = ({ text = '', highlight = '', className }) => {
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
