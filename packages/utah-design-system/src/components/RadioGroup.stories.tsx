import { Button } from './Button.tsx';
import { Radio, RadioGroup } from './Radio.tsx';

export default {
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
  args: {
    label: 'Favorite sport',
    isDisabled: false,
    isRequired: false,
    description: '',
    children: (
      <>
        <Radio value="soccer">Soccer</Radio>
        <Radio value="baseball">Baseball</Radio>
        <Radio value="basketball">Basketball</Radio>
      </>
    ),
  },
};

export const Default = {
  args: {},
};

export const Validation = (args: any) => (
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
);

Validation.args = {
  isRequired: true,
};
