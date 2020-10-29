import React from 'react';
import FindMilepost from './FindMilepost';

export default {
  title: 'Dartboard/FindMilepost',
  argTypes: {
    onFind: { action: 'onFind' },
    onError: { action: 'onError' }
  }
};

export const Default = (args) => (
  <FindMilepost apiKey='AGRC-Dev' {...args} />
);

export const Inline = (args) => (
  <FindMilepost apiKey='AGRC-Dev' {...args} inline={true} />
);
