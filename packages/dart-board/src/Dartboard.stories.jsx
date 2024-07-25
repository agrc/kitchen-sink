import Dartboard, { TailwindDartboard, useDartboard } from './index';
import './Dartboard.css';

export default {
  component: Dartboard,
  argTypes: {
    success: { action: 'ok' },
    error: { action: 'fail' },
  },
};

export const DefaultAddress = {
  render: (args) => <Dartboard apiKey="storybook" events={{ ...args }} />,
};

export const DefaultMilepost = {
  render: (args) => (
    <Dartboard apiKey="storybook" events={{ ...args }} type="route-milepost" />
  ),
};

export const MilepostWithArguments = {
  render: (args) => (
    <Dartboard
      milepost={{ side: 'decreasing' }}
      wkid={26912}
      format="geojson"
      apiKey="storybook"
      events={{ ...args }}
      type="route-milepost"
    />
  ),
};

export const AddressWithTailwind = {
  render: (args) => (
    <TailwindDartboard apiKey="storybook" events={{ ...args }} />
  ),
};

export const HookWithEvents = (args) => {
  const DartboardHook = (props) => {
    const {
      getFirstLabelProps,
      getSecondLabelProps,
      getFirstInputProps,
      getSecondInputProps,
      getButtonProps,
      getFirstHelpProps,
      getSecondHelpProps,
      setFirstIsValid,
      setSecondIsValid,
      isFirstInputValid,
      isSecondInputValid,
      found,
      firstInput,
      secondInput,
    } = useDartboard(props);

    const validateStreet = (e, input) => {
      let valid = false;
      const length = e?.target.value.length || input.length;

      if (length >= 4 || length < 1) {
        valid = true;
      }

      setFirstIsValid(valid);
      return valid;
    };

    const validateZip = (e, input) => {
      let valid = false;
      const value = e?.target.value || input;
      const length = value.length;

      if ((length < 1 || length === 5) && value.startsWith('841')) {
        valid = true;
      }

      setSecondIsValid(valid);
      return valid;
    };

    return (
      <div className="dartboard">
        <div className="group">
          <label {...getFirstLabelProps()}></label>
          <input
            {...getFirstInputProps({
              beforeKeyUp: (e) => validateStreet(e, firstInput),
            })}
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
          <label {...getSecondLabelProps()}>Zip code</label>
          <input
            {...getSecondInputProps({
              beforeKeyUp: (e) => validateZip(e, secondInput),
            })}
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
            {...getButtonProps({
              beforeClick: () =>
                validateStreet(null, firstInput) &&
                validateZip(null, secondInput),
            })}
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

  return (
    <DartboardHook apiKey="storybook" events={{ ...args }}></DartboardHook>
  );
};
