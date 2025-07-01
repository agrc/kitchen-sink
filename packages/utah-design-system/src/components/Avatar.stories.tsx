import type { Meta, StoryObj } from '@storybook/react-vite';
import type { User } from 'firebase/auth';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    user: {
      email: 'ugrc-developers@utah.gov',
      displayName: 'UGRC Developers',
    } as User,
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Example: Story = {};
export const Anonymous: Story = {
  args: {
    user: undefined,
  },
};
export const NoGravatar: Story = {
  args: {
    user: { email: 'test@test.com', displayName: 'Test User' } as User,
  },
};
