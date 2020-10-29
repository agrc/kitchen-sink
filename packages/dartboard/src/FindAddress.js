import React, { useState } from 'react';
import './FindAddress.css';
import { Button, FormGroup, FormText, Label, Input } from 'reactstrap';
import classNames from 'classnames';

const Dartboard = ({
  apiKey,
  wkid = 3857,
  inline = false,
  pointSymbol = {
    style: 'diamond',
    color: [255, 0, 0, 0.5]
  },
  onFind = console.log,
  onError = console.error,
  className
}) => {
  const [ street, setStreet] = useState('');
  const [ zone, setZone ] = useState('');
  const [ streetIsValid, setStreetIsValid ] = useState(true);
  const [ zoneIsValid, setZoneIsValid ] = useState(true);
  const [ found, setFound ] = useState(true);

  const toQueryString = (obj) => Object.keys(obj)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
    .join('&')
    .replace(/%20/g, '+');

  const find = async () => {
    if (!validate()) {
      return false;
    }

    let response;

    try {
      response = await get({
        street: street,
        zone: zone
      });
    } catch (err) {
      return onError(response?.text() || {
        message: err.message,
        status: 400
      });
    }

    const location = await extractResponse(response);

    if (location) {
      return onFind(location);
    }
  };

  const get = options => {
    const url = `https://api.mapserv.utah.gov/api/v1/Geocode/${options.street}/${options.zone}?`;

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

      return onError(await response.json());
    }

    let result = await response.json();

    if (result.status !== 200) {
      setFound(false);

      return onError(response);
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

    const graphic = {
      geometry: point,
      symbol: pointSymbol,
      attributes: {
        address: result.inputAddress
      },
      popupTemplate: {
        title: '{address}'
      }
    };

    return graphic;
  };

  const validate = () => {
    const streetValidity = street.trim().length > 0;
    const zoneValidity = zone.trim().length > 0;

    setStreetIsValid(streetValidity);
    setZoneIsValid(zoneValidity);

    // reset not found message
    setFound(true);

    return streetValidity && zoneValidity;
  };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      await find();
    }
  };

  const classes = classNames(
    className,
    'dartboard',
    inline ? 'form-inline' : false
  );

  return (
    <div className={classes}>
      <FormGroup>
        <Label for="address">Street Address</Label>
        <Input
          type="text"
          value={street}
          onChange={e => setStreet(e.target.value)}
          onKeyPress={handleKeyPress}
          autoComplete="nope"
        />
        <FormText color="danger" className={streetIsValid ? 'dart-board__help-block' : ''}>This field is required</FormText>
      </FormGroup>
      <FormGroup>
        <Label for="zone">Zip or City</Label>
        <Input
          type="text"
          value={zone}
          onChange={e => setZone(e.target.value)}
          onKeyPress={handleKeyPress}
          autoComplete="nope"
        />
        <FormText color="danger" className={zoneIsValid ? 'dart-board__help-block' : ''}>This field is required</FormText>
      </FormGroup>
      <FormGroup>
        <Button outline color="dark" onClick={find}>Find</Button>
        <FormText color="danger" className={found ? 'dart-board__help-block' : ''}>No match found</FormText>
      </FormGroup>
    </div>
  );
};

export default Dartboard;
