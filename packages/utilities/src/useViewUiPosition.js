import { useEffect, useRef } from 'react';

export function useViewUiPosition(view, position) {
  const me = useRef();

  useEffect(() => {
    view?.ui.add(me.current, position);
  }, [position, view]);

  return me;
}
