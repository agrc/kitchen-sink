import type { Meta } from '@storybook/react-vite';
import { Banner as Component } from './Banner.tsx';

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    children: 'Something went wrong',
  },
};

export default meta;

export const Example = {};
