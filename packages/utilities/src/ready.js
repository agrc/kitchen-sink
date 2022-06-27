import { useState } from 'react';

export const useMapReady = (view) => {
  const [ready, setReady] = useState(false);
  const [callbackRegistered, setCallbackRegistered] = useState(false);

  if (view && !callbackRegistered) {
    view.when(() => setReady(true));

    setCallbackRegistered(true);
  }

  return ready;
};
