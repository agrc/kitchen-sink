import type { Meta } from '@storybook/react';
import { UtahIdLogin as Component } from './UtahIdLogin';
import { FirebaseAppProvider, FirebaseAuthProvider } from '../contexts';
import { OAuthProvider } from 'firebase/auth';
import { firebaseConfig } from '../../firebase.ts';

const provider = new OAuthProvider('oidc.utah-id');

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <FirebaseAppProvider config={firebaseConfig}>
        <FirebaseAuthProvider provider={provider}>
          <Story />
        </FirebaseAuthProvider>
      </FirebaseAppProvider>
    ),
  ],
  argTypes: {},
  args: {},
};

export default meta;

export const Example = {};
