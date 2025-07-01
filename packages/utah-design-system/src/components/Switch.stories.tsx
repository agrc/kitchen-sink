import type { Meta } from '@storybook/react-vite';
import { Switch as Component } from './Switch';

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    children: 'Wi-Fi',
  },
};

export default meta;

export const Example = {};
