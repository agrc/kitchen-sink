import type { Meta } from '@storybook/react-vite';
import { Checkbox as Component } from './Checkbox';

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    isDisabled: false,
    children: 'Checkbox',
  },
};

export default meta;

export const Example = {};
