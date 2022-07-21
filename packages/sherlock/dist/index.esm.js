var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import Graphic from "@arcgis/core/Graphic";
import { executeQueryJSON } from "@arcgis/core/rest/query";
import Query from "@arcgis/core/rest/support/Query";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Downshift from "downshift";
import { uniqWith, sortBy, escapeRegExp } from "lodash-es";
import PropTypes from "prop-types";
import require$$0, { useState, useCallback, useEffect } from "react";
import { InputGroup, Input, Button } from "reactstrap";
var Sherlock$1 = /* @__PURE__ */ (() => ".sherlock{--width: 260px;--highlight-color: #42738d;width:var(--width)}.sherlock input[type=text],.sherlock button.disabled{border-radius:0}.sherlock button.disabled{opacity:1;background-color:var(--highlight-color)}.sherlock__match-dropdown{width:var(--width);background-color:#fff;box-shadow:0 1px 2px #0000004d;font-size:12px;position:absolute;z-index:9999}.sherlock__matches{display:block;width:100%;padding-inline-start:0;margin-bottom:0}.sherlock__match-item{padding:2px 12px;display:flex;justify-content:space-between}.sherlock mark{padding:0}.sherlock__match-item:hover,.sherlock__match-item--selected{background-color:#428bca;color:#fff;cursor:pointer}.sherlock__match-item[disabled],.sherlock__match-item[disabled]:hover{pointer-events:none;justify-content:center}.sherlock__message{display:block;padding:.5rem 1rem}.dropdown-menu form .sherlock{position:relative}\n")();
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
const defaultSymbols = {
  polygon: {
    type: "simple-fill",
    color: [240, 240, 240, 0.5],
    outline: {
      style: "solid",
      color: [255, 255, 0, 0.5],
      width: 2.5
    }
  },
  line: {
    type: "simple-line",
    style: "solid",
    color: [255, 255, 0],
    width: 5
  },
  point: {
    type: "simple-marker",
    style: "circle",
    color: [255, 255, 0, 0.5],
    size: 10
  }
};
function Sherlock({
  symbols = defaultSymbols,
  provider,
  onSherlockMatch,
  label,
  placeHolder,
  maxResultsToDisplay
}) {
  const handleStateChange = async (feature) => {
    const searchValue = feature.attributes[provider.searchField];
    let contextValue;
    if (provider.contextField) {
      contextValue = feature.attributes[provider.contextField];
    }
    const response = await provider.getFeature(searchValue, contextValue);
    const results = response.data;
    const graphics = results.map((feature2) => new Graphic({
      geometry: feature2.geometry,
      attributes: feature2.attributes,
      symbol: symbols[feature2.geometry.type]
    }));
    onSherlockMatch(graphics);
  };
  const itemToString = (item) => {
    console.log("Clue:itemToString", arguments);
    return item ? item.attributes[provider.searchField] : "";
  };
  return /* @__PURE__ */ jsx(Downshift, {
    itemToString,
    onChange: handleStateChange,
    children: ({
      getInputProps,
      getItemProps,
      highlightedIndex,
      isOpen,
      inputValue,
      getMenuProps
    }) => /* @__PURE__ */ jsxs("div", {
      className: "sherlock",
      children: [/* @__PURE__ */ jsx("h4", {
        children: label
      }), /* @__PURE__ */ jsxs("div", {
        style: {
          paddingBottom: "1em"
        },
        children: [/* @__PURE__ */ jsxs(InputGroup, {
          children: [/* @__PURE__ */ jsx(Input, {
            ...getInputProps(),
            placeholder: placeHolder,
            autoComplete: "nope"
          }), /* @__PURE__ */ jsx(Button, {
            size: "sm",
            color: "secondary",
            disabled: true,
            children: /* @__PURE__ */ jsx(FontAwesomeIcon, {
              icon: faSearch,
              size: "lg"
            })
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "sherlock__match-dropdown",
          ...getMenuProps(),
          children: /* @__PURE__ */ jsx("ul", {
            className: "sherlock__matches",
            children: !isOpen ? null : /* @__PURE__ */ jsx(Clue, {
              clue: inputValue,
              provider,
              maxResults: maxResultsToDisplay,
              children: ({
                short,
                hasMore,
                error,
                data = []
              }) => {
                if (short) {
                  return /* @__PURE__ */ jsx("li", {
                    className: "sherlock__match-item alert-primary",
                    disabled: true,
                    children: "Type more than 2 letters."
                  });
                }
                if (error) {
                  return /* @__PURE__ */ jsxs("li", {
                    className: "sherlock__match-item alert-danger",
                    disabled: true,
                    children: ["Error! $", error]
                  });
                }
                if (!data.length) {
                  return /* @__PURE__ */ jsx("li", {
                    className: "sherlock__match-item alert-warning",
                    disabled: true,
                    children: "No items found."
                  });
                }
                let items = data.map((item, index) => /* @__PURE__ */ jsxs("li", {
                  ...getItemProps({
                    key: index,
                    className: "sherlock__match-item" + (highlightedIndex === index ? " sherlock__match-item--selected" : ""),
                    item,
                    index
                  }),
                  children: [/* @__PURE__ */ jsx(Highlighted, {
                    text: item.attributes[provider.searchField],
                    highlight: inputValue
                  }), /* @__PURE__ */ jsx("div", {
                    children: item.attributes[provider.contextField] || ""
                  })]
                }));
                if (hasMore) {
                  items.push(/* @__PURE__ */ jsxs("li", {
                    className: "sherlock__match-item alert-primary text-center",
                    disabled: true,
                    children: ["More than ", maxResultsToDisplay, " items found."]
                  }, "too-many"));
                }
                return items;
              }
            })
          })
        })]
      })]
    })
  });
}
Sherlock.propTypes = {
  symbols: PropTypes.object,
  provider: PropTypes.object,
  onSherlockMatch: PropTypes.func,
  label: PropTypes.string,
  placeHolder: PropTypes.string,
  maxResultsToDisplay: PropTypes.number
};
function Clue({
  clue,
  provider,
  maxResults,
  children
}) {
  const [state, setState] = useState({
    data: void 0,
    loading: false,
    error: false,
    short: true,
    hasMore: false
  });
  const updateState = (newProps) => {
    setState((oldState) => {
      return {
        ...oldState,
        ...newProps
      };
    });
  };
  const makeNetworkRequest = useCallback(async () => {
    console.log("makeNetworkRequest");
    const {
      searchField,
      contextField
    } = provider;
    const response = await provider.search(clue).catch((e) => {
      updateState({
        data: void 0,
        error: e.message,
        loading: false,
        short: clue.length <= 2,
        hasMore: false
      });
      console.error(e);
    });
    const iteratee = [`attributes.${searchField}`];
    let hasContext = false;
    if (contextField) {
      iteratee.push(`attributes.${contextField}`);
      hasContext = true;
    }
    let features = uniqWith(response.data, (a, b) => {
      if (hasContext) {
        return a.attributes[searchField] === b.attributes[searchField] && a.attributes[contextField] === b.attributes[contextField];
      } else {
        return a.attributes[searchField] === b.attributes[searchField];
      }
    });
    features = sortBy(features, iteratee);
    let hasMore2 = false;
    if (features.length > maxResults) {
      features = features.slice(0, maxResults);
      hasMore2 = true;
    }
    updateState({
      data: features,
      loading: false,
      error: false,
      short: clue.length <= 2,
      hasMore: hasMore2
    });
  }, [clue, maxResults, provider]);
  useEffect(() => {
    console.log("clue or makeNetworkRequest changed");
    updateState({
      error: false,
      loading: true,
      short: clue.length <= 2,
      hasMore: false
    });
    if (clue.length > 2) {
      makeNetworkRequest();
    }
  }, [clue, makeNetworkRequest]);
  const {
    short,
    data,
    loading,
    error,
    hasMore
  } = state;
  return children({
    short,
    data,
    loading,
    error,
    hasMore
  });
}
class ProviderBase {
  constructor() {
    __publicField(this, "controller", new AbortController());
    __publicField(this, "signal", this.controller.signal);
  }
  getOutFields(outFields, searchField, contextField) {
    outFields = outFields || [];
    if (outFields[0] === "*") {
      return outFields;
    }
    const addField = (fld) => {
      if (fld && outFields.indexOf(fld) === -1) {
        outFields.push(fld);
      }
    };
    addField(searchField);
    addField(contextField);
    return outFields;
  }
  getSearchClause(text) {
    return `UPPER(${this.searchField}) LIKE UPPER('%${text}%')`;
  }
  getFeatureClause(searchValue, contextValue) {
    let statement = `${this.searchField}='${searchValue}'`;
    if (this.contextField) {
      if (contextValue && contextValue.length > 0) {
        statement += ` AND ${this.contextField}='${contextValue}'`;
      } else {
        statement += ` AND ${this.contextField} IS NULL`;
      }
    }
    return statement;
  }
  cancelPendingRequests() {
    this.controller.abort();
  }
}
class MapServiceProvider extends ProviderBase {
  constructor(serviceUrl, searchField, options = {}) {
    console.log("sherlock.MapServiceProvider:constructor", arguments);
    super();
    this.searchField = searchField;
    this.contextField = options.contextField;
    this.serviceUrl = serviceUrl;
    this.setUpQueryTask(options);
  }
  async setUpQueryTask(options) {
    const defaultWkid = 3857;
    this.query = new Query();
    this.query.outFields = this.getOutFields(options.outFields, this.searchField, options.contextField);
    this.query.returnGeometry = false;
    this.query.outSpatialReference = {
      wkid: options.wkid || defaultWkid
    };
  }
  async search(searchString) {
    console.log("sherlock.MapServiceProvider:search", arguments);
    this.query.where = this.getSearchClause(searchString);
    const featureSet = await executeQueryJSON(this.serviceUrl, this.query);
    return {
      data: featureSet.features
    };
  }
  async getFeature(searchValue, contextValue) {
    console.log("sherlock.MapServiceProvider", arguments);
    this.query.where = this.getFeatureClause(searchValue, contextValue);
    this.query.returnGeometry = true;
    const featureSet = await executeQueryJSON(this.serviceUrl, this.query);
    return {
      data: featureSet.features
    };
  }
}
class WebApiProvider extends ProviderBase {
  constructor(apiKey, searchLayer, searchField, options) {
    super();
    console.log("sherlock.providers.WebAPI:constructor", arguments);
    const defaultWkid = 3857;
    this.geometryClasses = {
      point: console.log,
      polygon: console.log,
      polyline: console.log
    };
    this.searchLayer = searchLayer;
    this.searchField = searchField;
    if (options) {
      this.wkid = options.wkid || defaultWkid;
      this.contextField = options.contextField;
      this.outFields = this.getOutFields(options.outFields, this.searchField, this.contextField);
    } else {
      this.wkid = defaultWkid;
    }
    this.outFields = this.getOutFields(null, this.searchField, this.contextField);
    this.webApi = new WebApi(apiKey, this.signal);
  }
  async search(searchString) {
    console.log("sherlock.providers.WebAPI:search", arguments);
    return await this.webApi.search(this.searchLayer, this.outFields, {
      predicate: this.getSearchClause(searchString),
      spatialReference: this.wkid
    });
  }
  async getFeature(searchValue, contextValue) {
    console.log("sherlock.providers.WebAPI:getFeature", arguments);
    return await this.webApi.search(this.searchLayer, this.outFields.concat("shape@"), {
      predicate: this.getFeatureClause(searchValue, contextValue),
      spatialReference: this.wkid
    });
  }
}
const Highlighted = ({
  text = "",
  highlight = ""
}) => {
  if (!highlight.trim()) {
    return /* @__PURE__ */ jsx("div", {
      children: text
    });
  }
  const regex = new RegExp(`(${escapeRegExp(highlight)})`, "gi");
  const parts = text.split(regex);
  return /* @__PURE__ */ jsx("div", {
    children: parts.filter((part) => part).map((part, i) => regex.test(part) ? /* @__PURE__ */ jsx("mark", {
      children: part
    }, i) : /* @__PURE__ */ jsx("span", {
      children: part
    }, i))
  });
};
Highlighted.propTypes = {
  text: PropTypes.string,
  highlight: PropTypes.string
};
class WebApi {
  constructor(apiKey, signal) {
    this.baseUrl = "https://api.mapserv.utah.gov/api/v1/";
    this.defaultAttributeStyle = "identical";
    this.xhrProvider = null;
    this.apiKey = apiKey;
    this.signal = signal;
  }
  async search(featureClass, returnValues, options) {
    console.log("WebApi:search", arguments);
    var url = `${this.baseUrl}search/${featureClass}/${encodeURIComponent(returnValues.join(","))}?`;
    if (!options) {
      options = {};
    }
    options.apiKey = this.apiKey;
    if (!options.attributeStyle) {
      options.attributeStyle = this.defaultAttributeStyle;
    }
    const response = await fetch(url + new URLSearchParams(options), {
      signal: this.signal
    });
    if (!response.ok) {
      return {
        ok: false,
        message: response.message || response.statusText
      };
    }
    const result = await response.json();
    if (result.status !== 200) {
      return {
        ok: false,
        message: result.message
      };
    }
    return {
      ok: true,
      data: result.result
    };
  }
}
class LocatorSuggestProvider extends ProviderBase {
  constructor(url, outSRID) {
    super();
    __publicField(this, "searchField", "text");
    __publicField(this, "idField", "magicKey");
    this.url = url;
    this.outSRID = outSRID;
  }
  async search(searchString, maxresults) {
    const suggestUrl = `${this.url}/suggest?text=${searchString}&maxSuggestions=${maxresults}`;
    let response;
    try {
      response = await fetch(suggestUrl);
      const responseJson = await response.json();
      const features = responseJson.suggestions.map((suggestion) => {
        return {
          attributes: suggestion
        };
      });
      return features;
    } catch {
      const message = "error with suggest request";
      console.error(message, response);
      throw new Error(message);
    }
  }
  async getFeature(magicKey) {
    const getFeatureUrl = `${this.url}/findAddressCandidates?magicKey=${magicKey}&outSR={"wkid":${this.outSRID}}`;
    const response = await fetch(getFeatureUrl);
    const responseJson = await response.json();
    const candidate = responseJson.candidates[0];
    candidate.geometry = {
      ...candidate.location,
      type: "point",
      spatialReference: {
        wkid: this.outSRID
      }
    };
    candidate.attributes.extent = {
      ...candidate.extent,
      spatialReference: {
        wkid: this.outSRID
      }
    };
    return [candidate];
  }
}
export { LocatorSuggestProvider, MapServiceProvider, WebApiProvider, Sherlock as default };
//# sourceMappingURL=index.esm.js.map
