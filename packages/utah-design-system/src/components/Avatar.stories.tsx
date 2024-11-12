import type { Meta } from '@storybook/react';
import { Avatar as Component } from './Avatar';

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    user: {
      email: 'ugrc-developers@utah.gov',
      displayName: 'UGRC Developers',
      emailVerified: true,
      isAnonymous: false,
      metadata: {},
      providerData: [],
      refreshToken: '',
      tenantId: '',
      getIdToken: () => Promise.resolve(''),
      getIdTokenResult: () => Promise.resolve({} as any),
      reload: () => Promise.resolve(),
      toJSON: () => ({}),
      delete: () => Promise.resolve(),
      phoneNumber: null,
      photoURL: null,
      providerId: '',
      uid: '',
    },
  },
};

export default meta;

export const Example = {};
export const Anonymous = (args: any) => <Component {...args} />;
Anonymous.args = {
  user: undefined,
};
export const NoGravatar = (args: any) => <Component {...args} />;
NoGravatar.args = {
  user: { email: 'test@test.com', displayName: 'Test User' },
};
