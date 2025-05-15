import MapView from '@arcgis/core/views/MapView.js';
import WebMap from '@arcgis/core/WebMap.js';
import { type RefObject, useEffect, useRef } from 'react';

export default function useWebMap(
  divRef: RefObject<HTMLDivElement>,
  id: string,
) {
  const mapRef = useRef<__esri.WebMap | null>(null);
  const viewRef = useRef<__esri.MapView | null>(null);

  useEffect(() => {
    if (divRef.current) {
      mapRef.current = new WebMap({
        portalItem: {
          id,
        },
      });

      viewRef.current = new MapView({
        container: divRef.current,
        map: mapRef.current,
      });
    }

    return () => {
      viewRef.current?.destroy();
      mapRef.current?.destroy();
    };
  }, [divRef, id]);

  return { mapRef, viewRef };
}
