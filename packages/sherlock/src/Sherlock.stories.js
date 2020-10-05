import React from 'react';
import { Sherlock, MapServiceProvider } from './Sherlock';
import { ModulesHelper } from '../../../test-helpers/storyHelpers';

export default {
  title: 'Sherlock/InMap',
  decorators: [ModulesHelper]
};

const CITIES_URL =
  'https://services1.arcgis.com/99lidPhWCzftIe9K/ArcGIS/rest/services/UtahMunicipalBoundaries/FeatureServer/0';
const NAME_FIELD = 'NAME';
const ADDRESS_POINTS_URL =
  'https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahAddressPoints/FeatureServer/0';
const ADDRESS_FIELD = 'FullAdd';
const CITY_FIELD = 'City';

const FeatureService = ({ modules, url, searchField, contextField }) => {
  const mapDiv = React.useRef();
  const mapView = React.useRef();
  const [ sherlockMatches, setSherlockMatches ] = React.useState();
  const [ config, setConfig ] = React.useState();

  React.useEffect(() => {
    console.log('init sherlock');

    const map = new modules.Map({ basemap: 'streets-night-vector' });
    const view = new modules.MapView({
      container: mapDiv.current,
      map,
      center: [-71.0589, 42.3601],
      zoom: 12
    });

    setConfig({
      provider: new MapServiceProvider(
        url,
        searchField,
        modules,
        { contextField }
      ),
      placeHolder: `search by ${searchField}...`,
      onSherlockMatch: (matches) => setSherlockMatches(matches),
      modules,
      position: 'top-right',
      mapView: view
    });

    mapView.current = view;
  }, [modules, url, searchField, contextField]);

  React.useEffect(() => {
    const giddyUp = async () => {
      if (sherlockMatches) {
        await mapView.current.goTo({
          target: sherlockMatches
        });

        mapView.current.graphics.addMany(sherlockMatches);

        const { watchUtils } = modules;
        watchUtils.once(mapView.current, 'extent', () => {
          mapView.current.graphics.removeAll();
        });
      }
    };

    giddyUp();
  }, [sherlockMatches, modules]);

  return (
    <div
      ref={mapDiv}
      style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
    >
      {config ? <Sherlock {...config} /> : null}
    </div>
  );
};

export const cities = (modules) => (
  <FeatureService modules={modules} url={CITIES_URL} searchField={NAME_FIELD} />
);
export const addressPoints = (modules) => (
  <FeatureService
    modules={modules}
    url={ADDRESS_POINTS_URL}
    searchField={ADDRESS_FIELD}
    contextField={CITY_FIELD}
  />
);
