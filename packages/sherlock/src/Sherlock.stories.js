import React from 'react';
import { Sherlock, MapServiceProvider } from './Sherlock';
import { ModulesHelper } from '../../../test-helpers/storyHelpers';


export default {
  title: 'Sherlock',
  decorators: [ModulesHelper]
};

const FEATURE_SERVICE_URL = 'https://services1.arcgis.com/99lidPhWCzftIe9K/ArcGIS/rest/services/UtahMunicipalBoundaries/FeatureServer/0';
const SEARCH_FIELD = 'NAME';

const FeatureService = ({ modules }) => {
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
      provider: new MapServiceProvider(FEATURE_SERVICE_URL, SEARCH_FIELD, modules),
      placeHolder: 'type of city name...',
      onSherlockMatch: matches => setSherlockMatches(matches),
      modules,
      mapViewPlacement: 'top-right',
      mapView: view
    });

    mapView.current = view;
  }, [modules, mapDiv]);

  React.useEffect(() => {
    const giddyUp = async () => {
      if (sherlockMatches) {
        await mapView.current.goTo({
          target: sherlockMatches
        });

        mapView.current.graphics.addMany(sherlockMatches);

        const { watchUtils } = modules;
        watchUtils.once(mapView.current, 'extent', () => mapView.current.graphics.removeAll());
      }
    };

    giddyUp();
  }, [sherlockMatches, modules]);

  return (
    <div ref={mapDiv} style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}>
      { (config) ? <Sherlock {...config} /> : null }
    </div>
  );
};

export const featureService = modules => <FeatureService modules={modules} />;
