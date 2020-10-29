import React from 'react';
import FindAddress from './FindAddress';

export default {
  title: 'Dartboard/FindAddress',
  argTypes: {
    onFind: { action: 'onFind' },
    onError: { action: 'onError' }
  }
};

export const Default = (args) => (
  <FindAddress apiKey='AGRC-Dev' {...args} />
);

export const Inline = (args) => (
  <FindAddress apiKey='AGRC-Dev' {...args} inline={true} />
);
