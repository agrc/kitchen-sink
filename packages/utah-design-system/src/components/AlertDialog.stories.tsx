import type { Meta, StoryObj } from '@storybook/react';
import { DialogTrigger } from 'react-aria-components';
import { AlertDialog } from './AlertDialog';
import { Button } from './Button';
import { Modal } from './Modal';

const meta: Meta<typeof AlertDialog> = {
  component: AlertDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button variant="destructive">Delete…</Button>
        <Modal>
          <Story />
        </Modal>
      </DialogTrigger>
    ),
  ],
  argTypes: {},
  args: {
    title: 'Delete folder',
    children:
      'Are you sure you want to delete "Documents"? All contents will be permanently destroyed.',
    variant: 'destructive',
    actionLabel: 'Delete',
  },
};

export default meta;

type Story = StoryObj<typeof AlertDialog>;

export const Example: Story = {};
