import MapView from '@arcgis/core/views/MapView.js';
import WebMap from '@arcgis/core/WebMap.js';
import { useEffect, useRef } from 'react';

export default function useWebMap(div: HTMLDivElement, id: string) {
  const webMap = useRef<WebMap | null>(null);
  const mapView = useRef<MapView | null>(null);

  useEffect(() => {
    if (div) {
      webMap.current = new WebMap({
        portalItem: {
          id,
        },
      });

      mapView.current = new MapView({
        container: div,
        map: webMap.current,
      });
    }

    return () => {
      mapView.current?.destroy();
      webMap.current?.destroy();
    };
  }, [div, id]);

  return { webMap, mapView };
}
