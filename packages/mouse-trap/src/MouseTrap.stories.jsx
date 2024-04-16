import { useRef, useEffect, useState } from 'react';
import MouseTrap from './';
import EsriMap from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import { useMapReady } from '@ugrc/utilities/hooks';
import '@arcgis/core/assets/esri/themes/light/main.css';

export default {
  component: MouseTrap,
};

const WithMap = () => {
  const mapDiv = useRef();
  const [view, setView] = useState();
  const ready = useMapReady(view);

  useEffect(() => {
    const esriMap = new EsriMap({
      basemap: 'topo-vector',
    });

    const view = new MapView({
      map: esriMap,
      container: mapDiv.current,
      zoom: 4,
      center: [15, 65],
      ui: {
        components: ['zoom'],
      },
    });
    setView(view);
  }, []);

  return (
    <>
      <div ref={mapDiv} style={{ width: '250px', height: '250px' }}></div>
      {ready ? (
        <MouseTrap
          mapView={view}
          render={({ x, y }) => {
            return (
              <>
                <span>x: {x}</span>
                <span style={{ paddingLeft: '1rem' }}>y: {y}</span>
              </>
            );
          }}
        ></MouseTrap>
      ) : null}
    </>
  );
};

export const defaultMouseTrap = () => <WithMap></WithMap>;
