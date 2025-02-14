import type { Meta, StoryObj } from '@storybook/react';
import { Tag, TagGroup } from './TagGroup';

const meta: Meta<typeof TagGroup> = {
  component: TagGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    label: 'Ice cream flavor',
    selectionMode: 'single',
  },
};

export default meta;

type Story = StoryObj<typeof TagGroup>;

export const Example: Story = {
  render: (args) => (
    <TagGroup {...args}>
      <Tag isDisabled>Chocolate</Tag>
      <Tag id="mint">Mint</Tag>
      <Tag>Strawberry</Tag>
      <Tag>Vanilla</Tag>
    </TagGroup>
  ),
};
