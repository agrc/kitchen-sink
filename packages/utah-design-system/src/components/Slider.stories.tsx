import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from './Slider.tsx';

const meta: Meta<typeof Slider> = {
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Example: Story = {
  args: {
    className: 'orientation-horizontal:w-64 orientation-vertical:h-64',
    label: 'Opacity',
    defaultValue: [60],
    thumbLabels: ['value'],
  },
};

export const Range: Story = {
  args: {
    className: 'orientation-horizontal:w-64 orientation-vertical:h-64',
    label: 'Range',
    defaultValue: [30, 60],
    thumbLabels: ['start', 'end'],
  },
};
