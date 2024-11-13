import type { Meta } from '@storybook/react';
import { Button } from './Button.tsx';
import { RadioGroup as Component, Radio } from './Radio.tsx';

const meta: Meta<typeof Component> = {
  component: Component,
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

export const Default = {};

export const Validation = (args: any) => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
    }}
    className="flex flex-col items-start gap-2"
  >
    <Component {...args} />
    <Button type="submit" variant="secondary">
      Submit
    </Button>
  </form>
);

Validation.args = {
  isRequired: true,
};
