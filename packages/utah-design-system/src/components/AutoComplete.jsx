import Graphic from '@arcgis/core/Graphic';
import { escapeRegExp } from 'lodash-es';
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  CheckIcon,
} from '@heroicons/react/24/solid';
import Spinner from './Spinner.jsx';
import {
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  ComboBox,
  FieldError,
  Button,
  Group,
} from 'react-aria-components';
import { useAsyncList } from 'react-stately';
import { search } from '@ugrc/utilities';

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

// todo: use or lose these
let defaultItems = [
  { id: 1, name: '326 East South Temple Street, Salt Lake City' },
  { id: 2, name: 'Farmington' },
  { id: 3, name: 'Utah House District 15' },
  { id: 4, name: 'Bald Eagle Spring' },
  { id: 5, name: '84111' },
];

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
          attributeStyle: 'identical',
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
        attributeStyle: 'identical',
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
      let response = await fetch(suggestUrl, { signal });
      const responseJson = await response.json();

      const features = responseJson.suggestions.map((suggestion) => {
        return { name: suggestion.text, key: suggestion.magicKey };
      });

      return { items: features.slice(0, maxResults) };
    },
    getFeature: async (magicKey) => {
      const getFeatureUrl = `${url}/findAddressCandidates?magicKey=${magicKey}&outSR={"wkid":${wkid}}`;

      const response = await fetch(getFeatureUrl);
      const responseJson = await response.json();
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

export const AriaSherlock = (props) => {
  let list = useAsyncList({ ...props.provider });
  const selectionChanged = async (key) => {
    if (typeof props?.onSherlockMatch !== 'function') {
      return;
    }

    // at one point this was the index of the feature in the list
    // let magicKey = list.items[key].key;

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

  return (
    <ComboBox
      items={list.items}
      inputValue={list.inputValue}
      isLoading={list.isLoading}
      shouldFocusWrap={true}
      allowsEmptyCollection={true}
      onSelectionChange={selectionChanged}
    >
      {props.label && (
        <Label className="text-zinc-900 dark:text-zinc-100">
          {props.label}
        </Label>
      )}
      <div className="group mt-1 grow-[9999] basis-64 rounded-md transition-shadow ease-in-out focus-within:ring-2 focus-within:ring-primary-900 focus-within:ring-offset-2 dark:ring-offset-transparent dark:focus-within:ring-secondary-600">
        <Group className="relative flex rounded-md border border-transparent bg-white py-1.5 shadow ring-1 ring-zinc-900/5 dark:border-zinc-200/40 dark:bg-zinc-700/50">
          <MagnifyingGlassIcon
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-3 h-full w-6 text-zinc-400 group-focus-within:text-primary-900 dark:group-focus-within:text-zinc-300"
          />
          <Input
            placeholder={props.placeholder}
            onChange={(event) => list.setFilterText(event.target.value)}
            className="block w-full appearance-none bg-transparent pl-12 pr-3 leading-5 text-zinc-900 caret-primary-800 placeholder:text-zinc-400 focus:outline-none dark:text-white dark:caret-accent-500 dark:ring-zinc-200/20 dark:placeholder:text-zinc-300 dark:focus:ring-accent-700 sm:text-sm"
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
          <Button>
            <ChevronUpDownIcon
              aria-hidden
              className="h-full w-6 shrink-0 text-zinc-500 dark:text-zinc-400"
            />
          </Button>
        </Group>
      </div>
      <FieldError>{list.error}</FieldError>
      <Popover className="w-[--trigger-width] py-1">
        <ListBox
          className="group mt-1 grow-[9999] basis-64 rounded-md border border-transparent bg-white shadow ring-1 ring-zinc-900/5 dark:border-zinc-200/20 dark:bg-zinc-700"
          renderEmptyState={(event) => {
            if (
              event.state.inputValue.length >= 3 &&
              list.loadingState === 'idle'
            ) {
              return (
                <div className="rounded-md bg-rose-100 py-2 text-center">
                  No items found matching your search
                </div>
              );
            }
            return (
              <div className="rounded-md bg-blue-100 py-2 text-center">
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
    </ComboBox>
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
