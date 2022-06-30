import { useEffect, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';

export function useWebMap(div, id) {
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
