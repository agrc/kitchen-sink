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

export const HasMasqueradeProvider = {
  render: (args) => (
    <Component
      {...args}
      label="Select a location"
      placeholder="Search with masquerade"
      provider={masqueradeProvider(url, srid)}
      onSherlockMatch={console.log}
    />
  ),
};

export const HasAPIProvider = {
  render: (args) => (
    <Component
      {...args}
      label="Select a place"
      placeholder="Search with the UGRC API"
      provider={ugrcApiProvider(
        'agrc-dev',
        'location.gnis_place_names',
        'name',
        'county',
      )}
      onSherlockMatch={console.log}
    />
  ),
};

export const HasFeatureServiceProvider = {
  render: (args) => (
    <Component
      {...args}
      label="Select a road"
      placeholder="Search the roads map service"
      provider={featureServiceProvider(
        'https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahRoads/FeatureServer/0',
        'FULLNAME',
        'COUNTY_L',
      )}
      onSherlockMatch={console.log}
    />
  ),
};

export const HasMultiProvider = {
  render: (args) => (
    <Component
      {...args}
      label="Select a location"
      placeholder="Search roads and masquerade"
      provider={multiProvider([
        featureServiceProvider(
          'https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahRoads/FeatureServer/0',
          'FULLNAME',
          'COUNTY_L',
        ),
        masqueradeProvider(url, srid),
      ])}
      onSherlockMatch={console.log}
    />
  ),
};
