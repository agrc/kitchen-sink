import { useState, useMemo } from 'react';

type Handlers = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export default function useOpenClosed(initial = false): [boolean, Handlers] {
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
        setState((s) => !s);
      },
    }),
    [],
  );

  return [state, handlers];
}
