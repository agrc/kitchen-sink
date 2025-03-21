/* eslint-disable jsx-a11y/label-has-associated-control */
import { toQueryString } from '@ugrc/utilities';
import { clsx } from 'clsx';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';

const ADDRESS_TYPE = 'single-address';
const MILEPOST_TYPE = 'route-milepost';

const defaultProps = {
  type: ADDRESS_TYPE,
  address: {
    acceptScore: 70,
    suggest: 0,
    locators: 'all',
    poBox: false,
    scoreDifference: false,
  },
  milepost: {
    side: 'increasing',
    fullRoute: false,
  },
  wkid: 3857,
  callback: null,
  format: null,
  pointSymbol: {
    style: 'diamond',
    color: [255, 0, 0, 0.5],
  },
  events: {
    success: console.log,
    error: console.error,
  },
};

const sanitize = (attributes = {}) => {
  const dartboardCustomProps = ['beforeClick', 'beforeKeyUp'];

  return Object.keys(attributes)
    .filter((key) => dartboardCustomProps.indexOf(key) === -1)
    .reduce((res, key) => ((res[key] = attributes[key]), res), {});
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
    found,
  } = useDartboard(props);

  return (
    <div className={clsx('dartboard', props.className)}>
      <div className="form-group">
        <label {...getFirstLabelProps()}></label>
        <input {...getFirstInputProps()} className="form-control"></input>
        {!isFirstInputValid ? (
          <small className="form-text text-danger">
            This field is required
          </small>
        ) : null}
      </div>
      <div className="form-group">
        <label {...getSecondLabelProps()}></label>
        <input {...getSecondInputProps()} className="form-control"></input>
        {!isSecondInputValid ? (
          <small className="form-text text-danger">
            This field is required
          </small>
        ) : null}
      </div>
      <div className="form-group">
        <button {...getButtonProps()} className="btn btn-outline-dark">
          Find
        </button>
        {found === false ? (
          <small className="form-text text-danger">No match found</small>
        ) : null}
      </div>
    </div>
  );
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
    found,
  } = useDartboard(props);

  return (
    <div className={clsx('dartboard', props.className)}>
      <div className="group">
        <label {...getFirstLabelProps()}></label>
        <input
          {...getFirstInputProps()}
          className="mb-2 mt-1 block w-full rounded border border-gray-400 bg-white px-3 py-2 text-base text-gray-700 focus:border-indigo-500 focus:outline-none"
        ></input>
        {!isFirstInputValid ? (
          <small
            {...getFirstHelpProps()}
            className="-mt-2 block text-xs text-red-600"
          ></small>
        ) : null}
      </div>
      <div className="group">
        <label {...getSecondLabelProps()}></label>
        <input
          {...getSecondInputProps()}
          className="mb-2 mt-1 block w-full rounded border border-gray-400 bg-white px-3 py-2 text-base text-gray-700 focus:border-indigo-500 focus:outline-none"
        ></input>
        {!isSecondInputValid ? (
          <small
            {...getSecondHelpProps()}
            className="-mt-2 block text-xs text-red-600"
          ></small>
        ) : null}
      </div>
      <div className="group">
        <button
          {...getButtonProps()}
          className="mt-4 rounded border border-gray-800 bg-white px-3 py-1 text-lg text-black transition duration-200 hover:bg-gray-800 hover:text-white focus:outline-none"
        >
          Find
        </button>
        {(() => {
          if (found === false) {
            return (
              <small className="ml-3 text-xs text-red-600">
                No match found
              </small>
            );
          } else if (found === true) {
            return <small className="ml-3 text-lg">✅</small>;
          } else {
            return null;
          }
        })()}
      </div>
    </div>
  );
};

