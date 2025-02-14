import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button.tsx';
import { Radio, RadioGroup } from './Radio.tsx';

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    label: 'Favorite sport',
    isDisabled: false,
    isRequired: false,
    description: '',
    children: (
      <>
        <Radio value="soccer">Soccer</Radio>
        <Radio isDisabled value="baseball">
          Baseball
        </Radio>
        <Radio value="basketball">Basketball</Radio>
      </>
    ),
  },
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {};

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
      <RadioGroup {...args} />
      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </form>
  ),
};
