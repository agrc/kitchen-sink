import { useEffect, useState, useRef } from 'react';
import Sherlock, { MapServiceProvider } from './';
import Map from '@arcgis/core/Map.js';
import MapView from '@arcgis/core/views/MapView.js';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils.js';
import PropTypes from 'prop-types';

import './Sherlock.css';
import '@arcgis/core/assets/esri/themes/light/main.css';

export default {
  component: Sherlock,
};

const CITIES_URL =
  'https://services1.arcgis.com/99lidPhWCzftIe9K/ArcGIS/rest/services/UtahMunicipalBoundaries/FeatureServer/0';
const NAME_FIELD = 'NAME';
const ADDRESS_POINTS_URL =
  'https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahAddressPoints/FeatureServer/0';
const ADDRESS_FIELD = 'FullAdd';
const CITY_FIELD = 'City';

const FeatureService = ({ url, searchField, contextField }) => {
  const mapDiv = useRef();
  const mapView = useRef();
  const [sherlockMatches, setSherlockMatches] = useState();
  const [config, setConfig] = useState();

  useEffect(() => {
    const map = new Map({ basemap: 'streets-night-vector' });
    const view = new MapView({
      container: mapDiv.current,
      map,
      center: [-71.0589, 42.3601],
      zoom: 12,
    });

    setConfig({
      provider: new MapServiceProvider(url, searchField, {
        contextField,
      }),
      placeHolder: `search by ${searchField}...`,
      onSherlockMatch: (matches) => setSherlockMatches(matches),
      position: 'top-right',
      mapView: view,
    });

    mapView.current = view;
  }, [url, searchField, contextField]);

  useEffect(() => {
    const giddyUp = async () => {
      if (sherlockMatches) {
        await mapView.current.goTo({
          target: sherlockMatches,
        });

        mapView.current.graphics.addMany(sherlockMatches);

        reactiveUtils.once(
          () => mapView.current.extent,
          () => {
            mapView.current.graphics.removeAll();
          },
        );
      }
    };

    giddyUp();
  }, [sherlockMatches]);

  return (
    <div
      ref={mapDiv}
      style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
    >
      {config ? (
        <Sherlock
          {...config}
          style={{ position: 'absolute', top: '0.5em', right: '0.5em' }}
        />
      ) : null}
    </div>
  );
};

FeatureService.propTypes = {
  url: PropTypes.string.isRequired,
  searchField: PropTypes.string.isRequired,
  contextField: PropTypes.string,
};

export const cities = () => (
  <FeatureService url={CITIES_URL} searchField={NAME_FIELD} />
);
export const addressPoints = () => (
  <FeatureService
    url={ADDRESS_POINTS_URL}
    searchField={ADDRESS_FIELD}
    contextField={CITY_FIELD}
  />
);
