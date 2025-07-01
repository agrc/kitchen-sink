import type { Meta, StoryObj } from '@storybook/react-vite';
import { ExternalLink, Link } from './Link';

const meta: Meta<typeof Link> = {
  component: Link,
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

type Story = StoryObj<typeof Link>;

export const Example: Story = {};

export const ExternalExample: Story = {
  render: (args) => (
    <>
      The <ExternalLink {...args}>missing</ExternalLink> link
    </>
  ),
};
