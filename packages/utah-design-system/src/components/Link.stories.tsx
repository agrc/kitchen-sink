import type { Meta } from '@storybook/react';
import { Link as Component, ExternalLink } from './Link';

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <p>
        <Story />
      </p>
    ),
  ],
  argTypes: {},
  args: {
    quiet: false,
    href: 'https://www.imdb.com/title/tt6348138/',
    children: 'The Missing Link',
  },
};

export default meta;

export const Example = {};

export const ExternalExample = (args: any) => (
  <>
    The <ExternalLink {...args}>missing</ExternalLink> link
  </>
);
