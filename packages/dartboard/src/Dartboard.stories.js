import React from 'react';
import Dartboard from './Dartboard';

export default {
  title: 'Dartboard',
  argTypes: {
    success: { action: 'ok' },
    error: { action: 'fail' }
  }
};

export const Address = (args) => (
  <Dartboard apiKey='AGRC-Dev' events={{...args}} />
);

export const Milepost = (args) => (
  <Dartboard apiKey="AGRC-Dev" events={{...args}} type = "route-milepost" />
);

export const Inline = (args) => (
  <Dartboard apiKey='AGRC-Dev' events={{...args}} inline={true} />
);
