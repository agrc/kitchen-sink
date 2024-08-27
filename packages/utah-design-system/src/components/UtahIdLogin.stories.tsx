import type { Meta } from '@storybook/react';
import { UtahIdLogin } from './UtahIdLogin';

const meta: Meta<typeof UtahIdLogin> = {
  component: UtahIdLogin,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Example = (args: any) => <UtahIdLogin {...args} />;
