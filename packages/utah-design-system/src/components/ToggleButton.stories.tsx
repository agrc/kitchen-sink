import type { Meta, StoryObj } from '@storybook/react-vite';
import { PenLineIcon } from 'lucide-react';
import { ToggleButton } from './ToggleButton';

const meta: Meta<typeof ToggleButton> = {
  component: ToggleButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof ToggleButton>;

export const Example: Story = {
  args: {
    children: 'Pin',
  },
};
export const Icon: Story = {
  args: {
    children: <PenLineIcon />,
  },
};
