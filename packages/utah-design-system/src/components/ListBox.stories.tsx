import type { Meta, StoryObj } from '@storybook/react';
import { ListBox, ListBoxItem } from './ListBox';

const meta: Meta<typeof ListBox> = {
  component: ListBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    onAction: undefined,
    selectionMode: 'multiple',
  },
};

export default meta;

type Story = StoryObj<typeof ListBox>;

export const Example: Story = {
  render: (args) => (
    <ListBox aria-label="Ice cream flavor" {...args}>
      <ListBoxItem id="chocolate">Chocolate</ListBoxItem>
      <ListBoxItem id="mint">Mint</ListBoxItem>
      <ListBoxItem id="strawberry">Strawberry</ListBoxItem>
      <ListBoxItem id="vanilla">Vanilla</ListBoxItem>
    </ListBox>
  ),
};
