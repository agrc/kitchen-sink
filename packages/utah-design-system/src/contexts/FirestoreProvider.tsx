import { useFirebaseApp } from '@ugrc/utah-design-system';
import { connectFirestoreEmulator, Firestore, getFirestore } from 'firebase/firestore';
import { createContext, type ReactNode, useContext } from 'react';

type StoreContextValue = {
  firestore: Firestore;
};

type FirestoreProviderProps = {
  children: ReactNode;
};

const FirestoreContext = createContext<StoreContextValue | null>(null);

export const FirestoreProvider = (props: FirestoreProviderProps) => {
  const app = useFirebaseApp();
  const sdk = getFirestore(app);

  if (import.meta.env.DEV) {
    console.log('Connecting to Firestore emulator');
    connectFirestoreEmulator(sdk, 'localhost', 8080);
  }

  if (!app) {
    throw new Error('You cannot use the FirestoreProvider outside of a <FirebaseAppProvider />');
  }

  return <FirestoreContext.Provider value={{ firestore: sdk }} {...props} />;
};

export const useFirestore = () => {
  const value = useContext(FirestoreContext);

  if (value === null) {
    throw new Error('useFirestore must be used within a FirestoreProvider');
  }

  return value;
};
