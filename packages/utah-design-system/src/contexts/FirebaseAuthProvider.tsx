import {
  type Auth,
  connectAuthEmulator,
  getAuth,
  OAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
  type UserCredential,
} from 'firebase/auth';
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useFirebaseApp } from './FirebaseAppProvider';

type AuthContextValue = {
  auth: Auth;
  provider: OAuthProvider;
  currentUser?: User;
  login(): Promise<UserCredential>;
  logout(): Promise<void>;
  ready: boolean;
};

type FirebaseAuthProviderProps = {
  provider: OAuthProvider;
  children: ReactNode;
};

const FirebaseAuthContext = createContext<AuthContextValue | null>(null);

export const FirebaseAuthProvider = (props: FirebaseAuthProviderProps) => {
  const { provider } = props;

  const app = useFirebaseApp();
  const sdk = getAuth(app);
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [ready, setReady] = useState(false);

  if (!app) {
    throw new Error(
      'You cannot use the FirebaseAuthProvider outside of a <FirebaseAppProvider />',
    );
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(sdk, (user) => {
      setCurrentUser(user ?? undefined);
    });

    sdk.authStateReady().finally(() => setReady(true));

    return () => unsubscribe();
  }, [sdk]);

  // @see https://firebase.google.com/docs/auth/web/google-signin
  const login = () => signInWithPopup(sdk, provider);
  const logout = () => signOut(sdk);

  useEffect(() => {
    if (app && import.meta.env.DEV) {
      const auth = getAuth(app);
      if (!auth.emulatorConfig) {
        console.log('Connecting to Firebase Authentication emulator');
        connectAuthEmulator(auth, 'http://127.0.0.1:9099', {
          disableWarnings: true,
        });
      }
    }
  }, [app]);

  return (
    <FirebaseAuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        provider,
        auth: sdk,
        ready,
      }}
      {...props}
    />
  );
};

export const useFirebaseAuth = () => {
  const value = useContext(FirebaseAuthContext);

  if (value === null) {
    throw new Error(
      'useFirebaseAuth must be used within a FirebaseAuthProvider',
    );
  }

  return value;
};
