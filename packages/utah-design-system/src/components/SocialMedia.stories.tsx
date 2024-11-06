import { Meta } from '@storybook/react';
import { SocialMedia as Component } from './SocialMedia.tsx';

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export default meta;

export const Example = {};
