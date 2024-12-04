import type { Meta } from '@storybook/react';
import { PenLineIcon } from 'lucide-react';
import { ToggleButton as Component } from './ToggleButton';
const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
  args: {},
};

export default meta;

export const Example = (args: any) => <Component {...args}>Pin</Component>;
export const Icon = (args: any) => (
  <Component {...args}>
    <PenLineIcon />
  </Component>
);
