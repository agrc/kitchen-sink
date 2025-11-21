"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaturalResourcesExample = exports.ExplicitExample = exports.Example = void 0;
var Footer_tsx_1 = require("./Footer.tsx");
var meta = {
    component: Footer_tsx_1.Footer,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
};
exports.default = meta;
exports.Example = {};
var ExplicitExample = function (args) { return (<Footer_tsx_1.Footer {...args} renderAddress={function () { return <Footer_tsx_1.GovOpsAddress />; }} columnOne={{
        title: 'My links',
        links: [{ url: 'https://gis.utah.gov/', title: 'A custom link' }],
    }} columnTwo={{
        title: '',
        links: [],
    }} columnThree={{
        title: '',
        links: [],
    }}/>); };
exports.ExplicitExample = ExplicitExample;
var NaturalResourcesExample = function (args) { return (<Footer_tsx_1.Footer {...args} renderAddress={function () { return <Footer_tsx_1.NaturalResourcesAddress />; }} {...(0, Footer_tsx_1.dnrStandardLinks)({ repository: 'agrc/electrofishing-query' })}/>); };
exports.NaturalResourcesExample = NaturalResourcesExample;
