import type { Meta } from '@storybook/react';
import { Link, ExternalLink } from './Link';

const meta: Meta<typeof Link> = {
  component: Link,
  parameters: {
    layout: 'centered',
  },
  args: {
    quiet: false,
  },
};

export default meta;

export const Example = (args: any) => (
  <p>
    The <Link {...args}>missing</Link> link
  </p>
);

Example.args = {
  href: 'https://www.imdb.com/title/tt6348138/',
};

export const ExternalExample = (args: any) => (
  <p>
    The <ExternalLink {...args}>missing</ExternalLink> link
  </p>
);

ExternalExample.args = {
  href: 'https://www.imdb.com/title/tt6348138/',
};
