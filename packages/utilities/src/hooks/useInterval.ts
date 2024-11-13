import { useEffect, useRef } from 'react';

export default function useInterval(func: () => void, delay: number) {
  const handle = useRef<number | null>(null);

  useEffect(() => {
    handle.current = window.setInterval(func, delay);

    return () => {
      if (handle.current !== null) {
        window.clearInterval(handle.current);
      }
    };
  }, [func, delay]);
}
