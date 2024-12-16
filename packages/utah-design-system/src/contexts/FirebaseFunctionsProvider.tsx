import { useFirebaseApp } from '@ugrc/utah-design-system';
import { connectFunctionsEmulator, type Functions, getFunctions } from 'firebase/functions';
import { createContext, type ReactNode, useContext } from 'react';

type FunctionsContextValue = {
  functions: Functions;
};

type FunctionsProviderProps = {
  children: ReactNode;
};

const FunctionsContext = createContext<FunctionsContextValue | null>(null);

export const FirebaseFunctionsProvider = (props: FunctionsProviderProps) => {
  const app = useFirebaseApp();
  const sdk = getFunctions(app);

  if (import.meta.env.DEV) {
    console.log('Connecting to Firebase Functions emulator');
    connectFunctionsEmulator(sdk, 'localhost', 5001);
  }

  if (!app) {
    throw new Error('You cannot use the FirebaseFunctionsProvider outside of a <FirebaseAppProvider />');
  }

  return <FunctionsContext.Provider value={{ functions: sdk }} {...props} />;
};

export const useFirebaseFunctions = () => {
  const value = useContext(FunctionsContext);

  if (value === null) {
    throw new Error('useFirebaseFunctions must be used within a FirebaseFunctionsProvider');
  }

  return value;
};
