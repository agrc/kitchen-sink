import { logEvent as firebaseLogEvent, getAnalytics } from 'firebase/analytics';
import { createContext, type ReactNode, useContext } from 'react';
import { useFirebaseApp } from './FirebaseAppProvider';

const FirebaseAnalyticsContext = createContext<
  ((event: string, eventParams?: object) => void) | null
>(null);

type FirebaseAnalyticsProviderProps = {
  children: ReactNode;
};

export function FirebaseAnalyticsProvider(
  props: FirebaseAnalyticsProviderProps,
) {
  const app = useFirebaseApp();
  const sdk = getAnalytics(app);

  // is this causing unnecessary re-renders?
  const logEvent = (event: string, eventParams?: object) => {
    firebaseLogEvent(sdk, event, eventParams);
  };

  return <FirebaseAnalyticsContext.Provider value={logEvent} {...props} />;
}

export function useFirebaseAnalytics() {
  const value = useContext(FirebaseAnalyticsContext);

  if (value === null) {
    throw new Error('useAnalytics must be used within a AnalyticsProvider');
  }

  return value;
}
