import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { toQueryString } from '@ugrc/utilities';
import { Button } from './Button';
import { TextField } from './TextField';
import { Spinner } from './Spinner';
import { Group } from 'react-aria-components';

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
  const customProps = ['beforeClick', 'beforeKeyUp'];

  return Object.keys(attributes)
    .filter((key) => customProps.indexOf(key) === -1)
    .reduce((res, key) => ((res[key] = attributes[key]), res), {});
};

const Geocode = (props) => {
  const {
    getFirstFieldProps,
    getSecondFieldProps,
    getButtonProps,
    found,
    status,
  } = useGeocoding(props);

  return (
    <Group className="grid gap-4" name="Geocoding component">
      <TextField {...getFirstFieldProps()} />
      <TextField {...getSecondFieldProps()} />
      <div>
        <Button {...getButtonProps()}>
          {(() => {
            if (status === 'idle') {
              return 'Find';
            } else if (status === 'pending') {
              return (
                <span className="flex items-center gap-2">
                  <Spinner />
                  <span>Geocoding</span>
                </span>
              );
            } else if (status === 'error') {
              return (
                <span className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    width="18"
                    height="18"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                  </svg>

                  <span>Error</span>
                </span>
              );
            } else if (status === 'success' && !found) {
              return <span>No match</span>;
            } else {
              return (
                <span className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    width="18"
                    height="18"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <span>Match found</span>
                </span>
              );
            }
          })()}
        </Button>
      </div>
    </Group>
  );
};

const useGeocoding = (userProps = {}) => {
  const props = {
    ...defaultProps,
    ...userProps,
  };

  const [firstInput, setFirstInput] = useState();
  const [secondInput, setSecondInput] = useState();
  const [firstIsValid, setFirstIsValid] = useState(true);
  const [secondIsValid, setSecondIsValid] = useState(true);
  const [status, setStatus] = useState('idle');
  const [found, setFound] = useState(undefined);

  let baseUrl = 'https://api.mapserv.utah.gov/api/v1/geocode';
  if (props.type !== ADDRESS_TYPE) {
    baseUrl += '/milepost';
  }

  const getFirstFieldProps = (inputProps) => ({
    label: props.type === ADDRESS_TYPE ? 'Street address' : 'Route',
    errorMessage:
      props.type === ADDRESS_TYPE
        ? 'A street address is required'
        : 'A highway route number is required',
    isRequired: true,
    isInvalid: !firstIsValid,
    onChange: (event) => {
      setStatus('idle');
      setFirstInput(event);
    },
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

  const getSecondFieldProps = (inputProps) => ({
    label: props.type === ADDRESS_TYPE ? 'City or Zip code' : 'Milepost',
    errorMessage:
      props.type === ADDRESS_TYPE
        ? 'A city or zip code is required'
        : 'A milepost number is required',
    isRequired: true,
    isInvalid: !secondIsValid,
    onChange: (event) => {
      setStatus('idle');
      setSecondInput(event);
    },
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

  const getButtonProps = (buttonProps) => ({
    onPress: (e) => {
      buttonProps?.beforeClick(e);
      find(e);
    },
    type: 'button',
    variant: 'secondary',
    isDisabled: status === 'pending',
    ...sanitize(buttonProps),
  });

  const validate = useCallback(() => {
    const firstValidity = firstInput?.trim()?.length > 0;
    const secondValidity = secondInput?.trim()?.length > 0;

    setFirstIsValid(firstValidity);
    setSecondIsValid(secondValidity);

    // reset not found message
    setFound(undefined);
    setStatus('idle');

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

      return Spinner.minDelay(
        fetch(url + querystring, {
          method: 'GET',
          mode: 'cors',
        }),
        500,
      );
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
        addressSystem: result.addressGrid,
        locator:
          result.locator === 'AddressPoints.AddressGrid'
            ? 'address point'
            : 'road centerline',
        score: result.score,
        matchAddress: result.matchAddress,
      };
      let popupTemplate = {
        title: 'dartboard geocoding match',
        content:
          'The input address <strong>{address}</strong> matched against <strong>{matchAddress}</strong> using {locator} data.<br><br>The confidence score is {score}.<br><br>This address belongs to the {addressSystem} address system.',
        overwriteActions: true,
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

      setFound(true);
      result = result.result;

      if (props.format?.toLowerCase() === 'geojson') {
        return result;
      }

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

    setStatus('pending');
    setFound(undefined);

    let response;

    try {
      response = await get({
        firstInput,
        secondInput,
      });
    } catch (err) {
      setStatus('error');
      setFound(false);

      return props.events.error(
        response?.text() || {
          message: err.message,
          status: 400,
        },
      );
    }

    const location = await extractResponse(response);

    if (location) {
      setStatus('success');
      return props.events.success(location);
    }

    setStatus('success');
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
    getFirstFieldProps,
    getSecondFieldProps,
    getButtonProps,
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
    status,
  };
};

export { useGeocoding, Geocode };
