import {
  Auth,
  getAuth,
  OAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useFirebaseApp } from './FirebaseAppProvider';

type AuthContextValue = {
  auth: Auth;
  provider: OAuthProvider;
  currentUser?: User;
  login: () => Promise<UserCredential>;
  logout: () => Promise<void>;
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

  if (!app) {
    throw new Error(
      'You cannot use the FirebaseAuthProvider outside of a <FirebaseAppProvider />',
    );
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(sdk, (user) => {
      setCurrentUser(user ?? undefined);
    });

    return () => unsubscribe();
  }, [sdk]);

  // @see https://firebase.google.com/docs/auth/web/google-signin
  const login = () => signInWithPopup(sdk, provider);
  const logout = () => signOut(sdk);

  return (
    <FirebaseAuthContext.Provider
      value={{ currentUser, login, logout, provider, auth: sdk }}
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
