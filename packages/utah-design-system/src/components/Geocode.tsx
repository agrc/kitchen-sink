import { toQueryString } from '@ugrc/utilities';
import { TriangleAlertIcon } from 'lucide-react';
import type { KeyboardEvent } from 'react';
import { useCallback, useState } from 'react';
import { Group, type PressEvent } from 'react-aria-components';
import { Button, type ButtonProps } from './Button';
import { Spinner } from './Spinner';
import { TextField } from './TextField';

const ADDRESS_TYPE = 'single-address';

type GeocodeComponentType = 'single-address' | 'route-milepost';
type GeocodeProps = {
  apiKey: string;
  type?: GeocodeComponentType;
  address?: {
    acceptScore: number;
    suggest: number;
    locators: 'all' | 'addressPoints' | 'roadCenterlines';
    poBox: boolean;
    scoreDifference: boolean;
  };
  milepost?: {
    side: 'increasing' | 'decreasing';
    fullRoute: boolean;
  };
  wkid?: number;
  callback?: string;
  format?: 'geojson' | 'esrijson';
  pointSymbol?: __esri.SymbolProperties | nullish;
  events?: {
    success: (result: __esri.GraphicProperties) => void;
    error: (error: object) => void;
  };
};

type AddressResult = {
  location: __esri.PointProperties;
  score: number;
  locator: string;
  source: string;
  matchAddress: string;
  matchRoute: string;
  inputAddress: string;
  standardizedAddress: string;
  addressGrid: string;
};

const defaultProps: Omit<GeocodeProps, 'apiKey'> = {
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
  callback: undefined,
  format: undefined,
  pointSymbol: {
    style: 'diamond',
    color: [255, 0, 0, 0.5],
  } as __esri.SymbolProperties,
  events: {
    success: console.log,
    error: console.error,
  },
};

const sanitize = (attributes: Record<string, unknown> = {}) => {
  const customProps = ['beforeClick', 'beforeKeyUp'];

  return Object.keys(attributes)
    .filter((key) => customProps.indexOf(key) === -1)
    .reduce(
      (result: Record<string, unknown>, key: string) => (
        (result[key] = attributes[key]), result
      ),
      {},
    );
};

