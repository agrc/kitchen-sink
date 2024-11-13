import { useEffect, useState } from 'react';

export default function useViewLoading(view: __esri.MapView | null) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const init = () => {
      view?.watch('updating', (updating: boolean) => setIsLoading(updating));
    };

    if (view) {
      init();
    }
  }, [view]);

  return isLoading;
}
