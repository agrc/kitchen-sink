import { LayerSelector } from './LayerSelector';
import React from 'react';
import { mount } from 'enzyme';
import { Map, MapView } from '../../test-helpers/esriModules';
let mapView;

beforeAll(() => {
  mapView = new MapView({
    map: new Map({ basemap: 'streets' }),
    container: document.body
  });

  mapView.when(() => {
    console.log('mapView done');
  });
});

test('constructor', () => {
  const wrapper = mount(<LayerSelector view={mapView} />);

  expect(wrapper).toBe(true);
});
