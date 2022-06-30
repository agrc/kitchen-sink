import { useState } from 'react';

export default function useMapReady(view) {
  const [ready, setReady] = useState(false);
  const [callbackRegistered, setCallbackRegistered] = useState(false);

  if (view && !callbackRegistered) {
    view.when(() => setReady(true));

    setCallbackRegistered(true);
  }

  return ready;
}