const useDartboard = (userProps = {}) => {
  const props = {
    ...defaultProps,
    ...userProps,
  };

  const [firstInput, setFirstInput] = useState();
  const [secondInput, setSecondInput] = useState();
  const [firstIsValid, setFirstIsValid] = useState(true);
  const [secondIsValid, setSecondIsValid] = useState(true);
  const [found, setFound] = useState();

  let baseUrl = 'https://api.mapserv.utah.gov/api/v1/geocode';
  if (props.type !== ADDRESS_TYPE) {
    baseUrl += '/milepost';
  }

  const getFirstLabelProps = (labelProps) => ({
    htmlFor:
      props.type === ADDRESS_TYPE
        ? 'dartboard_street_input'
        : 'dartboard_milepost_input',
    children: props.type === ADDRESS_TYPE ? 'Street address' : 'Route',
    ...labelProps,
  });

  const getSecondLabelProps = (labelProps) => ({
    htmlFor:
      props.type === ADDRESS_TYPE
        ? 'dartboard_zone_input'
        : 'dartboard_route_input',
    children: props.type === ADDRESS_TYPE ? 'City or Zip code' : 'Milepost',
    ...labelProps,
  });

  const getFirstInputProps = (inputProps) => ({
    onChange: (e) => setFirstInput(e.target.value),
    name:
      props.type === ADDRESS_TYPE
        ? 'dartboard_street_input'
        : 'dartboard_milepost_input',
    onKeyUp: (e) => {
      inputProps?.beforeKeyUp(e);
      handleKeyUp(e);
    },
    autoComplete: 'off',
    ...sanitize(inputProps),
  });

  const getSecondInputProps = (inputProps) => ({
    onChange: (e) => setSecondInput(e.target.value),
    name:
      props.type === ADDRESS_TYPE
        ? 'dartboard_zone_input'
        : 'dartboard_route_input',
    onKeyUp: (e) => {
      inputProps?.beforeKeyUp(e);
      handleKeyUp(e);
    },
    autoComplete: 'off',
    ...sanitize(inputProps),
  });

  const getFirstHelpProps = (inputProps) => ({
    children:
      props.type === ADDRESS_TYPE
        ? 'A street address is required'
        : 'A highway route number is required',
    ...inputProps,
  });

  const getSecondHelpProps = (inputProps) => ({
    children:
      props.type === ADDRESS_TYPE
        ? 'A city or zip code is required'
        : 'A milepost number is required',
    ...inputProps,
  });

  const getButtonProps = (buttonProps) => ({
    onClick: (e) => {
      buttonProps?.beforeClick(e);
      find(e);
    },
    type: 'button',
    ...sanitize(buttonProps),
  });

  const validate = useCallback(() => {
    const firstValidity = firstInput?.trim()?.length > 0;
    const secondValidity = secondInput?.trim()?.length > 0;

    setFirstIsValid(firstValidity);
    setSecondIsValid(secondValidity);

    // reset not found message
    setFound(null);

    return firstValidity && secondValidity;
  }, [firstInput, secondInput]);

  const get = useCallback(
    (options) => {
      const url = `${baseUrl}/${options.firstInput}/${options.secondInput}?`;

      let query = {
        apiKey: props.apiKey,
        spatialReference: props.wkid,
        format: props.format,
        callback: props.callback,
      };

      if (props.type === ADDRESS_TYPE) {
        query = { ...props.address, ...query };
      } else {
        query = { ...props.milepost, ...query };
      }

      const querystring = toQueryString(query);

      return fetch(url + querystring, {
        method: 'GET',
        mode: 'cors',
      });
    },
    [
      props.apiKey,
      props.wkid,
      props.address,
      props.milepost,
      props.type,
      props.format,
      props.callback,
      baseUrl,
    ],
  );

  const outputTransform = useCallback(
    (result, point) => {
      let attributes = {
        address: result.inputAddress,
      };
      let popupTemplate = {
        title: '{address}',
      };

      if (props.type !== ADDRESS_TYPE) {
        attributes = {
          matchRoute: result.matchRoute,
        };
        popupTemplate = {
          title: '{matchRoute}',
        };
      }

      return {
        geometry: point,
        symbol: props.pointSymbol,
        attributes,
        popupTemplate,
      };
    },
    [props.pointSymbol, props.type],
  );

  const extractResponse = useCallback(
    async (response) => {
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

      if (props.format?.toLowerCase() === 'geojson') {
        return result;
      }

      setFound(true);

      const point = {
        type: 'point',
        x: result?.location?.x,
        y: result?.location?.y,
        spatialReference: {
          wkid: props.wkid,
        },
      };

      if (props.format?.toLowerCase() === 'esrijson') {
        point.x = result?.geometry?.x;
        point.y = result?.geometry?.y;
      }

      return outputTransform(result, point);
    },
    [outputTransform, props.wkid, props.format, props.events],
  );

  const find = useCallback(async () => {
    if (!validate()) {
      return false;
    }

    let response;

    try {
      response = await get({
        firstInput,
        secondInput,
      });
    } catch (err) {
      return props.events.error(
        response?.text() || {
          message: err.message,
          status: 400,
        },
      );
    }

    const location = await extractResponse(response);

    if (location) {
      return props.events.success(location);
    }
  }, [firstInput, secondInput, validate, props.events, get, extractResponse]);

  const handleKeyUp = useCallback(
    (event) => {
      if (event.key !== 'Enter') {
        return;
      }

      find();
    },
    [find],
  );

  return {
    // prop getters
    getFirstLabelProps,
    getSecondLabelProps,
    getFirstInputProps,
    getSecondInputProps,
    getButtonProps,
    getFirstHelpProps,
    getSecondHelpProps,
    // actions
    setFirstIsValid,
    setSecondIsValid,
    setFound,
    // state
    isSecondInputValid: secondIsValid,
    isFirstInputValid: firstIsValid,
    found,
    firstInput,
    secondInput,
  };
};

BootstrapDartboard.propTypes = TailwindDartboard.propTypes = {
  apiKey: PropTypes.string.isRequired,
  type: PropTypes.oneOf([ADDRESS_TYPE, MILEPOST_TYPE]),
  pointSymbol: PropTypes.object,
  events: PropTypes.exact({
    success: PropTypes.func.isRequired,
    error: PropTypes.func.isRequired,
  }),
  wkid: PropTypes.number,
  address: PropTypes.shape({
    acceptScore: PropTypes.number,
    suggest: PropTypes.number,
    locators: PropTypes.oneOf([
      null,
      'all',
      'addressPoints',
      'roadCenterlines',
    ]),
    poBox: PropTypes.bool,
    scoreDifference: PropTypes.bool,
  }),
  milepost: PropTypes.shape({
    side: PropTypes.oneOf([null, 'increasing', 'decreasing']),
    fullRoute: PropTypes.bool,
  }),
  format: PropTypes.oneOf([null, 'esrijson', 'geojson']),
  callback: PropTypes.string,
  className: PropTypes.string,
};

export default TailwindDartboard;
export { BootstrapDartboard, TailwindDartboard, useDartboard };
