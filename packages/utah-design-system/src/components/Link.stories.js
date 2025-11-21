"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalExample = exports.Example = void 0;
var Link_1 = require("./Link");
var meta = {
    component: Link_1.Link,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        function (Story) { return (<p>
        <Story />
      </p>); },
    ],
    argTypes: {},
    args: {
        quiet: false,
        href: 'https://www.imdb.com/title/tt6348138/',
        children: 'The Missing Link',
    },
};
exports.default = meta;
exports.Example = {};
exports.ExternalExample = {
    render: function (args) { return (<>
      The <Link_1.ExternalLink {...args}>missing</Link_1.ExternalLink> link
    </>); },
};
