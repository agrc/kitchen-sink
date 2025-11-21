"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vertical = exports.Example = void 0;
var Tabs_1 = require("./Tabs");
var meta = {
    component: Tabs_1.Tabs,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        function (Story) { return (<div className="max-w-[800px]">
        <Story />
      </div>); },
    ],
    argTypes: {},
    args: {},
};
exports.default = meta;
exports.Example = {
    render: function (args) { return (<Tabs_1.Tabs {...args}>
      <Tabs_1.TabList aria-label="History of Ancient Rome">
        <Tabs_1.Tab id="FoR">Founding of Rome</Tabs_1.Tab>
        <Tabs_1.Tab id="MaR">Monarchy and Republic</Tabs_1.Tab>
        <Tabs_1.Tab id="Emp" isDisabled>
          Empire
        </Tabs_1.Tab>
      </Tabs_1.TabList>
      <Tabs_1.TabPanel id="FoR">
        Arma virumque cano, Troiae qui primus ab oris.
      </Tabs_1.TabPanel>
      <Tabs_1.TabPanel id="MaR">Senatus Populusque Romanus.</Tabs_1.TabPanel>
      <Tabs_1.TabPanel id="Emp">Alea jacta est.</Tabs_1.TabPanel>
    </Tabs_1.Tabs>); },
};
exports.Vertical = {
    render: function (args) { return (<Tabs_1.Tabs {...args} orientation="vertical">
      <Tabs_1.TabList aria-label="History of Ancient Rome">
        <Tabs_1.Tab id="FoR">Founding of Rome</Tabs_1.Tab>
        <Tabs_1.Tab id="MaR">Monarchy and Republic</Tabs_1.Tab>
        <Tabs_1.Tab id="Emp" isDisabled>
          Empire
        </Tabs_1.Tab>
      </Tabs_1.TabList>
      <Tabs_1.TabPanel id="FoR">
        Arma virumque cano, Troiae qui primus ab oris.
      </Tabs_1.TabPanel>
      <Tabs_1.TabPanel id="MaR">Senatus Populusque Romanus.</Tabs_1.TabPanel>
      <Tabs_1.TabPanel id="Emp">Alea jacta est.</Tabs_1.TabPanel>
    </Tabs_1.Tabs>); },
};
