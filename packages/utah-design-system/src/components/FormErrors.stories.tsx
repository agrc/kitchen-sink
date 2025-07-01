import type { Meta } from '@storybook/react-vite';
import { FormErrors as Component } from './FormErrors.tsx';

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    errors: {
      email: new Error('Email is required'),
      password: new Error('Password is required'),
    },
  },
};

export default meta;

export const Example = {};
