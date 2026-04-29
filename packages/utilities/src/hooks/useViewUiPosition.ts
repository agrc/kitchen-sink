import { whenOnce } from '@arcgis/core/core/reactiveUtils';
import type MapView from '@arcgis/core/views/MapView';
import type { UIPosition } from '@arcgis/core/views/ui/types';
import { useEffect, useRef } from 'react';

export default function useViewUiPosition(
  view: MapView | null,
  position: UIPosition,
) {
  const me = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!me.current || !view) {
      return;
    }

    whenOnce(() => view.ready).then(() => view.ui.add(me.current!, position));
  }, [position, view, me]);

  return me;
}
