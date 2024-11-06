import type { Meta } from '@storybook/react';
import { ListBox as Component, ListBoxItem } from './ListBox';

const meta: Meta<typeof Component> = {
  component: Component,
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

export const Example = (args: any) => (
  <Component aria-label="Ice cream flavor" {...args}>
    <ListBoxItem id="chocolate">Chocolate</ListBoxItem>
    <ListBoxItem isDisabled id="mint">
      Mint
    </ListBoxItem>
    <ListBoxItem id="strawberry">Strawberry</ListBoxItem>
    <ListBoxItem id="vanilla">Vanilla</ListBoxItem>
  </Component>
);
