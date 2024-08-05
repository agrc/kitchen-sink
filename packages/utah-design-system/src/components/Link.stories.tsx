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

export const Example = (args: any) => <Link {...args}>The missing link</Link>;

Example.args = {
  href: 'https://www.imdb.com/title/tt6348138/',
  quiet: true,
};

export const ExternalExample = (args: any) => (
  <ExternalLink {...args}>The missing link</ExternalLink>
);

ExternalExample.args = {
  href: 'https://www.imdb.com/title/tt6348138/',
};
