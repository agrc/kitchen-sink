import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import { type RefObject, useEffect, useRef } from 'react';

export default function useWebMap(
  divRef: RefObject<HTMLDivElement>,
  id: string,
) {
  const mapRef = useRef<WebMap | null>(null);
  const viewRef = useRef<MapView | null>(null);

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
