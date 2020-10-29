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
  const [ route, setRoute] = useState('');
  const [ milepost, setMilepost ] = useState('');
  const [ routeIsValid, setRouteIsValid ] = useState(true);
  const [ milepostIsValid, setMilepostIsValid ] = useState(true);
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
        route,
        milepost
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
    const url = `https://api.mapserv.utah.gov/api/v1/geocode/milepost/${options.route}/${options.milepost}?`;

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
        matchRoute: result.matchRoute
      },
      popupTemplate: {
        title: '{matchRoute}'
      }
    };

    return graphic;
  };

  const validate = () => {
    const routeValidity = route.trim().length > 0;
    const milepostValidity = milepost.trim().length > 0;

    setRouteIsValid(routeValidity);
    setMilepostIsValid(milepostValidity);

    // reset not found message
    setFound(true);

    return routeValidity && milepostValidity;
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
        <Label for="route">Route</Label>
        <Input
          type="text"
          value={route}
          onChange={e => setRoute(e.target.value)}
          onKeyPress={handleKeyPress}
          autoComplete="nope"
        />
        <FormText color="danger" className={routeIsValid ? 'dart-board__help-block' : ''}>This field is required</FormText>
      </FormGroup>
      <FormGroup>
        <Label for="milepost">Milepost</Label>
        <Input
          type="text"
          value={milepost}
          onChange={e => setMilepost(e.target.value)}
          onKeyPress={handleKeyPress}
          autoComplete="nope"
        />
        <FormText color="danger" className={milepostIsValid ? 'dart-board__help-block' : ''}>This field is required</FormText>
      </FormGroup>
      <FormGroup>
        <Button outline color="dark" onClick={find}>Find</Button>
        <FormText color="danger" className={found ? 'dart-board__help-block' : ''}>No match found</FormText>
      </FormGroup>
    </div>
  );
};

export default Dartboard;
