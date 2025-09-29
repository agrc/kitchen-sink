import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bold, Italic, Underline } from 'lucide-react';
import type { ToggleButtonGroupProps } from 'react-aria-components';
import { ToggleButton } from './ToggleButton';
import { ToggleButtonGroup } from './ToggleButtonGroup';

const meta: Meta<typeof ToggleButtonGroup> = {
  component: ToggleButtonGroup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof ToggleButtonGroup>;

export const Example: Story = (args: ToggleButtonGroupProps) => (
  <ToggleButtonGroup {...args}>
    <ToggleButton id="bold" aria-label="Bold">
      <Bold className="h-4 w-4" />
    </ToggleButton>
    <ToggleButton id="italic" aria-label="Italic">
      <Italic className="h-4 w-4" />
    </ToggleButton>
    <ToggleButton id="underline" aria-label="Underline">
      <Underline className="h-4 w-4" />
    </ToggleButton>
  </ToggleButtonGroup>
);

Example.args = {
  selectionMode: 'multiple',
};
