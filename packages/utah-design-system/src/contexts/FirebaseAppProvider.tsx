import {
  type FirebaseApp,
  type FirebaseOptions,
  initializeApp,
  registerVersion,
} from 'firebase/app';
import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  version,
} from 'react';

const FirebaseAppContext = createContext<FirebaseApp | null>(null);

const appVersion = import.meta.env.PACKAGE_VERSION;

type FirebaseProviderProps = {
  config: FirebaseOptions;
  children: ReactNode;
};

export function FirebaseAppProvider(props: FirebaseProviderProps) {
  const { config } = props;

  const initializedApp = useMemo(() => {
    registerVersion('react', version || 'unknown');
    registerVersion('app', appVersion || 'unknown');

    console.log('initializing firebase app with config:', config);

    return initializeApp(config);
  }, [config]);

  console.log('FirebaseAppProvider', initializedApp);

  return <FirebaseAppContext.Provider value={initializedApp} {...props} />;
}

export function useFirebaseApp() {
  const app = useContext(FirebaseAppContext);

  if (!app) {
    throw new Error(
      'You cannot use the useFirebaseApp hook outside of a <FirebaseAppProvider />',
    );
  }

  return app;
}
