import type { Meta } from '@storybook/react-vite';
import { PrinterIcon, SaveIcon } from 'lucide-react';
import { TooltipTrigger, type TooltipProps } from 'react-aria-components';
import { Button } from './Button';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
  args: {},
};

export default meta;

export const Example = (args: TooltipProps) => (
  <div className="flex gap-2">
    <TooltipTrigger>
      <Button variant="secondary" className="px-2">
        <SaveIcon className="h-5 w-5" />
      </Button>
      <Tooltip {...args}>Save</Tooltip>
    </TooltipTrigger>
    <TooltipTrigger>
      <Button variant="secondary" className="px-2">
        <PrinterIcon className="h-5 w-5" />
      </Button>
      <Tooltip {...args}>Print</Tooltip>
    </TooltipTrigger>
  </div>
);
