import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tab, TabList, TabPanel, Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
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

type Story = StoryObj<typeof Tabs>;

export const Example: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList aria-label="History of Ancient Rome">
        <Tab id="FoR">Founding of Rome</Tab>
        <Tab id="MaR">Monarchy and Republic</Tab>
        <Tab id="Emp" isDisabled>
          Empire
        </Tab>
      </TabList>
      <TabPanel id="FoR">
        Arma virumque cano, Troiae qui primus ab oris.
      </TabPanel>
      <TabPanel id="MaR">Senatus Populusque Romanus.</TabPanel>
      <TabPanel id="Emp">Alea jacta est.</TabPanel>
    </Tabs>
  ),
};

export const Vertical: Story = {
  render: (args) => (
    <Tabs {...args} orientation="vertical">
      <TabList aria-label="History of Ancient Rome">
        <Tab id="FoR">Founding of Rome</Tab>
        <Tab id="MaR">Monarchy and Republic</Tab>
        <Tab id="Emp" isDisabled>
          Empire
        </Tab>
      </TabList>
      <TabPanel id="FoR">
        Arma virumque cano, Troiae qui primus ab oris.
      </TabPanel>
      <TabPanel id="MaR">Senatus Populusque Romanus.</TabPanel>
      <TabPanel id="Emp">Alea jacta est.</TabPanel>
    </Tabs>
  ),
};
