import type Graphic from '@arcgis/core/Graphic';
import type { Meta } from '@storybook/react-vite';
import type { AsyncListData } from 'react-stately';
import { fn } from 'storybook/test';
import {
  Sherlock as Component,
  featureServiceProvider,
  masqueradeProvider,
  multiProvider,
  ugrcApiProvider,
  type AsyncListItem,
} from './Sherlock';

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  argTypes: {},
  args: {
    onSherlockMatch: fn(),
  },
};

export default meta;

const url =
  'https://masquerade.ugrc.utah.gov/arcgis/rest/services/UtahLocator/GeocodeServer';
const srid = 26912;

export const Example = {
  args: {
    label: 'Select a location',
    placeholder: 'Search with masquerade',
    provider: masqueradeProvider(url, srid),
  },
};

export const Clear = {
  args: {
    label: 'Select a location',
    placeholder: 'Search with masquerade',
    provider: masqueradeProvider(url, srid),
    onSherlockMatch: (
      _: Graphic[],
      context: { list: AsyncListData<AsyncListItem> },
    ): void => {
      context.list.setFilterText('');
    },
  },
};

export const APIProvider = {
  args: {
    label: 'Select a place',
    placeholder: 'Search with the UGRC API',
    provider: ugrcApiProvider(
      'ugrc-storybook',
      'location.gnis_place_names',
      'name',
      'county',
    ),
  },
};

export const FeatureServiceProvider = {
  args: {
    label: 'Select a road',
    placeholder: 'Search the roads map service',
    provider: featureServiceProvider(
      'https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahRoads/FeatureServer/0',
      'FULLNAME',
      'COUNTY_L',
    ),
  },
};

export const FeatureServiceProviderWithKyOptions = {
  args: {
    label: 'Select a road',
    placeholder: 'Search the roads map service',
    provider: featureServiceProvider(
      'https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahRoads/FeatureServer/0',
      'FULLNAME',
      'COUNTY_L',
      {
        hooks: {
          beforeRequest: [
            async (request) => {
              request.headers.set(
                // must use a CORS-safelisted request header or the request will fail
                'Accept-Language',
                await new Promise((resolve) =>
                  setTimeout(() => resolve('es'), 10),
                ),
              );
            },
          ],
        },
      },
    ),
  },
};

export const MultiProvider = {
  args: {
    label: 'Select a location',
    placeholder: 'Search the roads map service and masquerade',
    provider: multiProvider([
      featureServiceProvider(
        'https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahRoads/FeatureServer/0',
        'FULLNAME',
        'COUNTY_L',
      ),
      masqueradeProvider(url, srid),
    ]),
  },
};

export const Error = {
  args: {
    label: 'Select a road',
    placeholder: 'Search the roads map service',
    provider: featureServiceProvider(
      'https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahRoads/FeatureServer/0',
      'BAD_FIELD',
    ),
  },
};
