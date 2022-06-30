import { useEffect, useState } from 'react';

export default function useViewLoading(view) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const init = () => {
      view.watch('updating', (updating) => setIsLoading(updating));
    };

    if (view) {
      init();
    }
  }, [view]);

  return isLoading;
}
