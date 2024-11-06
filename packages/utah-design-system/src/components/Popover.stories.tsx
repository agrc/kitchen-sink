import type { Meta } from '@storybook/react';
import { HelpCircle } from 'lucide-react';
import { DialogTrigger, Heading } from 'react-aria-components';
import { Button } from './Button';
import { Dialog } from './Dialog';
import { Popover as Component } from './Popover';

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button variant="icon" aria-label="Help">
          <HelpCircle className="h-4 w-4" />
        </Button>
        <Story />
      </DialogTrigger>
    ),
  ],
  argTypes: {},
  args: {
    showArrow: true,
  },
};

export default meta;

export const Example = (args: any) => (
  <Component {...args} className="max-w-[250px]">
    <Dialog>
      <Heading slot="title" className="mb-2 text-lg font-semibold">
        Help
      </Heading>
      <p className="text-sm">
        For help accessing your account, please contact support.
      </p>
    </Dialog>
  </Component>
);
