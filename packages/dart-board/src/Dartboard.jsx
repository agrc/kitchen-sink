import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { toQueryString } from '@ugrc/utilities';
import { TextField, Button, FormErrors } from '@ugrc/utah-design-system';
import { Controller, useForm } from 'react-hook-form';

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

const TailwindDartboard = (props) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dartboard_input_one: '',
      dartboard_input_two: '',
    },
  });
  const {
    getFirstFieldProps,
    getSecondFieldProps,
    getButtonProps,
    isFirstInputValid,
    isSecondInputValid,
    found,
  } = useDartboard(props);

  console.log('errors', errors);

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(() => console.log('hello'))}
    >
      <FormErrors errors={errors} />
      <div>
        <Controller
          control={control}
          name="dartboard_input_one"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField {...getFirstFieldProps()} {...field} />
          )}
        ></Controller>
      </div>
      <div className="group">
        <Controller
          control={control}
          name="dartboard_input_two"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField {...getSecondFieldProps()} {...field} />
          )}
        />
      </div>
      <div className="group">
        <Button {...getButtonProps()} type="submit">
          Find
        </Button>
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
    </form>
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

  const getFirstFieldProps = (inputProps) => ({
    label: props.type === ADDRESS_TYPE ? 'Street address' : 'Route',
    errorMessage:
      props.type === ADDRESS_TYPE
        ? 'A street address is required'
        : 'A highway route number is required',
    isRequired: true,
    onChange: setFirstInput,
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
    onChange: setSecondInput,
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
  };
};

export { useDartboard, TailwindDartboard };
