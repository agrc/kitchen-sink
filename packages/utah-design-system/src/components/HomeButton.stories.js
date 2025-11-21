"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Example = void 0;
/* eslint-disable react-hooks/rules-of-hooks */
var Map_1 = require("@arcgis/core/Map");
var MapView_1 = require("@arcgis/core/views/MapView");
var react_1 = require("react");
var HomeButton_1 = require("./HomeButton");
var meta = {
    component: HomeButton_1.HomeButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
};
exports.default = meta;
exports.Example = {
    render: function () {
        var viewDivRef = (0, react_1.useRef)(null);
        var view = (0, react_1.useRef)(null);
        var _a = (0, react_1.useState)(false), ready = _a[0], setReady = _a[1];
        (0, react_1.useEffect)(function () {
            if (view.current) {
                return;
            }
            view.current = new MapView_1.default({
                container: viewDivRef.current,
                map: new Map_1.default({
                    basemap: 'topo',
                }),
                zoom: 15,
                center: [-111.5, 39.5],
            });
            view.current.when(function () {
                setReady(true);
            });
        }, []);
        return (<>
        <div ref={viewDivRef} className="size-96 overflow-hidden rounded-lg border">
          {ready && <HomeButton_1.HomeButton view={view.current}/>}
        </div>
      </>);
    },
};
