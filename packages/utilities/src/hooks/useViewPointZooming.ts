import { whenOnce } from '@arcgis/core/core/reactiveUtils';
import { useEffect, useState } from 'react';

export default function useViewPointZooming(view: __esri.MapView) {
  const [viewPoint, setViewPoint] = useState<__esri.Viewpoint | null>(null);

  useEffect(() => {
    if (!view || !viewPoint) {
      return;
    }

    whenOnce(() => view.ready).then(() => view.goTo(viewPoint).catch(() => {}));
  }, [viewPoint, view]);

  return { viewPoint, setViewPoint };
}
