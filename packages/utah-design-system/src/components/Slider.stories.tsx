import type { Meta } from '@storybook/react';
import { Slider as Component } from './Slider.tsx';

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

export const Example = (args: any) => (
  <Component
    {...args}
    className="orientation-horizontal:w-64 orientation-vertical:h-64"
  />
);
Example.args = {
  label: 'Opacity',
  defaultValue: [60],
  thumbLabels: ['value'],
};

export const Range = (args: any) => (
  <Component
    {...args}
    className="orientation-horizontal:w-64 orientation-vertical:h-64"
  />
);
Range.args = {
  label: 'Range',
  defaultValue: [30, 60],
  thumbLabels: ['start', 'end'],
};
