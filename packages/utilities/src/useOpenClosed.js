import { useState, useMemo } from 'react';

export function useOpenClosed(initial = false) {
  const [state, setState] = useState(initial);

  const handlers = useMemo(
    () => ({
      open: () => {
        setState(true);
      },
      close: () => {
        setState(false);
      },
      toggle: () => {
        setState((s) => (s ? false : true));
      },
    }),
    []
  );

  return [state, handlers];
}
