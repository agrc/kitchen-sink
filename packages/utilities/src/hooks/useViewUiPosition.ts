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

    view.ui.add(me.current, position);
  }, [position, view, me]);

  return me;
}
