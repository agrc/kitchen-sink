import type { Meta } from '@storybook/react';
import { BusyBar, Spinner as Component } from './Spinner.tsx';

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export default meta;

export const Example = {};

export const BarExample = {
  render: (args: { busy?: boolean }) => (
    <div className="relative isolate min-w-96">
      <BusyBar {...args} />
    </div>
  ),
  args: {
    busy: true,
  },
};
