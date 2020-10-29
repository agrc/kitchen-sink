import React, { useState } from 'react';
import PropTypes from "prop-types";
import './Dartboard.css';
import { Button, FormGroup, FormText, Label, Input } from 'reactstrap';
import classNames from 'classnames';
import { toQueryString } from './common';

const ADDRESS_TYPE = 'single-address';
const MILEPOST_TYPE = 'route-milepost';

const Dartboard = ({
  apiKey,
  type = ADDRESS_TYPE,
  wkid = 3857,
  inline = false,
  pointSymbol = {
    style: 'diamond',
    color: [255, 0, 0, 0.5]
  },
  events = {
    success: console.log,
    error: console.error
  },
  className
}) => {
  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [firstIsValid, setFirstIsValid] = useState(true);
  const [secondIsValid, setSecondIsValid] = useState(true);
  const [found, setFound] = useState(true);

  let baseUrl = 'https://api.mapserv.utah.gov/api/v1/geocode';
  let outputTransform = (result, point) => {
    return {
      geometry: point,
      symbol: pointSymbol,
      attributes: {
        address: result.inputAddress
      },
      popupTemplate: {
        title: "{address}"
      }
    };
  };

  if (type !== ADDRESS_TYPE) {
    baseUrl += '/milepost';

    outputTransform = (result, point) => {
      return {
        geometry: point,
        symbol: pointSymbol,
        attributes: {
          matchRoute: result.matchRoute
        },
        popupTemplate: {
          title: '{matchRoute}'
        }
      };
    };
  }

  const handleKeyPress = (event) => {
    if (event.key !== 'Enter') {
      return;
    }

    find();
  };

  const find = async () => {
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
      return events.error(response?.text() || {
        message: err.message,
        status: 400
      });
    }

    const location = await extractResponse(response);

    if (location) {
      return events.success(location);
    }
  };

  const get = options => {
    const url = `${baseUrl}/${options.firstInput}/${options.secondInput}?`;

    const query = {
      apiKey: apiKey,
      spatialReference: wkid
    };

    const querystring = toQueryString(query);

    return fetch(url + querystring, {
      method: 'GET',
      mode: 'cors'
    });
  };

  const extractResponse = async response => {
    if (!response.ok) {
      setFound(false);

      return events.error(await response.json());
    }

    let result = await response.json();

    if (result.status !== 200) {
      setFound(false);

      return events.error(response);
    }

    result = result.result;

    const point = {
      type: 'point',
      x: result.location.x,
      y: result.location.y,
      spatialReference: {
        wkid: wkid
      }
    };

    return outputTransform(result, point);
  };

  const validate = () => {
    const firstValidity = firstInput.trim().length > 0;
    const secondValidity = secondInput.trim().length > 0;

    setFirstIsValid(firstValidity);
    setSecondIsValid(secondValidity);

    // reset not found message
    setFound(true);

    return firstValidity && secondValidity;
  };

  const classes = classNames(
    className,
    'dartboard',
    inline ? 'form-inline' : false
  );

  return (
    <div className={classes}>
      <FormGroup>
        <Label for="input1">{(type === ADDRESS_TYPE) ? 'Street Address' : 'Route'}</Label>
        <Input
          type="text"
          value={firstInput}
          onChange={e => setFirstInput(e.target.value)}
          onKeyPress={handleKeyPress}
          autoComplete="nope"
          name="input1"
        />
        <FormText color="danger" className={firstIsValid ? 'dart-board__help-block' : ''}>This field is required</FormText>
      </FormGroup>
      <FormGroup>
        <Label for="input2">{(type === ADDRESS_TYPE) ? 'Zip or City' : 'Milepost'}</Label>
        <Input
          type="text"
          value={secondInput}
          onChange={e => setSecondInput(e.target.value)}
          onKeyPress={handleKeyPress}
          autoComplete="nope"
          name="input2"
        />
        <FormText color="danger" className={secondIsValid ? 'dart-board__help-block' : ''}>This field is required</FormText>
      </FormGroup>
      <FormGroup>
        <Button outline color="dark" onClick={find}>Find</Button>
        <FormText color="danger" className={found ? 'dart-board__help-block' : ''}>No match found</FormText>
      </FormGroup>
    </div>
  );
};

Dartboard.propTypes = {
  apiKey: PropTypes.string.isRequired,
  type: PropTypes.oneOf([ADDRESS_TYPE, MILEPOST_TYPE]),
  events: PropTypes.exact({
    success: PropTypes.func.isRequired,
    error: PropTypes.func.isRequired
  }),
  wkid: PropTypes.number,
  inline: PropTypes.bool,
  pointSymbol: PropTypes.object
};

export default Dartboard;
