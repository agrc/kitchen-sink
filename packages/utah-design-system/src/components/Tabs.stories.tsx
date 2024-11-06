import type { Meta } from '@storybook/react';
import { Tab, TabList, TabPanel, Tabs as Component } from './Tabs';

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-[800px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {},
  args: {},
};

export default meta;

export const Example = (args: any) => (
  <Component {...args}>
    <TabList aria-label="History of Ancient Rome">
      <Tab id="FoR">Founding of Rome</Tab>
      <Tab id="MaR">Monarchy and Republic</Tab>
      <Tab id="Emp" isDisabled>
        Empire
      </Tab>
    </TabList>
    <TabPanel id="FoR">Arma virumque cano, Troiae qui primus ab oris.</TabPanel>
    <TabPanel id="MaR">Senatus Populusque Romanus.</TabPanel>
    <TabPanel id="Emp">Alea jacta est.</TabPanel>
  </Component>
);

export const Vertical = (args: any) => (
  <Component {...args} orientation="vertical">
    <TabList aria-label="History of Ancient Rome">
      <Tab id="FoR">Founding of Rome</Tab>
      <Tab id="MaR">Monarchy and Republic</Tab>
      <Tab id="Emp" isDisabled>
        Empire
      </Tab>
    </TabList>
    <TabPanel id="FoR">Arma virumque cano, Troiae qui primus ab oris.</TabPanel>
    <TabPanel id="MaR">Senatus Populusque Romanus.</TabPanel>
    <TabPanel id="Emp">Alea jacta est.</TabPanel>
  </Component>
);
