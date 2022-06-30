import { useEffect, useState } from 'react';

export function useViewPointZooming(mapView) {
  const [viewPoint, setViewPoint] = useState(null);

  useEffect(() => {
    if (viewPoint) {
      mapView.current?.when(() => mapView.current.goTo(viewPoint).catch());
    }
  }, [viewPoint, mapView]);

  return { viewPoint, setViewPoint };
}
