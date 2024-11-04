import { Meta } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    layout: 'centered',
  },
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
