import { Meta } from '@storybook/react';
import {
  Footer as Component,
  GovOpsAddress,
  dnrStandardLinks,
  NaturalResourcesAddress,
} from './Footer.tsx';
import type { FooterProps } from './Footer.tsx';

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export default meta;

export const Example = {};

export const ExplicitExample = (args: FooterProps) => (
  <Component
    {...args}
    renderAddress={() => <GovOpsAddress />}
    columnOne={{
      title: 'My links',
      links: [{ url: 'https://gis.utah.gov/', title: 'A custom link' }],
    }}
    columnTwo={{
      title: '',
      links: [],
    }}
    columnThree={{
      title: '',
      links: [],
    }}
  />
);
export const NaturalResourcesExample = (args: FooterProps) => (
  <Component
    {...args}
    renderAddress={() => <NaturalResourcesAddress />}
    {...dnrStandardLinks({ repository: 'agrc/electrofishing-query' })}
  />
);
