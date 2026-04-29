import { whenOnce } from '@arcgis/core/core/reactiveUtils';
import type Viewpoint from '@arcgis/core/Viewpoint.js';
import type MapView from '@arcgis/core/views/MapView.js';
import { useEffect, useState } from 'react';

export default function useViewPointZooming(view: MapView) {
  const [viewPoint, setViewPoint] = useState<Viewpoint | null>(null);

  useEffect(() => {
    if (!view || !viewPoint) {
      return;
    }

    whenOnce(() => view.ready).then(() => view.goTo(viewPoint).catch(() => {}));
  }, [viewPoint, view]);

  return { viewPoint, setViewPoint };
}
