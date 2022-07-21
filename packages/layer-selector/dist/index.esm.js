import require$$0, { useState, useRef, useEffect } from "react";
import classNames from "clsx";
import PropTypes from "prop-types";
import Basemap from "@arcgis/core/Basemap";
import LOD from "@arcgis/core/layers/support/LOD";
import TileInfo from "@arcgis/core/layers/support/TileInfo";
import WebTileLayer from "@arcgis/core/layers/WebTileLayer";
const createDefaultTileInfo = (LOD2) => {
  const tileSize = 256;
  const earthCircumference = 40075016685568e-6;
  const inchesPerMeter = 39.37;
  const initialResolution = earthCircumference / tileSize;
  const dpi = 96;
  const maxLevel = 20;
  const squared = 2;
  const lods = [];
  for (let level = 0; level <= maxLevel; level++) {
    const resolution = initialResolution / Math.pow(squared, level);
    const scale = resolution * dpi * inchesPerMeter;
    lods.push(new LOD2({
      level,
      scale,
      resolution
    }));
  }
  return {
    dpi,
    size: tileSize,
    origin: {
      x: -20037508342787e-6,
      y: 20037508342787e-6
    },
    spatialReference: {
      wkid: 3857
    },
    lods
  };
};
const setTileInfosForApplianceLayers = (layers, defaultTileInfo, TileInfo2) => {
  const lods = defaultTileInfo.lods;
  const fiveToNineteen = lods.slice(0, 20);
  const fiveToSeventeen = lods.slice(0, 18);
  const zeroToEighteen = lods.slice(0, 19);
  layers.Imagery.tileInfo = new TileInfo2(defaultTileInfo);
  layers.Hybrid.tileInfo = new TileInfo2(defaultTileInfo);
  let tileInfo = Object.assign({}, defaultTileInfo);
  tileInfo.lods = zeroToEighteen;
  layers["Color IR"].tileInfo = new TileInfo2(tileInfo);
  tileInfo = Object.assign({}, defaultTileInfo);
  tileInfo.lods = fiveToSeventeen;
  layers.Topo.tileInfo = new TileInfo2(tileInfo);
  tileInfo = Object.assign({}, defaultTileInfo);
  tileInfo.lods = fiveToNineteen;
  layers.Lite.tileInfo = new TileInfo2(tileInfo);
  layers.Overlay.tileInfo = new TileInfo2(tileInfo);
  return layers;
};
var LayerSelector$1 = /* @__PURE__ */ (() => ".layer-selector-item{margin:0 8px}.layer-selector--item{max-width:100px;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:inline-block;font-size:90%;user-select:none}.layer-selector-item-input{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:0;margin:4px 0 0;outline:thin dotted;outline:5px auto -webkit-focus-ring-color;outline-offset:-2px;position:relative;display:block}.layer-selector-item.radio,.layer-selector-item.checkbox{position:relative;margin-top:0;margin-bottom:0}.layer-selector-item.radio input[type=checkbox],.layer-selector-item.checkbox input[type=checkbox],.layer-selector-item.radio input[type=radio],.layer-selector-item.checkbox input[type=radio]{position:absolute;margin-left:-20px}.layer-selector-item.radio label,.layer-selector-item.checkbox label{min-height:20px;padding-left:20px;margin-bottom:0;font-weight:400;cursor:pointer}.layer-selector{background:#fff;pointer-events:auto;max-width:150px}.layer-selector--width{width:8em}.layer-selector__toggle{width:32px;height:32px;padding:5px;display:block}.layer-selector--layers{min-height:36px;min-width:36px;padding:10px 5px;white-space:nowrap}.layer-selector--separator{display:block;height:1px;border:0;border-top:1px solid #eee;padding:0;margin-top:.5em;margin-bottom:.5em}.layer-selector--hidden{display:none}\n")();
var icon = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNiIgaGVpZ2h0PSIyNiIgdmlld0JveD0iMCAwIDI2IDI2Ij48ZyBmaWxsPSJub25lIiBzdHJva2U9IiM1NTUiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLW1pdGVybGltaXQ9IjkiPjxwYXRoIHRyYW5zZm9ybT0ibWF0cml4KC45NTM0MiAuMzAxNjUgLS45NTM0MiAuMzAxNjUgMCAtMTAyNikiIGQ9Ik0xNzE1IDE3MDFoMTB2MTBoLTEwek0xNzM0IDE3MDl2MTEuMmgtMTEuMk0xNzQ0IDE3MTl2MTEuMmgtMTEuMiIvPjwvZz48L3N2Zz4K";
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = require$$0, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
function q(c, a, g) {
  var b, d = {}, e = null, h = null;
  g !== void 0 && (e = "" + g);
  a.key !== void 0 && (e = "" + a.key);
  a.ref !== void 0 && (h = a.ref);
  for (b in a)
    m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps)
    for (b in a = c.defaultProps, a)
      d[b] === void 0 && (d[b] = a[b]);
  return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
}
reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
const jsx = jsxRuntime.exports.jsx;
const jsxs = jsxRuntime.exports.jsxs;
const ExpandableContainer = (props) => {
  const [expanded, setExpanded] = useState(props.expanded);
  const imageClasses = classNames("layer-selector__toggle", {
    "layer-selector--hidden": expanded
  });
  const fromClasses = classNames({
    "layer-selector--hidden": !expanded
  });
  return /* @__PURE__ */ jsxs("div", {
    className: "layer-selector",
    onMouseOver: () => setExpanded(true),
    onMouseOut: () => setExpanded(false),
    "area-haspopup": "true",
    children: [/* @__PURE__ */ jsx("input", {
      type: "image",
      className: imageClasses,
      src: icon,
      alt: "layers"
    }), /* @__PURE__ */ jsx("form", {
      className: fromClasses,
      children: props.children
    })]
  });
};
ExpandableContainer.propTypes = {
  children: PropTypes.object,
  expanded: PropTypes.bool
};
const LayerSelectorItem = (props) => {
  const inputOptions = {
    type: props.layerType === "baselayer" ? "radio" : "checkbox",
    name: props.layerType,
    value: props.id
  };
  return /* @__PURE__ */ jsx("div", {
    className: "layer-selector-item radio checkbox",
    children: /* @__PURE__ */ jsxs("label", {
      className: "layer-selector--item",
      children: [/* @__PURE__ */ jsx("input", {
        className: "layer-selector-item-input",
        ...inputOptions,
        checked: props.selected,
        onChange: (event) => props.onChange(event, props)
      }), inputOptions.value]
    })
  });
};
const imageryAttributionJsonUrl = "https://mapserv.utah.gov/cdn/attribution/imagery.json";
const createLayerFactories = (layerType, layerFactories, WebTiledLayer, quadWord, applianceLayers) => {
  const resolvedInfos = [];
  layerFactories.forEach((li) => {
    if (typeof li === "string" || li instanceof String || li.token || typeof li.token === "string" || li.token instanceof String) {
      const id = li.token || li;
      if (!quadWord) {
        console.warn("layer-selector::You chose to use a layer token `" + id + "` without setting your `quadWord` from Discover. The requests for tiles will fail to  authenticate. Pass `quadWord` into the constructor of this widget.");
        return false;
      }
      var layer = applianceLayers[id];
      if (!layer) {
        console.warn("layer-selector::The layer token `" + id + "` was not found. Please use one of the supported tokens (" + Object.keys(applianceLayers).join(", ") + ") or pass in the information on how to create your custom layer (`{Factory, url, id}`).");
        return false;
      }
      const linked = [layer.linked, li.linked].reduce((acc, value, index) => {
        if (value) {
          acc = acc.concat(value);
        }
        if (index === 1 && acc.length === 0) {
          return null;
        }
        return acc;
      }, []);
      resolvedInfos.push({
        Factory: WebTiledLayer,
        urlTemplate: layer.urlPattern,
        linked,
        id,
        selected: !!li.selected,
        copyright: layer.copyright,
        layerType
      });
    } else {
      if (!Object.prototype.hasOwnProperty.call(li, "layerType")) {
        li.layerType = layerType;
      }
      if (!li.selected) {
        li.selected = false;
      }
      resolvedInfos.push(li);
    }
  });
  return resolvedInfos;
};
const ConditionalWrapper = ({
  condition,
  wrapper,
  children
}) => condition ? wrapper(children) : children;
const LayerSelector = (props) => {
  const [layers, setLayers] = useState({
    baseLayers: [],
    overlays: []
  });
  const [linkedLayers, setLinkedLayers] = useState([]);
  const [managedLayers, setManagedLayers] = useState({});
  const selectorNode = useRef();
  useEffect(() => {
    const managedLayersDraft = {
      ...managedLayers
    };
    const layerItems = layers.baseLayers.concat(layers.overlays);
    layerItems.forEach((layerItem) => {
      var _a;
      let layerList = null;
      switch (layerItem.layerType) {
        case "baselayer":
          if (!((_a = props.view.map.basemap) == null ? void 0 : _a.baseLayers)) {
            props.view.map.basemap = {
              baseLayers: [],
              id: "layer-selector",
              title: "layer-selector"
            };
          }
          layerList = props.view.map.basemap.baseLayers;
          break;
        case "overlay":
          layerList = props.view.map.layers;
          break;
      }
      if (layerItem.selected === false) {
        var managedLayer = managedLayersDraft[layerItem.id] || {};
        if (!managedLayer.layer) {
          managedLayer.layer = layerList.getItemAt(layerList.indexOf(layerItem.layer));
        }
        if (managedLayer.layer) {
          layerList.remove(managedLayer.layer);
        }
        return;
      }
      if (Object.keys(managedLayersDraft).indexOf(layerItem.id) < 0) {
        managedLayersDraft[layerItem.id] = {
          layerType: layerItem.layerType
        };
      }
      if (!managedLayersDraft[layerItem.id].layer) {
        managedLayersDraft[layerItem.id].layer = new layerItem.Factory(layerItem);
      }
      if (layerItem.selected === true) {
        if (!layerList.includes(managedLayersDraft[layerItem.id].layer)) {
          layerList.add(managedLayersDraft[layerItem.id].layer);
        }
      } else {
        layerList.remove(managedLayersDraft[layerItem.id].layer);
      }
      managedLayersDraft[layerItem.id].layer.when("loaded", () => {
        const currentScale = managedLayersDraft[layerItem.id].layer.tileInfo.lods[props.view.zoom].scale;
        if (props.view.zoom > -1 && props.view.scale !== currentScale) {
          props.view.zoom = props.view.zoom;
        }
      });
      setManagedLayers(managedLayersDraft);
    });
  }, [layers]);
  useEffect(() => {
    if (!props.baseLayers || props.baseLayers.length < 1) {
      console.warn("layer-selector::`baseLayers` is null or empty. Make sure you have spelled it correctly and are passing it into the constructor of this widget.");
      return;
    }
  }, [props.baseLayers]);
  useEffect(() => {
    var _a;
    const applianceLayerTemplates = {
      Imagery: {
        urlPattern: `https://discover.agrc.utah.gov/login/path/${props.quadWord}/tiles/utah/{level}/{col}/{row}`,
        hasAttributionData: true,
        copyright: "Hexagon",
        attributionDataUrl: imageryAttributionJsonUrl
      },
      Topo: {
        urlPattern: `https://discover.agrc.utah.gov/login/path/${props.quadWord}/tiles/topo_basemap/{level}/{col}/{row}`,
        copyright: "UGRC"
      },
      Terrain: {
        urlPattern: `https://discover.agrc.utah.gov/login/path/${props.quadWord}/tiles/terrain_basemap/{level}/{col}/{row}`,
        copyright: "UGRC"
      },
      Lite: {
        urlPattern: `https://discover.agrc.utah.gov/login/path/${props.quadWord}/tiles/lite_basemap/{level}/{col}/{row}`,
        copyright: "UGRC"
      },
      "Color IR": {
        urlPattern: `https://discover.agrc.utah.gov/login/path/${props.quadWord}/tiles/naip_2018_nrg/{level}/{col}/{row}`,
        copyright: "UGRC"
      },
      Hybrid: {
        urlPattern: `https://discover.agrc.utah.gov/login/path/${props.quadWord}/tiles/utah/{level}/{col}/{row}`,
        linked: ["Overlay"],
        copyright: "Hexagon, UGRC",
        hasAttributionData: true,
        attributionDataUrl: imageryAttributionJsonUrl
      },
      Overlay: {
        urlPattern: `https://discover.agrc.utah.gov/login/path/${props.quadWord}/tiles/overlay_basemap/{level}/{col}/{row}`
      },
      "Address Points": {
        urlPattern: `https://discover.agrc.utah.gov/login/path/${props.quadWord}/tiles/address_points_basemap/{level}/{col}/{row}`
      }
    };
    props.view.map.basemap = new Basemap();
    const defaultTileInfo = createDefaultTileInfo(LOD);
    const applianceLayers = setTileInfosForApplianceLayers(applianceLayerTemplates, defaultTileInfo, TileInfo);
    const baseLayers = createLayerFactories("baselayer", props.baseLayers, WebTileLayer, props.quadWord, applianceLayers) || [];
    let overlays = props.overlays || [];
    let hasDefaultSelection = false;
    let defaultSelection = null;
    let hasHybrid = false;
    let linkedLayersBuilder = [];
    baseLayers.forEach((layer) => {
      if (layer.selected === true) {
        hasDefaultSelection = true;
        defaultSelection = layer;
      }
      if ((layer.id || layer.token) === "Hybrid") {
        hasHybrid = true;
      }
      if (layer.linked) {
        linkedLayersBuilder = linkedLayersBuilder.concat(layer.linked);
      }
    });
    setLinkedLayers(linkedLayersBuilder);
    if (!hasDefaultSelection && baseLayers.length > 0) {
      baseLayers[0].selected = true;
      defaultSelection = baseLayers[0];
    }
    if (hasHybrid && overlays[0] !== "Overlay" && ((_a = overlays[0]) == null ? void 0 : _a.id) !== "Overlay") {
      overlays.splice(0, 0, "Overlay");
    }
    overlays = createLayerFactories("overlay", overlays, WebTileLayer, props.quadWord, applianceLayers) || [];
    if (defaultSelection.linked && defaultSelection.linked.length > 0) {
      overlays.forEach((layer) => {
        if (defaultSelection.linked.includes(layer.id)) {
          layer.selected = true;
        }
      });
    }
    setLayers({
      baseLayers,
      overlays
    });
    props.view.ui.add(selectorNode.current, props.position);
  }, [props.modules]);
  const onItemChanged = (event, props2) => {
    console.log("LayerSelector.onItemChanged", props2);
    const overlays = layers.overlays;
    const baseLayers = layers.baseLayers;
    if (props2.layerType === "baselayer") {
      baseLayers.forEach((item) => {
        item.selected = item.id === props2.id ? event.target.checked : false;
      });
      const selectedItem = baseLayers.filter((layer) => layer.selected)[0];
      overlays.forEach((item) => {
        if (linkedLayers.includes(item.id)) {
          item.selected = false;
        }
      });
      if (selectedItem.linked && selectedItem.linked.length > 0) {
        overlays.forEach((item) => {
          if (selectedItem.linked.includes(item.id)) {
            item.selected = true;
          }
          return item;
        });
      }
    } else if (props2.layerType === "overlay") {
      overlays.forEach((item) => {
        if (item.id === props2.id) {
          item.selected = event.target.checked;
        }
      });
    }
    setLayers({
      overlays,
      baseLayers
    });
  };
  return /* @__PURE__ */ jsx("div", {
    ref: selectorNode,
    children: /* @__PURE__ */ jsx(ConditionalWrapper, {
      condition: props.makeExpandable,
      wrapper: (children) => /* @__PURE__ */ jsx(ExpandableContainer, {
        children
      }),
      children: /* @__PURE__ */ jsxs("div", {
        className: "layer-selector--layers",
        children: [layers.baseLayers.map((item, index) => /* @__PURE__ */ jsx(LayerSelectorItem, {
          id: item.name || item.id || "unknown",
          layerType: "baselayer",
          selected: item.selected,
          onChange: onItemChanged
        }, index)), /* @__PURE__ */ jsx("hr", {
          className: "layer-selector-separator"
        }), layers.overlays.map((item) => /* @__PURE__ */ jsx(LayerSelectorItem, {
          id: item.name || item.id || "unknown",
          layerType: "overlay",
          selected: item.selected,
          onChange: onItemChanged
        }, item.id || item))]
      })
    })
  });
};
LayerSelector.propTypes = {
  view: PropTypes.object.isRequired,
  quadWord: PropTypes.string,
  baseLayers: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.oneOf(["Hybrid", "Lite", "Terrain", "Topo", "Color IR", "Address Points", "Overlay", "Imagery"]), PropTypes.shape({
    Factory: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
    urlTemplate: PropTypes.string,
    url: PropTypes.string,
    id: PropTypes.string.isRequired,
    tileInfo: PropTypes.object,
    linked: PropTypes.arrayOf(PropTypes.string)
  }), PropTypes.shape({
    token: PropTypes.oneOf(["Hybrid", "Lite", "Terrain", "Topo", "Color IR", "Address Points", "Overlay"]).isRequired,
    selected: PropTypes.bool,
    linked: PropTypes.arrayOf(PropTypes.string)
  })])).isRequired,
  overlays: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.oneOf(["Address Points", "Overlay"]), PropTypes.shape({
    Factory: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
    urlTemplate: PropTypes.string,
    url: PropTypes.string,
    id: PropTypes.string.isRequired,
    tileInfo: PropTypes.object,
    linked: PropTypes.arrayOf(PropTypes.string)
  })])),
  position: PropTypes.oneOf(["bottom-leading", "bottom-left", "bottom-right", "bottom-trailing", "top-leading", "top-left", "top-right", "top-trailing"]),
  makeExpandable: PropTypes.bool,
  layerType: PropTypes.string,
  id: PropTypes.string
};
LayerSelector.defaultProps = {
  makeExpandable: true,
  position: "top-right"
};
LayerSelectorItem.propTypes = {
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  layerType: PropTypes.oneOf(["baselayer", "overlay"]).isRequired,
  id: PropTypes.string.isRequired
};
export { ExpandableContainer, LayerSelectorItem, LayerSelector as default };
//# sourceMappingURL=index.esm.js.map
