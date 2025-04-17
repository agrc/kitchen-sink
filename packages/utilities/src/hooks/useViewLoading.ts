import { watch, whenOnce } from '@arcgis/core/core/reactiveUtils';
import { useEffect, useRef, useState } from 'react';

export default function useViewLoading(
  view: __esri.MapView | null,
  debounceDuration = 500,
) {
  const [isLoading, setIsLoading] = useState(false);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!view) {
      return;
    }

    whenOnce(() => view.ready).then(() => {
      watch(
        () => view.updating,
        (updating: boolean) => {
          if (updating && timeoutId.current) {
            return;
          }

          if (!updating) {
            if (timeoutId.current) {
              clearTimeout(timeoutId.current);
              timeoutId.current = null;
            }
            setIsLoading(false);
          } else {
            timeoutId.current = setTimeout(() => {
              setIsLoading(true);
              timeoutId.current = null;
            }, debounceDuration);
          }
        },
      );
    });
  }, [debounceDuration, view]);

  return isLoading;
}
