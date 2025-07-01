import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { Select, SelectItem, SelectSection } from './Select';

const meta: Meta<typeof Select> = {
  component: Select,
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

type Story = StoryObj<typeof Select>;

export const Example: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectItem>Chocolate</SelectItem>
      <SelectItem isDisabled>Mint</SelectItem>
      <SelectItem>Strawberry</SelectItem>
      <SelectItem>Vanilla</SelectItem>
    </Select>
  ),
};

export const Sections: Story = {
  args: {
    label: 'Preferred fruit or vegetable',
  },
  render: (args) => (
    <Select {...args}>
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
    </Select>
  ),
};

export const Validation: Story = {
  args: {
    isRequired: true,
  },
  render: (args) => (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
      className="flex flex-col items-start gap-2"
    >
      <Select {...args}>
        <SelectItem>Chocolate</SelectItem>
        <SelectItem isDisabled>Mint</SelectItem>
        <SelectItem>Strawberry</SelectItem>
        <SelectItem>Vanilla</SelectItem>
      </Select>
      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </form>
  ),
};
