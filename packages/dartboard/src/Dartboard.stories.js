import React from 'react';
import Dartboard from './Dartboard';
import { TailwindDartboard } from './Dartboard';

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
