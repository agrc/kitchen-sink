import type { Meta } from '@storybook/react';
import { OAuthProvider } from 'firebase/auth';
import { firebaseConfig } from '../../tests/firebase.ts';
import {
  FirebaseAppProvider,
  FirebaseAuthProvider,
  useFirebaseAuth,
} from '../contexts/index.ts';
import { Header as Component, type HeaderProps } from './Header.tsx';
import { UtahIdLogin } from './UtahIdLogin.tsx';

const provider = new OAuthProvider('oidc.utahid');

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <FirebaseAppProvider config={firebaseConfig}>
        <FirebaseAuthProvider provider={provider}>
          <div className="h-dvh">
            <Story />
            <p className="h-full bg-zinc-100 p-6" id="main-content">
              Main content
            </p>
          </div>
        </FirebaseAuthProvider>
      </FirebaseAppProvider>
    ),
  ],
  argTypes: {},
  args: {},
};

export default meta;

const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="block h-full max-w-52 text-zinc-600 dark:text-white sm:max-w-none"
    viewBox="0 0 240 64"
  >
    <defs>
      <clipPath id="a">
        <circle cx={32.49} cy={32.16} r={29.34} fill="none" strokeWidth={0} />
      </clipPath>
    </defs>
    <g clipPath="url(#a)">
      <path
        fill="#f7ea99"
        d="M58.59 36.88c-2.46 1.69-3.3 3.5-2.72 5.85.55 2.26 2.44 3.83 3.92 4.75.69.43 1.42.79 2.15 1.11V35.04c-1.17.52-2.3 1.11-3.35 1.84Z"
      />
      <path
        fill="#eaca00"
        d="M58.08 50.25c-2.87-1.77-4.73-4.1-5.37-6.74-.9-3.7.45-6.83 4.03-9.3a26.67 26.67 0 0 1 5.19-2.69v-4.21l-.79.25c-3.56 1.13-6.92 2.21-9.61 4.89l-.07.07a9.1 9.1 0 0 0-1.13 1.4c-1.57 2.4-2.18 5.75-1.66 9.18a15.5 15.5 0 0 0 1.93 5.45c3.07 5.11 8.85 6.99 11.32 7.58v-4.04a22.3 22.3 0 0 1-3.86-1.85Z"
      />
      <path
        fill="#bd9955"
        d="M47.83 50.24a18.69 18.69 0 0 1-2.36-6.65c-.64-4.22.15-8.39 2.16-11.45.45-.69.97-1.32 1.53-1.9l.09-.09c3.25-3.25 7.14-4.49 10.92-5.69l1.78-.58V13.6c-.67.17-1.34.36-1.99.58a30.98 30.98 0 0 0-8.67 4.9c-9.85 7.75-15.17 23.33-7.37 34.16 2.82 3.92 6.72 6.57 9.58 8.15h5.48c1.28 0 2.37-.82 2.78-1.96-2.59-.54-9.94-2.59-13.92-9.2Z"
      />
      <path
        fill="#386b7d"
        d="M37.04 5.5a30.61 30.61 0 0 1 1.35 6.93c.51 6.15-1.52 10.85-3.68 15.83-.56 1.29-1.14 2.63-1.67 3.99a38.2 38.2 0 0 0-1.36 4.17 32.17 32.17 0 0 0-.95 5.24 24.4 24.4 0 0 0 6.69 19.73H47.5a29.25 29.25 0 0 1-6.22-6.25c-8.89-12.35-3.04-29.94 7.99-38.62a34.18 34.18 0 0 1 9.64-5.42c1-.34 2.01-.62 3.04-.84V5.52a2.98 2.98 0 0 0-2.97-2.97H41.27A2.98 2.98 0 0 1 38.3-.42v-11.99a2.98 2.98 0 0 0-2.97-2.97H6.06c-.64 0-1.23.21-1.71.55 21.57 1.3 29.78 11.2 32.69 20.32Z"
      />
      <path
        fill="#2a515e"
        d="M27.28 41.34a36 36 0 0 1 1.05-5.8c.4-1.51.9-3.04 1.48-4.54.56-1.43 1.15-2.79 1.72-4.11 2.06-4.77 3.84-8.88 3.4-14.17a29.68 29.68 0 0 0-1.19-6.17C30.19-4.57 19.71-10.65 3.09-11.42V2.47a41.16 41.16 0 0 1 8.6-1.27c.96-.02 1.9.02 2.78.11.9.1 1.78.26 2.6.48 4.95 1.32 8.06 5.09 8.3 10.08.09 1.87-.12 3.61-.31 4.75-.46 2.73-1.22 5.48-1.94 8.13-1.32 4.81-2.68 9.78-2.33 14.78.62 8.79 4.29 16.34 8 21.87h4.12a27.94 27.94 0 0 1-5.64-20.06Z"
      />
      <path
        fill="#4d2a54"
        d="M17.34 39.77c-.4-5.58 1.05-10.85 2.45-15.94.74-2.69 1.44-5.23 1.87-7.79.16-.97.34-2.45.26-4-.17-3.51-2.21-5.96-5.74-6.9a14.5 14.5 0 0 0-2.08-.38c-.74-.08-1.53-.11-2.34-.1a41.1 41.1 0 0 0-8.67 1.37v7.53c4.27-.37 10.25.15 12.3 5.44.44 1.12.65 2.41.65 3.83 0 .85-.09 1.76-.25 2.71-.48 2.87-1.42 5.57-2.32 8.18-1.11 3.21-2.16 6.24-2.41 9.5a34.37 34.37 0 0 0 .07 5.96 36.67 36.67 0 0 0 3.51 12.21h9.99c-3.5-5.69-6.69-13.07-7.3-21.63Z"
      />
      <path
        fill="#331c38"
        d="M7.69 49.53a37.2 37.2 0 0 1-.08-6.58c.29-3.7 1.45-7.09 2.59-10.36.9-2.59 1.74-5.04 2.18-7.63.13-.77.2-1.49.2-2.15 0-.98-.14-1.85-.41-2.56-1.28-3.3-5.78-3.52-9.06-3.19v41.36a2.98 2.98 0 0 0 2.97 2.97h4.76A39.65 39.65 0 0 1 7.7 49.52Z"
      />
    </g>
    <path
      fill="gray"
      stroke="gray"
      strokeMiterlimit={10}
      d="M32.65 63.46a31.29 31.29 0 0 1-22.25-9.21A31.23 31.23 0 0 1 1.19 32 31.29 31.29 0 0 1 10.4 9.75 31.23 31.23 0 0 1 32.65.54 31.29 31.29 0 0 1 54.9 9.75 31.23 31.23 0 0 1 64.11 32a31.29 31.29 0 0 1-9.21 22.25 31.23 31.23 0 0 1-22.25 9.21Zm0-62.87a31.22 31.22 0 0 0-22.21 9.2A31.28 31.28 0 0 0 1.24 32a31.22 31.22 0 0 0 9.2 22.21 31.28 31.28 0 0 0 22.21 9.2 31.22 31.22 0 0 0 22.21-9.2A31.28 31.28 0 0 0 64.06 32a31.22 31.22 0 0 0-9.2-22.21A31.28 31.28 0 0 0 32.65.59Z"
    />
    <path
      fill="currentColor"
      d="M77.8 28.29a7.84 7.84 0 0 1-4.16-1c-1.1-.67-1.91-1.6-2.45-2.8s-.81-2.61-.81-4.24V10.01h3.28v9.39c0 .85.06 1.63.17 2.34.11.7.31 1.31.61 1.82.29.51.71.9 1.26 1.17.55.27 1.25.41 2.11.41s1.57-.14 2.11-.41c.55-.27.97-.66 1.26-1.17.29-.51.5-1.11.61-1.82s.17-1.48.17-2.34v-9.39h3.28v10.24c0 1.62-.27 3.03-.81 4.24s-1.35 2.14-2.45 2.8c-1.1.67-2.48 1-4.16 1Zm13.92-.1c-.8 0-1.45-.16-1.96-.49-.5-.33-.87-.75-1.11-1.26a3.74 3.74 0 0 1-.36-1.6v-7.09h-1.82l.28-2.61h1.54v-2.81l3.17-.33v3.15h2.81v2.61h-2.81v5.78c0 .65.04 1.12.11 1.4.08.29.25.46.52.54.27.07.71.11 1.31.11h.87l-.28 2.61h-2.28Zm6.7 0c-.68 0-1.31-.15-1.87-.45-.56-.3-1.01-.74-1.34-1.31s-.5-1.26-.5-2.07c0-.72.17-1.35.51-1.86a4.2 4.2 0 0 1 1.33-1.29c.55-.35 1.15-.62 1.79-.82s1.28-.35 1.91-.44a17 17 0 0 1 1.66-.17c-.03-.73-.22-1.27-.56-1.6s-.92-.5-1.74-.5c-.57 0-1.13.08-1.67.24-.54.16-1.15.4-1.84.74l-.28-2.58a10.75 10.75 0 0 1 4.66-1.12c.96 0 1.78.17 2.47.51s1.22.89 1.6 1.64c.38.75.56 1.75.56 2.99v3.45c0 .64.03 1.1.09 1.39.06.29.17.47.33.54.16.08.4.11.7.11h.41l-.28 2.61h-1.15c-.48 0-.9-.06-1.27-.19s-.69-.3-.95-.52a2.67 2.67 0 0 1-.64-.78c-.42.47-.98.83-1.7 1.09a6.4 6.4 0 0 1-2.22.39Zm1.33-2.43c.28 0 .63-.07 1.05-.22s.79-.38 1.13-.7v-2.92c-.6.03-1.19.12-1.79.29s-1.1.42-1.5.75c-.4.33-.6.75-.6 1.25s.14.91.41 1.16c.27.25.71.38 1.31.38Zm7.94 2.17V8.74h3.17v8.27l-.72-.56c.54-.38 1.12-.72 1.75-1.04a4.96 4.96 0 0 1 2.26-.47c1.13 0 2.04.25 2.75.75a4.3 4.3 0 0 1 1.56 2.07c.33.88.5 1.9.5 3.06v7.11h-3.17v-6.88c0-1.19-.19-2.08-.58-2.65-.38-.57-1.01-.86-1.88-.86-.74 0-1.35.17-1.82.52s-.89.81-1.25 1.4l.59-1.71v10.19h-3.17Zm26.94.36a9.66 9.66 0 0 1-4.86-1.16c-1.35-.77-2.38-1.86-3.1-3.26s-1.07-3.04-1.07-4.93.4-3.5 1.2-4.89a8.32 8.32 0 0 1 3.31-3.24 9.97 9.97 0 0 1 4.86-1.15c.95 0 1.85.1 2.72.29s1.61.45 2.22.75l-.36 3.12c-.64-.3-1.35-.54-2.12-.74-.77-.19-1.59-.29-2.46-.29-1.33 0-2.42.27-3.28.8a4.86 4.86 0 0 0-1.89 2.17 7.59 7.59 0 0 0-.61 3.12c0 1.22.21 2.3.62 3.24a4.91 4.91 0 0 0 1.86 2.21c.83.53 1.86.8 3.1.8.38 0 .77-.03 1.18-.08.41-.05.84-.12 1.27-.2v-3.2h-2.46v-2.71h5.73v7.98c-.62.37-1.45.68-2.48.95-1.03.27-2.16.4-3.38.4Zm13.9-.1a7.38 7.38 0 0 1-3.86-.93 5.94 5.94 0 0 1-2.31-2.46c-.51-1.02-.77-2.13-.77-3.35s.24-2.25.72-3.24a5.89 5.89 0 0 1 2.12-2.39c.93-.6 2.06-.9 3.4-.9a5.8 5.8 0 0 1 3.07.75c.82.5 1.43 1.18 1.84 2.02a6.26 6.26 0 0 1 .56 3.63c-.03.29-.09.58-.15.89h-8.27c.12.79.37 1.44.75 1.93s.84.85 1.39 1.08 1.14.35 1.77.35a7.24 7.24 0 0 0 3.84-1.05l.15 2.69a8.95 8.95 0 0 1-4.28.97Zm-3.56-8.12h5.17c0-.38-.07-.77-.22-1.16s-.39-.71-.72-.98c-.34-.26-.79-.4-1.36-.4-.82 0-1.46.24-1.93.72a3.53 3.53 0 0 0-.93 1.82Zm15.69 8.12c-1.39 0-2.58-.3-3.56-.91a6.09 6.09 0 0 1-2.25-2.42c-.52-1.01-.77-2.11-.77-3.3s.26-2.31.77-3.33c.52-1.01 1.26-1.83 2.25-2.44s2.17-.91 3.56-.91 2.58.3 3.56.91a6.08 6.08 0 0 1 2.25 2.44c.52 1.02.77 2.12.77 3.33s-.26 2.29-.77 3.3a6.02 6.02 0 0 1-2.25 2.42c-.98.61-2.17.91-3.56.91Zm0-2.61a2.9 2.9 0 0 0 2.46-1.12c.58-.75.86-1.71.86-2.9s-.29-2.18-.86-2.94-1.4-1.13-2.46-1.13-1.88.38-2.46 1.13-.87 1.73-.87 2.94.29 2.15.87 2.9c.58.75 1.4 1.12 2.46 1.12Zm11.72 2.61a9.91 9.91 0 0 1-4.32-.94l.28-2.71c.66.38 1.3.69 1.94.93s1.3.35 2 .35c.63 0 1.11-.1 1.45-.31s.5-.53.5-.97c0-.33-.09-.61-.26-.82a2.42 2.42 0 0 0-.79-.58 17.5 17.5 0 0 0-1.31-.55c-.79-.29-1.45-.61-2-.95a3.6 3.6 0 0 1-1.25-1.23c-.29-.48-.43-1.08-.43-1.79s.19-1.38.58-1.95c.38-.56.93-1 1.64-1.32s1.55-.47 2.52-.47a8.08 8.08 0 0 1 3.96 1l-.28 2.71c-.57-.4-1.15-.73-1.73-.99s-1.22-.39-1.91-.39c-.55 0-.97.11-1.27.33-.3.22-.45.54-.45.95 0 .49.21.87.63 1.11.42.25 1.09.55 2.01.91.6.23 1.12.47 1.55.72.44.25.8.52 1.09.82.29.3.51.64.65 1.02s.21.82.21 1.31c0 .81-.19 1.5-.58 2.07-.39.57-.96 1-1.7 1.3-.75.3-1.66.45-2.73.45Zm6.5 5.93V15.14h2.56l.61 2.12-.95-.33c.59-.61 1.23-1.09 1.92-1.45s1.54-.54 2.53-.54a5.3 5.3 0 0 1 5.1 3.33c.44 1.01.66 2.11.66 3.3s-.22 2.29-.66 3.3a5.3 5.3 0 0 1-5.1 3.33c-1 0-1.81-.14-2.43-.41a6.8 6.8 0 0 1-1.89-1.31l.82-.64v8.29h-3.17Zm6.19-8.54c.95 0 1.68-.37 2.21-1.12.52-.75.79-1.71.79-2.9s-.26-2.16-.79-2.9a2.55 2.55 0 0 0-2.21-1.11c-.73 0-1.34.17-1.8.51-.47.34-.81.81-1.04 1.41s-.33 1.3-.33 2.09.11 1.49.33 2.09c.22.6.57 1.07 1.04 1.41a3 3 0 0 0 1.8.51Zm10.52 2.61c-.68 0-1.31-.15-1.87-.45-.56-.3-1.01-.74-1.34-1.31s-.5-1.26-.5-2.07c0-.72.17-1.35.51-1.86a4.2 4.2 0 0 1 1.33-1.29c.55-.35 1.15-.62 1.79-.82s1.28-.35 1.91-.44a17 17 0 0 1 1.66-.17c-.03-.73-.22-1.27-.56-1.6s-.92-.5-1.74-.5c-.57 0-1.13.08-1.67.24-.54.16-1.15.4-1.84.74l-.28-2.58a10.75 10.75 0 0 1 4.66-1.12c.96 0 1.78.17 2.47.51s1.22.89 1.6 1.64.56 1.75.56 2.99v3.45c0 .64.03 1.1.09 1.39.06.29.17.47.33.54.16.08.4.11.7.11h.41l-.28 2.61h-1.15c-.48 0-.9-.06-1.27-.19a2.8 2.8 0 0 1-1.59-1.3c-.42.47-.98.83-1.7 1.09a6.4 6.4 0 0 1-2.22.39Zm1.33-2.43c.28 0 .63-.07 1.05-.22s.79-.38 1.13-.7v-2.92c-.6.03-1.19.12-1.79.29-.6.17-1.1.42-1.5.75s-.6.75-.6 1.25.14.91.41 1.16c.27.25.71.38 1.31.38Zm11.92 2.43c-.8 0-1.45-.16-1.96-.49-.5-.33-.87-.75-1.11-1.26a3.74 3.74 0 0 1-.36-1.6v-7.09h-1.82l.28-2.61h1.54v-2.81l3.17-.33v3.15h2.81v2.61h-2.81v5.78c0 .65.04 1.12.11 1.4.08.29.25.46.52.54.27.07.71.11 1.31.11h.87l-.28 2.61h-2.28Zm3.94-15v-3.17h3.17v3.17h-3.17Zm0 14.74v-12.8h3.17v12.8h-3.17Zm8.22.26c-.68 0-1.31-.15-1.87-.45-.56-.3-1.01-.74-1.34-1.31s-.5-1.26-.5-2.07c0-.72.17-1.35.51-1.86a4.2 4.2 0 0 1 1.33-1.29c.55-.35 1.15-.62 1.79-.82s1.28-.35 1.91-.44a17 17 0 0 1 1.66-.17c-.03-.73-.22-1.27-.56-1.6s-.92-.5-1.74-.5c-.57 0-1.13.08-1.67.24-.54.16-1.15.4-1.84.74l-.28-2.58a10.75 10.75 0 0 1 4.66-1.12c.96 0 1.78.17 2.47.51.69.34 1.22.89 1.6 1.64s.56 1.75.56 2.99v3.45c0 .64.03 1.1.09 1.39.06.29.17.47.33.54.16.08.4.11.7.11h.41l-.28 2.61h-1.15c-.48 0-.9-.06-1.27-.19s-.69-.3-.95-.52a2.67 2.67 0 0 1-.64-.78c-.42.47-.98.83-1.7 1.09a6.4 6.4 0 0 1-2.22.39Zm1.33-2.43c.28 0 .63-.07 1.05-.22s.79-.38 1.13-.7v-2.92c-.6.03-1.19.12-1.79.29s-1.1.42-1.5.75-.6.75-.6 1.25.14.91.41 1.16c.27.25.71.38 1.31.38Zm11.23 2.43c-.76 0-1.38-.15-1.86-.45-.48-.3-.84-.71-1.07-1.22a4.04 4.04 0 0 1-.35-1.68V8.74h3.17v14.79c0 .68.04 1.17.12 1.45.08.29.23.46.45.51.22.06.54.08.96.08l-.28 2.61h-1.15ZM70.58 53.42V35.51h6.55c1.24 0 2.32.2 3.24.59s1.64.99 2.16 1.79.77 1.82.77 3.05c0 1.31-.28 2.36-.84 3.13a5.97 5.97 0 0 1-2.21 1.84l4.04 7.52h-3.66l-3.45-6.65h-3.33v6.65h-3.28Zm3.28-9.39h2.41c1.35 0 2.29-.28 2.81-.83a2.9 2.9 0 0 0 .79-2.09c0-.9-.26-1.6-.78-2.1-.52-.51-1.42-.76-2.7-.76h-2.53v5.78Zm17.24 9.64c-1.54 0-2.83-.31-3.86-.93s-1.8-1.44-2.31-2.46-.77-2.13-.77-3.35.24-2.25.72-3.24A5.89 5.89 0 0 1 87 41.3c.93-.6 2.06-.9 3.4-.9a5.8 5.8 0 0 1 3.07.75c.82.5 1.43 1.18 1.84 2.02a6.26 6.26 0 0 1 .56 3.63c-.03.29-.09.58-.15.89h-8.27c.12.79.37 1.44.75 1.93s.84.85 1.39 1.08 1.14.35 1.77.35A7.24 7.24 0 0 0 95.2 50l.15 2.69a8.95 8.95 0 0 1-4.28.97Zm-3.55-8.11h5.17c0-.38-.07-.77-.22-1.16s-.39-.71-.72-.98c-.34-.26-.79-.4-1.36-.4-.82 0-1.46.24-1.93.72a3.53 3.53 0 0 0-.93 1.82Zm13.51 8.11a9.91 9.91 0 0 1-4.32-.94l.28-2.71c.66.38 1.3.69 1.94.93.64.23 1.3.35 2 .35.63 0 1.11-.1 1.45-.31.33-.2.5-.53.5-.97 0-.33-.09-.61-.26-.82-.17-.21-.44-.41-.79-.58s-.79-.35-1.31-.55c-.79-.29-1.45-.61-2-.95a3.6 3.6 0 0 1-1.25-1.23c-.29-.48-.43-1.08-.43-1.79s.19-1.38.58-1.95c.38-.56.93-1 1.64-1.32a6.1 6.1 0 0 1 2.52-.47 8.08 8.08 0 0 1 3.97 1l-.28 2.71c-.57-.4-1.15-.73-1.73-.99a4.63 4.63 0 0 0-1.91-.39c-.55 0-.97.11-1.27.33-.3.22-.45.54-.45.95 0 .49.21.87.63 1.11.42.25 1.09.55 2.01.91.6.23 1.12.47 1.55.72.44.25.8.52 1.09.82.29.3.51.64.65 1.02s.21.82.21 1.31c0 .81-.19 1.5-.58 2.07-.39.57-.96 1-1.7 1.3-.75.3-1.66.45-2.73.45Zm12.31 0c-1.39 0-2.58-.3-3.56-.91a6.09 6.09 0 0 1-2.25-2.42c-.52-1.01-.77-2.11-.77-3.3s.26-2.31.77-3.33a6.07 6.07 0 0 1 2.25-2.44c.98-.61 2.17-.91 3.56-.91s2.58.3 3.56.91a6.08 6.08 0 0 1 2.25 2.44c.52 1.02.77 2.12.77 3.33s-.26 2.29-.77 3.3a6.02 6.02 0 0 1-2.25 2.42c-.98.61-2.17.91-3.56.91Zm0-2.61a2.9 2.9 0 0 0 2.46-1.12c.58-.75.86-1.71.86-2.9s-.29-2.18-.86-2.94c-.58-.75-1.4-1.13-2.46-1.13s-1.88.38-2.46 1.13c-.58.75-.87 1.73-.87 2.94s.29 2.15.87 2.9c.58.75 1.4 1.12 2.46 1.12Zm13.38 2.61a5.69 5.69 0 0 1-3.19-.79c-.79-.53-1.36-1.26-1.71-2.18s-.52-1.99-.52-3.19v-6.88h3.17v6.88c0 1.19.2 2.07.6 2.64.4.58 1.04.86 1.94.86.72 0 1.31-.17 1.78-.51.47-.34.87-.82 1.18-1.43l-.56 1.61V40.62h3.17v12.8h-2.97l-.15-2.23.69.9c-.31.39-.79.75-1.45 1.09s-1.32.5-1.98.5Zm8.14-.25v-12.8h2.97l.08 1.36c.32-.36.78-.72 1.37-1.07a3.63 3.63 0 0 1 2.49-.49l-.23 3.12a4.89 4.89 0 0 0-1.1-.13c-.54 0-1.03.12-1.47.37a2.2 2.2 0 0 0-.93.91v8.73h-3.17Zm13.46.25a7 7 0 0 1-3.69-.9 5.86 5.86 0 0 1-2.25-2.41c-.51-1-.76-2.11-.76-3.32s.25-2.34.75-3.35a5.78 5.78 0 0 1 2.26-2.42 7.21 7.21 0 0 1 3.79-.91 7.39 7.39 0 0 1 3.43.82l-.26 2.56a6.6 6.6 0 0 0-2.86-.71c-1.23 0-2.18.37-2.85 1.11-.67.74-1.01 1.71-1.01 2.9s.35 2.09 1.04 2.86a3.57 3.57 0 0 0 2.8 1.16c.5 0 1-.07 1.49-.22a7.2 7.2 0 0 0 1.43-.62l.28 2.69c-.44.23-.98.42-1.61.56a9.1 9.1 0 0 1-1.98.21Zm11.08 0a7.38 7.38 0 0 1-3.86-.93 5.94 5.94 0 0 1-2.31-2.46c-.51-1.02-.77-2.13-.77-3.35s.24-2.25.72-3.24a5.89 5.89 0 0 1 2.12-2.39c.93-.6 2.06-.9 3.4-.9a5.8 5.8 0 0 1 3.07.75c.82.5 1.43 1.18 1.84 2.02a6.26 6.26 0 0 1 .56 3.63c-.03.29-.09.58-.15.89h-8.27c.12.79.37 1.44.75 1.93s.84.85 1.39 1.08 1.14.35 1.77.35a7.24 7.24 0 0 0 3.84-1.05l.15 2.69a8.95 8.95 0 0 1-4.28.97Zm-3.56-8.11h5.17c0-.38-.07-.77-.22-1.16s-.39-.71-.72-.98c-.34-.26-.79-.4-1.36-.4-.82 0-1.46.24-1.93.72a3.53 3.53 0 0 0-.93 1.82Zm23.54 8.22a9.69 9.69 0 0 1-4.8-1.16 8.21 8.21 0 0 1-3.23-3.25c-.77-1.39-1.16-3.03-1.16-4.91s.4-3.51 1.2-4.91a8.5 8.5 0 0 1 3.29-3.25 9.8 9.8 0 0 1 4.8-1.16c.95 0 1.81.1 2.6.3.78.2 1.46.45 2.03.75l-.36 3.12c-.65-.3-1.32-.54-2-.74a8.61 8.61 0 0 0-2.3-.29c-1.25 0-2.3.26-3.14.79a5 5 0 0 0-1.9 2.19c-.43.93-.64 1.99-.64 3.19s.21 2.26.63 3.19 1.04 1.66 1.87 2.19c.83.53 1.87.79 3.1.79.86 0 1.63-.09 2.32-.28.68-.19 1.37-.44 2.06-.74l.36 3.12a10.93 10.93 0 0 1-4.73 1.05Zm12.21-.11a7.38 7.38 0 0 1-3.86-.93 5.94 5.94 0 0 1-2.31-2.46c-.51-1.02-.77-2.13-.77-3.35s.24-2.25.72-3.24a5.89 5.89 0 0 1 2.12-2.39c.93-.6 2.06-.9 3.4-.9a5.8 5.8 0 0 1 3.07.75c.82.5 1.43 1.18 1.84 2.02a6.26 6.26 0 0 1 .56 3.63c-.03.29-.09.58-.15.89h-8.27c.12.79.37 1.44.75 1.93s.84.85 1.39 1.08 1.14.35 1.77.35a7.24 7.24 0 0 0 3.84-1.05l.15 2.69a8.95 8.95 0 0 1-4.28.97Zm-3.56-8.11h5.17c0-.38-.07-.77-.22-1.16s-.39-.71-.72-.98c-.34-.26-.79-.4-1.36-.4-.82 0-1.46.24-1.93.72a3.53 3.53 0 0 0-.93 1.82Zm9.88 7.86v-12.8h2.97l.13 2.38-.74-.97a8.66 8.66 0 0 1 1.74-1.11c.67-.33 1.46-.5 2.35-.5 1.64 0 2.85.54 3.65 1.63a7.04 7.04 0 0 1 1.19 4.23v7.14h-3.17v-6.88c0-1.19-.2-2.08-.6-2.65-.4-.57-1.04-.86-1.94-.86-.73 0-1.32.18-1.78.53a5 5 0 0 0-1.22 1.41l.59-1.56v10.01h-3.17Zm17.45.25c-.8 0-1.45-.16-1.96-.49-.5-.33-.87-.75-1.11-1.26a3.74 3.74 0 0 1-.36-1.6v-7.09h-1.82l.28-2.61h1.54v-2.81l3.17-.33v3.15h2.81v2.61h-2.81v5.78c0 .65.04 1.12.11 1.4.08.29.25.46.52.54.27.07.71.11 1.31.11h.87l-.28 2.61h-2.28Zm10.11 0c-1.54 0-2.83-.31-3.86-.93s-1.8-1.44-2.31-2.46-.77-2.13-.77-3.35.24-2.25.72-3.24a5.89 5.89 0 0 1 2.12-2.39c.93-.6 2.06-.9 3.4-.9a5.8 5.8 0 0 1 3.07.75c.82.5 1.43 1.18 1.84 2.02a6.26 6.26 0 0 1 .56 3.63c-.03.29-.09.58-.15.89h-8.27c.12.79.37 1.44.75 1.93s.84.85 1.39 1.08 1.14.35 1.77.35A7.24 7.24 0 0 0 229.6 50l.15 2.69a8.95 8.95 0 0 1-4.28.97Zm-3.55-8.11h5.17c0-.38-.07-.77-.22-1.16s-.39-.71-.72-.98c-.34-.26-.79-.4-1.36-.4-.82 0-1.46.24-1.93.72a3.53 3.53 0 0 0-.93 1.82Zm9.87 7.86v-12.8h2.97l.08 1.36c.32-.36.78-.72 1.37-1.07a3.63 3.63 0 0 1 2.49-.49l-.23 3.12a2.75 2.75 0 0 0-.56-.1l-.54-.03c-.54 0-1.03.12-1.47.37a2.2 2.2 0 0 0-.93.91v8.73h-3.17Z"
    />
  </svg>
);

export const Example = {};

export const HasLogo = {
  args: {
    children: <Logo />,
  },
};

const links = [
  { key: 'Homepage', action: { url: 'https://gis.utah.gov' } },
  { key: 'GitHub', action: { url: 'https://github.com/agrc' } },
];

export const HasMenu = {
  args: {
    links: links,
  },
};

export const HasAll = {
  render: (args: HeaderProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { currentUser, logout } = useFirebaseAuth();

    return (
      <>
        <Component
          {...args}
          links={links}
          currentUser={currentUser}
          logout={logout}
        >
          <Logo />
        </Component>
        <UtahIdLogin />
      </>
    );
  },
};
