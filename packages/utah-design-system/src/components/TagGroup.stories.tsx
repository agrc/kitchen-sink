import type { Meta } from '@storybook/react';
import { TagGroup as Component, Tag } from './TagGroup';

const meta: Meta<typeof Component> = {
  component: Component,
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

export const Example = (args: any) => (
  <Component {...args}>
    <Tag isDisabled>Chocolate</Tag>
    <Tag id="mint">Mint</Tag>
    <Tag>Strawberry</Tag>
    <Tag>Vanilla</Tag>
  </Component>
);
