import { Avatar } from './Avatar';

export default {
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
};

export const Example = (args: any) => <Avatar {...args} />;
Example.args = {
  anonymous: false,
  user: { email: 'ugrc-developers@utah.gov', displayName: 'UGRC Developers' },
};

export const Anonymous = (args: any) => <Avatar {...args} />;
Anonymous.args = {
  anonymous: true,
};

export const NoGravatar = (args: any) => <Avatar {...args} />;
NoGravatar.args = {
  anonymous: false,
  user: { email: 'test@test.com', displayName: 'Test User' },
};