const Geocode = (props: GeocodeProps) => {
  const {
    getFirstFieldProps,
    getSecondFieldProps,
    getButtonProps,
    found,
    status,
  } = useGeocoding(props);

  return (
    <Group className="grid gap-4" aria-label="Geocoding component">
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
                  <span className="size-4">
                    <Spinner />
                  </span>
                  <span>Geocoding</span>
                </span>
              );
            } else if (status === 'error') {
              return (
                <span className="flex items-center gap-2">
                  <TriangleAlertIcon className="h-full w-4" />
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

const useGeocoding = (userProps: GeocodeProps) => {
  const props = {
    ...defaultProps,
    ...userProps,
  };

  const [firstInput, setFirstInput] = useState<string>('');
  const [secondInput, setSecondInput] = useState<string>('');
  const [firstIsValid, setFirstIsValid] = useState<boolean>(true);
  const [secondIsValid, setSecondIsValid] = useState<boolean>(true);
  const [status, setStatus] = useState('idle');
  const [found, setFound] = useState<boolean | undefined>(undefined);

  let baseUrl = 'https://api.mapserv.utah.gov/api/v1/geocode';
  if (props.type !== ADDRESS_TYPE) {
    baseUrl += '/milepost';
  }

  type KeyboardEventHandler = (e: KeyboardEvent) => void;
  const getFirstFieldProps = (inputProps?: {
    beforeKeyUp: KeyboardEventHandler;
  }) => ({
    label: props.type === ADDRESS_TYPE ? 'Street address' : 'Route',
    errorMessage:
      props.type === ADDRESS_TYPE
        ? 'A street address is required'
        : 'A highway route number is required',
    isRequired: true,
    isInvalid: !firstIsValid,
    onChange: (data: string) => {
      setStatus('idle');
      setFirstInput(data);
    },
    name:
      props.type === ADDRESS_TYPE
        ? 'dartboard_street_input'
        : 'dartboard_milepost_input',
    onKeyUp: (e: KeyboardEvent) => {
      inputProps?.beforeKeyUp(e);
      handleKeyUp(e);
    },
    autoComplete: 'off',
    ...sanitize(inputProps),
  });

  const getSecondFieldProps = (inputProps?: {
    beforeKeyUp: KeyboardEventHandler;
  }) => ({
    label: props.type === ADDRESS_TYPE ? 'City or Zip code' : 'Milepost',
    errorMessage:
      props.type === ADDRESS_TYPE
        ? 'A city or zip code is required'
        : 'A milepost number is required',
    isRequired: true,
    isInvalid: !secondIsValid,
    onChange: (data: string) => {
      setStatus('idle');
      setSecondInput(data);
    },
    name:
      props.type === ADDRESS_TYPE
        ? 'dartboard_zone_input'
        : 'dartboard_route_input',
    onKeyUp: (e: KeyboardEvent) => {
      inputProps?.beforeKeyUp(e);
      handleKeyUp(e);
    },
    autoComplete: 'off',
    ...sanitize(inputProps),
  });

  type ClickHandler = (e: PressEvent) => void;
  const getButtonProps = (buttonProps?: {
    beforeClick: ClickHandler;
  }): ButtonProps => ({
    onPress: (e: PressEvent) => {
      buttonProps?.beforeClick(e);
      find();
    },
    type: 'button',
    variant: 'secondary',
    isDisabled: status === 'pending',
    ...sanitize(buttonProps),
  });

  const validate = useCallback(() => {
    const firstValidity = (firstInput?.trim() ?? '').length > 0;
    const secondValidity = (secondInput?.trim() ?? '').length > 0;

    setFirstIsValid(firstValidity);
    setSecondIsValid(secondValidity);

    // reset not found message
    setFound(undefined);
    setStatus('idle');

    return firstValidity && secondValidity;
  }, [firstInput, secondInput]);

  const get = useCallback<
    (options: { firstInput: string; secondInput: string }) => Promise<Response>
  >(
    async (options) => {
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
      ) as Promise<Response>;
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

  const outputTransform = useCallback<
    (
      result: AddressResult,
      point: __esri.PointProperties,
    ) => __esri.GraphicProperties
  >(
    (result, point) => {
      let attributes: __esri.GraphicProperties['attributes'] = {
        address: result.inputAddress,
        addressSystem: result.addressGrid,
        locator:
          result.locator === 'AddressPoints.AddressGrid'
            ? 'address point'
            : 'road centerline',
        score: result.score,
        matchAddress: result.matchAddress,
      };
      let popupTemplate: __esri.PopupTemplateProperties = {
        title: 'UGRC API geocoding match',
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
      } as __esri.GraphicProperties;
    },
    [props.pointSymbol, props.type],
  );

  const extractResponse = useCallback<
    (response: Response) => Promise<__esri.GraphicProperties | void>
  >(
    async (response) => {
      if (!response.ok) {
        setFound(false);

        if (response.status !== 404) {
          setStatus('error');
        } else {
          setStatus('success');
        }

        return props.events?.error(await response.json());
      }

      let result = await response.json();

      if (result.status !== 200) {
        setFound(false);

        return props.events?.error(result);
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
      } as __esri.PointProperties;

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
    } catch (err: unknown) {
      setStatus('error');
      setFound(false);

      return props.events?.error(
        response?.text() || {
          message: (err as Error)?.message,
          status: 400,
        },
      );
    }

    const location = await extractResponse(response);

    if (location) {
      setStatus('success');

      return props.events?.success(location);
    }
  }, [firstInput, secondInput, validate, props.events, get, extractResponse]);

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
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

export { Geocode, useGeocoding };
