import { useEffect, useRef } from 'react';

export default function useViewUiPosition(
  view: __esri.MapView | null,
  position: __esri.UIAddComponent['position'],
) {
  const me = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    view?.ui.add(me.current!, position);
  }, [position, view]);

  return me;
}
