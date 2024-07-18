import { Button } from './Button';

export default {
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'destructive'],
    },
  },
  args: {
    isDisabled: false,
    children: 'Button',
  },
};

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
