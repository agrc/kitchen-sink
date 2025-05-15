import { whenOnce } from '@arcgis/core/core/reactiveUtils';
import { useEffect, useRef } from 'react';

export default function useViewUiPosition(
  view: __esri.MapView | null,
  position: __esri.UIAddComponent['position'],
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
