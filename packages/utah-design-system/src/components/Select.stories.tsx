import type { Meta } from '@storybook/react';
import { Button } from './Button';
import { Select as Component, SelectItem, SelectSection } from './Select';

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    label: 'Ice cream flavor',
  },
};

export default meta;

export const Example = (args: any) => (
  <Component {...args}>
    <SelectItem>Chocolate</SelectItem>
    <SelectItem isDisabled>Mint</SelectItem>
    <SelectItem>Strawberry</SelectItem>
    <SelectItem>Vanilla</SelectItem>
  </Component>
);

export const Sections = (args: any) => (
  <Component {...args}>
    <SelectSection title="Fruit">
      <SelectItem id="Apple">Apple</SelectItem>
      <SelectItem id="Banana">Banana</SelectItem>
      <SelectItem id="Orange">Orange</SelectItem>
      <SelectItem id="Honeydew">Honeydew</SelectItem>
      <SelectItem id="Grapes">Grapes</SelectItem>
      <SelectItem id="Watermelon">Watermelon</SelectItem>
      <SelectItem id="Cantaloupe">Cantaloupe</SelectItem>
      <SelectItem id="Pear">Pear</SelectItem>
    </SelectSection>
    <SelectSection title="Vegetable">
      <SelectItem id="Cabbage">Cabbage</SelectItem>
      <SelectItem id="Broccoli">Broccoli</SelectItem>
      <SelectItem id="Carrots">Carrots</SelectItem>
      <SelectItem id="Lettuce">Lettuce</SelectItem>
      <SelectItem id="Spinach">Spinach</SelectItem>
      <SelectItem id="Bok Choy">Bok Choy</SelectItem>
      <SelectItem id="Cauliflower">Cauliflower</SelectItem>
      <SelectItem id="Potatoes">Potatoes</SelectItem>
    </SelectSection>
  </Component>
);

Sections.args = {
  label: 'Preferred fruit or vegetable',
};

export const Validation = (args: any) => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
    }}
    className="flex flex-col items-start gap-2"
  >
    <Example {...args} />
    <Button type="submit" variant="secondary">
      Submit
    </Button>
  </form>
);

Validation.args = {
  isRequired: true,
};
