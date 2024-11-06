import {
  Sherlock as Component,
  featureServiceProvider,
  masqueradeProvider,
  multiProvider,
  ugrcApiProvider,
} from './Sherlock.jsx';

export default {
  component: Component,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

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

export const APIProvider = {
  args: {
    label: 'Select a place',
    placeholder: 'Search with the UGRC API',
    provider: ugrcApiProvider(
      'agrc-dev',
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
