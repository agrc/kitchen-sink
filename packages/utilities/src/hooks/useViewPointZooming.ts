import { useEffect, useState } from 'react';

export default function useViewPointZooming(mapView: __esri.MapView) {
  const [viewPoint, setViewPoint] = useState<__esri.Viewpoint | null>(null);

  useEffect(() => {
    if (viewPoint) {
      mapView.when(() => mapView.goTo(viewPoint).catch(() => {}));
    }
  }, [viewPoint, mapView]);

  return { viewPoint, setViewPoint };
}
