"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Submenu = exports.Sections = exports.Example = void 0;
var lucide_react_1 = require("lucide-react");
var react_aria_components_1 = require("react-aria-components");
var Button_1 = require("./Button");
var Menu_1 = require("./Menu");
var meta = {
    component: Menu_1.Menu,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        function (Story) { return (<react_aria_components_1.MenuTrigger>
        <Button_1.Button variant="secondary" className="px-2">
          <lucide_react_1.MoreHorizontal className="size-5"/>
        </Button_1.Button>
        <Story />
      </react_aria_components_1.MenuTrigger>); },
    ],
    argTypes: {},
    args: {},
};
exports.default = meta;
exports.Example = {
    render: function (args) { return (<Menu_1.Menu {...args}>
      <Menu_1.MenuItem id="new">New…</Menu_1.MenuItem>
      <Menu_1.MenuItem id="open">Open…</Menu_1.MenuItem>
      <Menu_1.MenuSeparator />
      <Menu_1.MenuItem isDisabled id="save">
        Save
      </Menu_1.MenuItem>
      <Menu_1.MenuItem id="saveAs">Save as…</Menu_1.MenuItem>
      <Menu_1.MenuSeparator />
      <Menu_1.MenuItem id="print">Print…</Menu_1.MenuItem>
    </Menu_1.Menu>); },
};
exports.Sections = {
    render: function (args) { return (<Menu_1.Menu {...args}>
      <Menu_1.MenuSection title="Your Content">
        <Menu_1.MenuItem id="repos">Repositories</Menu_1.MenuItem>
        <Menu_1.MenuItem id="projects">Projects</Menu_1.MenuItem>
        <Menu_1.MenuItem id="organizations">Organizations</Menu_1.MenuItem>
        <Menu_1.MenuItem id="stars">Stars</Menu_1.MenuItem>
        <Menu_1.MenuItem id="sponsors">Sponsors</Menu_1.MenuItem>
      </Menu_1.MenuSection>
      <Menu_1.MenuSection title="Your Account">
        <Menu_1.MenuItem id="profile">Profile</Menu_1.MenuItem>
        <Menu_1.MenuItem id="status">Set status</Menu_1.MenuItem>
        <Menu_1.MenuItem id="sign-out">Sign out</Menu_1.MenuItem>
      </Menu_1.MenuSection>
    </Menu_1.Menu>); },
};
exports.Submenu = {
    render: function (args) { return (<Menu_1.Menu {...args}>
      <Menu_1.MenuItem id="new">New…</Menu_1.MenuItem>
      <react_aria_components_1.SubmenuTrigger>
        <Menu_1.MenuItem id="open">Open</Menu_1.MenuItem>
        <react_aria_components_1.Popover>
          <Menu_1.Menu>
            <Menu_1.MenuItem id="open-new">Open in New Window</Menu_1.MenuItem>
            <Menu_1.MenuItem id="open-current">Open in Current Window</Menu_1.MenuItem>
          </Menu_1.Menu>
        </react_aria_components_1.Popover>
      </react_aria_components_1.SubmenuTrigger>
      <Menu_1.MenuSeparator />
      <Menu_1.MenuItem id="print">Print…</Menu_1.MenuItem>
      <react_aria_components_1.SubmenuTrigger>
        <Menu_1.MenuItem id="share">Share</Menu_1.MenuItem>
        <react_aria_components_1.Popover>
          <Menu_1.Menu>
            <Menu_1.MenuItem id="sms">SMS</Menu_1.MenuItem>
            <Menu_1.MenuItem id="twitter">Twitter</Menu_1.MenuItem>
            <react_aria_components_1.SubmenuTrigger>
              <Menu_1.MenuItem id="email">Email</Menu_1.MenuItem>
              <react_aria_components_1.Popover>
                <Menu_1.Menu>
                  <Menu_1.MenuItem id="work">Work</Menu_1.MenuItem>
                  <Menu_1.MenuItem id="personal">Personal</Menu_1.MenuItem>
                </Menu_1.Menu>
              </react_aria_components_1.Popover>
            </react_aria_components_1.SubmenuTrigger>
          </Menu_1.Menu>
        </react_aria_components_1.Popover>
      </react_aria_components_1.SubmenuTrigger>
    </Menu_1.Menu>); },
};
