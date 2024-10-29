import { useEffect, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView.js';
import WebMap from '@arcgis/core/WebMap.js';

export default function useWebMap(div, id) {
  const webMap = useRef(null);
  const mapView = useRef(null);

  useEffect(() => {
    if (div.current) {
      webMap.current = new WebMap({
        portalItem: {
          id,
        },
      });

      mapView.current = new MapView({
        container: div.current,
        map: webMap.current,
      });
    }

    return () => {
      mapView.current.destroy();
      webMap.current.destroy();
    };
  }, [div, id]);

  return { webMap, mapView };
}
