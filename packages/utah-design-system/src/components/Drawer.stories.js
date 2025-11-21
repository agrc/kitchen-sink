"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtlasFlexing = exports.WithMultipleTriggers = exports.ScrollingBehavior = exports.SideLarge = exports.Side = exports.AllowFullScreen = exports.BottomExtraLarge = exports.Bottom = void 0;
var react_aria_1 = require("react-aria");
var react_lorem_ipsum_1 = require("react-lorem-ipsum");
var react_stately_1 = require("react-stately");
var Button_1 = require("./Button");
var Drawer_1 = require("./Drawer");
var meta = {
    component: Drawer_1.Drawer,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    decorators: [
        function (Story) { return (<div className="min-h-96">
        <Story />
      </div>); },
    ],
    argTypes: {},
    args: {},
};
exports.default = meta;
exports.Bottom = {
    render: function () {
        var state = (0, react_stately_1.useOverlayTriggerState)({});
        var overlayTriggerProps = (0, react_aria_1.useOverlayTrigger)({
            type: 'dialog',
        }, state);
        return (<Drawer_1.Drawer type="tray" state={state} {...overlayTriggerProps}>
        <react_lorem_ipsum_1.LoremIpsum p={1}/>
      </Drawer_1.Drawer>);
    },
};
exports.BottomExtraLarge = {
    render: function () {
        var state = (0, react_stately_1.useOverlayTriggerState)({});
        var overlayTriggerProps = (0, react_aria_1.useOverlayTrigger)({
            type: 'dialog',
        }, state);
        return (<Drawer_1.Drawer type="tray" state={state} {...overlayTriggerProps} size="extraLarge">
        <react_lorem_ipsum_1.LoremIpsum p={1}/>
      </Drawer_1.Drawer>);
    },
};
exports.AllowFullScreen = {
    render: function () {
        var state = (0, react_stately_1.useOverlayTriggerState)({});
        var overlayTriggerProps = (0, react_aria_1.useOverlayTrigger)({
            type: 'dialog',
        }, state);
        return (<Drawer_1.Drawer type="tray" state={state} {...overlayTriggerProps} allowFullScreen>
        <react_lorem_ipsum_1.LoremIpsum p={10}/>
      </Drawer_1.Drawer>);
    },
};
exports.Side = {
    render: function () {
        var state = (0, react_stately_1.useOverlayTriggerState)({});
        var overlayTriggerProps = (0, react_aria_1.useOverlayTrigger)({
            type: 'dialog',
        }, state);
        return (<Drawer_1.Drawer state={state} {...overlayTriggerProps}>
        <div className="bg-green-200">
          <react_lorem_ipsum_1.LoremIpsum p={1}/>
        </div>
      </Drawer_1.Drawer>);
    },
};
exports.SideLarge = {
    render: function () {
        var state = (0, react_stately_1.useOverlayTriggerState)({});
        var overlayTriggerProps = (0, react_aria_1.useOverlayTrigger)({
            type: 'dialog',
        }, state);
        return (<Drawer_1.Drawer state={state} {...overlayTriggerProps} size="large">
        <div className="bg-green-200">
          <react_lorem_ipsum_1.LoremIpsum p={1}/>
        </div>
      </Drawer_1.Drawer>);
    },
};
exports.ScrollingBehavior = {
    render: function () {
        var state = (0, react_stately_1.useOverlayTriggerState)({ defaultOpen: true });
        var overlayTriggerProps = (0, react_aria_1.useOverlayTrigger)({
            type: 'dialog',
        }, state);
        return (<div className="h-96">
        <Drawer_1.Drawer state={state} {...overlayTriggerProps}>
          <div className="flex flex-col gap-4 p-4">
            <h2 className="text-2xl font-bold">Drawer</h2>
            <react_lorem_ipsum_1.LoremIpsum p={4}/>
          </div>
        </Drawer_1.Drawer>
      </div>);
    },
};
exports.WithMultipleTriggers = {
    render: function () {
        var state = (0, react_stately_1.useOverlayTriggerState)({});
        var overlayTriggerProps = (0, react_aria_1.useOverlayTrigger)({
            type: 'dialog',
        }, state);
        return (<Drawer_1.Drawer state={state} {...overlayTriggerProps}>
        <react_lorem_ipsum_1.LoremIpsum p={2}/>
        <Button_1.Button {...overlayTriggerProps.triggerProps} onPress={function () {
                console.log('state', state);
                state.toggle();
            }} variant="secondary">
          Close
        </Button_1.Button>
      </Drawer_1.Drawer>);
    },
};
exports.AtlasFlexing = {
    render: function () {
        var sideBarState = (0, react_stately_1.useOverlayTriggerState)({ defaultOpen: true });
        var sideBarTriggerProps = (0, react_aria_1.useOverlayTrigger)({
            type: 'dialog',
        }, sideBarState);
        var trayState = (0, react_stately_1.useOverlayTriggerState)({});
        var trayTriggerProps = (0, react_aria_1.useOverlayTrigger)({
            type: 'dialog',
        }, trayState);
        return (<main className="flex h-[600px] flex-col gap-2">
        <div id="header" className="h-20 bg-gray-400"></div>
        <section className="relative mr-2 flex min-h-0 flex-1 overflow-x-hidden">
          <Drawer_1.Drawer main state={sideBarState} {...sideBarTriggerProps}>
            <react_lorem_ipsum_1.LoremIpsum p={10}/>
          </Drawer_1.Drawer>
          <div className="relative mb-2 flex flex-1 flex-col overflow-hidden rounded border border-zinc-200 dark:border-0 dark:border-zinc-700">
            <div className="relative flex-1 overflow-hidden dark:rounded">
              <div id="map" className="size-full bg-blue-400"></div>
              <Drawer_1.Drawer type="tray" className="shadow-inner dark:shadow-white/20" allowFullScreen state={trayState} {...trayTriggerProps}>
                <react_lorem_ipsum_1.LoremIpsum p={5}/>
              </Drawer_1.Drawer>
            </div>
          </div>
        </section>
      </main>);
    },
};
