import { whenOnce } from '@arcgis/core/core/reactiveUtils';
import { useState } from 'react';

export default function useMapReady(view: __esri.MapView | null) {
  const [ready, setReady] = useState(false);

  if (view) {
    whenOnce(() => view.ready).then(() => setReady(true));
  }

  return ready;
}
