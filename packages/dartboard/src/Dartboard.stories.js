import React from 'react';
import Dartboard from './Dartboard';
import { TailwindDartboard, useDartboard } from './Dartboard';

export default {
  title: 'Dartboard',
  argTypes: {
    success: { action: 'ok' },
    error: { action: 'fail' }
  }
};

export const DefaultAddress = (args) => (
  <Dartboard apiKey="AGRC-Dev" events={{ ...args }}/>
);

export const DefaultMilepost = (args) => (
  <Dartboard apiKey="AGRC-Dev" events={{...args}} type="route-milepost" />
);

export const MilepostWithArguments = (args) => (
  <Dartboard milepost={{ side: "decreasing" }} wkid={26912} format="geojson" apiKey="AGRC-Dev" events={{...args}} type="route-milepost" />
);

export const AddressWithTailwind = (args) => (
  <TailwindDartboard apiKey="AGRC-Dev" events={{ ...args }} />
);

export const HookWithEvents = (args) => {
  const DartboardHook = (props) => {
    const { getFirstLabelProps,
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
      secondInput
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
              beforeKeyUp: (e) => validateStreet(e, firstInput)
            })}
            className="mb-2 block mt-1 bg-white rounded border border-gray-400 text-gray-700 focus:outline-none focus:border-indigo-500 w-full text-base px-3 py-2"
          ></input>
          {!isFirstInputValid ?
            <small {...getFirstHelpProps()}
              className="block text-red-600 text-xs -mt-2"></small>
            : null}
        </div>
        <div className="group">
          <label {...getSecondLabelProps()}>Zip code</label>
          <input
            {...getSecondInputProps({
              beforeKeyUp: (e) => validateZip(e, secondInput)
            })}
            className="mb-2 block mt-1 bg-white rounded border border-gray-400 text-gray-700 focus:outline-none focus:border-indigo-500 w-full text-base px-3 py-2"
          ></input>
          {!isSecondInputValid ?
            <small {...getSecondHelpProps()}
              className="block text-red-600 text-xs -mt-2"></small>
            : null}
        </div>
        <div className="group">
          <button
            {...getButtonProps({
              beforeClick: () => validateStreet(null, firstInput) && validateZip(null, secondInput)
            })}
            className="text-black bg-white border border-gray-800 py-1 px-3 focus:outline-none hover:bg-gray-800 hover:text-white transition duration-200 rounded text-lg mt-4"
          >Find</button>
          {(() => {
            if (found === false) {
              return <small className="ml-3 text-red-600 text-xs">No match found</small>;
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

  return <DartboardHook apiKey='agrc-dev' events={{...args}}></DartboardHook>;
};
