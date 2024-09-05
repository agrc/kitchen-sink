import { Avatar } from './Avatar';

export default {
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
};

export const Example = (args: any) => <Avatar {...args} />;
Example.args = {
  user: { email: 'ugrc-developers@utah.gov', displayName: 'UGRC Developers' },
};

export const Anonymous = (args: any) => <Avatar {...args} />;

export const NoGravatar = (args: any) => <Avatar {...args} />;
NoGravatar.args = {
  user: { email: 'test@test.com', displayName: 'Test User' },
};
