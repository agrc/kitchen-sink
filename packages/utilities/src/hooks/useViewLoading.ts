import { useEffect, useState } from 'react';

let timeoutId: NodeJS.Timeout | null = null;

export default function useViewLoading(
  view: __esri.MapView | null,
  debounceDuration = 500,
) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!view) {
      return;
    }

    view.when(() => {
      view.watch('updating', (updating: boolean) => {
        if (timeoutId) {
          return;
        }

        if (updating) {
          setIsLoading(true);
        } else {
          timeoutId = setTimeout(() => {
            setIsLoading(false);
            timeoutId = null;
          }, debounceDuration);
        }
      });
    });
  }, [view]);

  return isLoading;
}
