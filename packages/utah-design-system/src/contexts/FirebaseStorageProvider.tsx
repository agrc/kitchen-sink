import { useFirebaseApp } from '@ugrc/utah-design-system';
import {
  connectStorageEmulator,
  getStorage,
  type FirebaseStorage,
} from 'firebase/storage';
import { createContext, useContext, type ReactNode } from 'react';

type StoreContextValue = {
  storage: FirebaseStorage;
};

type FirebaseStorageProviderProps = {
  children: ReactNode;
  bucketUrl?: string;
};

const FirebaseStorageContext = createContext<StoreContextValue | null>(null);

export const FirebaseStorageProvider = (
  props: FirebaseStorageProviderProps,
) => {
  const app = useFirebaseApp();
  const sdk = getStorage(app, props.bucketUrl);

  if (app && import.meta.env.DEV) {
    console.log('Connecting to Firebase Storage emulator');
    connectStorageEmulator(sdk, 'localhost', 9199);
  }

  if (!app) {
    throw new Error(
      'You cannot use the FirebaseStorageProvider outside of a <FirebaseAppProvider />',
    );
  }

  return (
    <FirebaseStorageContext.Provider value={{ storage: sdk }} {...props} />
  );
};

export const useStorage = () => {
  const value = useContext(FirebaseStorageContext);

  if (value === null) {
    throw new Error('useStorage must be used within a FirebaseStorageProvider');
  }

  return value;
};
