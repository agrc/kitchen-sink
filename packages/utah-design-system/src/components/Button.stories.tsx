import type { Meta } from '@storybook/react';
import { BotIcon } from 'lucide-react';
import { Button as Component } from './Button';

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'destructive'],
    },
    size: {
      control: 'inline-radio',
      options: ['extraSmall', 'small', 'medium', 'large', 'extraLarge'],
    },
  },
  args: {
    isDisabled: false,
    children: 'Button',
  },
};

export default meta;

export const Primary = {
  args: {
    variant: 'primary',
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
  },
};

export const Accent = {
  args: {
    variant: 'accent',
  },
};

export const Destructive = {
  args: {
    variant: 'destructive',
  },
};

export const Icon = {
  args: {
    variant: 'icon',
    children: <BotIcon />,
  },
};
