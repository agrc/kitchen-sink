import { signInWithPopup } from 'firebase/auth';
import { useCallback, useState } from 'react';
import { useFirebaseAuth } from '../contexts';
import { Banner } from './Banner';
import { Button, type ButtonProps } from './Button';

export const UtahIdLogin = ({
  size = 'medium',
  errorRenderer = (error) => {
    return <Banner>{error}</Banner>;
  },
}: {
  size?: ButtonProps['size'];
  errorRenderer?: (error: string) => React.ReactNode;
}) => {
  const [signInError, setSignInError] = useState<string | null>(null);
  const { auth, provider } = useFirebaseAuth() || {};

  const handlePress = useCallback(async () => {
    if (!auth || !provider) {
      console.warn(
        'You must initialize Firebase Auth with an identity provider before using this component',
      );

      return;
    }

    // @see https://firebase.google.com/docs/auth/web/google-signin
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      // Check if the error is a typical Firebase error
      if (error && typeof error === 'object' && 'code' in error) {
        const errorWithCode = error as { code: string; message: string };
        const match = /\{.*\}/.exec(errorWithCode.message);

        if (match?.length) {
          try {
            const response = JSON.parse(match[0]);
            setSignInError(response.error.message);
          } catch {
            setSignInError(errorWithCode.message ?? 'Unknown error');
          }
        } else {
          setSignInError(errorWithCode.message ?? 'Unknown error');
        }
      } else {
        setSignInError('Unknown login error');
      }
    }
  }, [auth, provider]);

  let height = 'h-6';
  if (size === 'extraSmall') {
    height = 'h-4';
  } else if (size === 'small') {
    height = 'h-5';
  } else if (size === 'medium') {
    height = 'h-6';
  } else if (size === 'large') {
    height = 'h-7';
  } else if (size === 'extraLarge') {
    height = 'h-9';
  }

  return (
    <>
      <div className="flex items-center justify-self-center text-slate-500">
        <span className="h-px w-60 flex-1 bg-slate-200 dark:bg-slate-600"></span>
        <span className="mx-3 text-xs uppercase tracking-wide text-gray-700 dark:text-gray-200">
          continue with
        </span>
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-600"></span>
      </div>
      <>{signInError && errorRenderer(signInError)}</>
      <div className="flex justify-center">
        <Button onPress={handlePress} size={size}>
          <span className="sr-only">Log in with Utahid</span>
          <svg
            className={`${height} w-auto fill-current`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 638.43 197"
          >
            <path
              d="M134.21 197a4 4 0 1 1 0-8l492-1a3.92 3.92 0 0 0 4-3.83V11.83a3.92 3.92 0 0 0-4-3.83l-518 1a4 4 0 1 1 0-8l518-1a11.93 11.93 0 0 1 12 11.83v172.34a11.93 11.93 0 0 1-12 11.83l-492 1ZM96.09 71.94A4.15 4.15 0 0 1 92 67.8v-20a34.6 34.6 0 0 0-34.52-34.52A34.79 34.79 0 0 0 23.87 40a4.14 4.14 0 0 1-8.07-1.87A43.15 43.15 0 0 1 57.48 5a42.87 42.87 0 0 1 42.75 42.76v20a4.14 4.14 0 0 1-4.14 4.18ZM69 159c0 3.15-5.86 5.72-10.74 5.72s-11.33-2.58-11.33-5.72l5.18-30.9a10.42 10.42 0 1 1 12.18-.34Z"
              transform="translate(.21)"
            />
            <path
              d="M107.27 197H8.66a8.88 8.88 0 0 1-8.87-8.87V58a8.88 8.88 0 0 1 8.87-8.87h55.26A8.88 8.88 0 0 1 72.79 58v19a.6.6 0 0 0 .59.59h33.89a8.88 8.88 0 0 1 8.87 8.87v101.67a8.88 8.88 0 0 1-8.87 8.87ZM8.66 57.45a.6.6 0 0 0-.59.59v130.09a.6.6 0 0 0 .59.59h98.61a.61.61 0 0 0 .6-.59V86.54a.6.6 0 0 0-.6-.59H73.38a8.87 8.87 0 0 1-8.86-8.87V58a.59.59 0 0 0-.6-.59Zm153.48-12v65.23c0 24.69 11 35.15 25.66 35.15 16.35 0 26.82-10.79 26.82-35.15V45.45H229v64.25c0 33.84-17.83 47.74-41.7 47.74-22.56 0-39.56-12.92-39.56-47.09v-64.9Zm109.05 8.33v22.73h20.6v10.95h-20.6v42.68c0 9.81 2.78 15.37 10.79 15.37a31.54 31.54 0 0 0 8.34-1l.65 10.8a35.31 35.31 0 0 1-12.75 2c-6.71 0-12.1-2.13-15.54-6.05-4.08-4.25-5.56-11.28-5.56-20.6v-43.2h-12.26V76.51h12.26v-19Zm80.6 101.86-1.15-10h-.49c-4.41 6.21-12.91 11.77-24.19 11.77-16 0-24.2-11.28-24.2-22.73 0-19.12 17-29.59 47.58-29.42v-1.64c0-6.54-1.8-18.31-18-18.31a39.51 39.51 0 0 0-20.6 5.88l-3.27-9.48c6.54-4.25 16-7 26-7 24.2 0 30.08 16.51 30.08 32.37v29.6a111.45 111.45 0 0 0 1.31 19Zm-2.13-40.38c-15.69-.33-33.51 2.45-33.51 17.82 0 9.32 6.21 13.73 13.57 13.73a19.69 19.69 0 0 0 19.13-13.24 15 15 0 0 0 .81-4.58Zm37.12-75.7h14.39v49.38h.32a26.71 26.71 0 0 1 10.3-10.14 29.64 29.64 0 0 1 14.72-4.09c10.63 0 27.63 6.54 27.63 33.84v47.09h-14.39v-45.45c0-12.75-4.74-23.54-18.31-23.54-9.32 0-16.68 6.54-19.29 14.38a17.41 17.41 0 0 0-1 6.87v47.74h-14.37Zm115.54 101.25c-8.41 11-18.77 16.24-23.91 16.24-4.39 0-6.36-4.3-3.39-16.87 2.66-11 7-27.61 10-40.22.73-3.35.56-4.79-.49-4.79-1.6 0-6.22 3-10.29 6.88l-2.15-4.35c8.14-8.6 19.16-15.23 24.45-15.23 4.27 0 4.64 5.38 1.63 17.83-2.94 11.28-6.74 27.08-9.55 38.24-1.12 4.28-1.12 6.13 0 6.13 1.55 0 5.83-2.25 11.37-8.08Zm4.18-83.54c0 5.25-3.76 9.91-9.12 9.91a7.31 7.31 0 0 1-7.57-7.73c0-4.41 3.42-10 9.64-10 4.69 0 7.05 3.55 7.05 7.82Zm82.1 83.43c-8.26 10.78-18.5 16.48-23.26 16.48-5 0-7.19-4-3.94-19.33l1.78-8.4c-9.21 13.38-24.29 27.73-35.61 27.73-6.59 0-12.34-6-12.34-20.68s6.65-32.08 18.7-42.25C541 88 554 82.61 561.64 82.61c3.26 0 7.91.39 10.92 1.88l5.37-26.26c1.29-6.66.07-7.3-5.9-7.81-1.58-.16-4.78-.33-5.82-.33l1-4.51a121.14 121.14 0 0 0 21.2-4.24 29.06 29.06 0 0 1 4.89-1.15c1.43 0 1.72 1.5.92 4.88-7.25 31.12-15 65.89-20.13 93.63-.8 4.28-.24 6.11.91 6.11 1.9 0 5.92-2.47 11.53-8.44Zm-28.72-15.17a43.62 43.62 0 0 0 7.35-16.9l3.21-13.88c-2.39-2.72-7.68-4.93-14.94-4.93-17.73 0-25.4 26.09-25.4 43.11 0 8.51 2.29 12.89 6.37 12.89 6.42 0 15.61-8.89 23.41-20.29Z"
              transform="translate(.21)"
            />
          </svg>
        </Button>
      </div>
    </>
  );
};
