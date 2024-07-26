import { Checkbox } from './Checkbox';

export default {
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
  args: {
    isDisabled: false,
    children: 'Checkbox',
  },
};

export const Default = {
  args: {},
};
