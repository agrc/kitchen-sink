import { whenOnce } from '@arcgis/core/core/reactiveUtils';
import { useEffect, useState } from 'react';

export default function useViewPointZooming(mapView: __esri.MapView) {
  const [viewPoint, setViewPoint] = useState<__esri.Viewpoint | null>(null);

  useEffect(() => {
    if (viewPoint) {
      whenOnce(() => mapView.ready).then(() =>
        mapView.goTo(viewPoint).catch(() => {}),
      );
    }
  }, [viewPoint, mapView]);

  return { viewPoint, setViewPoint };
}
