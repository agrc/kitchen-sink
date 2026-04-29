import { whenOnce } from '@arcgis/core/core/reactiveUtils';
import type MapView from '@arcgis/core/views/MapView';
import { useState } from 'react';

export default function useMapReady(view: MapView | null) {
  const [ready, setReady] = useState(false);

  if (!view) {
    return;
  }

  whenOnce(() => view.ready).then(() => setReady(true));

  return ready;
}
