import type { Meta } from '@storybook/react-vite';
import {
  Disclosure,
  DisclosureGroup,
  DisclosureHeader,
  DisclosurePanel,
  type DisclosureGroupProps,
} from './Disclosure';

const meta: Meta<typeof DisclosureGroup> = {
  component: DisclosureGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    defaultExpandedKeys: ['files'],
  },
};

export default meta;

export const Example = (args: DisclosureGroupProps) => (
  <DisclosureGroup {...args}>
    <Disclosure id="files">
      <DisclosureHeader>Files</DisclosureHeader>
      <DisclosurePanel>Files content</DisclosurePanel>
    </Disclosure>
    <Disclosure id="images" isDisabled={true}>
      <DisclosureHeader>Images</DisclosureHeader>
      <DisclosurePanel>Images content</DisclosurePanel>
    </Disclosure>
    <Disclosure id="documents">
      <DisclosureHeader>Documents</DisclosureHeader>
      <DisclosurePanel>Documents content</DisclosurePanel>
    </Disclosure>
  </DisclosureGroup>
);
