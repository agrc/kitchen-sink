import { useEffect, useState } from 'react';

export default function useViewPointZooming(
  mapView: React.RefObject<__esri.MapView>,
) {
  const [viewPoint, setViewPoint] = useState<__esri.Viewpoint | null>(null);

  useEffect(() => {
    if (viewPoint) {
      mapView.current?.when(() =>
        mapView.current?.goTo(viewPoint).catch(() => {}),
      );
    }
  }, [viewPoint, mapView]);

  return { viewPoint, setViewPoint };
}
