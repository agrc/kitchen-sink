import { useEffect, useRef } from 'react';

export default function useInterval(func, delay) {
  const handle = useRef(null);

  useEffect(() => {
    handle.current = window.setInterval(func, delay);

    return () => {
      window.clearInterval(handle.current);
    };
  }, [func, delay]);
}
