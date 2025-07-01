import type { Meta } from '@storybook/react-vite';
import {
  Disclosure,
  DisclosureHeader,
  DisclosurePanel,
  type DisclosureProps,
} from './Disclosure';

const meta: Meta<typeof Disclosure> = {
  component: Disclosure,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Example = (args: DisclosureProps) => (
  <Disclosure {...args}>
    <DisclosureHeader>Files</DisclosureHeader>
    <DisclosurePanel>Files content</DisclosurePanel>
  </Disclosure>
);
