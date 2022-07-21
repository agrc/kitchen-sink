import require$$0, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { toQueryString } from "@ugrc/utilities";
import { clsx } from "clsx";
var Dartboard = /* @__PURE__ */ (() => ".dart-board__help-block{display:none}.dart-board .has-error .help-block{display:inline}.dart-board .has-error{display:inline-block}\n")();
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
const ADDRESS_TYPE = "single-address";
const MILEPOST_TYPE = "route-milepost";
const defaultProps = {
  type: ADDRESS_TYPE,
  address: {
    acceptScore: 70,
    suggest: 0,
    locators: "all",
    poBox: false,
    scoreDifference: false
  },
  milepost: {
    side: "increasing",
    fullRoute: false
  },
  wkid: 3857,
  callback: null,
  format: null,
  pointSymbol: {
    style: "diamond",
    color: [255, 0, 0, 0.5]
  },
  events: {
    success: console.log,
    error: console.error
  }
};
const sanitize = (attributes = {}) => {
  const dartboardCustomProps = ["beforeClick", "beforeKeyUp"];
  return Object.keys(attributes).filter((key) => dartboardCustomProps.indexOf(key) === -1).reduce((res, key) => (res[key] = attributes[key], res), {});
};
const BootstrapDartboard = (props) => {
  const {
    getFirstLabelProps,
    getSecondLabelProps,
    getFirstInputProps,
    getSecondInputProps,
    getButtonProps,
    isFirstInputValid,
    isSecondInputValid,
    found
  } = useDartboard(props);
  return /* @__PURE__ */ jsxs("div", {
    className: clsx("dartboard", props.className),
    children: [/* @__PURE__ */ jsxs("div", {
      className: "form-group",
      children: [/* @__PURE__ */ jsx("label", {
        ...getFirstLabelProps()
      }), /* @__PURE__ */ jsx("input", {
        ...getFirstInputProps(),
        className: "form-control"
      }), !isFirstInputValid ? /* @__PURE__ */ jsx("small", {
        className: "form-text text-danger",
        children: "This field is required"
      }) : null]
    }), /* @__PURE__ */ jsxs("div", {
      className: "form-group",
      children: [/* @__PURE__ */ jsx("label", {
        ...getSecondLabelProps()
      }), /* @__PURE__ */ jsx("input", {
        ...getSecondInputProps(),
        className: "form-control"
      }), !isSecondInputValid ? /* @__PURE__ */ jsx("small", {
        className: "form-text text-danger",
        children: "This field is required"
      }) : null]
    }), /* @__PURE__ */ jsxs("div", {
      className: "form-group",
      children: [/* @__PURE__ */ jsx("button", {
        ...getButtonProps(),
        className: "btn btn-outline-dark",
        children: "Find"
      }), found === false ? /* @__PURE__ */ jsx("small", {
        className: "form-text text-danger",
        children: "No match found"
      }) : null]
    })]
  });
};
const TailwindDartboard = (props) => {
  const {
    getFirstLabelProps,
    getSecondLabelProps,
    getFirstInputProps,
    getSecondInputProps,
    getButtonProps,
    getFirstHelpProps,
    getSecondHelpProps,
    isFirstInputValid,
    isSecondInputValid,
    found
  } = useDartboard(props);
  return /* @__PURE__ */ jsxs("div", {
    className: clsx("dartboard", props.className),
    children: [/* @__PURE__ */ jsxs("div", {
      className: "group",
      children: [/* @__PURE__ */ jsx("label", {
        ...getFirstLabelProps()
      }), /* @__PURE__ */ jsx("input", {
        ...getFirstInputProps(),
        className: "mb-2 block mt-1 bg-white rounded border border-gray-400 text-gray-700 focus:outline-none focus:border-indigo-500 w-full text-base px-3 py-2"
      }), !isFirstInputValid ? /* @__PURE__ */ jsx("small", {
        ...getFirstHelpProps(),
        className: "block text-red-600 text-xs -mt-2"
      }) : null]
    }), /* @__PURE__ */ jsxs("div", {
      className: "group",
      children: [/* @__PURE__ */ jsx("label", {
        ...getSecondLabelProps()
      }), /* @__PURE__ */ jsx("input", {
        ...getSecondInputProps(),
        className: "mb-2 block mt-1 bg-white rounded border border-gray-400 text-gray-700 focus:outline-none focus:border-indigo-500 w-full text-base px-3 py-2"
      }), !isSecondInputValid ? /* @__PURE__ */ jsx("small", {
        ...getSecondHelpProps(),
        className: "block text-red-600 text-xs -mt-2"
      }) : null]
    }), /* @__PURE__ */ jsxs("div", {
      className: "group",
      children: [/* @__PURE__ */ jsx("button", {
        ...getButtonProps(),
        className: "text-black bg-white border border-gray-800 py-1 px-3 focus:outline-none hover:bg-gray-800 hover:text-white transition duration-200 rounded text-lg mt-4",
        children: "Find"
      }), (() => {
        if (found === false) {
          return /* @__PURE__ */ jsx("small", {
            className: "ml-3 text-red-600 text-xs",
            children: "No match found"
          });
        } else if (found === true) {
          return /* @__PURE__ */ jsx("small", {
            className: "ml-3 text-lg",
            children: "\u2705"
          });
        } else {
          return null;
        }
      })()]
    })]
  });
};
const useDartboard = (userProps = {}) => {
  const props = {
    ...defaultProps,
    ...userProps
  };
  const [firstInput, setFirstInput] = useState();
  const [secondInput, setSecondInput] = useState();
  const [firstIsValid, setFirstIsValid] = useState(true);
  const [secondIsValid, setSecondIsValid] = useState(true);
  const [found, setFound] = useState();
  let baseUrl = "https://api.mapserv.utah.gov/api/v1/geocode";
  if (props.type !== ADDRESS_TYPE) {
    baseUrl += "/milepost";
  }
  const getFirstLabelProps = (labelProps) => ({
    htmlFor: props.type === ADDRESS_TYPE ? "dartboard_street_input" : "dartboard_milepost_input",
    children: props.type === ADDRESS_TYPE ? "Street address" : "Route",
    ...labelProps
  });
  const getSecondLabelProps = (labelProps) => ({
    htmlFor: props.type === ADDRESS_TYPE ? "dartboard_zone_input" : "dartboard_route_input",
    children: props.type === ADDRESS_TYPE ? "City or Zip code" : "Milepost",
    ...labelProps
  });
  const getFirstInputProps = (inputProps) => ({
    onChange: (e) => setFirstInput(e.target.value),
    name: props.type === ADDRESS_TYPE ? "dartboard_street_input" : "dartboard_milepost_input",
    onKeyUp: (e) => {
      inputProps == null ? void 0 : inputProps.beforeKeyUp(e);
      handleKeyUp(e);
    },
    autoComplete: "off",
    ...sanitize(inputProps)
  });
  const getSecondInputProps = (inputProps) => ({
    onChange: (e) => setSecondInput(e.target.value),
    name: props.type === ADDRESS_TYPE ? "dartboard_zone_input" : "dartboard_route_input",
    onKeyUp: (e) => {
      inputProps == null ? void 0 : inputProps.beforeKeyUp(e);
      handleKeyUp(e);
    },
    autoComplete: "off",
    ...sanitize(inputProps)
  });
  const getFirstHelpProps = (inputProps) => ({
    children: props.type === ADDRESS_TYPE ? "A street address is required" : "A highway route number is required",
    ...inputProps
  });
  const getSecondHelpProps = (inputProps) => ({
    children: props.type === ADDRESS_TYPE ? "A city or zip code is required" : "A milepost number is required",
    ...inputProps
  });
  const getButtonProps = (buttonProps) => ({
    onClick: (e) => {
      buttonProps == null ? void 0 : buttonProps.beforeClick(e);
      find(e);
    },
    type: "button",
    ...sanitize(buttonProps)
  });
  const validate = useCallback(() => {
    var _a, _b;
    const firstValidity = ((_a = firstInput == null ? void 0 : firstInput.trim()) == null ? void 0 : _a.length) > 0;
    const secondValidity = ((_b = secondInput == null ? void 0 : secondInput.trim()) == null ? void 0 : _b.length) > 0;
    setFirstIsValid(firstValidity);
    setSecondIsValid(secondValidity);
    setFound(null);
    return firstValidity && secondValidity;
  }, [firstInput, secondInput]);
  const get = useCallback((options) => {
    const url = `${baseUrl}/${options.firstInput}/${options.secondInput}?`;
    let query = {
      apiKey: props.apiKey,
      spatialReference: props.wkid,
      format: props.format,
      callback: props.callback
    };
    if (props.type === ADDRESS_TYPE) {
      query = {
        ...props.address,
        ...query
      };
    } else {
      query = {
        ...props.milepost,
        ...query
      };
    }
    const querystring = toQueryString(query);
    return fetch(url + querystring, {
      method: "GET",
      mode: "cors"
    });
  }, [props.apiKey, props.wkid, props.address, props.milepost, props.type, props.format, props.callback, baseUrl]);
  const outputTransform = useCallback((result, point) => {
    let attributes = {
      address: result.inputAddress
    };
    let popupTemplate = {
      title: "{address}"
    };
    if (props.type !== ADDRESS_TYPE) {
      attributes = {
        matchRoute: result.matchRoute
      };
      popupTemplate = {
        title: "{matchRoute}"
      };
    }
    return {
      geometry: point,
      symbol: props.pointSymbol,
      attributes,
      popupTemplate
    };
  }, [props.pointSymbol, props.type]);
  const extractResponse = useCallback(async (response) => {
    var _a;
    if (!response.ok) {
      setFound(false);
      return props.events.error(await response.json());
    }
    let result = await response.json();
    if (result.status !== 200) {
      setFound(false);
      return props.events.error(response);
    }
    result = result.result;
    if (((_a = props.format) == null ? void 0 : _a.toLowerCase()) === "geojson") {
      return result;
    }
    setFound(true);
    const point = {
      type: "point",
      x: result.location.x,
      y: result.location.y,
      spatialReference: {
        wkid: props.wkid
      }
    };
    return outputTransform(result, point);
  }, [outputTransform, props.wkid, props.format, props.events]);
  const find = useCallback(async () => {
    if (!validate()) {
      return false;
    }
    let response;
    try {
      response = await get({
        firstInput,
        secondInput
      });
    } catch (err) {
      return props.events.error((response == null ? void 0 : response.text()) || {
        message: err.message,
        status: 400
      });
    }
    const location = await extractResponse(response);
    if (location) {
      return props.events.success(location);
    }
  }, [firstInput, secondInput, validate, props.events, get, extractResponse]);
  const handleKeyUp = useCallback((event) => {
    if (event.key !== "Enter") {
      return;
    }
    find();
  }, [find]);
  return {
    getFirstLabelProps,
    getSecondLabelProps,
    getFirstInputProps,
    getSecondInputProps,
    getButtonProps,
    getFirstHelpProps,
    getSecondHelpProps,
    setFirstIsValid,
    setSecondIsValid,
    setFound,
    isSecondInputValid: secondIsValid,
    isFirstInputValid: firstIsValid,
    found,
    firstInput,
    secondInput
  };
};
BootstrapDartboard.propTypes = TailwindDartboard.propTypes = {
  apiKey: PropTypes.string.isRequired,
  type: PropTypes.oneOf([ADDRESS_TYPE, MILEPOST_TYPE]),
  pointSymbol: PropTypes.object,
  events: PropTypes.exact({
    success: PropTypes.func.isRequired,
    error: PropTypes.func.isRequired
  }),
  wkid: PropTypes.number,
  address: PropTypes.shape({
    acceptScore: PropTypes.number,
    suggest: PropTypes.number,
    locators: PropTypes.oneOf([null, "all", "addressPoints", "roadCenterlines"]),
    poBox: PropTypes.bool,
    scoreDifference: PropTypes.bool
  }),
  milepost: PropTypes.shape({
    side: PropTypes.oneOf([null, "increasing", "decreasing"]),
    fullRoute: PropTypes.bool
  }),
  format: PropTypes.oneOf([null, "esrijson", "geojson"]),
  callback: PropTypes.string
};
export { BootstrapDartboard, TailwindDartboard, TailwindDartboard as default, useDartboard };
//# sourceMappingURL=index.esm.js.map
