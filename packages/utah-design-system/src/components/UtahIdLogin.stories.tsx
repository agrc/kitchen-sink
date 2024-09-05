import type { Meta } from '@storybook/react';
import { UtahIdLogin } from './UtahIdLogin';
import { FirebaseAppProvider, FirebaseAuthProvider } from '../contexts';
import { OAuthProvider } from 'firebase/auth';
import { firebaseConfig } from '../../firebase.ts';

const provider = new OAuthProvider('oidc.utah-id');

const meta: Meta<typeof UtahIdLogin> = {
  component: UtahIdLogin,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <FirebaseAppProvider config={firebaseConfig}>
        <FirebaseAuthProvider provider={provider}>
          <Story />
        </FirebaseAuthProvider>
      </FirebaseAppProvider>
    ),
  ],
};

export default meta;

export const Example = (args: any) => <UtahIdLogin {...args} />;
